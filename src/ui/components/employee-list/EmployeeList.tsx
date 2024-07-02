// import { useEffect, useState } from "react";
// import EmployeePin from "../employee-pin/EmployeePin";
// import fetchUsers from "../fetch-user-form/FetchUserForm";

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getUsers = async () => {
//       try {
//         const users = await fetchUsers();
//         console.log("Fetched users:", users);
//         setEmployees(users);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getUsers();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (employees.length === 0) {
//     return <div>No employees found</div>;
//   }

//   return (
//     <div className="employeeList">
//       <h1>Employee List</h1>
//       <div className="employeeList__container">
//         {employees.map((employee) => (
//           <div key={employee.id} className="employeeList__item">
//             <img
//               src={employee.picture}
//               alt={employee.name}
//               className="employeeList__picture"
//             />
//             <div className="employeeList__details">
//               <h2>{employee.name}</h2>
//               <p>{employee.email}</p>
//               <p>{employee.department}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EmployeeList;

import { useEffect, useState } from "react";
import EmployeePin from "../employee-pin/EmployeePin";
import fetchUsers from "../fetch-user-form/FetchUserForm";
import "./EmployeeList.scss";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchUsers();
        console.log("Fetched users:", users);
        setEmployees(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (employees.length === 0) {
    return <div>No employees found</div>;
  }

  return (
    <div className="employeeList">
     
      <div className="employeeList__container">
        {employees.map((employee) => (
          <div key={employee.id} className="employeeList__item">
            <img
              src={employee.picture}
              alt={employee.name}
              className="employeeList__picture"
            />
            <div className="employeeList__details">
              <h2>{employee.name}</h2>
              <p>{employee.email}</p>
              <p>{employee.department}</p>
              <div className="employeeList__pin">
                <EmployeePin startDate={employee.startDate} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
