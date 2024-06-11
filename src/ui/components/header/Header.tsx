import BackButton from "../buttons/back-button/BackButton";
import LogoutButton from "../buttons/logout-button/LogoutButton";
import RindusLogo from "../buttons/rindus-logo/RindusLogo";
// import SearchButton from "../buttons/search-button/SearchButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/ui/context/auth/Auth";

import "./Header.scss";

const defaultProfilePicture = "/path/to/default/profile/picture.jpg";

export default function Header() {
  const navigate = useNavigate();
  const { userProfileData } = useAuth();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isLoginPage = location.pathname === "/login";
  const isProfilePage = location.pathname === `/profile/${userProfileData?.id}`;

  const handleProfileNavigate = () => {
    navigate(`/profile/${userProfileData?.id}`);
  };

  if (isLoginPage)
    return (
      <header className="header__container--login">
        <RindusLogo />
      </header>
    );

  return (
    <header className="header__container--logged">
      {isHomePage ? (
        <div className="search">{/* <SearchButton /> */}</div>
      ) : (
        <div className="back">
          <BackButton />
        </div>
      )}

      <div className="rindusLogo">
        <RindusLogo />
      </div>

      {isProfilePage ? (
        <div className="logout">
          <LogoutButton />
        </div>
      ) : (
        <div className="profile">
          <button onClick={handleProfileNavigate} className="profile__button">
            <img
              src={userProfileData?.profilePictureUrl ?? defaultProfilePicture}
              alt="Profile"
            />
          </button>
        </div>
      )}
    </header>
  );
}
