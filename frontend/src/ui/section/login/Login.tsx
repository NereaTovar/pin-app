import React from "react";
import GoogleAuth from "../../components/google-auth/GoogleAuth";
import "./Login.scss";
import { useAuth, UserProfileData } from "../../context/auth/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Asegúrate de importar los estilos de react-toastify

const Login: React.FC = () => {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (userData: UserProfileData) => {
    console.log("Login data:", userData);

    const email = userData.email.toLowerCase();

    // Verificar si el email es de dominio rindus.de
    if (!email.endsWith("@rindus.de")) {
      toast.error("Solo los correos de @rindus.de tienen acceso.", {
        position: "top-center", // Posición corregida
        autoClose: 3000, // El mensaje desaparecerá automáticamente después de 3 segundos
      });
      return;
    }

    // Si el email es válido, proceder con el login
    login(userData);

    if (isLoggedIn) {
      navigate("/");
    }
  };

  return (
    <div className="login__container">
      <GoogleAuth onLoginSuccess={handleLogin} />
      <ToastContainer /> {/* Contenedor para mostrar las notificaciones */}
    </div>
  );
};

export default Login;
