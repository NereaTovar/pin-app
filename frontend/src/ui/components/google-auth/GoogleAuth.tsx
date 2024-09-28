import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { UserProfileData } from "../../context/auth/Auth";
import { auth } from "../../../config/firebaseConfig"; // Asegúrate de importar `auth` correctamente
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";

interface GoogleAuthProps {
  onLoginSuccess: (userData: UserProfileData) => void;
}

function GoogleAuth({ onLoginSuccess }: GoogleAuthProps) {
  const handleLoginSuccess = async (response: CredentialResponse) => {
    try {
      const googleIdToken = response.credential;
      console.log("Token Front GoogleAuth:", googleIdToken);

      // Crear una credencial de Firebase con el token de Google
      const credential = GoogleAuthProvider.credential(googleIdToken);
      
      // Iniciar sesión en Firebase con esta credencial
      const firebaseUser = await signInWithCredential(auth, credential);
      console.log("Firebase user:", firebaseUser);

      // Extraer datos del perfil del usuario
      const userData: UserProfileData = {
        id: firebaseUser.user.uid,
        profilePictureUrl: firebaseUser.user.photoURL || "",
        email: firebaseUser.user.email || "",
        name: firebaseUser.user.displayName || "",
      };

      // Pasar los datos del usuario a la función de login en tu contexto
      onLoginSuccess(userData);
    } catch (error) {
      console.log("Failed to authenticate with Firebase:", error);
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
}

export default GoogleAuth;
