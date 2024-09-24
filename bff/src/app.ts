// import dotenv from "dotenv";
// import express from "express";
// import googleRoutes from "./api/googleRoutes";
// import cors from "cors";

// // Cargar las variables de entorno
// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use("/api/google", googleRoutes);

// // Ejemplo de cómo usar las credenciales de Google API en algún punto
// console.log("Google Auth Credentials:", process.env.BFF_GOOGLE_AUTH_CREDENTIALS);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from "express";
import router from "./http/routes/google.routes";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// Cargar las variables de entorno
dotenv.config();

console.log(
  "BFF_GOOGLE_AUTH_CREDENTIALS:",
  process.env.BFF_GOOGLE_AUTH_CREDENTIALS
);

const app = express();
// Servir archivos estáticos
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(cors());
app.use(express.json());

app.use("/api/google", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
