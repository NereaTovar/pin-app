import React from "react";
import useEmployees from "@/ui/hooks/useEmployees";
import EmployeePin from "@/ui/components/employee-pin/EmployeePin";
import "./EmployeeList.scss";

const EmployeeList: React.FC = () => {
  const { employees, loading } = useEmployees();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (employees.length === 0) {
    return <div>No employees found</div>;
  }

  return (
    <div className="employeeList">
      <div className="employeeList__container">
        {employees.map((employee) => {
          console.log(
            `Rendering employee: ${employee.name}, Years in company: ${employee.yearsInCompany}`
          );
          return (
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
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeList;
