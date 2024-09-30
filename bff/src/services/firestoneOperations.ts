import { getFirestore, CollectionReference, DocumentReference } from 'firebase-admin/firestore';

// Obtén la instancia de Firestore desde firebase-admin
const firestore = getFirestore();

interface Pin {
  id: string;
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
    // Referencia al documento del usuario
    const userRef: DocumentReference = firestore.collection("employees").doc(user.email); 
    const docSnap = await userRef.get();

    if (docSnap.exists) {
      // Si el documento existe, lo actualizamos
      await userRef.set(user, { merge: true });
    } else {
      // Si el documento no existe, lo creamos
      await userRef.set(user);
    }
    console.log("Usuario añadido o actualizado con éxito:", user.email);
  } catch (e) {
    console.error("Error añadiendo o actualizando documento:", e);
  }
};

// Función para obtener todos los usuarios
export const fetchUsers = async (): Promise<User[]> => {
  // Referencia a la colección de empleados
  const employeesCollection: CollectionReference = firestore.collection("employees");
  const querySnapshot = await employeesCollection.get(); // Usamos .get() en lugar de getDocs()
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
export const isPinAssignedToEmployee = async (
  employeeId: string,
  pin: Pin
): Promise<boolean> => {
  const docRef: DocumentReference = firestore.collection("employees").doc(employeeId);
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    const userData = docSnap.data() as User;
    return userData.pins.some(
      (assignedPin) =>
        assignedPin.id === pin.id &&
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
export const assignPin = async (
  employeeId: string,
  pin: Pin
): Promise<string> => {
  try {
    const employeeDocRef: DocumentReference = firestore.collection("employees").doc(employeeId);
    const employeeDoc = await employeeDocRef.get();

    if (!employeeDoc.exists) {
      console.error(`No document to update: ${employeeDocRef.path}`);
      return "Error";
    }

    const employeeData = employeeDoc.data() as User;
    const updatedPins = employeeData.pins ? [...employeeData.pins, pin] : [pin];
    await employeeDocRef.update({ pins: updatedPins });

    return "Success";
  } catch (error) {
    console.error("Error assigning pin:", error);
    return "Error";
  }
};
