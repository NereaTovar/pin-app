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
    <div className="pinListContainer">
      <div className="pinListContainer__header">
        <h1>Employee Recognition Pins</h1>
        <p className="pinListContainer__description">
          At our company, we value and recognize the hard work, dedication, and achievements of our employees. The pins below represent various milestones and accomplishments. Click on a pin to learn more about its significance and to assign it to a deserving team member.
        </p>
      </div>
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
    </div>
  );
}
