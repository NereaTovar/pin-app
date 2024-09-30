import { getFirestore, DocumentReference } from "firebase-admin/firestore";
import employeesData from "../resources/employees.json";
import slackData from "../resources/slack.json";
import { calculateYears, determineColor } from "@/utils/dateUtils";
import { Pin } from "../types/Pin";

// Obtén la instancia de Firestore desde firebase-admin
const firestore = getFirestore();

// Definir la interfaz para los datos de empleado en employees.json
interface EmployeeData {
  Email: string;
  Status: string;
  "Hire date": string;
  Department?: string;
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
const getAnniversaryPinImage = (years: number): string => {
  return `https://example.com/pins/anniversary-${years}.png`;
};

// Función para obtener la URL de la imagen del pin de departamento
const getDepartmentPinImage = (department: string): string => {
  return `https://example.com/pins/department-${department
    .replace(/\s/g, "-")
    .toLowerCase()}.png`;
};

const syncUsers = async () => {
  try {
    // Se asegura que los datos cumplen con la interfaz definida
    const employees: EmployeeData[] = employeesData.Employees as EmployeeData[];
    const slackMembers: SlackMember[] = slackData.members as SlackMember[];

    // Filtra solo empleados activos
    const activeEmployees = employees.filter(
      (emp: EmployeeData) => emp.Status === "Active"
    );

    // Eliminar duplicados usando un Map
    const employeeMap = new Map<string, EmployeeData>();
    activeEmployees.forEach((emp: EmployeeData) => {
      employeeMap.set(emp.Email, emp);
    });
    const uniqueEmployees = Array.from(employeeMap.values());

    const employeesToAdd: Employee[] = uniqueEmployees
      .map((emp: EmployeeData): Employee | null => {
        const slackMember = slackMembers.find(
          (member: SlackMember) => member.profile.email === emp.Email
        );

        const startDate: string = emp["Hire date"];
        let years: number;

        try {
          console.log(
            `Processing employee: ${emp.Email}, Hire date: ${startDate}`
          );
          years = calculateYears(startDate);
        } catch (error) {
          console.error(`Error calculando años para ${emp.Email}:`);
          // Excluir al empleado si hay error en la fecha
          return null;
        }

        if (!emp.Department) {
          console.error(
            `Departamento no definido para el empleado: ${emp.Email}`
          );
          // Excluir al empleado si no tiene departamento
          return null;
        }

        const color = determineColor(years);
        const departmentColor = "#808080"; // Color específico para el pin de departamento

        // Crear pines de aniversario y departamento con toda la información necesaria
        const anniversaryPin: Pin = {
          id: 'anniversary-' + years, // Se agrega un ID único al pin de aniversario
          type: "Anniversary",
          date_hire: startDate,
          color: color,
          imagePin: getAnniversaryPinImage(years),
        };

        const departmentPin: Pin = {
          id: 'department-' + emp.Department, // Se agrega un ID único al pin de departamento
          type: "Department",
          department: emp.Department,
          color: departmentColor,
          imagePin: getDepartmentPinImage(emp.Department),
        };

        // Retornar el objeto Employee completo
        return {
          id: emp.Email,
          name: `${emp["First name (legal)"]} ${emp["Last name (legal)"]}`,
          email: emp.Email,
          department: emp.Department,
          picture: slackMember ? slackMember.profile.image_512 : "",
          startDate: emp["Hire date"],
          yearsInCompany: years,
          pins: [anniversaryPin, departmentPin],
        };
      })
      .filter((employee): employee is Employee => employee !== null);

    console.log("Employees to add:", employeesToAdd);

    // Actualizar la base de datos con los empleados procesados
    for (const employee of employeesToAdd) {
      const employeeDocRef: DocumentReference = firestore.collection("employees").doc(employee.email);
      const employeeDocSnap = await employeeDocRef.get();

      if (employeeDocSnap.exists) {
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

      await employeeDocRef.set(employee, { merge: true });
      console.log(`Employee added or updated: ${employee.email}`);
    }
    console.log("Employees synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing employees:", error);
  }
};

export default syncUsers;
