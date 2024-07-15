import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  picture: string;
  startDate: string;
  pins: string[];
}

// Función para añadir un usuario
export const addUser = async (user: User) => {
  try {
    const docRef = await addDoc(collection(db, "users"), user);
    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Función para obtener todos los usuarios
export const fetchUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return users;
};
