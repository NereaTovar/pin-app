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
  Email: string; // Cambiar a string opcional si crees que puede faltar
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
    id: employee.Email, // Usar el email como ID, asegúrate de que siempre esté presente
    firstName: employee["First name (legal)"] || "",
    asciiFirstName: "", // Aquí puedes agregar lógica para obtener la versión ASCII del nombre si es necesario
    lastName: employee["Last name (legal)"] || "",
    asciiLastName: "", // Aquí puedes agregar lógica para obtener la versión ASCII del apellido si es necesario
    email: employee.Email || "", // Valor por defecto si falta el email
    position: employee.Position || "",
    birthday: employee.Birthday || "",
    isBirthday: false, // Puedes calcular esto según la lógica de tu aplicación
    isTeamCaptain: !!employee["Assigned Team Captain"], // True si tiene un capitán asignado
  };
};

export interface RawEmployee {
  "First name (legal)"?: string;
  "Last name (legal)"?: string;
  Gender?: string;
  Email?: string; // Puede ser opcional en este momento
  Office?: string;
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

