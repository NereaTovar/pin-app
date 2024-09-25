// import { useState } from "react";
// import useEmployees from "@/ui/hooks/useEmployees";
// import "./EmployeeList.scss";
// import EmployeePin from "../employee-pin/EmployeePin";

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
//     <div className="main-container">
//       <div className="employeeListContainer">
//         <div className="employeeList__search">
//           <input
//             type="text"
//             placeholder="Search employee"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button
//             onClick={() => setSearchTerm("")}
//             className="employeeList__search-clear"
//           >
//             X
//           </button>
//         </div>
//         <div className="employeeList">
//           {filteredEmployees.map((employee) => (
//             <div key={employee.id} className="employeeList__item">
//               <img
//                 src={employee.picture}
//                 alt={employee.name}
//                 className="employeeList__picture"
//               />
//               <div className="employeeList__details">
//                 <h2>{employee.name}</h2>
//                 <div className="employeeList__pin">
//                   <EmployeePin
//                     startDate={employee.startDate}
//                     department={employee.department}
//                     pins={employee.pins}
//                     yearsInCompany={employee.yearsInCompany}
//                     eventDate={"2024-09-04"}  // O cualquier otra fecha dinámica o fija
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };



// export default EmployeeList;

import { useState } from "react";
import useEmployees from "../../hooks/useEmployees"; // Hook personalizado para obtener empleados
import "./EmployeeList.scss"; // Importa los estilos necesarios
import EmployeePin from "../employee-pin/EmployeePin"; // Importa el componente EmployeePin

const EmployeeList = () => {
  const { employees, loading } = useEmployees(); // Obtiene empleados y estado de carga
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  // Muestra un mensaje de carga mientras se obtienen los empleados
  if (loading) {
    return <div>Loading...</div>;
  }

  // Muestra un mensaje si no se encuentran empleados
  if (employees.length === 0) {
    return <div>No employees found</div>;
  }

  // Filtra los empleados basados en el término de búsqueda
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-container">
      <div className="employeeListContainer">
        {/* Barra de búsqueda */}
        <div className="employeeList__search">
          <input
            type="text"
            placeholder="Search employee"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
          />
          <button
            onClick={() => setSearchTerm("")} // Limpia el término de búsqueda
            className="employeeList__search-clear"
          >
            X
          </button>
        </div>
        {/* Lista de empleados filtrados */}
        <div className="employeeList">
          {filteredEmployees.map((employee) => {
            console.log("Pins asignados al empleado:", employee.name, employee.pins);
            return (
              <div key={employee.id} className="employeeList__item">
                <img
                  src={employee.picture} // Imagen del empleado
                  alt={employee.name}
                  className="employeeList__picture"
                />
                <div className="employeeList__details">
                  <h2>{employee.name}</h2>
                  <div className="employeeList__pin">
                    {/* Componente para mostrar los pines del empleado */}
                    <EmployeePin
                      startDate={employee.startDate}
                      department={employee.department}
                      pins={employee.pins} // Pines asignados al empleado
                      yearsInCompany={employee.yearsInCompany}
                      eventId="1518kfg0ull3ea2pce5dq8242p" // ID específico para el evento Summer Event
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;

