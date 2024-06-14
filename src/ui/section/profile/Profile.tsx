import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/ui/context/auth/Auth";
import "./Profile.scss";

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { userProfileData } = useAuth();

  console.log("Profile Component userProfileData:", userProfileData);

  if (!userProfileData || userProfileData.id !== userId) {
    return <div>Loading...</div>;
  }

  console.log("Rendering profile data...");

  return (
    <div className="profileContainer">
      <div className="profileContainer__header">
        <img
          className="profileContainer__image"
          src={userProfileData.profilePictureUrl}
          alt="Profile"
        />
        <h1 className="profileContainer__name">User {userProfileData.name}</h1>
      </div>
      <div className="profileContainer__details">
        <p>
          <strong>Email:</strong> {userProfileData.email}
        </p>
      </div>
    </div>
  );
};

export default Profile;
