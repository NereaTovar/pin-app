import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";
// import { viteStaticCopy } from "vite-plugin-static-copy";
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
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
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: 'src/resources/employees.json',
    //       dest: 'resources'
    //     },
    //     {
    //       src: 'src/resources/slack.json',
    //       dest: 'resources'
    //     }
    //   ]
    // })
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    globals: true,
    css: false,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  
});
