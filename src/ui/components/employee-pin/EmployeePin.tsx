import PinAnniversary from "../pin/pin-anniversary/PinAnniversary";
import PinDepartment from "../pin/pin-department/PinDepartment";
import usePinDetails from "@/hooks/usePinDetail";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
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
        <Tippy content="Anniversary" placement="top">
          <div className="pin">
            <PinAnniversary number={yearsInCompany} color={color} type="Anniversary" />
          </div>
        </Tippy>
        <Tippy content="Department" placement="top">
          <div className="pin">
            <PinDepartment department={department} type="Department" />
          </div>
        </Tippy>
        {pins.map((pin, index) => {
          return (
            <Tippy key={index} content={pin.type} placement="top">
              <div className="pin">
                {pin.imagePin && <img src={pin.imagePin} alt={pin.type} />}
              </div>
            </Tippy>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeePin;
