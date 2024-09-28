import { User, LoggedInUser, UserAttendee } from '../models/business/User';
// Elimina esta línea ya que 'db' no se está utilizando.
// import { db } from '../config/firebaseConfig'; 
import { getFirestore, QuerySnapshot } from 'firebase-admin/firestore';
import { UserRepository } from './user.repository';

// Obtén la instancia de Firestore
const firestore = getFirestore();

export class FirebaseUserRepository implements UserRepository {
  async all(): Promise<User[]> {
    // Obtén la referencia de la colección usando firestore.collection()
    const employeesCollection = firestore.collection('employees');
    const querySnapshot: QuerySnapshot = await employeesCollection.get(); // Usamos .get() en lugar de getDocs()
    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as Omit<User, 'id'>;
      return { ...data, id: doc.id };
    });
  }

  async findUserByEmail(email: string): Promise<UserAttendee | undefined> {
    // Usa el método .doc() en la instancia de colección
    const docRef = firestore.collection('employees').doc(email);
    const docSnap = await docRef.get(); // Usamos .get() en lugar de getDoc()
    if (docSnap.exists) {
      const data = docSnap.data() as Omit<UserAttendee, 'id'>;
      return { ...data, id: docSnap.id };
    } else {
      return undefined;
    }
  }

  async findUserById(id: string): Promise<LoggedInUser | undefined> {
    const docRef = firestore.collection('employees').doc(id);
    const docSnap = await docRef.get(); // Usamos .get() en lugar de getDoc()
    if (docSnap.exists) {
      const data = docSnap.data() as Omit<LoggedInUser, 'id'>;
      return { ...data, id: docSnap.id };
    } else {
      return undefined;
    }
  }

  async findUserWithInfo(id: string): Promise<(User & any) | undefined> {
    const docRef = firestore.collection('employees').doc(id);
    const docSnap = await docRef.get(); // Usamos .get() en lugar de getDoc()
    if (docSnap.exists) {
      const data = docSnap.data() as User;
      return { ...data, id: docSnap.id };
    } else {
      return undefined;
    }
  }

  async allPositions(): Promise<string[]> {
    const employeesCollection = firestore.collection('employees');
    const querySnapshot: QuerySnapshot = await employeesCollection.get(); // Usamos .get() en lugar de getDocs()
    const positions = new Set<string>();
    querySnapshot.forEach((doc) => {
      const data = doc.data() as User;
      if (data.position) {
        positions.add(data.position);
      }
    });
    return Array.from(positions);
  }

  async allByLanguage(languageId: number): Promise<User[]> {
    // Implementación específica de Firebase si almacenas idiomas
    return [];
  }
}
