import { Request, Response } from "express";
// import { EmployeeEventAttendee } from "@/api/google/Google";
import { GooglePrograms } from './google.programs';
import { EmployeeJsonRepository } from "../../repository/employeeJson.repository";


type CacheKey = string;

export class GoogleController {
  private readonly googlePrograms: GooglePrograms;

  private employeeRepository: EmployeeJsonRepository;

  constructor(googlePrograms: GooglePrograms, employeeRepository: EmployeeJsonRepository) {
    this.googlePrograms = googlePrograms;
    this.employeeRepository = employeeRepository;
  }

  public async events(_req: Request, res: Response) {
    try {
      const events = await this.googlePrograms.events();
      if (events.length > 0) {
        return res.json(events);
      }
      return res.status(404).json({ error: "No events found" });
    } catch (error) {
      return res.status(500).json({ error: "Error fetching events" });
    }
  }

  public async event(req: Request, res: Response) {
    const eventId = req.params.eventId;

    try {
      const event = await this.googlePrograms.event(eventId);
      if (event) {
        return res.json(event);
      }
      return res.status(404).json({ error: "Event not found" });
    } catch (error) {
      return res.status(500).json({ error: "Error fetching event" });
    }
  }

  public async attendees(req: Request, res: Response) {
    const { eventId } = req.params;
    const userId = 1; // Reemplaza con el userId real o sácalo del request
  
    try {
      // Pasar userId y eventId a la función attendees
      const attendeesResponse = await this.googlePrograms.attendees(userId, eventId);
      if (!attendeesResponse) {
        return res.status(404).json({ error: "No attendees found" });
      }
      console.log("Attendees from Google API:", attendeesResponse);
  
      // Si attendeesResponse es un objeto y tiene una propiedad `attendees`
      const attendees = Array.isArray(attendeesResponse)
        ? attendeesResponse
        : attendeesResponse.employees; // Ajusta según la estructura real
  
      if (!Array.isArray(attendees)) {
        return res.status(500).json({ error: "Invalid attendees format" });
      }
  
      // // Asigna el pin de Summer Event a los asistentes utilizando su id para obtener el email
      // const attendeeEmails = await Promise.all(
      //   attendees.map(async (attendee: EmployeeEventAttendee) => {
      //     // Busca el email en el repositorio de empleados usando la id
      //     const employee = await this.employeeRepository.findUserById(attendee.id);
      //     return employee?.email || ''; // Devuelve el email si existe
      //   })
      // );
  
      // // Filtra emails vacíos
      // const validEmails = attendeeEmails.filter(email => email !== '');
  
      // // Asigna el pin a los correos válidos
      // await this.employeeRepository.assignPinToAttendees(validEmails);
  
      // res.json(attendees);
       // Asigna el pin de Summer Event a los asistentes si el ID coincide
    if (eventId === '1518kfg0ull3ea2pce5dq8242p') {
      console.log("Asignando pin para Summer Event...");
      await this.employeeRepository.assignPinToAttendees(
        attendees.map((attendee: { email: string }) => attendee.email)
      );
    }

    res.json(attendees);
    } catch (error) {
      console.error("Error fetching attendees:", error);
      res.status(500).send({ message: "Error fetching attendees" });
    }
  }
  
  
  
  


  private calculateCacheKey(eventId: string): CacheKey {
    return `attendees-${eventId}`;
  }
}
