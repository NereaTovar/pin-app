import express from "express";
import { GoogleRepository } from "../repository/google.repository";
import { addUser, fetchUsers } from "../services/firestoneOperations";
import { UserAttendee, User } from "../models/business/User"; // Asegúrate de que UserAttendee esté correctamente importado
import { Page } from "../models/business/Pagination";
import { UserRepository } from "../repository/user.repository";
import { auth } from "firebase-admin";

// Implementación del FirestoreUserRepository que implementa la interfaz UserRepository
class FirestoreUserRepository implements UserRepository {
  async findUserByEmail(email: string): Promise<UserAttendee | undefined> {
    const users = await fetchUsers();
    const user = users.find((user) => user.email === email);

    if (user) {
      // Mapear las propiedades de User a UserAttendee
      const userAttendee: UserAttendee = {
        id: user.id,
        firstName: user.name, // Asegúrate de que 'name' sea el campo correcto para 'firstName'
        pictureUrl: user.picture, // Mapea 'picture' a 'pictureUrl'
      };
      return userAttendee;
    }
    return undefined;
  }

  // Implementación de métodos no utilizados
  async all(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  async page(page: number, pageSize: number): Promise<Page<User>> {
    throw new Error("Method not implemented.");
  }

  async findUserById(id: number): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }

  async findUserWithInfo(id: number): Promise<(User & any) | undefined> {
    throw new Error("Method not implemented.");
  }

  async allPositions(): Promise<string[]> {
    throw new Error("Method not implemented.");
  }

  async allByLanguage(languageId: number): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}

const router = express.Router();
const userRepository = new FirestoreUserRepository(); // Usa la implementación concreta
const googleRepository = new GoogleRepository(userRepository);

// Middleware para verificar la autenticación
const verifyToken = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// Aplicar middleware en las rutas
router.use(verifyToken);

router.get("/events", async (req, res) => {
  const { date } = req.query;
  try {
    if (!date) {
      return res.status(400).json({ error: "Missing event date" });
    }
    const events = await googleRepository.getEventByDate(date as string);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

router.get("/events/:eventId/attendees", async (req, res) => {
  const { eventId } = req.params;
  console.log(`Request received for eventId: ${eventId}`);

  try {
    const attendees = await googleRepository.attendees(0, eventId);
    res.json(attendees);
  } catch (error) {
    console.error(`Error fetching attendees: ${error}`);
    res.status(500).json({ error: "Failed to fetch attendees" });
  }
});

// Endpoint para obtener eventos por fecha
router.get("/events", async (req, res) => {
  const { date } = req.query;
  try {
    if (!date) {
      return res.status(400).json({ error: "Missing event date" });
    }
    const events = await googleRepository.getEventByDate(date as string);
    res.json(events);
  } catch (error) {
    console.error(`Error fetching events: ${error}`);
  }
});

// Endpoint para obtener asistentes de un evento por eventId
router.get("/events/:eventId/attendees", async (req, res) => {
  const { eventId } = req.params;
  console.log(`Request received for eventId: ${eventId}`); // Log antes de cualquier operación

  try {
    console.log("Attempting to fetch attendees..."); // Log justo antes de llamar al repositorio
    const attendees = await googleRepository.attendees(0, eventId);
    console.log(`Attendees fetched: ${JSON.stringify(attendees)}`);
    res.json(attendees);
  } catch (error) {
    console.error(`Error fetching attendees: ${error}`);
  }
});

export default router;

// import express from "express";
// import { GoogleRepository } from "../repository/google.repository";
// import { addUser, fetchUsers } from "../services/firestoneOperations";
// import { UserAttendee, User } from "../models/business/User";
// import { Page } from "../models/business/Pagination";
// import { UserRepository } from "../repository/user.repository";
// import admin from "firebase-admin";  // Importación correcta de admin SDK

// // Inicialización del SDK de Firebase Admin (asegúrate de que ya está configurado)
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
// });

// // Implementación del FirestoreUserRepository que implementa la interfaz UserRepository
// class FirestoreUserRepository implements UserRepository {
//   async findUserByEmail(email: string): Promise<UserAttendee | undefined> {
//     const users = await fetchUsers();
//     const user = users.find((user) => user.email === email);

//     if (user) {
//       const userAttendee: UserAttendee = {
//         id: parseInt(user.id, 10), // Convertir a número si es necesario
//         firstName: user.name,
//         pictureUrl: user.picture,
//       };
//       return userAttendee;
//     }
//     return undefined;
//   }

//   // Métodos no implementados
//   async all(): Promise<User[]> { throw new Error("Method not implemented."); }
//   async page(page: number, pageSize: number): Promise<Page<User>> { throw new Error("Method not implemented."); }
//   async findUserById(id: number): Promise<User | undefined> { throw new Error("Method not implemented."); }
//   async findUserWithInfo(id: number): Promise<(User & any) | undefined> { throw new Error("Method not implemented."); }
//   async allPositions(): Promise<string[]> { throw new Error("Method not implemented."); }
//   async allByLanguage(languageId: number): Promise<User[]> { throw new Error("Method not implemented."); }
// }

// const router = express.Router();
// const userRepository = new FirestoreUserRepository();
// const googleRepository = new GoogleRepository(userRepository);

// // Middleware para verificar la autenticación
// const verifyToken = async (req: any, res: any, next: any) => {
//   const token = req.headers.authorization?.split('Bearer ')[1];

//   if (!token) {
//     return res.status(403).json({ message: 'No token provided' });
//   }

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token); // Usar admin aquí
//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     console.error("Error verifying token:", error);
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };

// // Aplicar middleware en todas las rutas que necesitan autenticación
// router.use(verifyToken);

// // Ruta para obtener eventos por fecha
// router.get("/events", async (req, res) => {
//   const { date } = req.query;
//   try {
//     if (!date) {
//       return res.status(400).json({ error: "Missing event date" });
//     }
//     const events = await googleRepository.getEventByDate(date as string);
//     res.json(events);
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
