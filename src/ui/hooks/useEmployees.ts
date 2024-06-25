import { useState, useEffect } from "react";

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  picture: string;
}

const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/src/resources/employees.json");
        const data = await response.json();

        const mappedData = data.map((employee: any) => ({
          id: employee.id.toString(),
          name: `${employee.data.first_name} ${employee.data.last_name}`,
          email: employee.data.email,
          department: employee.data.department_id,
          picture: employee.data.profile_picture_url,
        }));
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
