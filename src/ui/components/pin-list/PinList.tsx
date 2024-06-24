import PinCard from "@/ui/components/pin-card/PinCard";
import { pinMock } from "@/mocks/pin";
import "@/ui/components/pin-list/PinList.scss";

export default function PinList() {
  return (
    <div className="pinList">
      {pinMock.map((pin) => (
        <PinCard
          key={pin.id}
          pin={pin}
          isButtonVisible={true}
          handleClick={() => console.log(`Clicked on ${pin.pinTitle}`)}
        />
      ))}
    </div>
  );
}
