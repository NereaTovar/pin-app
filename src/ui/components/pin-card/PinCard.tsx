import { DetailedPin } from "@/mocks/pin";
import PinLogo from "../pin-logo/PinLogo";
import "@/ui/components/pin-card/PinCard.scss";
import Tippy from "@tippyjs/react";

interface PinCardProps {
  pin: DetailedPin;
  isButtonVisible?: boolean;
  handleClick?: () => void;
}

function PinCard({ pin, isButtonVisible = false, handleClick }: PinCardProps) {
  return (
    <div className="pinCard__container">
      <Tippy content={pin.pinTitle} placement="top">
        <div className="pinCard" onClick={handleClick}>
          <div className="pinCard__logo">
            <PinLogo imagePin={pin.imagePin} />
          </div>
          <div className="pinCard__title">{pin.pinTitle}</div>
          {isButtonVisible && <div className="pinCard__button">Apply Pins</div>}
        </div>
      </Tippy>
    </div>
  );
}

export default PinCard;
