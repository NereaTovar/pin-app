import { User } from "../models/business/User";

export interface Pin {
  id: string;
  pinTitle?: string;
  pinDescription?: string;
  imagePin?: string;
  eventDate?: string;
  autoAssigned?: boolean;
}

// Define el tipo del empleado según la estructura de tu JSON
export interface EmployeeJson {
  "First name (legal)": string;
  "Last name (legal)": string;
  Gender: string;
  Email: string; 
  Office: string;
  Department: string;
  Position: string;
  "Legal Entity": string;
  Status: string;
  "Hire date": string;
  "Name (preferred)"?: string;
  Birthday?: string;
  "Assigned Team Captain"?: string;
  "Main Language(s)"?: string;
  pins: Pin[];
}

// Función para transformar un empleado del JSON a un objeto User
export const transformEmployeeToUser = (employee: EmployeeJson): User => {
  return {
    id: employee.Email, 
    firstName: employee["First name (legal)"] || "",
    asciiFirstName: "", 
    lastName: employee["Last name (legal)"] || "",
    asciiLastName: "", 
    email: employee.Email || "", 
    position: employee.Position || "",
    birthday: employee.Birthday || "",
    isBirthday: false, 
    isTeamCaptain: !!employee["Assigned Team Captain"], 
  };
};

export interface RawEmployee {
  "First name (legal)"?: string;
  "Last name (legal)"?: string;
  Gender?: string;
  Email?: string; 
  Department?: string;
  Position?: string;
  "Legal Entity"?: string;
  Status?: string;
  "Hire date"?: string;
  "Name (preferred)"?: string;
  Birthday?: string;
  "Assigned Team Captain"?: string;
  "Main Language(s)"?: string;
}

