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
  yearsInCompany: number;
}

const EmployeePin = ({ department, yearsInCompany }: EmployeePinProps) => {
  const { color } = usePinDetails(yearsInCompany);

  return (
    <div>
      <PinAnniversary number={yearsInCompany} color={color} />
      <PinDepartment department={department} />
    </div>
  );
};

export default EmployeePin;
