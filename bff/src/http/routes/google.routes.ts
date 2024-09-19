// import express from "express";
// import { GoogleController } from "../controllers/google.controller";
// import { GooglePrograms } from "../controllers/google.programs";
// import { GoogleRepository } from "../../repository/google.repository";
// import NodeCache from "node-cache";
// import { FirebaseUserRepository } from "../../repository/firebaseUser.repository";

// // Inicializa las dependencias
// const router = express.Router();
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

import express from "express";
import { GoogleController } from "../controllers/google.controller";
import { GooglePrograms } from "../controllers/google.programs";
import { GoogleRepository } from "../../repository/google.repository";
import { SimulatedUserRepository } from "../../repository/simulatedUser.repository"; // Asegúrate de importar aquí
import NodeCache from "node-cache";

// Inicializa las dependencias
const router = express.Router();
const userRepository = new SimulatedUserRepository(); // Usar SimulatedUserRepository
const googleRepository = new GoogleRepository(userRepository);
const googlePrograms = new GooglePrograms(googleRepository);
const googleController = new GoogleController(googlePrograms, new NodeCache());

// Define las rutas
router.get("/events", (req, res) => googleController.events(req, res));
router.get("/events/:eventId", (req, res) => googleController.event(req, res));
router.get("/events/:eventId/attendees", (req, res) =>
  googleController.attendees(req, res)
);

export default router;


