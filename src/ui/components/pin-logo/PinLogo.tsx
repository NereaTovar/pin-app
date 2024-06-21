import summerEvent from "@/assets/pins/Summer_event.svg";
import "@/ui/components/pin-logo/PinLogo.scss";

export default function PinLogo() {
  return (
    <button className="pinlogo" type="button">
      <img className="pinlogo__image" alt="SVG pinLogo" src={summerEvent} />
    </button>
  );
}
