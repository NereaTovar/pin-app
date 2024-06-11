import logoutIcon from "@/assets/icons/Logout_24.svg";
import "@/ui/components/buttons/logout-button/LogoutButton.scss";
import { useAuth } from "@/ui/context/auth/Auth";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    alert("Logout Successful");
  };

  return (
    <button
      className="logout__button"
      onClick={handleLogout}
      style={{ cursor: "pointer" }}
    >
      <img alt="SVG logout" src={logoutIcon} />
    </button>
  );
}
