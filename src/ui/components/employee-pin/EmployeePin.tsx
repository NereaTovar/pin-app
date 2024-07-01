import PinAnniversary from "../pin/PinAnniversary";

// Función para calcular la antigüedad del empleado
const calculateYears = (startDate: string): number => {
  const start = new Date(startDate);
  const now = new Date();
  return now.getFullYear() - start.getFullYear();
};

// Función para determinar el color del pin basado en la antigüedad
const determineColor = (years: number): string => {
  if (years >= 5) return "#ff4500"; // Rojo para 5 años o más
  if (years >= 3) return "#ff8c00"; // Naranja para 3-5 años
  return "#4dd699"; // Verde para menos de 3 años
};

interface EmployeePinProps {
  startDate: string;
}

const EmployeePin = ({ startDate }: EmployeePinProps) => {
  const years = calculateYears(startDate);
  const color = determineColor(years);

  return (
    <div>
      <PinAnniversary number={years} color={color} />
      <p>Years at the company: {years}</p>
    </div>
  );
};

export default EmployeePin;
