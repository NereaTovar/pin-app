import PinAnniversary from "../pin/pin-anniversary/PinAnniversary";
import PinDepartment from "../pin/pin-department/PinDepartment";
import usePinDetails from "@/hooks/usePinDetail";

interface Pin {
  type: string;
  date_hire?: string;
  color_hire?: string;
  department?: string;
  color?: string;
  imagePin?: string;
}

interface EmployeePinProps {
  startDate: string;
  department: string;
  pins: Pin[];
  yearsInCompany: number;
}

const EmployeePin = (props: EmployeePinProps) => {
  const { startDate, department, pins, yearsInCompany } = props;
  const { color } = usePinDetails(yearsInCompany);

  return (
    <div className="employeePin">
      <PinAnniversary number={yearsInCompany} color={color} />
      <PinDepartment department={department} />
      <div className="pins">
        {pins.map((pin, index) => {
          // console.log(`Rendering pin:`, pin);
          return (
            <div key={index} className="pin">
              {pin.imagePin && <img src={pin.imagePin} alt={pin.type} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeePin;
