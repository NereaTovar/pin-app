// import { Request, Response, NextFunction } from "express";
// import admin from "../config/firebaseAdmin";

// // Inicializa el SDK de Firebase Admin
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
// });

// export const verifyToken = async (req: any, res: any, next: any) => {
//   const token = req.headers.authorization?.split("Bearer ")[1];

//   if (!token) {
//     return res.status(403).json({ message: "No token provided" });
//   }

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     req.user = decodedToken; // Guarda el token decodificado en la solicitud
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: "Invalid token" });
//   }
// };
