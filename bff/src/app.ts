require("dotenv").config();
import { config } from "./config/index";
import express from "express";
import googleRoutes from "./api/googleRoutes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/google", googleRoutes);

// Ejemplo de cómo usar las credenciales de Google API en algún punto
console.log("Google Auth Credentials:", config.googleAuthCredentials);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
