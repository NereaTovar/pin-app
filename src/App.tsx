import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Login from "./ui/components/login/Login";
import Header from "./ui/components/header/Header";

const clientId =
  "207077287386-0doinh13rp98vrmijqkp87so8domp7ro.apps.googleusercontent.com";

export default function App() {
  return (
    <HelmetProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="" element={<Login />} />
            {/* <Route path="/protected" component={Protected} /> 
            <Route path="/" component={Home} exact /> */}
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </HelmetProvider>
  );
}
