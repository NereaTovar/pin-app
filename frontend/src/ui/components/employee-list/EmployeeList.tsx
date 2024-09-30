import { useState} from "react";
import useEmployees from "../../hooks/useEmployees"; // Hook personalizado para obtener empleados
import "./EmployeeList.scss"; // Importa los estilos necesarios
import EmployeePin from "../employee-pin/EmployeePin"; // Importa el componente EmployeePin
import { Pin } from "@/types/Pin"; // Importa el tipo de Pin
import PinSummerEvent from "../pin/pin-summerEvent/PinSummerEvent"; // Importar el componente de asignación de pines

const EmployeeList = () => {
  const { employees, loading, assignPin } = useEmployees(); // Obtiene empleados, estado de carga y función para asignar pines
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  

  // Función para asignar un nuevo pin a un empleado
  const handleAssignPin = (email: string, newPin: Pin) => {
    const employee = employees.find((emp) => emp.email === email);
    if (employee) {
      // Comprueba si el pin ya está asignado
      if (!employee.pins.some((pin) => pin.type === newPin.type)) {
        assignPin(employee.id, newPin); // Llama a la función assignPin
        console.log(`Pin "${newPin.pinTitle}" asignado a ${email}`);
      }
    }
  };

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
                    />
                    {/* Agrega el componente PinSummerEvent para asignar pines automáticamente */}
                    <PinSummerEvent
                      eventId="1518kfg0ull3ea2pce5dq8242p" // ID específico para el evento Summer Event
                      employees={employees} // Pasa la lista de empleados
                      onAssignPins={handleAssignPin} // Pasar la función para asignar pines
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
