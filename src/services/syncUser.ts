import { collection, getDocs, addDoc, setDoc, doc } from "firebase/firestore";
import employeesData from "src/resources/employees.json";
import slackData from "src/resources/slack.json";
import { db } from "@/config/firebaseConfig";
import { calculateYears, determineColor } from "@/utils/dateUtils";

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

    const employees = employeesData.Employees;
    const slackMembers = slackData.members;

       // Filtrar empleados activos y eliminar duplicados por email
    const activeEmployees = employees.filter(
      (emp: any) => emp.Status === "Active"
    );

    // Crear un Map para eliminar duplicados
    const employeeMap = new Map();
    activeEmployees.forEach((emp: any) => {
      employeeMap.set(emp.Email, emp);
    });
    const uniqueEmployees = Array.from(employeeMap.values());

    const usersToAdd = uniqueEmployees
      .map((emp: any): User | null => {
        const slackMember = slackMembers.find(
          (member: any) => member.profile.email === emp.Email
        );
        const startDate = emp["Hire date"];
        let years;

        try {
          console.log(
            `Processing employee: ${emp.Email}, Hire date: ${startDate}`
          );
          years = calculateYears(startDate);
        } catch (error) {
          console.error(`Error calculando años para ${emp.Email}:`);
          // Excluir al empleado de la lista si la fecha es inválida
          return null;
        }

        if (!emp.Department) {
          console.error(
            `Departamento no definido para el empleado: ${emp.Email}`
          );
          // Excluir al empleado de la lista si no tiene departamento
          return null;
        }

        const color = determineColor(years);

        return {
          id: emp.Email, // Usar el email como ID ya que es único
          name: `${emp["First name (legal)"]} ${emp["Last name (legal)"]}`,
          email: emp.Email,
          department: emp.Department,
          picture: slackMember ? slackMember.profile.image_512 : "",
          startDate: emp["Hire date"],
          pins: [{ number: years, color }],
        };
      })
      .filter((user): user is User => user !== null); // Filtrar usuarios nulos que tienen fechas no válidas o departamentos no definidos

    console.log("Users to add:", usersToAdd);

    for (const user of usersToAdd) {
      const existingUser = existingUsers.find((u) => u.email === user.email);

      if (existingUser) {
        // Si el usuario ya existe, actualízalo
        const userDoc = doc(db, "users", existingUser.id);
        await setDoc(userDoc, user);
        // console.log(`User updated: ${user.email}`);
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

