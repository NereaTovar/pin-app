import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { UserProfileData } from "@/ui/context/auth/Auth";

interface GoogleAuthProps {
  onLoginSuccess: (userData: UserProfileData) => void;
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ onLoginSuccess }) => {
  const handleLoginSuccess = async (response: CredentialResponse) => {
    try {
      const token = response.credential;

      const userProfileResponse = await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
      );
      const userProfileData = await userProfileResponse.json();
      console.log("User Profile Data:", userProfileData);

      const userData = {
        id: userProfileData.sub,
        profilePictureUrl: userProfileData.picture,
      };

      onLoginSuccess(userData);
    } catch (error) {
      console.log("Failed to fetch user profile data:", error);
    }
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <div>
      <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
    </div>
  );
};

export default GoogleAuth;
