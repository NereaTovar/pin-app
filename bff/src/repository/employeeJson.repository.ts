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
    if (!employee) return undefined;

    return {
      id: employee.Email, // Asigna el email como ID
      firstName: employee["First name (legal)"] || "",
      lastName: employee["Last name (legal)"] || "",
      email: employee.Email,
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
}
