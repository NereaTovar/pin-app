
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { Pin } from "src/types/Pin.ts"; // Asegúrate de importar la interfaz Pin

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

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      const employeesCollection = collection(db, "employees");
      const employeesSnapshot = await getDocs(employeesCollection);
      const employeesList = employeesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Employee, "id">), // Map the document data to Employee type
      }));
      setEmployees(employeesList);
      setLoading(false);
    };

    fetchEmployees();
  }, []);

  const assignPin = async (employeeId: string, pin: Pin) => {
    try {
      const employeeDocRef = doc(db, "employees", employeeId);
      const employeeDoc = await getDoc(employeeDocRef);

      if (!employeeDoc.exists()) {
        console.error(`No document to update: ${employeeDocRef.path}`);
        return "Error";
      }

      const employeeData = employeeDoc.data();
      if (employeeData && employeeData.pins) {
        const existingPin = employeeData.pins.find(
          (existingPin: Pin) => existingPin.type === pin.type
        );

        if (existingPin) {
          return "Pin already assigned";
        }

        const updatedPins = [...employeeData.pins, pin];
        await updateDoc(employeeDocRef, { pins: updatedPins });
        return "Success";
      } else {
        await updateDoc(employeeDocRef, { pins: [pin] });
        return "Success";
      }
    } catch (error) {
      console.error("Error assigning pin:", error);
      return "Error";
    }
  };

  return { employees, loading, assignPin };
};

export default useEmployees;
