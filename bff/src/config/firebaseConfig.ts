// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import * as dotenv from "dotenv";

// // Cargar las variables de entorno desde el archivo .env
// dotenv.config();

// // Tu configuración de Firebase
// const firebaseConfig = {
//   apiKey: process.env.VITE_FIREBASE_API_KEY,
//   authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.VITE_FIREBASE_APP_ID,
// };

// // Inicializa Firebase
// const app = initializeApp(firebaseConfig);

// // Inicializa Firestore
// const db = getFirestore(app);

// // Inicializa Firebase Authentication
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// export { db, auth, provider };


// import admin from 'firebase-admin';

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
// });

// const verifyToken = async (req: any, res: any, next: any) => {
//   const token = req.headers.authorization?.split('Bearer ')[1];

//   if (!token) {
//     return res.status(403).json({ message: 'No token provided' });
//   }

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token);
    
//     // Verificar si el dominio es correcto, si es necesario
//     if (decodedToken.hd !== 'rindus.de') {
//       return res.status(403).json({ message: 'Invalid domain' });
//     }

//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };

import admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import path from 'path';
import { Request, Response, NextFunction } from "express";


// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Inicializa la app de Firebase con el SDK de Admin usando credenciales específicas
admin.initializeApp({
  credential: admin.credential.cert(path.resolve(__dirname, 'path/to/your/serviceAccountKey.json')), 
  databaseURL: `https://${process.env.BFF_FIREBASE_PROJECT_ID}.firebaseio.com`,
});

const db = admin.firestore();
const auth = admin.auth();

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);

    // Verificar si el dominio es correcto, si es necesario
    if (decodedToken.hd !== 'rindus.de') {
      return res.status(403).json({ message: 'Invalid domain' });
    }

    req.user = decodedToken; // Agregar una propiedad `user` en `Request` con `DecodedIdToken`
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export { db, auth, verifyToken };
