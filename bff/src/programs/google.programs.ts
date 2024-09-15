import { GoogleRepository } from '../repository/google.repository';
import {
  AttendeesEventResponse,
  DetailedEvent,
  MinimalEvent,
} from '../api/google/Google';
import {
  DetailedEventConverter,
  MinimalEventConverter,
} from '../converters/api/Google.converter'; // Necesitarás implementar estos convertidores

export class GooglePrograms {
  private readonly googleRepository: GoogleRepository;
  private readonly minimalEventConverter: MinimalEventConverter;
  private readonly detailEventConverter: DetailedEventConverter;

  constructor(googleRepository: GoogleRepository) {
    this.googleRepository = googleRepository;
    this.minimalEventConverter = new MinimalEventConverter();
    this.detailEventConverter = new DetailedEventConverter();
  }

  public async events(): Promise<MinimalEvent[]> {
    const businessEvents = await this.googleRepository.events();

    const apiEvents = businessEvents.map((event) => {
      try {
        return this.minimalEventConverter.convert(event);
      } catch (error) {
        return null; // Si hay un error, lo ignoramos en la conversión
      }
    });

    const filteredEvents = apiEvents.filter(
      (event): event is MinimalEvent => event !== null,
    );

    return filteredEvents;
  }

  public async event(eventId: string): Promise<DetailedEvent | null> {
    try {
      const businessEvent = await this.googleRepository.event(eventId);
      return this.detailEventConverter.convert(businessEvent);
    } catch (error) {
      return null;
    }
  }

  public async attendees(
    userId: number,
    eventId: string,
  ): Promise<AttendeesEventResponse | null> {
    const attendees = await this.googleRepository
      .attendees(userId, eventId)
      .catch(() => null);

    return attendees;
  }
}
