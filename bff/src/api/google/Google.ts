export interface AttendeesEventResponse {
    isSurveyFilled: boolean;
    employees: EmployeeEventAttendee[];
    surveyUrl: string;
  }
  
  export interface EmployeeEventAttendee {
    id: string;
    firstName: string;
    email: string;
  }
  
  export interface MinimalEvent {
    id: string;
    name: string;
    month: string;
    day: string;
    weekday: string;
    colour: string;
    isOnlineEvent: boolean;
  }
  
  export interface DetailedEvent {
    id: string;
    summary: {
      name: string;
      month: string;
      day: string;
      weekday: string;
      colour: string;
    };
    isOnlineEvent: boolean;
    description: string;
    time: string;
    conferenceUrl: string;
  }
  