import { calendar_v3, forms_v1, google } from "googleapis";
import { OAuth2Client, GoogleAuth } from "google-auth-library";
import { convertISOToDDMMYYYY } from "../helpers/convertISOToDDMMYYYY";
import { UserRepository } from "./user.repository";
import {
  EmployeeEventAttendee,
  AttendeesEventResponse,
} from "../api/google/Google";

interface GoogleAuthCredentials {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

export class GoogleRepository {
  private authClient: OAuth2Client | undefined;
  private userRepository: UserRepository;
  private googleAuthCredentials: GoogleAuthCredentials;
  private authPromise: Promise<void>;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;

    // Decodificar la variable de entorno BFF_GOOGLE_AUTH_CREDENTIALS
    const credentialsBase64 = process.env.BFF_GOOGLE_AUTH_CREDENTIALS;
    if (!credentialsBase64) {
      throw new Error(
        "BFF_GOOGLE_AUTH_CREDENTIALS environment variable is missing"
      );
    }

    // Parsear las credenciales desde Base64 a JSON usando la interfaz
    this.googleAuthCredentials = JSON.parse(
      Buffer.from(credentialsBase64, "base64").toString("utf-8")
    ) as GoogleAuthCredentials;

    // Inicializar la promesa de autenticación
    this.authPromise = this.setAuth(); // Guardamos la promesa de autenticación
  }

  // Método para configurar la autenticación usando GoogleAuth
  private async setAuth(): Promise<void> {
    try {
      const SCOPES = [
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/forms",
      ];

      const auth = new GoogleAuth({
        credentials: this.googleAuthCredentials, // Usar las credenciales decodificadas
        scopes: SCOPES,
      });

      // Obtén el cliente de autenticación (OAuth2Client)
      this.authClient = (await auth.getClient()) as OAuth2Client;
      console.log("Google Auth initialized successfully");
    } catch (error) {
      console.error("Error initializing Google Auth:", error);
      throw new Error("Authentication error");
    }
  }

  // Método para obtener los eventos de Google Calendar
  public async events(): Promise<calendar_v3.Schema$Event[]> {
    try {
      if (!this.authClient) {
        throw new Error("Auth client is not initialized");
      }

      const calendar = google.calendar({
        version: "v3",
        auth: this.authClient,
      });

      const response = await calendar.events.list({
        calendarId: "info@rindus.de",
        timeMin: new Date().toISOString(),
        timeMax: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).toISOString(),
        orderBy: "startTime",
        singleEvents: true,
      });

      const events = response?.data?.items ?? [];
      console.log("Events from Google Calendar:", events);
      return events.filter((event) => !event?.summary?.includes("Weekly"));
    } catch (error) {
      console.error("Error fetching events:", error);
      throw new Error("Error fetching events");
    }
  }

  // Resto de métodos...
  // Obtener detalles de un evento específico
  public async event(eventId: string): Promise<calendar_v3.Schema$Event> {
    if (!this.authClient) {
      throw new Error("Auth client is not initialized");
    }

    const calendar = google.calendar({ version: "v3", auth: this.authClient });
    const response = await calendar.events.get({
      calendarId: "info@rindus.de",
      eventId: eventId,
    });

    return response?.data;
  }

  // Obtener asistentes de un evento
  public async attendees(
    userId: number,
    eventId: string
  ): Promise<AttendeesEventResponse> {
    try {
      // Obtén los detalles del evento desde el calendario
      const event = await this.event(eventId);
      const startDate = event?.start?.dateTime;
      const name = event?.summary;

      if (!startDate || !name) {
        throw new Error("Start date or name of the event is missing.");
      }

      // Busca el formulario relacionado con el evento en Google Drive
      const formId = await this.getFormId(startDate, name);
      if (!formId) {
        throw new Error("Form ID not found.");
      }

      // Obtiene las respuestas del formulario de Google Forms
      const responses = await this.getFormResponses(formId);
      const firstQuestionId = await this.getFirstQuestionId(formId);
      if (!firstQuestionId || !responses) {
        throw new Error("First question ID or responses not found.");
      }

      // Extrae los datos de los asistentes
      const { employees, isSurveyFilled } = await this.extractData(
        userId,
        responses,
        firstQuestionId
      );

      // Retorna la información con los asistentes y el estado de la encuesta
      return {
        employees,
        isSurveyFilled,
        surveyUrl: `https://docs.google.com/forms/d/${formId}/viewform`,
      };
    } catch (error) {
      throw `Error getting attendees: ${error}`;
    }
  }

  // Obtener ID de un formulario
  private async getFormId(startDate: string, name: string): Promise<string> {
    // Espera a que la autenticación esté lista
    await this.authPromise;

    if (!this.authClient) {
      throw new Error("Auth client is not initialized");
    }

    const firstPartOfName = name.split(" ")[0]; // Separa el nombre del evento

    const forms = await google.drive("v3").files.list({
      auth: this.authClient, // Asegúrate de que 'this.authClient' esté inicializado
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
      q: `name contains '${convertISOToDDMMYYYY(
        startDate
      )}' and mimeType='application/vnd.google-apps.form' and trashed=false`,
    });

    const form = forms?.data?.files?.find(
      (form) =>
        form.name?.includes(firstPartOfName) && // Verifica que el nombre del formulario coincida
        !form.name?.toLowerCase().includes("copy")
    );

    return form?.id ?? "";
  }

  // Obtener respuestas de un formulario
  private async getFormResponses(
    formId: string
  ): Promise<forms_v1.Schema$FormResponse[]> {
    if (!this.authClient) {
      throw new Error("Auth client is not initialized");
    }

    const forms = google.forms({ version: "v1", auth: this.authClient });
    const formResponsesList = await forms.forms.responses.list({
      formId: formId,
    });

    return formResponsesList?.data?.responses || [];
  }

  // Obtener el ID de la primera pregunta del formulario
  private async getFirstQuestionId(formId: string): Promise<string> {
    if (!this.authClient) {
      throw new Error("Auth client is not initialized");
    }

    const forms = google.forms({ version: "v1", auth: this.authClient });
    const formData = await forms.forms.get({ formId: formId });

    return formData?.data?.items?.[0]?.questionItem?.question?.questionId ?? "";
  }

  // Extraer datos de los asistentes
  private async extractData(
    userId: number,
    responses: forms_v1.Schema$FormResponse[],
    firstQuestionId: string | undefined
  ): Promise<Omit<AttendeesEventResponse, "surveyUrl">> {
    const employees: EmployeeEventAttendee[] = [];
    const emails: string[] = [];

    if (!firstQuestionId) {
      throw new Error("First question ID is undefined.");
    }

    for (const responseItem of responses) {
      const email = responseItem?.respondentEmail;
      if (email) {
        emails.push(email);
        const answers = responseItem?.answers;

        const firstAnswer =
          answers?.[firstQuestionId]?.textAnswers?.answers?.[0]?.value;
        const isYesResponse = firstAnswer?.toLowerCase()?.includes("yes");

        if (isYesResponse) {
          const user = await this.userRepository.findUserByEmail(email);
          if (user) {
            employees.push(user);
          }
        }
      }
    }

    const isSurveyFilled = emails.includes(
      (await this.userRepository.findUserWithInfo(String(userId)))?.email ?? ""
    );
    return { employees, isSurveyFilled };
  }
}
