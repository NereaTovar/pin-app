import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import googleRoutes from "./http/routes/google.routes";

// Cargar las variables de entorno
dotenv.config();

const app = express();

// Middleware para CORS (habilitar solicitudes desde otros dominios)
app.use(cors());

// Middleware para parsear JSON

app.use(express.json());

// Middleware para servir archivos estáticos (si tienes un frontend o assets)
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Rutas de la API (estas rutas son procesadas primero)
app.use("/api/google", googleRoutes);

// Opcional: Manejar rutas no encontradas (404)
// Asegúrate de que esto está después de todas las rutas de la API
app.use("*", (req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Obtener el puerto de las variables de entorno o usar el puerto 3000 por defecto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
