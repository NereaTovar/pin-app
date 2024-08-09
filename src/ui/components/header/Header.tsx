import BackButton from "../buttons/back-button/BackButton";
import LogoutButton from "../buttons/logout-button/LogoutButton";
import CompanyLogo from "../buttons/company-logo/CompanyLogo";
// import SearchButton from "../buttons/search-button/SearchButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/ui/context/auth/Auth";

import "./Header.scss";

const defaultProfilePicture = "/path/to/default/profile/picture.jpg";

const getInitial = (name: string) => {
  return name ? name.charAt(0).toUpperCase() : "";
};

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
        <CompanyLogo />
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

      <div className="companyLogo">
        <CompanyLogo />
      </div>

      {isProfilePage ? (
        <div className="logout">
          <LogoutButton />
        </div>
      ) : (
        <div className="profile">
          <button onClick={handleProfileNavigate} className="profile__button">
            {userProfileData?.profilePictureUrl ? (
              <img src={userProfileData.profilePictureUrl} alt="Profile" />
            ) : (
              <div className="profile__initial">
                {getInitial(userProfileData?.name ?? "")}
              </div>
            )}
          </button>
        </div>
      )}
    </header>
  );
}
