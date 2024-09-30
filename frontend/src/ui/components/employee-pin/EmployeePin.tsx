import PinAnniversary from "../pin/pin-anniversary/PinAnniversary";
import PinDepartment from "../pin/pin-department/PinDepartment";
import usePinDetails from "../../../hooks/usePinDetail";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "./EmployeePin.scss";
import SuperReferralPin from "../pin/pin-superReferral/PinSuperReferral";
import TopPickerPin from "../pin/pin-topPicker/PinTopPicker";
import { Pin } from "@/types/Pin";

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
        {/* Renderizado condicional de pines personalizados */}
        {pins.map((pin, index) => {
          if (pin.type === "super_referral") {
            return (
              <div className="pin" key={index}>
                <SuperReferralPin type="SuperReferral" />
              </div>
            );
          } else if (pin.type === "top_picker") {
            return (
              <div className="pin" key={index}>
                <TopPickerPin type="TopPicker" />
              </div>
            );
          } else {
            return (
              <Tippy key={index} content={pin.pinTitle} placement="top">
                <div className="pin">
                  {pin.imagePin && <img src={pin.imagePin} alt={pin.pinTitle} />}
                </div>
              </Tippy>
            );
          }
        })}
      </div>
    </div>
  );
};

export default EmployeePin;

