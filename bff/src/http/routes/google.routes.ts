
import express from "express";
import { GoogleController } from "../controllers/google.controller";
import { GooglePrograms } from "../controllers/google.programs";
import { GoogleRepository } from "../../repository/google.repository";
import { EmployeeJsonRepository } from "../../repository/employeeJson.repository";

const router = express.Router();
const userRepository = new EmployeeJsonRepository(); 
const googleRepository = new GoogleRepository(userRepository);
const googlePrograms = new GooglePrograms(googleRepository);
const googleController = new GoogleController(googlePrograms, userRepository);


router.get("/events", (req, res) => googleController.events(req, res));
router.get("/events/:eventId", (req, res) => googleController.event(req, res));
router.get("/events/:eventId/attendees", (req, res) => googleController.attendees(req, res));

export default router;

