import { useEffect } from "react";
import { useAuth } from '../../context/auth/Auth'
import syncUsers from "../../../services/syncUser";

const AppInitializer = () => {
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      // Llama a syncUsers cuando el token esté disponible
      syncUsers();
    }
  }, [token]);

  return null; // Este componente no necesita renderizar nada
};

export default AppInitializer;
