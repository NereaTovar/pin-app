// import { useState, useEffect } from "react";
// import {
//   collection,
//   getDocs,
//   doc,
//   getDoc,
//   updateDoc,
// } from "firebase/firestore";
// import { db } from "../../config/firebaseConfig";

// interface Pin {
//   type: string;
//   date_hire: string;
//   color: string;
//   imagePin: string;
// }

// interface Employee {
//   id: string;
//   name: string;
//   email: string;
//   department: string;
//   picture: string;
//   startDate: string;
//   yearsInCompany: number;
//   pins: Pin[];
// }

// const useEmployees = () => {
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       setLoading(true);
//       try {
//         // Verifica el token
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("Usuario no autenticado. Token no encontrado.");
//         }
//         console.log("Token used for Firestore request:", token);

//         const employeesCollection = collection(db, "employees");
//         const employeesSnapshot = await getDocs(employeesCollection);
//         const employeesList = employeesSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...(doc.data() as Omit<Employee, "id">),
//         }));
//         setEmployees(employeesList);
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   const assignPin = async (employeeId: string, pin: Pin): Promise<string> => {
//     try {
//       const employeeDocRef = doc(db, "employees", employeeId);
//       const employeeDoc = await getDoc(employeeDocRef);

//       if (!employeeDoc.exists()) {
//         console.error(`No document to update: ${employeeDocRef.path}`);
//         return "Error";
//       }

//       const employeeData = employeeDoc.data() as Employee;
//       const updatedPins = employeeData.pins
//         ? [...employeeData.pins, pin]
//         : [pin];
//       await updateDoc(employeeDocRef, { pins: updatedPins });

//       setEmployees((prev) =>
//         prev.map((employee) =>
//           employee.id === employeeId
//             ? { ...employee, pins: updatedPins }
//             : employee
//         )
//       );

//       return "Success";
//     } catch (error) {
//       console.error("Error assigning pin:", error);
//       return "Error";
//     }
//   };

//   return { employees, loading, assignPin };
// };

// export default useEmployees;

import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useAuth } from "../context/auth/Auth";

interface Pin {
  type: string;
  date_hire: string;
  color: string;
  imagePin: string;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  picture: string;
  startDate: string;
  yearsInCompany: number;
  pins: Pin[];
}

const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useAuth(); // Obtener el token del usuario autenticado

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!token) {
        console.error("Usuario no autenticado o token no encontrado");
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        console.log ("Token usado en fetchEmployees:", token)
        const employeesCollection = collection(db, "employees");
        const employeesSnapshot = await getDocs(employeesCollection);
        const employeesList = employeesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Employee, "id">),
        }));
        setEmployees(employeesList);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [token]);

  const assignPin = async (employeeId: string, pin: Pin): Promise<string> => {
    try {
      const employeeDocRef = doc(db, "employees", employeeId);
      const employeeDoc = await getDoc(employeeDocRef);

      if (!employeeDoc.exists()) {
        console.error(`No document to update: ${employeeDocRef.path}`);
        return "Error";
      }

      const employeeData = employeeDoc.data() as Employee;
      const updatedPins = employeeData.pins
        ? [...employeeData.pins, pin]
        : [pin];
      await updateDoc(employeeDocRef, { pins: updatedPins });

      setEmployees((prev) =>
        prev.map((employee) =>
          employee.id === employeeId
            ? { ...employee, pins: updatedPins }
            : employee
        )
      );

      return "Success";
    } catch (error) {
      console.error("Error assigning pin:", error);
      return "Error";
    }
  };

  return { employees, loading, assignPin };
};

export default useEmployees;
