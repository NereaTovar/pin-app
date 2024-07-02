import React from "react";
import GoogleAuth from "../../components/google-auth/GoogleAuth";
import "./Login.scss";
import { useAuth, UserProfileData } from "@/ui/context/auth/Auth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (userData: UserProfileData) => {
    console.log("Login Component userData:", userData);
    login(userData);
    navigate("/");
  };

  return (
    <div className="login__container">
      <GoogleAuth onLoginSuccess={handleLogin} />
    </div>
  );
};

export default Login;
