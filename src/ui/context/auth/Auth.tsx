import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserProfileData {
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

  const login = (data: UserProfileData) => {
    console.log("Logging in user:", data);
    setIsLoggedIn(true);
    setUserProfileData(data);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserProfileData(null);
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
