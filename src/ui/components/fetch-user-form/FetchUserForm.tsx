import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

const fetchUsers = async () => {
  const usersCollection = collection(db, "users");
  const userSnapshot = await getDocs(usersCollection);
  const users = userSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return users;
};

export default fetchUsers;
