import { GoogleRepository } from "../../repository/google.repository";
import {
  AttendeesEventResponse,
  DetailedEvent,
  MinimalEvent,
} from "../../api/google/Google";
import {
  DetailedEventConverter,
  MinimalEventConverter,
} from "../../converters/api/Google.converter";

export class GooglePrograms {
  private readonly googleRepository: GoogleRepository;
  private readonly minimalEventConverter: MinimalEventConverter;
  private readonly detailEventConverter: DetailedEventConverter;

  constructor(googleRepository: GoogleRepository) {
    this.googleRepository = googleRepository;
    this.minimalEventConverter = new MinimalEventConverter();
    this.detailEventConverter = new DetailedEventConverter();
  }

  // Método para obtener eventos en formato MinimalEvent
  public async events(): Promise<MinimalEvent[]> {
    try {
      const businessEvents = await this.googleRepository.events();

      const apiEvents = businessEvents.map((event) => {
        try {
          return this.minimalEventConverter.convert(event);
        } catch (error) {
          console.error("Error converting event:", error);
          return null;
        }
      });

      const filteredEvents = apiEvents.filter(
        (event): event is MinimalEvent => event !== null
      );

      return filteredEvents;
    } catch (error) {
      console.error("Error fetching events from GoogleRepository:", error);
      throw new Error("Failed to fetch events.");
    }
  }

  // Método para obtener un evento específico en formato DetailedEvent
  public async event(eventId: string): Promise<DetailedEvent | null> {
    try {
      const businessEvent = await this.googleRepository.event(eventId);
      return this.detailEventConverter.convert(businessEvent);
    } catch (error) {
      console.error("Error fetching event:", error);
      return null;
    }
  }

  // Método para obtener asistentes a un evento
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
