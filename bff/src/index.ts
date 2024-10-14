// import { config as dotenvConfig } from 'dotenv';
// import { Config, ProcessVariables } from './config/config.type';
// import { getCommonConfig } from './config/common';

// function getConfig(): Config {
//   dotenvConfig();

//   return getCommonConfig(process.env as unknown as ProcessVariables);
// }

// export function isLiveEnvironment(config: Config) {
//   return (
//     config.environment === 'staging' || config.environment === 'production'
//   );
// }

// export const config = getConfig();


import { config as dotenvConfig } from 'dotenv';
import express from 'express';
import { Config, ProcessVariables } from './config/config.type';
import { getCommonConfig } from './config/common';

// Configurar dotenv para las variables de entorno
dotenvConfig();

function getConfig(): Config {
  return getCommonConfig(process.env as unknown as ProcessVariables);
}

export const config = getConfig();

export function isLiveEnvironment(config: Config) {
  return (
    config.environment === 'staging' || config.environment === 'production'
  );
}

// Crear una instancia de Express
const app = express();
const port = process.env.PORT || 3000;

// Configurar una ruta simple para probar el backend
app.get('/api', (req, res) => {
  res.send('API is working!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
