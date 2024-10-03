import slackData from '../../../resources/slack.json'
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth/Auth";
import "./Profile.scss";
import emailIcon from "../../../assets/icons/Contact_gmail_40.svg";

// Función para obtener la inicial del nombre
const getInitial = (name: string) => {
  return name ? name.charAt(0).toUpperCase() : "";
};

function Profile() {
  const { userId } = useParams<{ userId: string }>();
  const { userProfileData } = useAuth();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Función para buscar la imagen de Slack en slack.json
  const getSlackProfileImage = (email: string) => {
    // Asegúrate de acceder al array 'members' dentro de 'slackData'
    const slackUser = slackData.members.find((user: any) => {
      return user.profile.email === email;
    });

    // Verifica si se encuentra el usuario y si tiene la imagen de perfil en 'image_192'
    return slackUser && slackUser.profile && slackUser.profile.image_192 
      ? slackUser.profile.image_192 
      : null;
  };

  useEffect(() => {
    // Si no hay datos de perfil del usuario o el ID no coincide, redirige al login
    if (!userProfileData || userProfileData.id !== userId) {
      navigate("/login");
    } else {
      // Busca la imagen de Slack o usa la imagen del perfil almacenada
      const slackProfileImage = getSlackProfileImage(userProfileData.email);
      setProfileImage(slackProfileImage || userProfileData.profilePictureUrl);
    }
  }, [userProfileData, userId, navigate]);

  if (!userProfileData || userProfileData.id !== userId) {
    return <div>Loading...</div>; // Muestra un mensaje de carga si no hay datos de perfil
  }

  return (
    <div className="profileContainer">
      <div className="profileContainer__header">
        {profileImage ? (
          <img
            className="profileContainer__image"
            src={profileImage}
            alt="Profile"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/150"; // Si falla la carga de la imagen, muestra un placeholder
              e.currentTarget.alt = "Default Profile";
            }}
          />
        ) : (
          <div className="profileContainer__initial">
            {getInitial(userProfileData.name)} {/* Muestra la inicial si no hay imagen */}
          </div>
        )}
        <span className="profileContainer__name">{userProfileData.name}</span>
        <div className="profileDetail">
          <img src={emailIcon} className="profileDetail__logo" alt="Email Icon" />
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

