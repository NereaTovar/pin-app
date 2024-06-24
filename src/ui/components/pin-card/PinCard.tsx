import RightButton from "../buttons/right-button/RightButton";
import PinLogo from "../pin-logo/PinLogo";
import "@/ui/components/pin-card/PinCard.scss";
import { DetailedPin } from "@/mocks/pin";

interface PinCardProps {
  pin: DetailedPin;
  isButtonVisible?: boolean;
  handleClick?: () => void;
}

function PinCard({ pin, isButtonVisible = false, handleClick }: PinCardProps) {
  return (
    <div className="pinCard" onClick={handleClick}>
      <div className="pinCard__logo">
        <PinLogo imagePin={pin.imagePin} />
      </div>
      <div className="pinCard__title">{pin.pinTitle}</div>

      {isButtonVisible && (
        <div className="eventCard__button">
          <RightButton />
        </div>
      )}
    </div>
  );
}
export default PinCard;
