// import { collection, getDocs, addDoc, setDoc, doc } from "firebase/firestore";
// import employeesData from "../resources/employees.json";
// import slackData from "../resources/slack.json";
// import { db } from "@/config/firebaseConfig";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   department: string;
//   picture: string;
//   startDate: string;
//   pins:{ number: number; color: string }[];
// }

// const syncUsers = async () => {
//   try {
//     const usersCollection = collection(db, "users");

//     // Obtener todos los documentos actuales de la colección de usuarios
//     const existingUsersSnapshot = await getDocs(usersCollection);
//     const existingUsers = existingUsersSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     })) as User[];

//     const employees = employeesData;
//     const slackMembers = slackData.members;

//     console.log("Employees data:", employees);
//     console.log("Slack members:", slackMembers);

//     const usersToAdd = employees.map((emp: any, index: number): User => {
//       const slackMember = slackMembers.find(
//         (member: any) => member.profile.email === emp.Email
//       );
//       return {
//         id: index.toString(), // Usar el índice como ID ya que no hay un campo `id` en employees.json
//         name: `${emp["First name (legal)"]} ${emp["Last name (legal)"]}`,
//         email: emp.Email,
//         department: emp.Department,
//         picture: slackMember ? slackMember.profile.image_512 : "",
//         startDate: emp["Hire date"],
//         pins: [],
//       };
//     });

//     console.log("Users to add:", usersToAdd);

//     for (const user of usersToAdd) {
//       const existingUser = existingUsers.find((u) => u.email === user.email);

//       if (existingUser) {
//         // Si el usuario ya existe, actualízalo
//         const userDoc = doc(db, "users", existingUser.id);
//         await setDoc(userDoc, user);
//         console.log(`User updated: ${user.email}`);
//       } else {
//         // Si el usuario no existe, añádelo
//         await addDoc(usersCollection, user);
//         console.log(`User added: ${user.email}`);
//       }
//     }
//     console.log("Users synchronized successfully");
//   } catch (error) {
//     console.error("Error synchronizing users:", error);
//   }
// };

// export default syncUsers;

import { collection, getDocs, addDoc, setDoc, doc } from "firebase/firestore";
import employeesData from "../resources/employees.json";
import slackData from "../resources/slack.json";
import { db } from "@/config/firebaseConfig";

// Función para calcular la antigüedad del empleado
const calculateYears = (startDate: string): number => {
  const start = new Date(startDate);
  const now = new Date();
  return now.getFullYear() - start.getFullYear();
};

// Función para determinar el color del pin basado en la antigüedad
const determineColor = (years: number): string => {
  if (years >= 5) return "#ff4500"; // Rojo para 5 años o más
  if (years >= 3) return "#ff8c00"; // Naranja para 3-5 años
  return "#4dd699"; // Verde para menos de 3 años
};

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  picture: string;
  startDate: string;
  pins: { number: number; color: string }[];
}

const syncUsers = async () => {
  try {
    const usersCollection = collection(db, "users");

    // Obtener todos los documentos actuales de la colección de usuarios
    const existingUsersSnapshot = await getDocs(usersCollection);
    const existingUsers = existingUsersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];

    const employees = employeesData;
    const slackMembers = slackData.members;

    console.log("Employees data:", employees);
    console.log("Slack members:", slackMembers);

    // Filtrar empleados activos
    const activeEmployees = employees.filter(
      (emp: any) => emp.Status === "Active"
    );

    const usersToAdd = activeEmployees.map((emp: any, index: number): User => {
      const slackMember = slackMembers.find(
        (member: any) => member.profile.email === emp.Email
      );
      const startDate = emp["Hire date"];
      const years = calculateYears(startDate);
      const color = determineColor(years);

      return {
        id: index.toString(), // Usar el índice como ID ya que no hay un campo `id` en employees.json
        name: `${emp["First name (legal)"]} ${emp["Last name (legal)"]}`,
        email: emp.Email,
        department: emp.Department,
        picture: slackMember ? slackMember.profile.image_512 : "",
        startDate: emp["Hire date"],
        pins: [{ number: years, color }],
      };
    });

    console.log("Users to add:", usersToAdd);

    for (const user of usersToAdd) {
      const existingUser = existingUsers.find((u) => u.email === user.email);

      if (existingUser) {
        // Si el usuario ya existe, actualízalo
        const userDoc = doc(db, "users", existingUser.id);
        await setDoc(userDoc, user);
        console.log(`User updated: ${user.email}`);
      } else {
        // Si el usuario no existe, añádelo
        await addDoc(usersCollection, user);
        console.log(`User added: ${user.email}`);
      }
    }
    console.log("Users synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing users:", error);
  }
};

export default syncUsers;
