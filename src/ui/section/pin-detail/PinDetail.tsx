import { useParams } from "react-router-dom";
import PinCard from "@/ui/components/pin-card/PinCard";
import { pinMock } from "@/mocks/pin";
import "@/ui/section/pin-detail/PinDetail.scss";
import NotFound from "@/ui/section/not-found/NotFound";

export default function PinDetail() {
  const { pinId } = useParams<{ pinId: string }>();
  const pin = pinMock.find((p) => p.id === pinId);

  if (!pin) {
    return <NotFound />;
  }

  const handleAssignPin = () => {
    console.log(`Assign pin ${pinId} to an employee`);
  };

  return (
    <div className="pinDetail">
      <PinCard pin={pin} isButtonVisible={false} />
      <div className="pinDetail__description">{pin.pinDescription}</div>
      <button className="pinDetail__button" onClick={handleAssignPin}>
        Assign Pin
      </button>
    </div>
  );
}
