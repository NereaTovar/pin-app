// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import tsconfigPaths from "vite-tsconfig-paths";
// import { VitePWA } from "vite-plugin-pwa";
// // import { viteStaticCopy } from "vite-plugin-static-copy";

// export default defineConfig({
//   plugins: [
//     react(),
//     tsconfigPaths(),
//     VitePWA({
//       registerType: "autoUpdate",
//       manifest: {
//         name: "My App",
//         short_name: "App",
//         description: "My Awesome App description",
//         theme_color: "#ffffff",
//         icons: [
//           {
//             src: "icon-192x192.png",
//             sizes: "192x192",
//             type: "image/png",
//           },
//           {
//             src: "icon-512x512.png",
//             sizes: "512x512",
//             type: "image/png",
//           },
//         ],
//       },
//     }),
//   ],
//   test: {
//     environment: 'jsdom',
//     setupFiles: './src/setupTests.ts',
//     globals: true,
//     css: false,
//   },
//   resolve: {
//     alias: {
//       "@": "/frontend/src",
//     },
//   },

// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";
import vitePluginJson from "@rollup/plugin-json"; // Plugin para manejar JSON

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    vitePluginJson(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "My App",
        short_name: "App",
        description: "My Awesome App description",
        theme_color: "#ffffff",
        icons: [
          {
            src: "icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // URL de tu backend Express
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
      "bff": "/bff/src", 
    },
  },
});
