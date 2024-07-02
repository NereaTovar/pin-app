import PinAnniversary from "../pin/PinAnniversary";
import usePinDetails from "@/hooks/usePinDetail";

interface EmployeePinProps {
  startDate: string;
}

const EmployeePin = ({ startDate }: EmployeePinProps) => {
  const { years, color } = usePinDetails(startDate);

  return (
    <div>
      <PinAnniversary number={years} color={color} />
      <p>Years at the company: {years}</p>
    </div>
  );
};

export default EmployeePin;
