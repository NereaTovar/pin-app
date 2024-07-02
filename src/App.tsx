import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Login from "src/ui/section/login/Login.tsx";
import Header from "./ui/components/header/Header";
import Home from "@/ui/section/home/Home";
import { AuthProvider } from "./ui/context/auth/Auth";
import Profile from "./ui/section/profile/Profile";
import PinDetail from "./ui/section/pin-detail/PinDetail";
import NotFound from "./ui/section/not-found/NotFound";
import EmployeeList from "./ui/components/employee-list/EmployeeList"; // Importa tu componente EmployeeList
import syncUsers from "./services/syncUser"; // Importa la función de sincronización
import { auth } from "src/config/firebaseConfig.ts"; // Importa la autenticación de Firebase

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!clientId) {
  throw new Error("Missing Google Client ID");
}

export default function App() {
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       syncUsers(); // Sincroniza los usuarios si el usuario está autenticado
  //     }
  //   });
  // }, []);
  useEffect(() => {
    syncUsers();
  }, []);

  return (
    <AuthProvider>
      <HelmetProvider>
        <GoogleOAuthProvider clientId={clientId}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/pin/:pinId" element={<PinDetail />} />
              <Route path="/employees" element={<EmployeeList />} />{" "}
              {/* Ruta para la lista de empleados */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}
