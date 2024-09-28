// /// <reference types="vite/client" />

// interface ImportMetaEnv {
//   readonly VITE_GOOGLE_CLIENT_ID: string;
// }

// interface ImportMeta {
//   readonly env: ImportMetaEnv;
// }

// declare module "@rollup/plugin-json";



interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  // Añade aquí cualquier otra variable de entorno que uses
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Declarar módulo para evitar errores con importaciones específicas
declare module "@rollup/plugin-json";
