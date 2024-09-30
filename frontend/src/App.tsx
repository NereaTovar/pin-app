import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Modal from "react-modal";
import Login from "./ui/section/login/Login";
import Header from "./ui/components/header/Header";
import Home from "./ui/section/home/Home";
import { AuthProvider } from "./ui/context/auth/Auth";
import Profile from "./ui/section/profile/Profile";
import NotFound from "./ui/section/not-found/NotFound";
import { StoreProvider } from "./ui/components/store-context/StoreContext";
import PinDetailPage from "./ui/components/pin-detail-page/PinDetailPage";
import { ToastContainer } from "react-toastify";
import "tippy.js/dist/tippy.css";
import AppInitializer from "./ui/components/app-initializer/AppInitializer";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!clientId) {
  throw new Error("Missing Google Client ID");
}

Modal.setAppElement("#root");

export default function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <GoogleOAuthProvider clientId={clientId}>
          <StoreProvider>
            <BrowserRouter>
              <Header />

              <AppInitializer />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="/pin/:pinId" element={<PinDetailPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>

              <ToastContainer />
            </BrowserRouter>
          </StoreProvider>
        </GoogleOAuthProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}
