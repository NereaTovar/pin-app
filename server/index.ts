import dotenv from "dotenv";
import express from "express";
import { OAuth2Client } from "google-auth-library";

dotenv.config();
const app = express();

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

const oAuth2Client = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri: "http://localhost:5173/auth/google/callback",
});

app.get("/auth/google", (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.profile",
  });
  res.redirect(authUrl);
});

const port = process.env.PORT || 5173;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
