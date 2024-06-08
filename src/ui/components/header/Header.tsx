import BackButton from "../buttons/back-button/BackButton";
//import LogoutButton from "../buttons/logout-button/LogoutButton";
import RindusLogo from "../buttons/rindus-logo/RindusLogo";
import SearchButton from "../buttons/search-button/SearchButton";

import "./Header.scss";

export default function Header() {
  const isHomePage = location.pathname === "/";
  // const isProfilePage = location.pathname === `/profile/${userProfileData?.id}`;

  return (
    <header className="header__container--logged">
      {isHomePage ? (
        <div className="search">
          <SearchButton />
        </div>
      ) : (
        <div className="back">
          <BackButton />
        </div>
      )}

      <div className="rindusLogo">
        <RindusLogo />
      </div>
      {/* 
      {isProfilePage ? (
        <div className="logout">
          <LogoutButton /> 
        </div>
      ) : 
      (
        <div className="profile">
          <button
            onClick={handleProfileNavigate}
            className="profile__button"
          >
            <img
              src={userProfileData && `${userProfileData.profilePictureUrl}`}
            />
          </button>
        </div>
      )} */}
    </header>
  );
}
