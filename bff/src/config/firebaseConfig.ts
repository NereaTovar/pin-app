import admin from "firebase-admin";
import * as dotenv from "dotenv";
import path from "path";
import { Request, Response, NextFunction } from "express";

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(
    path.resolve(__dirname, "path/to/your/serviceAccountKey.json")
  ),
  databaseURL: `https://${process.env.BFF_FIREBASE_PROJECT_ID}.firebaseio.com`,
});

const db = admin.firestore();
const auth = admin.auth();

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);

    if (decodedToken.hd !== "rindus.de") {
      return res.status(403).json({ message: "Invalid domain" });
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export { db, auth, verifyToken };
