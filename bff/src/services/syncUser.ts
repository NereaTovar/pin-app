import { getFirestore, DocumentReference } from "firebase-admin/firestore";
import { fetchEmployeesData, fetchSlackData } from "../services/mongoService";  // Importar funciones desde MongoDB
import { calculateYears, determineColor } from "@/utils/dateUtils";
import { Pin } from "../types/Pin";
import { SlackMember } from "../models/business/User";  // Importar SlackMember

// Obtén la instancia de Firestore desde firebase-admin
const firestore = getFirestore();

// Definir la interfaz para los datos de empleado en employees.json
interface EmployeeData {
  Email: string;
  Status?: string;
  "Hire date"?: string;
  Department?: string;
  "First name (legal)"?: string;
  "Last name (legal)"?: string;
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

const syncUsers = async () => {
  try {
    // Obtén los datos desde MongoDB usando las funciones fetchEmployeesData y fetchSlackData
    const rawEmployees = await fetchEmployeesData();  // Empleados desde MongoDB
    const slackMembers: SlackMember[] = await fetchSlackData();  // Miembros de Slack desde MongoDB

    // Filtrar empleados que tengan un email válido y estén activos
    const employees: EmployeeData[] = rawEmployees
      .filter((emp) => emp.Email !== undefined && emp.Status === "Active")
      .map((emp) => ({
        Email: emp.Email as string,  // Garantizar que Email es string
        Status: emp.Status,
        "Hire date": emp["Hire date"],
        Department: emp.Department,
        "First name (legal)": emp["First name (legal)"],
        "Last name (legal)": emp["Last name (legal)"],
      }));

    // Eliminar duplicados usando un Map
    const employeeMap = new Map<string, EmployeeData>();
    employees.forEach((emp: EmployeeData) => {
      employeeMap.set(emp.Email, emp);
    });
    const uniqueEmployees = Array.from(employeeMap.values());

    const employeesToAdd: Employee[] = uniqueEmployees
  .map((emp: EmployeeData): Employee | null => {
    // Buscar al miembro de Slack correspondiente
    const slackMember = slackMembers.find(
      (member: SlackMember) => member.profile.email === emp.Email
    );

    // Asignar un valor por defecto o manejar el caso de undefined
    const startDate: string = emp["Hire date"] || "N/A";  // O usa una verificación condicional como en la opción 2

    let years: number;

    try {
      console.log(`Processing employee: ${emp.Email}, Hire date: ${startDate}`);
      years = calculateYears(startDate);
    } catch (error) {
      console.error(`Error calculando años para ${emp.Email}:`);
      // Excluir al empleado si hay error en la fecha
      return null;
    }

    if (!emp.Department) {
      console.error(`Departamento no definido para el empleado: ${emp.Email}`);
      // Excluir al empleado si no tiene departamento
      return null;
    }

    const color = determineColor(years);
    const departmentColor = "#808080"; // Color específico para el pin de departamento

    // Crear pines de aniversario y departamento con toda la información necesaria
    const anniversaryPin: Pin = {
      id: 'anniversary-' + years,  // Se agrega un ID único al pin de aniversario
      type: "Anniversary",
      date_hire: startDate,
      color: color,
      imagePin: `https://example.com/pins/anniversary-${years}.png`,  // URL ficticia
    };

    const departmentPin: Pin = {
      id: 'department-' + emp.Department,  // Se agrega un ID único al pin de departamento
      type: "Department",
      department: emp.Department,
      color: departmentColor,
      imagePin: `https://example.com/pins/department-${emp.Department.replace(/\s/g, "-").toLowerCase()}.png`,  // URL ficticia
    };

    // Retornar el objeto Employee completo
    return {
      id: emp.Email,
      name: `${emp["First name (legal)"]} ${emp["Last name (legal)"]}`,
      email: emp.Email,
      department: emp.Department,
      picture: slackMember ? slackMember.profile.image_512 : "",  // Usar la imagen de Slack si existe
      startDate: startDate,
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
