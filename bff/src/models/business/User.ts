import { Language } from "./Language";
import { Partner } from "./Partner";

export interface LoggedInUser {
  id: string;
  pictureUrl?: string;
}

export interface UserAttendee extends LoggedInUser {
  firstName: string;
  lastName?: string;
}

export interface User extends LoggedInUser {
  firstName: string;
  asciiFirstName: string;
  lastName?: string;
  asciiLastName?: string;
  email: string;
  position: string;
  birthday?: string;
  isBirthday: boolean;
  isTeamCaptain: boolean;
}

export interface WithInfo {
  partner: Partner;
  slack?: Slack;
}

export interface Slack {
  name?: string;
  slackId?: string;
  profileUrl?: string;
}

export interface WithLanguages {
  languages: Language[];
}
