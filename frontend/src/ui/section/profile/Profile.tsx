import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/auth/Auth";
import "./Profile.scss";
import emailIcon from "../../../assets/icons/Contact_gmail_40.svg";

const getInitial = (name: string) => {
  return name ? name.charAt(0).toUpperCase() : "";
};

function Profile() {
  const { userId } = useParams<{ userId: string }>();
  const { userProfileData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userProfileData || userProfileData.id !== userId) {
      // Redirigir si no está autenticado o si el ID no coincide
      navigate("/login");
    }
  }, [userProfileData, userId, navigate]);

  if (!userProfileData || userProfileData.id !== userId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profileContainer">
      <div className="profileContainer__header">
        {userProfileData.profilePictureUrl ? (
          <img
            className="profileContainer__image"
            src={userProfileData.profilePictureUrl}
            alt="Profile"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/150";
              e.currentTarget.alt = "Default Profile";
            }}
          />
        ) : (
          <div className="profileContainer__initial">
            {getInitial(userProfileData.name)}
          </div>
        )}
        <span className="profileContainer__name">{userProfileData.name}</span>
        <div className="profileDetail">
          <img src={emailIcon} className="profileDetail__logo" alt="Email Icon"/>
          <span className="profileContainer__email">
            <a href={`mailto:${userProfileData.email}`}>
              {userProfileData.email}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
