import company from "../../../../assets/icons/Anchor_40.svg";
import "../company-logo/CompanyLogo.scss";
import { useNavigate } from "react-router-dom";

export default function CompanyLogo() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <button
      className="companyLogo__button"
      onClick={handleLogoClick}
      style={{ cursor: "pointer" }}
    >
      <img alt="SVG company logo" src={company} />
    </button>
  );
}
