import { useMemo } from "react";

const determineColor = (years: number): string => {
  if (years >= 5) return "#ff4500"; // Rojo para 5 años o más
  if (years >= 3) return "#ff8c00"; // Naranja para 3-5 años
  return "#4dd699"; // Verde para menos de 3 años
};

const usePinDetails = (years: number) => {
  const color = useMemo(() => determineColor(years), [years]);
  return { years, color };
};

export default usePinDetails;
