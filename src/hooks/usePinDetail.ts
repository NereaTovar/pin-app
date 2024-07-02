import { useMemo } from "react";

const usePinDetails = (startDate: string) => {
  const calculateYears = (startDate: string): number => {
    const start = new Date(startDate);
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
