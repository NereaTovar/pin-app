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



import express from 'express';
import { config as dotenvConfig } from 'dotenv';

// Carga las variables de entorno
dotenvConfig();

const app = express();
const port = process.env.PORT || 3000;

// Configurar una ruta básica
app.get('/api', (req, res) => {
  res.send('API funcionando!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
