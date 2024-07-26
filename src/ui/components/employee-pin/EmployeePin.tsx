import PinAnniversary from "../pin/pin-anniversary/PinAnniversary";
import PinDepartment from "../pin/pin-department/PinDepartment";
import usePinDetails from "@/hooks/usePinDetail";
import "./EmployeePin.scss";

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
  const { department, pins, yearsInCompany } = props;
  const { color } = usePinDetails(yearsInCompany);

  return (
    <div className="employeePin">
      <div className="pins">
        <div className="pin">
          <PinAnniversary number={yearsInCompany} color={color} />
        </div>
        <div className="pin">
          <PinDepartment department={department} />
        </div>
        {pins.map((pin, index) => {
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


