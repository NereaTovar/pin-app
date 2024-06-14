import RightButton from "../buttons/right-button/RightButton";
import PinLogo from "../pin-logo/PinLogo";
import "@/ui/components/pin-card/PinCard.scss";

interface PinCardProps {
  title: string;
  isButtonVisible?: boolean;
  //pinLogo: React.ReactNode;
  handleClick?: () => void;
}

function PinCard({
  title,
  //logo,
  isButtonVisible = false,
  handleClick,
}: PinCardProps) {
  return (
    <div className="pinCard" onClick={handleClick}>
      <div className="pinCard__logo">
        <PinLogo />
      </div>
      <div className="pinCard__title">{title}</div>
      {isButtonVisible && (
        <div className="eventCard__button">
          <RightButton />
        </div>
      )}
    </div>
  );
}
export default PinCard;
