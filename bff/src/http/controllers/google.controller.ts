import { Request, Response } from "express";
import { GooglePrograms } from "./google.programs";
import { EmployeeJsonRepository } from "../../repository/employeeJson.repository";

type CacheKey = string;

export class GoogleController {
  private readonly googlePrograms: GooglePrograms;
  private employeeRepository: EmployeeJsonRepository;

  constructor(
    googlePrograms: GooglePrograms,
    employeeRepository: EmployeeJsonRepository
  ) {
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
    const userId = 1; // Puedes sacar el userId del request si es necesario

    try {
      // Pasar userId y eventId a la función attendees de GooglePrograms
      const attendeesResponse = await this.googlePrograms.attendees(
        userId,
        eventId
      );

      if (!attendeesResponse) {
        return res.status(404).json({ error: "No attendees found" });
      }

      console.log("Attendees from Google API:", attendeesResponse);

      // Asegúrate de que la respuesta contiene una propiedad `employees` que es un array
      const attendees = Array.isArray(attendeesResponse.employees)
        ? attendeesResponse.employees
        : [];

      if (!Array.isArray(attendees)) {
        return res.status(500).json({ error: "Invalid attendees format" });
      }

      // Filtrar los asistentes que tengan un email válido
      const validAttendees = attendees.filter(
        (attendee: { email: string }) => !!attendee.email
      );
      const attendeeEmails = validAttendees.map(
        (attendee: { email: string }) => attendee.email
      );

      // Asigna el pin de Summer Event si el ID del evento coincide
      if (eventId === "1518kfg0ull3ea2pce5dq8242p") {
        console.log("Asignando pin para Summer Event...");
        await this.employeeRepository.assignPinToAttendees(attendeeEmails);
      }

      res.json(attendees); // Devuelve los asistentes
    } catch (error) {
      console.error("Error fetching attendees:", error);
      res.status(500).json({ message: "Error fetching attendees" });
    }
  }

  private calculateCacheKey(eventId: string): CacheKey {
    return `attendees-${eventId}`;
  }
}
