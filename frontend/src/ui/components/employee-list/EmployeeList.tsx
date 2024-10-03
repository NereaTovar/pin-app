import { useState } from "react";
import useEmployees from "../../hooks/useEmployees";
import "./EmployeeList.scss";
import EmployeePin from "../employee-pin/EmployeePin";
import { Pin } from "@/types/Pin";
import PinSummerEvent from "../pin/pin-summerEvent/PinSummerEvent";
import { getLastNameHelper } from "../../helpers/getLastNameHelper"; // Importa el helper para apellidos

const EmployeeList = () => {
  const { employees: originalEmployees, loading, assignPin } = useEmployees();
  const [searchTerm, setSearchTerm] = useState("");

  // Transforma los empleados originales para separar firstName y lastName
  const transformedEmployees = originalEmployees.map((employee) => {
    // Separamos el nombre en partes
    const nameParts = employee.name.split(" ");

    // Caso especial: si solo tiene dos palabras, usamos el primero como firstName y el segundo como lastName sin aplicar el helper
    if (nameParts.length === 2) {
      const [firstName, lastName] = nameParts;
      return {
        ...employee,
        firstName,
        lastName,
      };
    }

    // Capturamos todo el nombre hasta el último apellido
    const firstName = nameParts.slice(0, nameParts.length - 2).join(" ");
    // El apellido completo (últimas dos partes del nombre)
    const fullLastName = nameParts.slice(-2).join(" ");
    // Aplicamos el helper al apellido completo para obtener solo el primer apellido
    const lastName = getLastNameHelper(fullLastName);

    return {
      ...employee, // Copia los demás campos del empleado
      firstName, // Primer nombre completo
      lastName, // Primer apellido procesado
    };
  });

  // Función para asignar un nuevo pin a un empleado
  const handleAssignPin = (email: string, newPin: Pin) => {
    const employee = transformedEmployees.find((emp) => emp.email === email);
    if (employee) {
      // Comprueba si el pin ya está asignado
      if (!employee.pins.some((pin) => pin.type === newPin.type)) {
        assignPin(employee.id, newPin);
        console.log(`Pin "${newPin.pinTitle}" asignado a ${email}`);
      }
    }
  };

  // Muestra un mensaje de carga mientras se obtienen los empleados
  if (loading) {
    return <div>Loading...</div>;
  }

  // Muestra un mensaje si no se encuentran empleados
  if (transformedEmployees.length === 0) {
    return <div>No employees found</div>;
  }

  // Filtra los empleados basados en el término de búsqueda
  const filteredEmployees = transformedEmployees.filter((employee) =>
    `${employee.firstName} ${employee.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-container">
      <div className="employeeListContainer">
        <div className="employeeList__search">
          <input
            type="text"
            placeholder="Search employee"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <button
            onClick={() => setSearchTerm("")}
            className="employeeList__search-clear"
          >
            X
          </button>
        </div>
        <div className="employeeList">
          {filteredEmployees.map((employee) => {
            return (
              <div className="employeeList__item">
  {employee.picture ? (
    <img
      src={employee.picture}
      alt={`${employee.firstName} ${employee.lastName}`}
      className="employeeList__picture"
    />
  ) : (
    <div className="employeeList__picture--placeholder">
    </div>
  )}
  <div className="employeeList__details">
    <h2>
      <span>{employee.firstName}</span>
      <span>{employee.lastName}</span>
    </h2>
    <div className="employeeList__pin">
      <EmployeePin
        startDate={employee.startDate}
        department={employee.department}
        pins={employee.pins}
        yearsInCompany={employee.yearsInCompany}
      />
      <PinSummerEvent
        eventId="1518kfg0ull3ea2pce5dq8242p"
        employees={filteredEmployees}
        onAssignPins={handleAssignPin}
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
