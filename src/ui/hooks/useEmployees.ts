import { useState, useEffect } from "react";

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  picture: string;
  startDate: string;
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

        const employees = employeesData;
        const slackMembers = slackData.members;

        if (!employees) {
          console.error('No employees found in employees data');
        } else {
          console.log('Employees:', employees);
        }

        if (!slackMembers) {
          console.error('No slack members found in slack data');
        } else {
          console.log('Slack members:', slackMembers);
        }

        const mappedData = employees.map((emp: any, index: number) => {
          console.log('Processing employee:', emp);

          const slackMember = slackMembers.find((member: any) => member.profile.email === emp.Email);

          if (!slackMember) {
            console.warn(`No slack member found for email: ${emp.Email}`);
          }

          return {
            id: index.toString(), // Usar el índice como ID ya que no hay un campo `id` en employees.json
            name: `${emp["First name (legal)"]} ${emp["Last name (legal)"]}`,
            email: emp.Email,
            department: emp.Department,
            picture: slackMember ? slackMember.profile.image_512 : '',
            startDate: emp["Hire date"]
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
