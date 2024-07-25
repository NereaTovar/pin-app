// Función para convertir fechas en formato dd.mm.yyyy a yyyy-mm-dd
export const convertDateFormat = (dateString: string): string => {
  const [day, month, year] = dateString.split(".");
  return `${year}-${month}-${day}`;
};

// Función para calcular la antigüedad del empleado
export const calculateYears = (startDate: string): number => {
  const formattedDate = convertDateFormat(startDate);
  const start = new Date(formattedDate);
  if (isNaN(start.getTime())) {
    throw new Error(`Fecha no válida: ${startDate}`);
  }
  const now = new Date();
  return now.getFullYear() - start.getFullYear();
};

// Función para determinar el color del pin basado en la antigüedad
export const determineColor = (years: number): string => {
  if (years >= 5) return "#e8505B"; // Rojo para 5 años o más
  if (years >= 3) return "#f0ae5d"; // Naranja para 3-5 años
  return "#4dd699"; // Verde para menos de 3 años
};
