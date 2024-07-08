// import PinAnniversary from "../pin/PinAnniversary";
// import usePinDetails from "@/hooks/usePinDetail";

// interface EmployeePinProps {
//   startDate: string;
// }

// const EmployeePin = ({ startDate }: EmployeePinProps) => {
//   const { years, color } = usePinDetails(startDate);

//   return (
//     <div>
//       <PinAnniversary number={years} color={color} />
//       <p>Years at the company: {years}</p>
//     </div>
//   );
// };

// export default EmployeePin;

import PinAnniversary from "../pin/PinAnniversary";
import usePinDetails from "@/hooks/usePinDetail";
import PinDepartment from "../pin/PinDepartment";

interface Pin {
  type: string;
  date: string;
  color: string;
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
      {/* <p>Department: {department}</p> */}
      <PinDepartment department={department} />
      {/* <p>Years at the company: {years}</p> */}
      {pins.map((pin, index) => (
        <div key={index} style={{ backgroundColor: pin.color }}>
          <p>
            {pin.type} - {pin.date}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EmployeePin;
