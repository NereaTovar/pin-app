import { useState, useEffect } from "react";
import PinAnniversary from "../pin/pin-anniversary/PinAnniversary";
import PinDepartment from "../pin/pin-department/PinDepartment";
import usePinDetails from "@/hooks/usePinDetail";
import { automaticPins } from "@/mocks/automaticPins";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "./EmployeePin.scss";

interface Pin {
  type: string;
  date_hire?: string;
  color_hire?: string;
  department?: string;
  color?: string;
  imagePin?: string;
  eventDate?: string;
}

interface EmployeePinProps {
  startDate: string;
  department: string;
  pins: Pin[];
  yearsInCompany: number;
  eventDate?: string; // Fecha del evento (ej. "2024-09-04" para Pizza Day)
}

const EmployeePin = (props: EmployeePinProps) => {
  const { department, pins, yearsInCompany, eventDate } = props;
  const { color } = usePinDetails(yearsInCompany);
  const today = new Date();
  const [attendees, setAttendees] = useState<string[]>([]);

  interface Attendee {
    email: string;
  }

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        if (eventDate) {
          const response = await fetch(`/api/google/events?date=${eventDate}`);
          const events = await response.json();
          console.log("Eventos obtenidos:", events);

          if (events.length > 0) {
            const event = events[0];
            console.log("Evento seleccionado:", event);

            if (event.id) {
              const attendeeResponse = await fetch(
                `/api/google/events/${event.id}/attendees`
              );
              const attendees: Attendee[] = await attendeeResponse.json(); // Asegúrate de que el formato coincide con la respuesta
              console.log("Asistentes que respondieron sí:", attendees);
              setAttendees(attendees.map((att) => att.email));
            } else {
              console.warn("El evento no tiene ID:", event);
            }
          } else {
            console.warn("No se encontró ningún evento en esa fecha");
          }
        }
      } catch (error) {
        console.error("Error al obtener el evento o los asistentes:", error);
      }
    };

    fetchAttendees();
  }, [eventDate]);

  const autoAssignedPins = automaticPins.filter((pin) => {
    if (!pin.eventDate) return false;
    const eventDate = new Date(pin.eventDate);
    return eventDate < today;
  });

  const employeesWithPins = attendees.map((attendeeEmail) => {
    return {
      email: attendeeEmail,
      assignedPins: autoAssignedPins,
    };
  });

  return (
    <div className="employeePin">
      <div className="pins">
        {employeesWithPins.length > 0 ? (
          employeesWithPins.map((employee, index) => (
            <div key={index}>
              <h3>{employee.email}</h3>
              {employee.assignedPins.map((pin, pinIndex) => (
                <Tippy key={pinIndex} content={pin.pinTitle} placement="top">
                  <div className="pin">
                    {pin.imagePin && (
                      <img src={pin.imagePin} alt={pin.pinTitle} />
                    )}
                  </div>
                </Tippy>
              ))}
            </div>
          ))
        ) : (
          <p>No se han asignado pines aún.</p>
        )}

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
          <Tippy key={index} content={pin.type} placement="top">
            <div className="pin">
              {pin.imagePin && <img src={pin.imagePin} alt={pin.type} />}
            </div>
          </Tippy>
        ))}
      </div>
    </div>
  );
};

export default EmployeePin;
