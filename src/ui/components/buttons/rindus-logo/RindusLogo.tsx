import rindusLogo from "@/assets/icons/Anchor_40.svg";
import "@/ui/components/buttons/rindus-logo/RindusLogo.scss";
import { useNavigate } from "react-router-dom";

export default function RindusLogo() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <button
      className="rindusLogo__button"
      onClick={handleLogoClick}
      style={{ cursor: "pointer" }}
    >
      <img alt="SVG rindus logo" src={rindusLogo} />
    </button>
  );
}
