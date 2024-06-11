import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export interface UserProfileData {
  id: string;
  profilePictureUrl: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userProfileData: UserProfileData | null;
  login: (data: UserProfileData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfileData, setUserProfileData] =
    useState<UserProfileData | null>(null);

  useEffect(() => {
    const storedUserProfileData = localStorage.getItem("userProfileData");
    if (storedUserProfileData) {
      setUserProfileData(JSON.parse(storedUserProfileData));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (data: UserProfileData) => {
    console.log("Logging in user:", data);
    setIsLoggedIn(true);
    setUserProfileData(data);
    localStorage.setItem("userProfileData", JSON.stringify(data));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserProfileData(null);
    localStorage.removeItem("userProfileData");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userProfileData, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
