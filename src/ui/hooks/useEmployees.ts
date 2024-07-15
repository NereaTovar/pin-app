import { useState, useEffect } from "react";
import { differenceInYears, parse, isValid } from "date-fns";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { createDepartmentPin } from "@/utils/departmentUtils";

interface Pin {
  type: string;
  date_hire?: string;
  color_hire?: string;
  department?: string;
  color?: string;
  imagePin?: string;
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

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesResponse = await fetch("/src/resources/employees.json");
        const employeesData = await employeesResponse.json();
        const slackResponse = await fetch("/src/resources/slack.json");
        const slackData = await slackResponse.json();

        const employeesArray = employeesData.Employees;
        if (!Array.isArray(employeesArray)) {
          throw new Error("Employees data is not an array");
        }

        const slackMembers = slackData.members;
        if (!Array.isArray(slackMembers)) {
          throw new Error("Slack members data is not an array");
        }

        const activeEmployees = employeesArray.filter(
          (emp: any) => emp.Status === "Active"
        );

        const mappedData = await Promise.all(
          activeEmployees.map(async (emp: any) => {
            const slackMember = slackMembers.find(
              (member: any) => member.profile.email === emp.Email
            );

            const hireDate = parse(emp["Hire date"], "dd.MM.yyyy", new Date());

            const yearsInCompany = isValid(hireDate)
              ? differenceInYears(new Date(), hireDate)
              : 0;

            // Obtener el documento del empleado desde Firestore
            const employeeDocRef = doc(db, "employees", emp.Email);
            const employeeDoc = await getDoc(employeeDocRef);
            if (!employeeDoc.exists()) {
              throw new Error(`No document found for employee ${emp.Email}`);
            }
            const employeeDataFromFirestore = employeeDoc.data() as Employee;

            // Obtener los pines desde el documento del empleado
            const pinsData = employeeDataFromFirestore.pins || [];

            // console.log(`Pins for ${emp.Email} from Firestore:`, pinsData);

            const employeeData: Employee = {
              id: emp.Email,
              name: `${emp["First name (legal)"]} ${emp["Last name (legal)"]}`,
              email: emp.Email,
              department: emp.Department,
              picture: slackMember ? slackMember.profile.image_512 : "",
              startDate: emp["Hire date"],
              yearsInCompany,
              pins: pinsData,
            };

            return employeeData;
          })
        );

        setEmployees(mappedData);
        // console.log("Mapped employees data:", mappedData);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const assignPin = async (employeeEmail: string, pin: Pin) => {
    try {
      console.log(
        "Updating Firestore for employee:",
        employeeEmail,
        "with pin:",
        pin
      );
      const employeeDocRef = doc(db, "employees", employeeEmail);
      await updateDoc(employeeDocRef, {
        pins: arrayUnion(pin),
      });
      console.log("Updating local state for employee:", employeeEmail);
      setEmployees((prevEmployees) => {
        const updatedEmployees = prevEmployees.map((emp) =>
          emp.email === employeeEmail
            ? { ...emp, pins: [...emp.pins, pin] }
            : emp
        );
        console.log("Updated employees:", updatedEmployees);
        return updatedEmployees;
      });
    } catch (error) {
      console.error("Error assigning pin:", error);
    }
  };

  return { employees, loading, assignPin };
};

export default useEmployees;
