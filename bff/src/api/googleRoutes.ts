// import express from "express";
// import { GooglePrograms } from "../programs/google.programs";
// import { GoogleRepository } from "../repository/google.repository";
// import { FirebaseUserRepository } from "../repository/firebaseUser.repository"; // Cambiado a Firebase

// const router = express.Router();
// const userRepository = new FirebaseUserRepository(); // Usamos Firebase
// const googleRepository = new GoogleRepository(userRepository);
// const googlePrograms = new GooglePrograms(googleRepository);

// router.get("/events", async (req, res) => {
//   try {
//     console.log("Fetching events..."); // <-- Agregar aquí
//     const events = await googlePrograms.events();
//     console.log("Events fetched successfully:", events); // <-- Agregar aquí
//     res.json(events);
//   } catch (error) {
//     console.error("Error fetching events:", error); // <-- Verifica el error exacto aquí
//     res.status(500).json({ error: "Error fetching events" });
//   }
// });

// router.get("/events/:eventId", async (req, res) => {
//   const { eventId } = req.params;
//   try {
//     const event = await googlePrograms.event(eventId);
//     if (event) {
//       res.json(event);
//     } else {
//       res.status(404).json({ error: "Event not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching event" });
//   }
// });

// // router.get('/events/:eventId/attendees', async (req, res) => {
// //   const { eventId } = req.params;
// //   const userId = req.session?.userId || 1;
// //   try {
// //     const attendees = await googlePrograms.attendees(userId, eventId);
// //     if (attendees) {
// //       res.json(attendees);
// //     } else {
// //       res.status(404).json({ error: 'Attendees not found' });
// //     }
// //   } catch (error) {
// //     res.status(500).json({ error: 'Error fetching attendees' });
// //   }
// // });

// // router.get('/events/:eventId/attendees', async (req, res) => {
// //   const { eventId } = req.params;
// //   const userId = req.user?.id || 1; // O ajusta a cómo obtienes el `userId` en tu proyecto
// //   try {
// //     const attendees = await googlePrograms.attendees(userId, eventId);
// //     if (attendees) {
// //       res.json(attendees);
// //     } else {
// //       res.status(404).json({ error: 'Attendees not found' });
// //     }
// //   } catch (error) {
// //     res.status(500).json({ error: 'Error fetching attendees' });
// //   }
// // });
// router.get("/events/:eventId/attendees", async (req, res) => {
//   const { eventId } = req.params;
//   const userId = 1; // Usa un ID de usuario predeterminado para simplificar la prueba

//   try {
//     const attendees = await googlePrograms.attendees(userId, eventId);
//     if (attendees) {
//       res.json(attendees);
//     } else {
//       res.status(404).json({ error: "Attendees not found" });
//     }
//   } catch (error) {
//     console.error("Error fetching attendees:", error);

//     if (error instanceof Error) {
//       // Si el error es del tipo Error, devolvemos el mensaje y la pila de errores
//       res.status(500).json({
//         error: "Error fetching attendees",
//         message: error.message,
//         stack: error.stack,
//       });
//     } else {
//       // Para errores desconocidos, enviamos solo el error genérico
//       res.status(500).json({ error: "Unknown error fetching attendees" });
//     }
//   }
// });

// router.get("/attendees", async (req, res) => {
//   const eventId = req.query.eventId as string; // Toma el eventId desde la query string
//   const userId = 1; // Usa un ID de usuario predeterminado por ahora para simplificar la prueba
//   if (!eventId) {
//     return res.status(400).json({ error: "Event ID is required" });
//   }

//   try {
//     const attendees = await googlePrograms.attendees(userId, eventId);
//     if (attendees) {
//       res.json(attendees);
//     } else {
//       res.status(404).json({ error: "Attendees not found" });
//     }
//   } catch (error) {
//     console.error("Error fetching attendees:", error);
//     res.status(500).json({ error: "Error fetching attendees" });
//   }
// });

// export default router;

// import express from "express";
// import { GooglePrograms } from "../programs/google.programs";
// import { GoogleRepository } from "../repository/google.repository";
// import { FirebaseUserRepository } from "../repository/firebaseUser.repository";
// import NodeCache from "node-cache";
// import { GoogleController } from "@/http/controllers/google.controller";

// const router = express.Router();

// // Inicializa las dependencias
// const userRepository = new FirebaseUserRepository();
// const googleRepository = new GoogleRepository(userRepository);
// const googlePrograms = new GooglePrograms(googleRepository);
// const googleController = new GoogleController(googlePrograms, new NodeCache());

// // Define las rutas
// router.get("/events", (req, res) => googleController.events(req, res));
// router.get("/events/:eventId", (req, res) => googleController.event(req, res));
// router.get("/events/:eventId/attendees", (req, res) =>
//   googleController.attendees(req, res)
// );

// export default router;

