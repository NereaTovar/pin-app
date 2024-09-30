import "../close-button/CloseButton.scss";
import close from "../../../../assets/icons/Close_24.svg";

interface CloseButtonProps {
  onRequestClose: () => void;
}

export default function CloseButton({ onRequestClose }: CloseButtonProps) {
  return (
    <button
      className="close__button"
      onClick={onRequestClose}
      style={{ cursor: "pointer" }}
    >
      <img alt="SVG close button" src={close} />
    </button>
  );
}
