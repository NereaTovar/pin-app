import { useMemo } from "react";

// Función para convertir fechas en formato dd.MM.yyyy a yyyy-MM-dd
const convertDateFormat = (dateString: string): string => {
  const [day, month, year] = dateString.split('.');
  return `${year}-${month}-${day}`;
};

const usePinDetails = (startDate: string) => {
  const calculateYears = (startDate: string): number => {
    const formattedDate = convertDateFormat(startDate);
    const start = new Date(formattedDate);
    const now = new Date();
    return now.getFullYear() - start.getFullYear();
  };

  const determineColor = (years: number): string => {
    if (years >= 5) return "#ff4500"; // Rojo para 5 años o más
    if (years >= 3) return "#ff8c00"; // Naranja para 3-5 años
    return "#4dd699"; // Verde para menos de 3 años
  };

  const years = useMemo(() => calculateYears(startDate), [startDate]);
  const color = useMemo(() => determineColor(years), [years]);

  return { years, color };
};

export default usePinDetails;
