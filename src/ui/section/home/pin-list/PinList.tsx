import PinCard from "@/ui/components/pin-card/PinCard";
import { pinMock } from "@/mocks/pin";
import "@/ui/section/home/pin-list/PinList.scss";
import { useNavigate } from "react-router-dom";

export default function PinList() {
  const navigate = useNavigate();

  const handlePinClick = (pinId: string) => {
    navigate(`/pin/${pinId}`);
  };
  return (
    <div className="pinList">
      {pinMock.map((pin) => (
        <PinCard
          key={pin.id}
          pin={pin}
          isButtonVisible={true}
          handleClick={() => handlePinClick(pin.id)}
        />
      ))}
    </div>
  );
}
