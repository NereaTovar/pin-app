export interface AttendeesEventResponse {
  isSurveyFilled: boolean;
  employees: EmployeeEventAttendee[];
  surveyUrl: string;
}

export interface EmployeeEventAttendee {
  id: string;
  firstName: string;
}
