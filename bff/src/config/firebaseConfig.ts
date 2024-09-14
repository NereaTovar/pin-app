import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import * as dotenv from "dotenv";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

// Inicializa Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };


// import * as admin from "firebase-admin";
// import serviceAccount from "./path-to-your-service-account.json"; // Asegúrate de reemplazar esto con el camino correcto a tu archivo JSON

// // Inicializa Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://your-project-id.firebaseio.com", // Reemplaza con tu URL de la base de datos
// });

// export { admin };
