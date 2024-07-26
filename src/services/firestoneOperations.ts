import {
  collection,
  doc,
  getDoc,
  addDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  picture: string;
  startDate: string;
  pins: Pin[];
}

interface Pin {
  type: string;
  date_hire: string;
  color: string;
  imagePin: string;
}

// Función para añadir o actualizar un usuario usando el correo electrónico como ID
export const addUser = async (user: User) => {
  try {
    const userRef = doc(db, "employees", user.email); // Usamos el correo electrónico como ID
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      // Si el documento existe, lo actualizamos
      await setDoc(userRef, user, { merge: true });
    } else {
      // Si el documento no existe, lo creamos
      await setDoc(userRef, user);
    }
    console.log("Usuario añadido o actualizado con éxito:", user.email);
  } catch (e) {
    console.error("Error añadiendo o actualizando documento:", e);
  }
};

// Función para obtener todos los usuarios
export const fetchUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "employees"));
  const users = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return users;
};

// Función para verificar si un pin ya está asignado a un empleado específico
export const isPinAssignedToEmployee = async (employeeId: string, pin: Pin) => {
  const docRef = doc(db, "users", employeeId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const userData = docSnap.data() as User;
    return userData.pins.some(
      (assignedPin) =>
        assignedPin.type === pin.type &&
        assignedPin.date_hire === pin.date_hire &&
        assignedPin.color === pin.color &&
        assignedPin.imagePin === pin.imagePin
    );
  } else {
    console.error("No such document!");
    return false;
  }
};
