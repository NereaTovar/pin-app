import { useNavigate } from "react-router-dom";
import PinCard from "../../../components/pin-card/PinCard";
import { pinMock } from "../../../../mocks/pin";
import InfoIcon from "../../../../assets/icons/Info_24.svg";
import './PinList.scss';

export default function PinList() {
  const navigate = useNavigate();

  const handlePinClick = (pinId: string) => {
    navigate(`/pin/${pinId}`);
  };

  return (
    <div className="main-container">
      <div className="pinListContainer">
        <div className="pinListContainer__baner">
          <h2 className="pinListContainer__baner__title">
            <img src={InfoIcon} alt="Info Icon" className="icon" />
            Employee Recognition Pins
          </h2>
          <p className="pinListContainer__baner__paragraph">
            At our company, we value and recognize the hard work, dedication,
            and achievements of our employees. The pins below represent various
            milestones and accomplishments. Click on a pin to learn more about
            its significance and to assign it to a deserving team member.
          </p>
        </div>
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
