// GooglePrograms sin authenticate

import { GoogleRepository } from "../repository/google.repository";
import {
  AttendeesEventResponse,
  DetailedEvent,
  MinimalEvent,
} from "../api/google/Google";
import {
  DetailedEventConverter,
  MinimalEventConverter,
} from "../converters/api/Google.converter";

export class GooglePrograms {
  private readonly googleRepository: GoogleRepository;
  private readonly minimalEventConverter: MinimalEventConverter;
  private readonly detailEventConverter: DetailedEventConverter;

  constructor(googleRepository: GoogleRepository) {
    this.googleRepository = googleRepository;
    this.minimalEventConverter = new MinimalEventConverter();
    this.detailEventConverter = new DetailedEventConverter();
  }

  // No necesitas el auth aquí, ya lo maneja GoogleRepository
  public async events(): Promise<MinimalEvent[]> {
    try {
      // Obtén los eventos desde GoogleRepository
      const businessEvents = await this.googleRepository.events();

      // Convierte los eventos a la estructura mínima usando el convertidor
      return businessEvents.map((event) =>
        this.minimalEventConverter.convert(event)
      );
    } catch (error) {
      console.error("Error fetching events from Google Calendar:", error);
      throw new Error(`Error fetching events: `);
    }
  }

  public async event(eventId: string): Promise<DetailedEvent | null> {
    try {
      const businessEvent = await this.googleRepository.event(eventId);
      return this.detailEventConverter.convert(businessEvent);
    } catch (error) {
      console.error("Error fetching event:", error);
      return null;
    }
  }

  public async attendees(
    userId: number,
    eventId: string
  ): Promise<AttendeesEventResponse | null> {
    try {
      const attendees = await this.googleRepository.attendees(userId, eventId);
      return attendees;
    } catch (error) {
      console.error("Error fetching attendees:", error);
      return null;
    }
  }
}
