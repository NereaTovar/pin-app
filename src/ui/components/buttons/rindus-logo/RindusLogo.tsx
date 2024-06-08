import rindusLogo from "@/assets/icons/Anchor_40.svg";
import "@/ui/components/buttons/rindus-logo/RindusLogo.scss";

interface Props {
  onClick?: () => void;
}

export default function RindusLogo({ onClick }: Props) {
  return (
    <button className="rindusLogo__button" onClick={onClick}>
      <img alt="SVG rindus logo" src={rindusLogo} />
    </button>
  );
}
