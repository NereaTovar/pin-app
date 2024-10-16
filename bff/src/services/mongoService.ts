import { MongoClient, Document } from 'mongodb';
import { RawEmployee } from "../utils/EmployeeTransformer";  // Asegúrate de tener el tipo correcto de RawEmployee
import { Pin } from '@/types/Pin';
import {SlackMember} from './../models/business/User'

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI no está definida en las variables de entorno');
}

const client = new MongoClient(uri);

export async function fetchEmployeesData(): Promise<RawEmployee[]> {
  try {
    await client.connect();
    const database = client.db('personio');
    const employeesCollection = database.collection('employees');

    // Obtiene los empleados desde MongoDB con el tipo Document
    const employeesFromDb: Document[] = await employeesCollection.find({}).toArray();

    // Mapea los documentos a objetos del tipo RawEmployee
    const employeeList: RawEmployee[] = employeesFromDb.map((emp: Document) => ({
      Email: emp.Email as string,
      "First name (legal)": emp["First name (legal)"] as string,
      "Last name (legal)": emp["Last name (legal)"] as string,
      Gender: emp.Gender as string,
      "Date of Birth": emp["Date of Birth"] as string,
      Department: emp.Department as string,
      Position: emp.Position as string,
      "Manager Name": emp["Manager Name"] as string,
      "Hire Date": emp["Hire Date"] as string,
      pins: (emp.pins || []) as Pin[]  // Puedes tipar pins de manera más específica si tienes su tipo
    }));

    return employeeList;
  } finally {
    await client.close();
  }
}

export async function fetchSlackData(): Promise<SlackMember[]> {
  try {
    await client.connect();
    const database = client.db('personio');  // Usa el nombre de tu base de datos
    const slackCollection = database.collection('slack');  // Nombre de la colección de Slack

    // Obtiene los datos de los miembros de Slack desde MongoDB
    const slackMembersFromDb: Document[] = await slackCollection.find({}).toArray();

    // Mapea los documentos a objetos del tipo SlackMember
    const slackMembers: SlackMember[] = slackMembersFromDb.map((member: Document) => ({
      profile: {
        email: member.email as string,
        image_512: member.image_512 as string,
      }
    }));

    return slackMembers;
  } finally {
    await client.close();
  }
}