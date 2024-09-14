// import express from "express";
// import { GoogleRepository } from "../repository/google.repository";
// import { fetchUsers } from "../services/firestoneOperations";
// import { UserAttendee, User } from "../models/business/User";
// import { Page } from "../models/business/Pagination";
// import { UserRepository } from "../repository/user.repository";
// import { google } from "googleapis"; // Importamos googleapis
// import { getCommonConfig } from "../config/common"; // Asegúrate de que esto está bien
// import admin from "firebase-admin";

// // Inicializa Firebase Admin SDK (asegúrate de que ya está configurado)
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
// });

// // Obtenemos la configuración común, que incluye `BFF_GOOGLE_AUTH_CREDENTIALS`
// const config = getCommonConfig(process.env as any); // Asegúrate de pasar `process.env`

// // Inicializamos Google Auth con las credenciales de servicio para la cuenta de la empresa
// const auth = new google.auth.GoogleAuth({
//   credentials: JSON.parse(config.googleAuthCredentials),
//   scopes: [
//     "https://www.googleapis.com/auth/calendar",
//     "https://www.googleapis.com/auth/forms",
//   ],
// });

// // Usamos estas credenciales para acceder a Google Calendar y Forms
// const calendar = google.calendar({ version: "v3", auth });
// const forms = google.forms({ version: "v1", auth });

// const router = express.Router();

// class FirestoreUserRepository implements UserRepository {
//   async findUserByEmail(email: string): Promise<UserAttendee | undefined> {
//     const users = await fetchUsers();
//     const user = users.find((user) => user.email === email);

//     if (user) {
//       const userAttendee: UserAttendee = {
//         id: user.id,
//         firstName: user.name,
//         pictureUrl: user.picture,
//       };
//       return userAttendee;
//     }
//     return undefined;
//   }

//   // Métodos no implementados
//   async all(): Promise<User[]> {
//     throw new Error("Method not implemented.");
//   }
//   async page(page: number, pageSize: number): Promise<Page<User>> {
//     throw new Error("Method not implemented.");
//   }
//   async findUserById(id: number): Promise<User | undefined> {
//     throw new Error("Method not implemented.");
//   }
//   async findUserWithInfo(id: number): Promise<(User & any) | undefined> {
//     throw new Error("Method not implemented.");
//   }
//   async allPositions(): Promise<string[]> {
//     throw new Error("Method not implemented.");
//   }
//   async allByLanguage(languageId: number): Promise<User[]> {
//     throw new Error("Method not implemented.");
//   }
// }

// const userRepository = new FirestoreUserRepository(); // Usa la implementación concreta
// const googleRepository = new GoogleRepository(userRepository);

// // Middleware para verificar la autenticación
// const verifyToken = async (req: any, res: any, next: any) => {
//   const token = req.headers.authorization?.split("Bearer ")[1];

//   if (!token) {
//     return res.status(403).json({ message: "No token provided" });
//   }

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: "Invalid token" });
//   }
// };

// // Aplicar middleware en las rutas
// router.use(verifyToken);

// // Ruta para obtener eventos por fecha
// router.get("/events", async (req, res) => {
//   const { date } = req.query;
//   try {
//     if (!date) {
//       return res.status(400).json({ error: "Missing event date" });
//     }
//     const events = await calendar.events.list({
//       calendarId: "primary", // Puedes cambiar el ID si usas un calendario diferente
//       timeMin: new Date(date as string).toISOString(),
//       timeMax: new Date(date as string).toISOString(),
//       singleEvents: true,
//       orderBy: "startTime",
//     });
//     res.json(events.data.items);
//   } catch (error) {
//     console.error(`Error fetching events: ${error}`);
//     res.status(500).json({ error: "Failed to fetch events" });
//   }
// });

// // Ruta para obtener asistentes de un evento por eventId
// router.get("/events/:eventId/attendees", async (req, res) => {
//   const { eventId } = req.params;
//   console.log(`Request received for eventId: ${eventId}`);

//   try {
//     const attendees = await googleRepository.attendees(0, eventId);
//     res.json(attendees);
//   } catch (error) {
//     console.error(`Error fetching attendees: ${error}`);
//     res.status(500).json({ error: "Failed to fetch attendees" });
//   }
// });

// export default router;

import express from "express";
import { google } from "googleapis";
import { config } from "../config/index";

const router = express.Router();

// Usar las credenciales de Google para autenticar API requests
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(config.googleAuthCredentials),
  scopes: [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/forms",
  ],
});

// Inicializa los servicios de Google
const calendar = google.calendar({ version: "v3", auth });

// Ruta para obtener eventos de Google Calendar
router.get("/events", async (req, res) => {
  try {
    const events = await calendar.events.list({
      calendarId: "primary", // Cambia esto si usas otro calendario
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });
    res.json(events.data.items);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// Ruta para obtener asistentes de un evento por eventId
router.get("/events/:eventId/attendees", async (req, res) => {
  const { eventId } = req.params;
  try {
    // Aquí obtendrás los detalles del evento y los asistentes
    const attendees = await calendar.events.get({
      calendarId: "primary",
      eventId: eventId,
    });

    res.json(attendees.data.attendees); // Enviar la lista de asistentes en la respuesta
  } catch (error) {
    console.error(`Error fetching attendees for event ${eventId}:`, error);
    res
      .status(500)
      .json({ error: `Failed to fetch attendees for event ${eventId}` });
  }
});

export default router;
