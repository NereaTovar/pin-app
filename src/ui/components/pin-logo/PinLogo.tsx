import "@/ui/components/pin-logo/PinLogo.scss";

interface PinLogoProps {
  imagePin: string;
}

export default function PinLogo({ imagePin }: PinLogoProps) {
  return (
    <button className="pinlogo" type="button">
      <img className="pinlogo__image" alt="SVG pinLogo" src={imagePin} />
    </button>
  );
}
