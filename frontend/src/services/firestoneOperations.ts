import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";

interface Pin {
  type: string;
  date_hire?: string;
  color: string;
  imagePin: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  picture: string;
  startDate: string;
  pins: Pin[];
}

// Función para añadir o actualizar un usuario usando el correo electrónico como ID
export const addUser = async (user: User): Promise<void> => {
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
export const fetchUsers = async (): Promise<User[]> => {
  const querySnapshot = await getDocs(collection(db, "employees"));
  const users = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Omit<User, "id">; // Excluir 'id' de la data
    return {
      id: doc.id, // Añadir 'id' por separado para evitar sobrescritura
      ...data,
    };
  });
  return users;
};

// Función para verificar si un pin ya está asignado a un empleado específico
export const isPinAssignedToEmployee = async (employeeId: string, pin: Pin): Promise<boolean> => {
  const docRef = doc(db, "employees", employeeId);
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

// Función para asignar un pin a un empleado
export const assignPin = async (employeeId: string, pin: Pin): Promise<string> => {
  try {
    const employeeDocRef = doc(db, "employees", employeeId);
    const employeeDoc = await getDoc(employeeDocRef);

    if (!employeeDoc.exists()) {
      console.error(`No document to update: ${employeeDocRef.path}`);
      return "Error";
    }

    const employeeData = employeeDoc.data() as User;

    // Verificar si el pin ya está asignado al empleado
    const isPinAlreadyAssigned = employeeData.pins.some(
      (assignedPin) => assignedPin.type === pin.type
    );

    if (isPinAlreadyAssigned) {
      console.log(`Pin "${pin.type}" ya está asignado al empleado: ${employeeId}`);
      return "Pin already assigned";
    }

    // Agregar el pin si no está asignado
    const updatedPins = [...employeeData.pins, pin];
    await updateDoc(employeeDocRef, { pins: updatedPins });

    return "Success";
  } catch (error) {
    console.error("Error assigning pin:", error);
    return "Error";
  }
};

