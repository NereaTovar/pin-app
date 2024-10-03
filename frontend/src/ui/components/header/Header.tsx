import BackButton from "../buttons/back-button/BackButton";
import LogoutButton from "../buttons/logout-button/LogoutButton";
import CompanyLogo from "../buttons/company-logo/CompanyLogo";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/Auth";
import slackData from '../../../resources/slack.json'
import "./Header.scss";

const defaultProfilePicture = "/path/to/default/profile/picture.jpg"; // Imagen predeterminada si no hay foto

// Función para obtener la inicial del nombre
const getInitial = (name: string) => {
  return name ? name.charAt(0).toUpperCase() : "";
};

// Función para buscar la imagen de Slack en slack.json
const getSlackProfileImage = (email: string) => {
  const slackUser = slackData.members.find((user: any) => user.profile.email === email);
  return slackUser && slackUser.profile && slackUser.profile.image_192 
    ? slackUser.profile.image_192 
    : null;
};

export default function Header() {
  const navigate = useNavigate();
  const { userProfileData } = useAuth();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isLoginPage = location.pathname === "/login";
  const isProfilePage = location.pathname === `/profile/${userProfileData?.id}`;

  // Navega al perfil del usuario
  const handleProfileNavigate = () => {
    navigate(`/profile/${userProfileData?.id}`);
  };

  // Obtener la imagen de Slack o la imagen de perfil
  const slackProfileImage = getSlackProfileImage(userProfileData?.email || "");
  const profileImage = slackProfileImage || userProfileData?.profilePictureUrl || defaultProfilePicture;

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
            {profileImage ? (
              <img src={profileImage} alt="Profile" />
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


