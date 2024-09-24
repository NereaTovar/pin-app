import { UserRepository } from "./user.repository";
import {
  User,
  UserAttendee,
  LoggedInUser,
  WithInfo,
  WithLanguages,
} from "../models/business/User";
import employeesData from "../resources/employees.json";
import {
  EmployeeJson,
  RawEmployee,
  transformEmployeeToUser,
} from "../utils/EmployeeTransformer";

export class EmployeeJsonRepository implements UserRepository {
  private employees: EmployeeJson[];

  constructor() {
    this.employees = this.normalizeEmployees(employeesData.Employees);
  }

  // Normaliza los datos de los empleados
  private normalizeEmployees(employees: RawEmployee[]): EmployeeJson[] {
    return employees.filter((emp): emp is EmployeeJson => {
      // Filtra empleados que no tienen email definido y que no está vacío
      if (typeof emp.Email === "string" && emp.Email.trim() !== "") {
        // Puedes hacer más normalizaciones aquí si es necesario
        return true;
      }
      return false;
    });
  }

  async findUserByEmail(email: string): Promise<UserAttendee | undefined> {
    const employee = this.employees.find((emp) => emp.Email === email);
    if (!employee || !employee.Email) return undefined; // Verifica que email no sea undefined

    return {
      id: employee.Email, // Asigna el email como ID
      firstName: employee["First name (legal)"] || "",
      lastName: employee["Last name (legal)"] || "",
      email: employee.Email, // Aquí email ya está garantizado como string
    };
  }

  async findUserById(id: string): Promise<LoggedInUser | undefined> {
    const employee = this.employees.find((emp) => emp.Email === id);
    if (!employee) return undefined;

    return {
      id: employee.Email, // Usar el email como ID
    };
  }

  async findUserWithInfo(
    id: string
  ): Promise<(User & WithInfo & WithLanguages) | undefined> {
    const employee = this.employees.find((emp) => emp.Email === id);
    if (!employee) return undefined;

    const simulatedWithInfo: WithInfo = {
      partner: { id: 1, name: "Partner Name" },
    };
    const simulatedWithLanguages: WithLanguages = {
      languages: [{ id: 1, name: "English" }],
    };

    return {
      ...transformEmployeeToUser(employee),
      ...simulatedWithInfo,
      ...simulatedWithLanguages,
    };
  }

  async all(): Promise<User[]> {
    return this.employees.map(transformEmployeeToUser);
  }

  async allPositions(): Promise<string[]> {
    return this.employees
      .map((emp) => emp.Position || "")
      .filter((pos, index, self) => pos && self.indexOf(pos) === index);
  }

  async allByLanguage(languageId: number): Promise<User[]> {
    // Simulamos que solo devolvemos usuarios que tienen un lenguaje asignado con el ID dado
    if (languageId === 1) {
      return this.employees.map(transformEmployeeToUser);
    }
    return [];
  }

  // // Método para asignar automáticamente pines a los empleados que asistieron al summer event
  // async assignPinToAttendees(attendeeEmails: string[]): Promise<void> {
  //   // Encuentra el pin del Summer Event
  //   const summerPin = {
  //     id: "summer_event_2024",
  //     imagePin: "../../assets/pins/Summer_event24.svg",
  //     pinTitle: "Summer Event 2024",
  //     pinDescription:
  //       "The 'Event Summer 2024' pin is awarded for attending the Event...",
  //     eventDate: "2024-09-20",
  //     autoAssigned: true,
  //   };

  //   attendeeEmails.forEach((email) => {
  //     // Encuentra al empleado que asistió usando su email
  //     const employee = this.employees.find((emp) => emp.Email === email);

  //     if (employee) {
  //       // Inicializar el array de pines si no existe
  //       if (!employee.pins) {
  //         employee.pins = [];
  //       }

  //       // Verificar si el pin ya está asignado
  //       const pinExists = employee.pins.some((pin) => pin.id === summerPin.id);

  //       // Si el pin no existe, se asigna
  //       if (!pinExists) {
  //         employee.pins.push(summerPin);
  //         console.log(`Pin asignado a ${employee.Email}`);
  //       } else {
  //         console.log(
  //           `El empleado ${employee.Email} ya tiene asignado el pin.`
  //         );
  //       }
  //     } else {
  //       console.warn(`Empleado con email ${email} no encontrado.`);
  //     }
  //   });

  // Método para asignar automáticamente pines a los empleados que asistieron
  async assignPinToAttendees(attendeeEmails: string[]): Promise<void> {
    // Encuentra el pin del Summer Event
    const summerPin = {
      id: "summer_event_2024",
      imagePin: "../../assets/pins/Summer_event24.svg",
      pinTitle: "Summer Event 2024",
      pinDescription:
        "The 'Event Summer 2024' pin is awarded for attending the Event...",
      eventDate: "2024-09-20",
      autoAssigned: true,
    };

    attendeeEmails.forEach((email) => {
      // Encuentra al empleado que asistió usando su email
      const employee = this.employees.find((emp) => emp.Email === email);

      if (employee) {
        // Inicializar el array de pines si no existe
        if (!employee.pins) {
          employee.pins = [];
        }

        // Verificar si el pin ya está asignado
        const pinExists = employee.pins.some((pin) => pin.id === summerPin.id);

        // Si el pin no existe, se asigna
        if (!pinExists) {
          employee.pins.push(summerPin);
          console.log(`Pin asignado a ${employee.Email}`);
        } else {
          console.log(
            `El empleado ${employee.Email} ya tiene asignado el pin.`
          );
        }
      } else {
        console.warn(`Empleado con email ${email} no encontrado.`);
      }
    });

    // Aquí puedes agregar lógica para guardar los cambios si estás usando una base de datos.
  }
}
