import { calendar_v3 } from "googleapis";
import { AttendeesEventResponse } from "../../../api/google/Google";

export interface GoogleRepository {
  events(): Promise<calendar_v3.Schema$Events[]>;
  event(eventId: string): Promise<calendar_v3.Schema$Event>;
  attendees(userId: number, eventId: string): Promise<AttendeesEventResponse>;
}
