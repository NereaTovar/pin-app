// import { useState, useEffect } from "react";
// import { differenceInYears, parse, isValid } from "date-fns";
// import {
//   collection,
//   getDocs,
//   doc,
//   updateDoc,
//   arrayUnion,
// } from "firebase/firestore";
// import { db } from "@/config/firebaseConfig";

// interface Pin {
//   type: string;
//   date: string;
//   color: string;
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
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const employeesResponse = await fetch("/src/resources/employees.json");
//         const employeesData = await employeesResponse.json();
//         const slackResponse = await fetch("/src/resources/slack.json");
//         const slackData = await slackResponse.json();

//         console.log("Fetched employees data:", employeesData);
//         console.log("Fetched slack data:", slackData);

//         const employeesArray = employeesData.Employees;
//         if (!Array.isArray(employeesArray)) {
//           throw new Error("Employees data is not an array");
//         }

//         const slackMembers = slackData.members;
//         if (!Array.isArray(slackMembers)) {
//           throw new Error("Slack members data is not an array");
//         }

//         const activeEmployees = employeesArray.filter(
//           (emp: any) => emp.Status === "Active"
//         );
//         console.log("Active employees:", activeEmployees);

//         const mappedData = await Promise.all(
//           activeEmployees.map(async (emp: any, index: number) => {
//             const slackMember = slackMembers.find(
//               (member: any) => member.profile.email === emp.Email
//             );

//             // Parse the hire date
//             const hireDate = parse(emp["Hire date"], "dd.MM.yyyy", new Date());
//             console.log(
//               `Parsed hire date for ${emp["First name (legal)"]} ${emp["Last name (legal)"]}:`,
//               hireDate
//             );

//             // Verify if the parsed date is valid
//             const yearsInCompany = isValid(hireDate)
//               ? differenceInYears(new Date(), hireDate)
//               : NaN;
//             console.log(
//               `Years in company for ${emp["First name (legal)"]} ${emp["Last name (legal)"]}:`,
//               yearsInCompany
//             );

//             if (!isValid(hireDate)) {
//               console.warn(
//                 `Invalid hire date for employee: ${emp["First name (legal)"]} ${emp["Last name (legal)"]}`
//               );
//             }

//             // Fetch pins from Firestore
//             const pinsCollection = collection(db, `employees/${index}/pins`);
//             const pinsDoc = await getDocs(pinsCollection);
//             const pinsData = pinsDoc.docs.map((doc) => doc.data() as Pin);

//             return {
//               id: index.toString(), // Usar el índice como ID ya que no hay un campo `id` en employees.json
//               name: `${emp["First name (legal)"]} ${emp["Last name (legal)"]}`,
//               email: emp.Email,
//               department: emp.Department,
//               picture: slackMember ? slackMember.profile.image_512 : "",
//               startDate: emp["Hire date"],
//               yearsInCompany,
//               pins: pinsData,
//             };
//           })
//         );

//         console.log("Mapped data:", mappedData);
//         setEmployees(mappedData);
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   const assignPin = async (employeeId: string, pin: Pin) => {
//     try {
//       const employeeDoc = doc(db, "employees", employeeId);
//       await updateDoc(employeeDoc, {
//         pins: arrayUnion(pin),
//       });
//       setEmployees((prevEmployees) =>
//         prevEmployees.map((emp) =>
//           emp.id === employeeId ? { ...emp, pins: [...emp.pins, pin] } : emp
//         )
//       );
//     } catch (error) {
//       console.error("Error assigning pin:", error);
//     }
//   };

//   return { employees, loading, assignPin };
// };

// export default useEmployees;

import { useState, useEffect } from "react";
import { differenceInYears, parse, isValid } from "date-fns";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

interface Pin {
  type: string;
  date_hire?: string;
  color_hire?: string;
  department?: string;
  color?: string;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesResponse = await fetch("/src/resources/employees.json");
        const employeesData = await employeesResponse.json();
        const slackResponse = await fetch("/src/resources/slack.json");
        const slackData = await slackResponse.json();

        console.log("Fetched employees data:", employeesData);
        console.log("Fetched slack data:", slackData);

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
        console.log("Active employees:", activeEmployees);

        const mappedData = await Promise.all(
          activeEmployees.map(async (emp: any) => {
            const slackMember = slackMembers.find(
              (member: any) => member.profile.email === emp.Email
            );

            // Parse the hire date
            const hireDate = parse(emp["Hire date"], "dd.MM.yyyy", new Date());
            console.log(
              `Parsed hire date for ${emp["First name (legal)"]} ${emp["Last name (legal)"]}:`,
              hireDate
            );

            // Verify if the parsed date is valid
            const yearsInCompany = isValid(hireDate)
              ? differenceInYears(new Date(), hireDate)
              : NaN;
            console.log(
              `Years in company for ${emp["First name (legal)"]} ${emp["Last name (legal)"]}:`,
              yearsInCompany
            );

            if (!isValid(hireDate)) {
              console.warn(
                `Invalid hire date for employee: ${emp["First name (legal)"]} ${emp["Last name (legal)"]}`
              );
            }

            // Fetch pins from Firestore
            const pinsCollection = collection(
              db,
              `employees/${emp.Email}/pins`
            );
            const pinsDoc = await getDocs(pinsCollection);
            const pinsData = pinsDoc.docs.map((doc) => {
              const pinData = doc.data();
              const pin: Pin = {
                type: pinData.type,
                date_hire: pinData.date_hire,
                color_hire: pinData.color_hire,
                department: pinData.department,
                color: pinData.color,
              };
              return pin;
            });

            return {
              id: emp.Email,
              name: `${emp["First name (legal)"]} ${emp["Last name (legal)"]}`,
              email: emp.Email,
              department: emp.Department,
              picture: slackMember ? slackMember.profile.image_512 : "",
              startDate: emp["Hire date"],
              yearsInCompany,
              pins: pinsData,
            };
          })
        );

        console.log("Mapped data:", mappedData);
        setEmployees(mappedData as Employee[]);
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
      const employeeDoc = doc(db, "employees", employeeEmail);
      await updateDoc(employeeDoc, {
        pins: arrayUnion(pin),
      });
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.email === employeeEmail
            ? { ...emp, pins: [...emp.pins, pin] }
            : emp
        )
      );
    } catch (error) {
      console.error("Error assigning pin:", error);
    }
  };

  return { employees, loading, assignPin };
};

export default useEmployees;
