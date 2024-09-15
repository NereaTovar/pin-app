
import express from 'express';
import { GooglePrograms } from '../programs/google.programs';
import { GoogleRepository } from '../repository/google.repository';
import { FirebaseUserRepository } from '../repository/firebaseUser.repository'; // Cambiado a Firebase


const router = express.Router();
const userRepository = new FirebaseUserRepository(); // Usamos Firebase
const googleRepository = new GoogleRepository(userRepository);
const googlePrograms = new GooglePrograms(googleRepository);

router.get('/events', async (req, res) => {
  try {
    const events = await googlePrograms.events();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching events' });
  }
});

router.get('/events/:eventId', async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await googlePrograms.event(eventId);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching event' });
  }
});

// router.get('/events/:eventId/attendees', async (req, res) => {
//   const { eventId } = req.params;
//   const userId = req.session?.userId || 1;
//   try {
//     const attendees = await googlePrograms.attendees(userId, eventId);
//     if (attendees) {
//       res.json(attendees);
//     } else {
//       res.status(404).json({ error: 'Attendees not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching attendees' });
//   }
// });

router.get('/events/:eventId/attendees', async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user?.id || 1; // O ajusta a cómo obtienes el `userId` en tu proyecto
  try {
    const attendees = await googlePrograms.attendees(userId, eventId);
    if (attendees) {
      res.json(attendees);
    } else {
      res.status(404).json({ error: 'Attendees not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching attendees' });
  }
});


export default router;
