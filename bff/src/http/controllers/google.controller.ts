import { Request, Response } from "express";
import NodeCache from "node-cache";
import { GooglePrograms } from './google.programs';

type CacheKey = string;

export class GoogleController {
  private readonly googlePrograms: GooglePrograms;
  private readonly eventsCache: NodeCache;

  constructor(googlePrograms: GooglePrograms, eventsCache: NodeCache) {
    this.googlePrograms = googlePrograms;
    this.eventsCache = eventsCache;
  }

  public async events(_req: Request, res: Response) {
    try {
      const events = await this.googlePrograms.events();
      if (events.length > 0) {
        return res.json(events);
      }
      return res.status(404).json({ error: "No events found" });
    } catch (error) {
      return res.status(500).json({ error: "Error fetching events" });
    }
  }

  public async event(req: Request, res: Response) {
    const eventId = req.params.eventId;

    try {
      const event = await this.googlePrograms.event(eventId);
      if (event) {
        return res.json(event);
      }
      return res.status(404).json({ error: "Event not found" });
    } catch (error) {
      return res.status(500).json({ error: "Error fetching event" });
    }
  }

  public async attendees(req: Request, res: Response) {
    const eventId = req.params.eventId;
    const userId = 1; // Ajusta según sea necesario

    try {
      if (!eventId) {
        return res.status(400).json({ error: "Event ID is required" });
      }

      const cacheKey = this.calculateCacheKey(eventId);
      let attendees = this.eventsCache.get(cacheKey);

      if (!attendees) {
        attendees = await this.googlePrograms.attendees(userId, eventId);
        this.eventsCache.set(cacheKey, attendees);
      }

      if (attendees) {
        return res.json(attendees);
      }

      return res.status(404).json({ error: "Attendees not found" });
    } catch (error) {
      return res.status(500).json({
        error: "Error fetching attendees",
        message: error instanceof Error ? error.message : undefined,
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
  }

  private calculateCacheKey(eventId: string): CacheKey {
    return `attendees-${eventId}`;
  }
}
