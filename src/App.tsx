import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Login from "./ui/section/login/Login";
import Header from "./ui/components/header/Header";
import Home from "@/ui/section/home/Home";
import { AuthProvider } from "./ui/context/auth/Auth";
import Profile from "./ui/section/profile/Profile";
import PinDetail from "./ui/section/pin-detail/PinDetail";
import NotFound from "./ui/components/not-found/NotFound";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!clientId) {
  throw new Error("Missing Google Client ID");
}


export default function App() {
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
              <Route path="pin/:pinId" element={<PinDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}
