import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import employeesData from "src/resources/employees.json";
import slackData from "src/resources/slack.json";
import { db } from "@/config/firebaseConfig";
import { calculateYears, determineColor } from "@/utils/dateUtils";
import { Pin } from "../types/Pin";  // Importar la interfaz Pin desde el archivo común

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  picture: string;
  startDate: string;
  yearsInCompany: number;
  pins: Pin[];
}

const syncUsers = async () => {
  try {
    const employeesCollection = collection(db, "employees");

    // Obtener todos los documentos actuales de la colección de empleados
    const existingEmployeesSnapshot = await getDocs(employeesCollection);
    const existingEmployees = existingEmployeesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Employee[];

    const employees = employeesData.Employees;
    const slackMembers = slackData.members;

    // Filtrar empleados activos y eliminar duplicados por email
    const activeEmployees = employees.filter(
      (emp: any) => emp.Status === "Active"
    );

    // Crear un Map para eliminar duplicados
    const employeeMap = new Map();
    activeEmployees.forEach((emp: any) => {
      employeeMap.set(emp.Email, emp);
    });
    const uniqueEmployees = Array.from(employeeMap.values());

    const employeesToAdd = uniqueEmployees
      .map((emp: any): Employee | null => {
        const slackMember = slackMembers.find(
          (member: any) => member.profile.email === emp.Email
        );
        const startDate = emp["Hire date"];
        let years;

        try {
          console.log(
            `Processing employee: ${emp.Email}, Hire date: ${startDate}`
          );
          years = calculateYears(startDate);
        } catch (error) {
          console.error(`Error calculando años para ${emp.Email}:`);
          // Excluir al empleado de la lista si la fecha es inválida
          return null;
        }

        if (!emp.Department) {
          console.error(
            `Departamento no definido para el empleado: ${emp.Email}`
          );
          // Excluir al empleado de la lista si no tiene departamento
          return null;
        }

        const color = determineColor(years);

        return {
          id: emp.Email, // Usar el email como ID ya que es único
          name: `${emp["First name (legal)"]} ${emp["Last name (legal)"]}`,
          email: emp.Email,
          department: emp.Department,
          picture: slackMember ? slackMember.profile.image_512 : "",
          startDate: emp["Hire date"],
          yearsInCompany: years, // Añadir yearsInCompany
          pins: [{ number: years, color, type: "Anniversary" }],  // Añadir type a Pin
        };
      })
      .filter((employee): employee is Employee => employee !== null); // Filtrar empleados nulos que tienen fechas no válidas o departamentos no definidos

    console.log("Employees to add:", employeesToAdd);

    for (const employee of employeesToAdd) {
      const employeeDoc = doc(db, "employees", employee.email); // Usar el correo electrónico como ID
      await setDoc(employeeDoc, employee, { merge: true }); // Utilizar setDoc con merge para evitar sobrescribir completamente el documento
      console.log(`Employee added or updated: ${employee.email}`);
    }
    console.log("Employees synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing employees:", error);
  }
};

export default syncUsers;
