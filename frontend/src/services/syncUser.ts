import { collection, getDocs, setDoc, doc, getDoc } from "firebase/firestore";
import employeesData from "../resources/employees.json";
import slackData from "../resources/slack.json";
import { db } from "../config/firebaseConfig";
import { calculateYears, determineColor } from "../utils/dateUtils";
import { Pin } from "../types/Pin"; // Importar la interfaz Pin desde el archivo común

// Definir la interfaz para los datos de empleado en employees.json
interface EmployeeData {
  Email: string;
  Status: string;
  "Hire date": string;
  Department: string;
  "First name (legal)": string;
  "Last name (legal)": string;
}

// Definir la interfaz para los datos de Slack
interface SlackMember {
  profile: {
    email: string;
    image_512: string;
  };
}

// Definir la interfaz para el empleado final que se añadirá a Firestore
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

// Función para obtener la URL de la imagen del pin de aniversario
const getAnniversaryPinImage = (years: number) => {
  return `https://example.com/pins/anniversary-${years}.png`;
};

// Función para obtener la URL de la imagen del pin de departamento
const getDepartmentPinImage = (department: string) => {
  return `https://example.com/pins/department-${department
    .replace(/\s/g, "-")
    .toLowerCase()}.png`;
};

const syncUsers = async () => {
  try {
    const employeesCollection = collection(db, "employees");

    // Obtener todos los documentos actuales de la colección de empleados
    await getDocs(employeesCollection); // No se necesita almacenar estos documentos si no se usan

    const employees: EmployeeData[] = employeesData.Employees as EmployeeData[];
    const slackMembers: SlackMember[] = slackData.members as SlackMember[];

    // Filtrar empleados activos y eliminar duplicados por email
    const activeEmployees = employees.filter((emp: EmployeeData) => emp.Status === "Active");

    // Crear un Map para eliminar duplicados
    const employeeMap = new Map<string, EmployeeData>();
    activeEmployees.forEach((emp: EmployeeData) => {
      employeeMap.set(emp.Email, emp);
    });
    const uniqueEmployees = Array.from(employeeMap.values());

    const employeesToAdd = uniqueEmployees
      .map((emp: EmployeeData): Employee | null => {
        const slackMember = slackMembers.find(
          (member: SlackMember) => member.profile.email === emp.Email
        );
        const startDate: string = emp["Hire date"] || "N/A";  // Asignar valor por defecto si está undefined
        let years: number;

        try {
          console.log(`Processing employee: ${emp.Email}, Hire date: ${startDate}`);
          years = calculateYears(startDate);
        } catch (error) {
          console.error(`Error calculando años para ${emp.Email}:`);
          // Excluir al empleado de la lista si la fecha es inválida
          return null;
        }

        if (!emp.Department) {
          console.error(`Departamento no definido para el empleado: ${emp.Email}`);
          // Excluir al empleado de la lista si no tiene departamento
          return null;
        }

        const color = determineColor(years);
        const departmentColor = "#808080"; // Color específico para el pin de departamento

        // Crear pines de aniversario y departamento con toda la información necesaria
        const anniversaryPin: Pin = {
          type: "Anniversary",
          date_hire: startDate,
          color: color,
          imagePin: getAnniversaryPinImage(years),
        };

        const departmentPin: Pin = {
          type: "Department",
          department: emp.Department,
          color: departmentColor,
          imagePin: getDepartmentPinImage(emp.Department),
        };

        // Retornar el objeto Employee completo
        return {
          id: emp.Email,
          name: `${emp["First name (legal)"] || "N/A"} ${emp["Last name (legal)"] || "N/A"}`,  // Asignar valores por defecto
          email: emp.Email,
          department: emp.Department || "Unknown",  // Asignar valor por defecto si está undefined
          picture: slackMember ? slackMember.profile.image_512 : "",
          startDate: startDate,
          yearsInCompany: years,
          pins: [anniversaryPin, departmentPin],
        };
      })
      .filter((employee): employee is Employee => employee !== null);

    console.log("Employees to add:", employeesToAdd);

    // Actualizar la base de datos con los empleados procesados
    for (const employee of employeesToAdd) {
      const employeeDocRef = doc(db, "employees", employee.email);
      const employeeDocSnap = await getDoc(employeeDocRef);

      if (employeeDocSnap.exists()) {
        const existingEmployeeData = employeeDocSnap.data() as Employee;
        const mergedPins = [
          ...existingEmployeeData.pins,
          ...employee.pins.filter(
            (newPin) =>
              !existingEmployeeData.pins.some(
                (existingPin) =>
                  existingPin.type === newPin.type &&
                  existingPin.date_hire === newPin.date_hire
              )
          ),
        ];
        employee.pins = mergedPins;
      }

      await setDoc(employeeDocRef, employee, { merge: true });
      console.log(`Employee added or updated: ${employee.email}`);
    }
    console.log("Employees synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing employees:", error);
  }
};

export default syncUsers;
