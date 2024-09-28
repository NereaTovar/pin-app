import { Pin } from "./Pin";

export interface Employee {
    id: string;
    email?: string;
    name: string;
    picture: string;
    department: string;
    startDate: string;
    yearsInCompany: number;
    pins: Pin[]; // Asegúrate de usar el mismo tipo
  }

