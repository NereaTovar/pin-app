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
      if (!googleIdToken) {
        console.log("Token inválido o no proporcionado");
        return;
      }
      console.log("Token Front GoogleAuth:", googleIdToken);

      // Crear una credencial de Firebase con el token de Google
      const credential = GoogleAuthProvider.credential(googleIdToken);

      // Iniciar sesión en Firebase con esta credencial
      const firebaseUser = await signInWithCredential(auth, credential);
      console.log("Firebase user:", firebaseUser);

      // Obtener el token de Firebase y guardarlo en el localStorage
      const firebaseToken = await firebaseUser.user.getIdToken();
      localStorage.setItem("authToken", firebaseToken); // Guarda el token en el localStorage

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

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => console.log("Login Failed")}
      />
    </div>
  );
}

export default GoogleAuth;
