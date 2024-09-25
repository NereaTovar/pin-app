// import { useState, useEffect } from "react";
// import PinAnniversary from "../pin/pin-anniversary/PinAnniversary";
// import PinDepartment from "../pin/pin-department/PinDepartment";
// import usePinDetails from "@/hooks/usePinDetail";
// import { automaticPins } from "@/mocks/automaticPins";
// import Tippy from "@tippyjs/react";
// import "tippy.js/dist/tippy.css";
// import "./EmployeePin.scss";

// interface Pin {
//   id: string;
//   pinTitle?: string;
//   pinDescription?: string;
//   imagePin?: string;
//   eventDate?: string;
// }

// interface EmployeePinProps {
//   startDate: string;
//   department: string;
//   pins: Pin[];
//   yearsInCompany: number;
//   eventDate?: string; // Fecha del evento (ej. "2024-09-04" para Pizza Day)
// }

// interface Attendee {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   pins?: Pin[]; // Añadimos un array de pins asignados a cada empleado
// }

// const EmployeePin = (props: EmployeePinProps) => {
//   const { department, pins, yearsInCompany, eventDate } = props;
//   const { color } = usePinDetails(yearsInCompany);
//   const today = new Date();
//   const [attendees, setAttendees] = useState<Attendee[]>([]);

//   useEffect(() => {
//     const fetchAttendees = async () => {
//       try {
//         if (eventDate) {
//           const token = localStorage.getItem("authToken"); // Obtén el token de autenticación
//           const url = `/api/google/events?date=${eventDate}`;
//           console.log("URL de fetch:", url);
//           const response = await fetch(url, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           if (!response.ok) {
//             // Si la respuesta no es OK, loguea el mensaje de error y el texto de respuesta
//             console.error(
//               "Error en la respuesta del fetch:",
//               response.statusText
//             );
//             const errorText = await response.text(); // Intenta leer el texto de la respuesta
//             console.error("Texto de error:", errorText);
//             return;
//           }

//           const events = await response.json();
//           console.log("Eventos obtenidos:", events);

//           if (events.length > 0) {
//             const event = events[0];
//             console.log("Evento seleccionado:", event);

//             if (event.id) {
//               const attendeeResponse = await fetch(
//                 `/api/google/events/${event.id}/attendees`,
//                 {
//                   headers: {
//                     Authorization: `Bearer ${token}`,
//                   },
//                 }
//               );

//               if (!attendeeResponse.ok) {
//                 // Si la respuesta no es OK, loguea el mensaje de error y el texto de respuesta
//                 console.error(
//                   "Error en la respuesta del fetch de attendees:",
//                   attendeeResponse.statusText
//                 );
//                 const errorText = await attendeeResponse.text();
//                 console.error("Texto de error:", errorText);
//                 return;
//               }

//               const attendeesData = await attendeeResponse.json();
//               console.log("Asistentes que respondieron sí:", attendeesData);

//               if (Array.isArray(attendeesData)) {
//                 // Actualizamos el estado con la lista de asistentes
//                 setAttendees(attendeesData);
//               } else {
//                 console.warn(
//                   "La respuesta de asistentes no es un array:",
//                   attendeesData
//                 );
//               }
//             } else {
//               console.warn("El evento no tiene ID:", event);
//             }
//           } else {
//             console.warn("No se encontró ningún evento en esa fecha");
//           }
//         }
//       } catch (error) {
//         console.error("Error al obtener el evento o los asistentes:", error);
//       }
//     };

//     fetchAttendees();
//   }, [eventDate]);

//   // Filtramos los pines automáticos que deben asignarse después de la fecha de hoy
//   const autoAssignedPins = automaticPins.filter((pin) => {
//     if (!pin.eventDate) return false;
//     const eventDate = new Date(pin.eventDate);
//     return eventDate < today;
//   });

//   return (
//     <div className="employeePin">
//       <div className="pins">
//         {attendees.length > 0 ? (
//           attendees.map((employee, index) => (
//             <div key={index}>
//               <h3>{employee.email}</h3>
//               {autoAssignedPins.map((pin, pinIndex) => (
//                 <Tippy key={pinIndex} content={pin.pinTitle} placement="top">
//                   <div className="pin">
//                     {pin.imagePin && (
//                       <img src={pin.imagePin} alt={pin.pinTitle} />
//                     )}
//                   </div>
//                 </Tippy>
//               ))}
//             </div>
//           ))
//         ) : (
//           <p>No se han asignado pines aún.</p>
//         )}

//         {/* Pines fijos como Anniversary y Department */}
//         <Tippy content="Anniversary" placement="top">
//           <div className="pin">
//             <PinAnniversary
//               number={yearsInCompany}
//               color={color}
//               type="Anniversary"
//             />
//           </div>
//         </Tippy>
//         <Tippy content="Department" placement="top">
//           <div className="pin">
//             <PinDepartment department={department} type="Department" />
//           </div>
//         </Tippy>
//         {pins.map((pin, index) => (
//           <Tippy key={index} content={pin.id} placement="top">
//             <div className="pin">
//               {pin.imagePin && <img src={pin.imagePin} alt={pin.id} />}
//             </div>
//           </Tippy>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EmployeePin;

import PinAnniversary from "../pin/pin-anniversary/PinAnniversary";
import PinDepartment from "../pin/pin-department/PinDepartment";
import usePinDetails from "../../../hooks/usePinDetail";
// import { automaticPins } from "@/mocks/automaticPins";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "./EmployeePin.scss";
import PinSummerEvent from "../pin/pin-summerEvent/PinSummerEvent";

interface Pin {
  id: string;
  pinTitle?: string;
  pinDescription?: string;
  imagePin?: string;
  eventDate?: string;
}

interface EmployeePinProps {
  startDate: string;
  department: string;
  pins: Pin[];
  yearsInCompany: number;
  eventId?: string; // ID del evento opcional para casos específicos
}

const EmployeePin = (props: EmployeePinProps) => {
  const { department, pins, yearsInCompany, eventId } = props;
  const { color } = usePinDetails(yearsInCompany);
  // const today = new Date();

  // Filtramos los pines automáticos que deben asignarse después de la fecha de hoy
  // const autoAssignedPins = automaticPins.filter((pin) => {
  //   if (!pin.eventDate) return false;
  //   const eventDate = new Date(pin.eventDate);
  //   return eventDate < today;
  // });

  return (
    <div className="employeePin">
      <div className="pins">
        {/* Mostrar asistentes del SummerEvent si se proporciona el eventId */}
        {eventId && <PinSummerEvent eventId={eventId} />}

        {/* Pines fijos como Anniversary y Department */}
        <Tippy content="Anniversary" placement="top">
          <div className="pin">
            <PinAnniversary
              number={yearsInCompany}
              color={color}
              type="Anniversary"
            />
          </div>
        </Tippy>
        <Tippy content="Department" placement="top">
          <div className="pin">
            <PinDepartment department={department} type="Department" />
          </div>
        </Tippy>
        {pins.map((pin, index) => (
          <Tippy key={index} content={pin.id} placement="top">
            <div className="pin">
              {pin.imagePin && <img src={pin.imagePin} alt={pin.id} />}
            </div>
          </Tippy>
        ))}
      </div>
    </div>
  );
};

export default EmployeePin;
