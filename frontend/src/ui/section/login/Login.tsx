import React from "react";
import GoogleAuth from "../../components/google-auth/GoogleAuth";
import "./Login.scss";
import { useAuth, UserProfileData } from "../../context/auth/Auth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (userData: UserProfileData) => {
    console.log("Login data:", userData); // Verifica que los datos del usuario sean correctos

    login(userData);
    if (isLoggedIn) { // Verifica que `isLoggedIn` se actualice correctamente después d
    navigate("/");
    }
  };

  return (
    <div className="login__container">
      <GoogleAuth onLoginSuccess={handleLogin} />
    </div>
  );
};

export default Login;
