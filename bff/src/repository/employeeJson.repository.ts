import { UserRepository } from "./user.repository 2";
import { fetchEmployeesData } from "../services/mongoService";  // Importa la función de MongoDB
import {
  User,
  UserAttendee,
  LoggedInUser,
  WithInfo,
  WithLanguages,
} from "../models/business/User";
import { EmployeeJson, transformEmployeeToUser, RawEmployee } from "../utils/EmployeeTransformer";


export class EmployeeJsonRepository implements UserRepository {
  private employees: EmployeeJson[] = [];  // Inicializa con un array vacío

  constructor() {
    this.loadEmployees();  // Carga los empleados de MongoDB
  }

  // Cargar los empleados desde MongoDB
  private async loadEmployees() {
    try {
      const employeesFromDb = await fetchEmployeesData();
      this.employees = this.normalizeEmployees(employeesFromDb);
    } catch (error) {
      console.error("Error al cargar empleados desde MongoDB:", error);
      this.employees = [];  // Si hay error, mantener un array vacío
    }
  }

  // Normaliza los datos de los empleados desde MongoDB
  private normalizeEmployees(employees: RawEmployee[]): EmployeeJson[] {
    return employees.filter((emp): emp is EmployeeJson => {
      if (typeof emp.Email === "string" && emp.Email.trim() !== "") {
        return true;
      }
      return false;
    });
  }

  // Encuentra al usuario por email
  async findUserByEmail(email: string): Promise<UserAttendee | undefined> {
    await this.loadEmployees();  // Asegúrate de que los empleados están cargados
    const employee = this.employees.find((emp) => emp.Email === email);
    if (!employee || !employee.Email) return undefined;

    return {
      id: employee.Email,
      firstName: employee["First name (legal)"] || "",
      lastName: employee["Last name (legal)"] || "",
      email: employee.Email,
    };
  }

  // Encuentra al usuario por ID
  async findUserById(id: string): Promise<LoggedInUser | undefined> {
    await this.loadEmployees();  // Asegúrate de que los empleados están cargados
    const employee = this.employees.find((emp) => emp.Email === id);
    if (!employee) return undefined;

    return {
      id: employee.Email,
    };
  }

  // Encuentra al usuario con información adicional
  async findUserWithInfo(
    id: string
  ): Promise<(User & WithInfo & WithLanguages) | undefined> {
    await this.loadEmployees();  // Asegúrate de que los empleados están cargados
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

  // Obtiene todos los usuarios
  async all(): Promise<User[]> {
    await this.loadEmployees();  // Asegúrate de que los empleados están cargados
    return this.employees.map(transformEmployeeToUser);
  }

  // Obtiene todas las posiciones únicas
  async allPositions(): Promise<string[]> {
    await this.loadEmployees();  // Asegúrate de que los empleados están cargados
    return this.employees
      .map((emp) => emp.Position || "")
      .filter((pos, index, self) => pos && self.indexOf(pos) === index);
  }

  // Obtiene usuarios por idioma
  async allByLanguage(languageId: number): Promise<User[]> {
    await this.loadEmployees();  // Asegúrate de que los empleados están cargados
    if (languageId === 1) {
      return this.employees.map(transformEmployeeToUser);
    }
    return [];
  }

  // Método para asignar pines automáticamente a los asistentes
  async assignPinToAttendees(attendeeEmails: string[]): Promise<void> {
    await this.loadEmployees();  // Asegúrate de que los empleados están cargados

    const summerPin = {
      id: "summer_event_2024",
      imagePin: "../../assets/pins/Summer_event24.svg",
      pinTitle: "Summer Event 2024",
      pinDescription: "The 'Event Summer 2024' pin is awarded for attending the Event...",
      eventDate: "2024-09-20",
      autoAssigned: true,
    };

    attendeeEmails.forEach((email) => {
      const employee = this.employees.find((emp) => emp.Email === email);

      if (employee) {
        if (!employee.pins) {
          employee.pins = [];
        }

        const pinExists = employee.pins.some((pin) => pin.id === summerPin.id);

        if (!pinExists) {
          employee.pins.push(summerPin);
          console.log(`Pin asignado a ${employee.Email}`);
        } else {
          console.log(`El empleado ${employee.Email} ya tiene asignado el pin.`);
        }
      } else {
        console.warn(`Empleado con email ${email} no encontrado.`);
      }
    });

    // Si estás usando una base de datos, aquí puedes guardar los cambios.
  }
}
