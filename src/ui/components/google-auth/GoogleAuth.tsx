import React from "react";
import {
  GoogleLogin,
  googleLogout,
  CredentialResponse,
} from "@react-oauth/google";

const GoogleAuth: React.FC = () => {
  const handleLoginSuccess = (response: CredentialResponse) => {
    console.log("Login Successful:", response);
    const token = response.credential;
    console.log("Token:", token);
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };

  const handleLogout = () => {
    googleLogout();
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
