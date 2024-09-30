import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

const fetchUsers = async () => {
  try {
    const usersCollection = collection(db, "employees");
    const userSnapshot = await getDocs(usersCollection);
    const users = userSnapshot.docs.map((doc) => {
      const data = doc.data();
      // console.log(`Fetching data for user: ${data.email}`);
      // console.log("User data:", data);
      if (Array.isArray(data.pins)) {
        //@ts-ignore
        data.pins.forEach((pin, index) => {
          // console.log(`Pin ${index}:`, pin);
        });
      } else {
        console.log("No pins found or pins is not an array");
      }
      return {
        id: doc.id,
        email: data.email,
        name: data.name,
        department: data.department,
        picture: data.picture,
        startDate: data.startDate,
        pins: data.pins,
      };
    });
    return users;
  } catch (error) {
    console.error("Error fetching users from Firestore:", error);
    throw error;
  }
};

export default fetchUsers;
