import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

const fetchUsers = async () => {
  try {
    const usersCollection = collection(db, "users");
    const userSnapshot = await getDocs(usersCollection);
    const users = userSnapshot.docs.map((doc) => ({
      id: doc.id,
      email: doc.data().email,
      name: doc.data().name,
      department: doc.data().department,
      picture: doc.data().picture,
      startDate: doc.data().startDate,
    }));
    return users;
  } catch (error) {
    console.error("Error fetching users from Firestore:", error);
    throw error;
  }
};

export default fetchUsers;
