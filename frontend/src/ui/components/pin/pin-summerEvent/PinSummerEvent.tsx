import { useState, useEffect } from "react";
import { Pin } from "../../../../types/Pin";
import { Employee } from "../../../../types/Employee";

interface Attendee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pins?: Pin[]; 
}

interface PinSummerEventProps {
  eventId: string; 
  employees: Employee[]; 
  onAssignPins: (email: string, newPin: Pin) => void; 
}

const PinSummerEvent = ({
  eventId,
  employees,
  onAssignPins,
}: PinSummerEventProps) => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  // Definimos el pin de Summer Event que queremos asignar
  const summerEventPin: Pin = {
    type: "summer_event_2024",
    pinTitle: "Summer Event 2024",
    pinDescription: "Pin for attending the Summer Event 2024.",
    imagePin: "../../../../assets/pins/Summer_event24.svg", 
    eventDate: "2024-09-10", 
  };

  // Llamada para obtener asistentes del SummerEvent
  const fetchSummerEventAttendees = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("authToken no encontrado en localStorage");
        return;
      }

      const url = `/api/google/events/${eventId}/attendees`;

      console.log("URL de fetch (SummerEvent):", url); 

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Error en la respuesta del servidor:", response.status, response.statusText);
        return;
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Respuesta no es JSON:", contentType);
        return;
      }

      const attendeesData = await response.json();
      console.log("Asistentes que respondieron sí (SummerEvent):", attendeesData);

      if (Array.isArray(attendeesData)) {
        setAttendees(attendeesData);
      } else {
        console.warn("La respuesta de asistentes no es un array:", attendeesData);
      }
    } catch (error) {
      console.error("Error al obtener el SummerEvent o los asistentes:", error);
    }
  };

  // Ejecutar la llamada cuando cambie el eventId
  useEffect(() => {
    fetchSummerEventAttendees();
  }, [eventId]);

  // Asignar el pin solo a los empleados que están en la lista de asistentes
  useEffect(() => {
    const assignPinToAttendees = () => {
      attendees.forEach((attendee) => {
        const employee = employees.find((emp) => emp.email === attendee.email);
        if (employee && employee.email) {
          onAssignPins(employee.email, summerEventPin);
        }
      });
    };

    if (attendees.length > 0) {
      assignPinToAttendees();
    }
  }, [attendees, employees, onAssignPins]);

  return null; // No necesitas renderizar nada en este componente
};

export default PinSummerEvent;
