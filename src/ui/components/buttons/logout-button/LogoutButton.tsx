import logoutIcon from "@/assets/icons/Logout_24.svg";
import "@/ui/components/atoms/buttons/logout/Logout.scss";

export default function LogoutButton() {
  return (
    <button className="logout__button">
      <img alt="SVG logout button" src={logoutIcon} />
    </button>
  );
}
