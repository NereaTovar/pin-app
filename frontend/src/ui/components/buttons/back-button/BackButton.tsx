import { useNavigate } from "react-router-dom";
import "../back-button/BackButton.scss";
import arrowBack from "../../../../assets/icons/Arrow_back_24.svg";

export default function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      className="back__button"
      onClick={handleBack}
      style={{ cursor: "pointer" }}
    >
      <img alt="SVG back button" src={arrowBack} />
    </button>
  );
}
