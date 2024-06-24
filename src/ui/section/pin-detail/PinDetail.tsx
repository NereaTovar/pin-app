import PinCard from "@/ui/components/pin-card/PinCard";
import { DetailedPin} from "@/mocks/pin";
import "@/ui/section/pin-detail/PinDetail.scss";

interface PinDetailProps{
  pin: DetailedPin;
}

export function PinDetail({ pin }: PinDetailProps) {
  return (
    <div className="pinDetail">
      <PinCard pin={pin} isButtonVisible={false} />
      <div className="pinDetail__description">{pin.pinDescription}</div>
    </div>
  );
}
