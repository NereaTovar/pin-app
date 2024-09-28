// import { useState, useEffect } from "react";
// import Tippy from "@tippyjs/react";
// import "tippy.js/dist/tippy.css";
// import "../../employee-pin/EmployeePin.scss";

// interface Pin {
//   id: string;
//   pinTitle?: string;
//   pinDescription?: string;
//   imagePin?: string;
//   eventDate?: string;
// }

// interface Attendee {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   pins?: Pin[]; // Añadimos un array de pins asignados a cada empleado
// }

// interface PinSummerEventProps {
//   eventId: string; // ID del SummerEvent
// }

// const PinSummerEvent = ({ eventId }: PinSummerEventProps) => {
//   const [attendees, setAttendees] = useState<Attendee[]>([]);

//   // Llamada específica para obtener asistentes del SummerEvent
//   const fetchSummerEventAttendees = async () => {
//     try {
//       const token = localStorage.getItem("authToken"); // Obtén el token de autenticación
//       const url = `/api/google/events/1518kfg0ull3ea2pce5dq8242p/attendees`; // URL específica del `summerEvent`
//       console.log("URL de fetch (SummerEvent):", url); // Log para verificar la URL

//       const response = await fetch(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         // Verificar si la respuesta no es correcta y mostrar detalles del error
//         console.error(
//           "Error en la respuesta del servidor (SummerEvent):",
//           response.status,
//           response.statusText
//         );
//         // Muestra el contenido completo de la respuesta (por ejemplo, HTML de error)
//         const errorText = await response.text();
//         console.error("Contenido de error:", errorText);
//         return;
//       }

//       // Verificar el tipo de contenido de la respuesta
//       const contentType = response.headers.get("content-type");
//       if (!contentType || !contentType.includes("application/json")) {
//         console.error("Respuesta no es JSON:", contentType);
//         const errorText = await response.text();
//         console.error("Contenido inesperado:", errorText);
//         return;
//       }

//       // Si todo está bien, intenta analizar como JSON
//       const attendeesData = await response.json();
//       console.log(
//         "Asistentes que respondieron sí (SummerEvent):",
//         attendeesData
//       );

//       if (Array.isArray(attendeesData)) {
//         // Actualizamos el estado con la lista de asistentes del SummerEvent
//         setAttendees(attendeesData);
//       } else {
//         console.warn(
//           "La respuesta de asistentes (SummerEvent) no es un array:",
//           attendeesData
//         );
//       }
//     } catch (error) {
//       console.error("Error al obtener el SummerEvent o los asistentes:", error);
//     }
//   };

//   // Hook para ejecutar el método del SummerEvent
//   useEffect(() => {
//     fetchSummerEventAttendees();
//   }, [eventId]);

//   return (
//     <div className="summerEvent">
//       {attendees.length > 0 ? (
//         attendees.map((employee, index) => (
//           <div key={index}>
//             <h3>{employee.email}</h3>
//             {employee.pins &&
//               employee.pins.map((pin, pinIndex) => (
//                 <Tippy key={pinIndex} content={pin.pinTitle} placement="top">
//                   <div className="pin">
//                     {pin.imagePin && (
//                       <img src={pin.imagePin} alt={pin.pinTitle} />
//                     )}
//                   </div>
//                 </Tippy>
//               ))}
//           </div>
//         ))
//       ) : (
//         <p>No se han asignado pines aún para el SummerEvent.</p>
//       )}
//     </div>
//   );
// };

// export default PinSummerEvent;
import { useState, useEffect } from "react";
import { Pin } from "../../../../types/Pin"; // Asegúrate de que estas rutas sean correctas
import { Employee } from "../../../../types/Employee";
import { doc, updateDoc, arrayUnion } from "firebase/firestore"; // Importa funciones de Firebase
import { db } from "../../../../config/firebaseConfig"; // Importa la configuración de Firebase

interface Attendee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pins?: Pin[]; // Añadimos un array de pins asignados a cada empleado
}

interface PinSummerEventProps {
  eventId: string; // ID del SummerEvent
  employees: Employee[]; // Lista de empleados para asignar el pin
  onAssignPins: (email: string, newPin: Pin) => void; // Función para asignar el pin a un empleado
}

const PinSummerEvent = ({ eventId, employees, onAssignPins }: PinSummerEventProps) => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  // Definimos el pin de Summer Event que queremos asignar
  const summerEventPin: Pin = {
    id: "summer_event_2024",
    pinTitle: "Summer Event 2024",
    pinDescription: "Pin for attending the Summer Event 2024.",
    imagePin: "/src/assets/pins/Summer_event24.svg", // Ruta de la imagen del pin
    eventDate: "2024-09-10", // Fecha del evento Summer Event
  };

  // Llamada específica para obtener asistentes del SummerEvent
  const fetchSummerEventAttendees = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Obtén el token de autenticación
      const url = `/api/google/events/1518kfg0ull3ea2pce5dq8242p/attendees`; // URL específica del `summerEvent`
      console.log("URL de fetch (SummerEvent):", url); // Log para verificar la URL

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Error en la respuesta del servidor (SummerEvent):", response.status, response.statusText);
        const errorText = await response.text();
        console.error("Contenido de error:", errorText);
        return;
      }

      const attendeesData = await response.json();
      console.log("Asistentes que respondieron sí (SummerEvent):", attendeesData);

      if (Array.isArray(attendeesData)) {
        // Actualizamos el estado con la lista de asistentes del SummerEvent
        setAttendees(attendeesData);
      } else {
        console.warn("La respuesta de asistentes (SummerEvent) no es un array:", attendeesData);
      }
    } catch (error) {
      console.error("Error al obtener el SummerEvent o los asistentes:", error);
    }
  };

  // Hook para ejecutar el método del SummerEvent
  useEffect(() => {
    fetchSummerEventAttendees();
  }, [eventId]);

  // Asigna el pin de Summer Event a los empleados que asistieron y actualiza Firebase
  useEffect(() => {
    const assignPinToEmployee = async (employeeEmail: string, pin: Pin) => {
      try {
        const employeeDocRef = doc(db, "employees", employeeEmail);
        await updateDoc(employeeDocRef, {
          pins: arrayUnion(pin), // Añade el pin al array de pins
        });
        console.log(`Pin de SummerEvent asignado a: ${employeeEmail}`);
      } catch (error) {
        console.error("Error asignando pin en Firebase:", error);
      }
    };

    if (attendees.length > 0) {
      attendees.forEach((attendee) => {
        const employee = employees.find((emp) => emp.email === attendee.email);
        if (employee && employee.email) { // Asegurarse de que employee.email no es undefined
          // Llamar a la función onAssignPins para asignar el pin a este empleado
          onAssignPins(employee.email, summerEventPin);
          // Asignar el pin en Firebase
          assignPinToEmployee(employee.email, summerEventPin);
        }
      });
    }
  }, [attendees, employees, onAssignPins]);

  return (
    <div className="summerEvent">
      {attendees.length > 0 ? (
        attendees.map((employee, index) => (
          <div key={index}>
            <h3>{employee.email}</h3>
          </div>
        ))
      ) : (
        <p>No se han asignado pines aún para el SummerEvent.</p>
      )}
    </div>
  );
};

export default PinSummerEvent;
