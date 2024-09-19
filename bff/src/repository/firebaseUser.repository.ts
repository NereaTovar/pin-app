import { User, LoggedInUser, UserAttendee } from '../models/business/User';
import { db } from '../config/firebaseConfig'; // Asegúrate de que tu Firebase esté configurado aquí
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { UserRepository } from './user.repository';


export class FirebaseUserRepository implements UserRepository {
  async all(): Promise<User[]> {
    const querySnapshot = await getDocs(collection(db, 'employees'));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as Omit<User, 'id'>;
      return { ...data, id: doc.id };
    });
  }

  async findUserByEmail(email: string): Promise<UserAttendee | undefined> {
    const docRef = doc(db, 'employees', email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as Omit<UserAttendee, 'id'>;
      return { ...data, id: docSnap.id }; 
    } else {
      return undefined;
    }
  }

  async findUserById(id: string): Promise<LoggedInUser | undefined> {
    const docRef = doc(db, 'employees', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as Omit<LoggedInUser, 'id'>;
      return { ...data, id: docSnap.id };
    } else {
      return undefined;
    }
  }

  async findUserWithInfo(id: string): Promise<(User & any) | undefined> {
    const docRef = doc(db, 'employees', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as User;
      return { ...data, id: docSnap.id }; 
    } else {
      return undefined;
    }
  }

//   async page(page: number, pageSize: number): Promise<Page<User>> {
//     const querySnapshot = await getDocs(collection(db, 'employees'));
//     const users = querySnapshot.docs.map((doc) => {
//       const data = doc.data() as Omit<User, 'id'>;
//       return { id: doc.id, ...data };
//     });
//     return {
//       items: users.slice((page - 1) * pageSize, page * pageSize),
//       total: users.length,
//     };
//   }

  async allPositions(): Promise<string[]> {
    const querySnapshot = await getDocs(collection(db, 'employees'));
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
    // Firebase-specific implementation can go here if you store languages
    return [];
  }
}