// import PinAnniversary from "../pin/PinAnniversary";
// import usePinDetails from "@/hooks/usePinDetail";
// import PinDepartment from "../pin/PinDepartment";

// interface Pin {
//   type: string;
//   date: string;
//   color: string;
// }

// interface EmployeePinProps {
//   startDate: string;
//   department: string;
//   pins: Pin[];
// }

// const EmployeePin = ({ startDate, department, pins }: EmployeePinProps) => {
//   const { years, color } = usePinDetails(startDate);

//   return (
//     <div>
//       <PinAnniversary number={years} color={color} />
//       {/* <p>Department: {department}</p> */}
//       <PinDepartment department={department} />
//       {/* <p>Years at the company: {years}</p> */}
//       {pins.map((pin, index) => (
//         <div key={index} style={{ backgroundColor: pin.color }}>
//           <p>
//             {pin.type} - {pin.date}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default EmployeePin;
import PinAnniversary from "../pin/pin-anniversary/PinAnniversary";
import usePinDetails from "@/hooks/usePinDetail";
import PinDepartment from "../pin/pin-department/PinDepartment";

interface Pin {
  type: string;
  date_hire?: string;
  color_hire?: string;
  department?: string;
  color?: string;
}

interface EmployeePinProps {
  startDate: string;
  department: string;
  pins: Pin[];
}

const EmployeePin = ({ startDate, department, pins }: EmployeePinProps) => {
  const { years, color } = usePinDetails(startDate);

  return (
    <div>
      <PinAnniversary number={years} color={color} />
      <PinDepartment department={department} />
      {pins.map((pin, index) => (
        <div key={index} style={{ backgroundColor: pin.color || pin.color_hire }}>
          {pin.type === "Anniversary" && (
            <>
              <PinAnniversary number={years} color={pin.color_hire || color} />
              <p>
                {pin.type} - {pin.date_hire}
              </p>
            </>
          )}
          {pin.type === "Department" && (
            <>
              <PinDepartment department={pin.department || department} />
              <p>
                {pin.type} - {pin.department}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default EmployeePin;
