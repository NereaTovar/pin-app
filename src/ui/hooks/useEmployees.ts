// import { useState, useEffect } from "react";

// interface Employee {
//   id: string;
//   name: string;
//   email: string;
//   department: string;
//   picture: string;
//   startDate: string;
// }

// const useEmployees = () => {
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const employeesResponse = await fetch('/src/resources/employees.json');
//         const employeesData = await employeesResponse.json();
//         const slackResponse = await fetch('/src/resources/slack.json');
//         const slackData = await slackResponse.json();

//         console.log('Fetched employees data:', employeesData);
//         console.log('Fetched slack data:', slackData);

//         const employeesArray = employeesData.Employees;
//         if (!Array.isArray(employeesArray)) {
//           throw new Error('Employees data is not an array');
//         }

//         const slackMembers = slackData.members;
//         if (!Array.isArray(slackMembers)) {
//           throw new Error('Slack members data is not an array');
//         }

//         const activeEmployees = employeesArray.filter((emp: any) => emp.Status === 'Active');

//         const mappedData = activeEmployees.map((emp: any, index: number) => {
//           const slackMember = slackMembers.find((member: any) => member.profile.email === emp.Email);

//           return {
//             id: index.toString(), // Usar el índice como ID ya que no hay un campo `id` en employees.json
//             name: `${emp["First name (legal)"]} ${emp["Last name (legal)"]}`,
//             email: emp.Email,
//             department: emp.Department,
//             picture: slackMember ? slackMember.profile.image_512 : '',
//             startDate: emp["Hire date"]
//           };
//         });

//         setEmployees(mappedData);
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   return { employees, loading };
// };

// export default useEmployees;

import { useState, useEffect } from "react";
import { differenceInYears, parse, isValid } from "date-fns";

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  picture: string;
  startDate: string;
  yearsInCompany: number;
}

const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesResponse = await fetch('/src/resources/employees.json');
        const employeesData = await employeesResponse.json();
        const slackResponse = await fetch('/src/resources/slack.json');
        const slackData = await slackResponse.json();

        console.log('Fetched employees data:', employeesData);
        console.log('Fetched slack data:', slackData);

        const employeesArray = employeesData.Employees;
        if (!Array.isArray(employeesArray)) {
          throw new Error('Employees data is not an array');
        }

        const slackMembers = slackData.members;
        if (!Array.isArray(slackMembers)) {
          throw new Error('Slack members data is not an array');
        }

        const activeEmployees = employeesArray.filter((emp: any) => emp.Status === 'Active');

        const mappedData = activeEmployees.map((emp: any, index: number) => {
          const slackMember = slackMembers.find((member: any) => member.profile.email === emp.Email);

          // Parse the hire date
          const hireDate = parse(emp["Hire date"], 'dd.MM.yyyy', new Date());
          console.log(`Parsed hire date for ${emp["First name (legal)"]} ${emp["Last name (legal)"]}:`, hireDate);

          // Verify if the parsed date is valid
          const yearsInCompany = isValid(hireDate) ? differenceInYears(new Date(), hireDate) : NaN;
          console.log(`Years in company for ${emp["First name (legal)"]} ${emp["Last name (legal)"]}:`, yearsInCompany);

          if (!isValid(hireDate)) {
            console.warn(`Invalid hire date for employee: ${emp["First name (legal)"]} ${emp["Last name (legal)"]}`);
          }

          return {
            id: index.toString(), // Usar el índice como ID ya que no hay un campo `id` en employees.json
            name: `${emp["First name (legal)"]} ${emp["Last name (legal)"]}`,
            email: emp.Email,
            department: emp.Department,
            picture: slackMember ? slackMember.profile.image_512 : '',
            startDate: emp["Hire date"],
            yearsInCompany,
          };
        });

        setEmployees(mappedData);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return { employees, loading };
};

export default useEmployees;
