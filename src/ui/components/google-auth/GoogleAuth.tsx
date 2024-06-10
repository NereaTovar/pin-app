import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/ui/context/auth/Auth";

const GoogleAuth: React.FC = () => {
  const navigate = useNavigate();
  const { login, logout } = useAuth();

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

      login(userData);

      navigate("/");
    } catch (error) {
      console.log("Failed to fetch user profile data:", error);
    }
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };

  const handleLogout = () => {
    logout();
    console.log("Logout Successful");
  };

  return (
    <div>
      <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default GoogleAuth;
