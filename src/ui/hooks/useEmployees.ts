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
        const employeesResponse = await fetch('/src/resources/employees.json');
        const employeesData = await employeesResponse.json();
        const slackResponse = await fetch('/src/resources/slack.json');
        const slackData = await slackResponse.json();

        console.log('Fetched employees data:', employeesData); 
        console.log('Fetched slack data:', slackData); 

        const employees = employeesData.data.items;
        const slackMembers = slackData.members;

        const mappedData = employees.map((emp: any) => {
          const slackMember = slackMembers.find((member: any) => member.profile.email === emp.data.email);
          return {
            id: emp.id.toString(),
            name: `${emp.data.first_name} ${emp.data.last_name}`,
            email: emp.data.email,
            department: emp.data.department_id,
            picture: slackMember ? slackMember.profile.image_512 : '', 
          };
        });

        console.log('Mapped data:', mappedData);
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
