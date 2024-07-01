import { useParams } from "react-router-dom";
import { useAuth } from "@/ui/context/auth/Auth";
import "./Profile.scss";
import emailIcon from "@/assets/icons/Contact_gmail_40.svg";

function Profile() {
  const { userId } = useParams<{ userId: string }>();
  const { userProfileData } = useAuth();

  console.log("Profile Component userProfileData:", userProfileData);

  if (!userProfileData || userProfileData.id !== userId) {
    return <div>Loading...</div>;
  }

  console.log("Rendering profile data...");
  console.log("Profile Picture URL:", userProfileData.profilePictureUrl);

  return (
    <div className="profileContainer">
      <div className="profileContainer__header">
        <img
          className="profileContainer__image"
          src={userProfileData.profilePictureUrl}
          alt="Profile"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/150";
            e.currentTarget.alt = "Default Profile";
          }}
        />
        <span className="profileContainer__name">{userProfileData.name}</span>
        <div className="profileDetail">
          <img src={emailIcon} className="profileDetail__logo" />
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
