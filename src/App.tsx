import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Modal from "react-modal";

import Login from "src/ui/section/login/Login.tsx";
import Header from "./ui/components/header/Header";
import Home from "@/ui/section/home/Home";
import { AuthProvider } from "./ui/context/auth/Auth";
import Profile from "./ui/section/profile/Profile";
import PinDetail from "./ui/section/pin-detail/PinDetail";
import NotFound from "./ui/section/not-found/NotFound";
import EmployeeList from "./ui/components/employee-list/EmployeeList";
import syncUsers from "./services/syncUser";
import PinList from "./ui/section/home/pin-list/PinList";
import { StoreProvider } from "./ui/components/store-context/StoreContext";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!clientId) {
  throw new Error("Missing Google Client ID");
}

Modal.setAppElement("#root");

export default function App() {
  useEffect(() => {
    syncUsers(); 
  }, []);

  const tabs = [
    { label: "List of Pins", content: <PinList /> },
    { label: "Employees", content: <EmployeeList /> },
  ];

  return (
    <AuthProvider>
      <HelmetProvider>
        <GoogleOAuthProvider clientId={clientId}>
          <StoreProvider>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="/pin/:pinId" element={<PinDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </StoreProvider>
        </GoogleOAuthProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}
