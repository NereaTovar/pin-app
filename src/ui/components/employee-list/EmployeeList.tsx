import useEmployees from "@/ui/hooks/useEmployees";
import EmployeePin from "../employee-pin/EmployeePin";

const EmployeeList = () => {
  const { employees, loading } = useEmployees();

  console.log("Employees:", employees);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (employees.length === 0) {
    return <div>No employees found</div>;
  }

  return (
    <div>
      <h1>Employee List</h1>
      {employees.map((employee) => (
        <div
          key={employee.id}
          style={{
            marginBottom: "20px",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <h2>{employee.name}</h2>
          <p>{employee.email}</p>
          <p>{employee.department}</p>
          <img src={employee.picture} alt={employee.name} width="50" />
          <EmployeePin startDate={employee.startDate} />
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
