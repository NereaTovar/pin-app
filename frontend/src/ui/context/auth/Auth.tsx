// import {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useEffect,
// } from "react";

// export interface UserProfileData {
//   id: string;
//   profilePictureUrl: string;
//   email: string;
//   name: string;
// }

// interface AuthContextType {
//   isLoggedIn: boolean;
//   userProfileData: UserProfileData | null;
//   login: (data: UserProfileData) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// function AuthProvider({ children }: { children: ReactNode }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userProfileData, setUserProfileData] =
//     useState<UserProfileData | null>(null);

//   useEffect(() => {
//     const storedUserProfileData = localStorage.getItem("userProfileData");
//     if (storedUserProfileData) {
//       setUserProfileData(JSON.parse(storedUserProfileData));
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const login = (data: UserProfileData) => {
//     setIsLoggedIn(true);
//     setUserProfileData(data);
//     localStorage.setItem("userProfileData", JSON.stringify(data));
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     setUserProfileData(null);
//     localStorage.removeItem("userProfileData");
//   };

//   return (
//     <AuthContext.Provider
//       value={{ isLoggedIn, userProfileData, login, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export { AuthProvider };


import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getAuth } from "firebase/auth";

export interface UserProfileData {
  id: string;
  profilePictureUrl: string;
  email: string;
  name: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userProfileData: UserProfileData | null;
  token: string | null; // Asegúrate de incluir el token en el contexto.
  login: (data: UserProfileData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfileData, setUserProfileData] = useState<UserProfileData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("User authenticated:", user); 
        // Esto debería mostrar el usuario autenticado
        // Obtener el token del usuario autenticado
        const token = await user.getIdToken(true);
        setToken(token);  // Actualiza el estado del token
        localStorage.setItem("token", token); // Guarda el token en el localStorage
        console.log("Firebase ID Token:", token);

        // También actualiza los datos del usuario en el contexto si es necesario
        setUserProfileData({
          id: user.uid,
          profilePictureUrl: user.photoURL || "",
          email: user.email || "",
          name: user.displayName || "",
        });
        setIsLoggedIn(true);
      } else {
        console.log("No user is signed in.");
      }
    });
  }, []);

  const login = async (data: UserProfileData) => {
    setIsLoggedIn(true);
    setUserProfileData(data);
    localStorage.setItem("userProfileData", JSON.stringify(data));

    // Obtén el token después del login
    const auth = getAuth();
    if (auth.currentUser) {
      try {
        const token = await auth.currentUser.getIdToken(true);
        if (token) {
          setToken(token);
          localStorage.setItem("token", token); // Guarda el token en el localStorage
          console.log("Token guardado en login:", token);
        } else {
          console.log("No se pudo obtener el token después del login. Token es null.");
        }
      } catch (error) {
        console.log("Error al obtener el token después del login:", error);
      }
    } else {
      console.log("Usuario no autenticado. auth.currentUser es null.");
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserProfileData(null);
    setToken(null);
    localStorage.removeItem("userProfileData");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userProfileData, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider };
