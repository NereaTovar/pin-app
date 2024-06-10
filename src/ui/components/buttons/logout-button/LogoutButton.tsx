// import { useContext } from "react";

// import logoutIcon from "@/assets/icons/Logout_24.svg";
// import "@/ui/components/atoms/buttons/logout/Logout.scss";
// import { AuthContext } from "@/ui/context/auth/Auth";

// export default function Logout() {
//   const { logout } = useContext(AuthContext);

//   return (
//     <button className="logout__button" data-testid="logout" onClick={logout}>
//       <img alt="SVG logout" src={logoutIcon} />
//     </button>
//   );
// }

import logoutIcon from "@/assets/icons/Logout_24.svg";
// import "@/ui/components/buttons/logout/LogoutButton.scss";
import { useAuth } from "@/ui/context/auth/Auth";

export default function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    console.log("Logout Successful");
  };

  return (
    <button className="logout__button" onClick={handleLogout}>
      <img alt="SVG logout" src={logoutIcon} />
    </button>
  );
}
