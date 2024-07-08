// import { useState } from "react";
// import useEmployees from "@/ui/hooks/useEmployees";
// import EmployeePin from "@/ui/components/employee-pin/EmployeePin";
// import "./EmployeeList.scss";

// const EmployeeList = () => {
//   const { employees, loading } = useEmployees();
//   const [searchTerm, setSearchTerm] = useState("");

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (employees.length === 0) {
//     return <div>No employees found</div>;
//   }

//   const filteredEmployees = employees.filter((employee) =>
//     employee.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="employeeList">
//       <div className="employeeList__search">
//         <input
//           type="text"
//           placeholder="Search employee"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//       <div className="employeeList__container">
//         {filteredEmployees.map((employee) => (
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
//               <div className="employeeList__pin">
//                 <EmployeePin startDate={employee.startDate} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EmployeeList;

import { useState } from "react";
import useEmployees from "@/ui/hooks/useEmployees";
import EmployeePin from "@/ui/components/employee-pin/EmployeePin";
import "./EmployeeList.scss";

const EmployeeList = () => {
  const { employees, loading, assignPin } = useEmployees();
  const [searchTerm, setSearchTerm] = useState("");
  const [newPin, setNewPin] = useState({ type: "", date: "", color: "" });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (employees.length === 0) {
    return <div>No employees found</div>;
  }

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="employeeList">
      <div className="employeeList__search">
        <input
          type="text"
          placeholder="Search employee"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="employeeList__container">
        {filteredEmployees.map((employee) => (
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
                <EmployeePin
                  startDate={employee.startDate}
                  department={employee.department}
                  pins={employee.pins}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
