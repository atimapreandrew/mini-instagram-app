import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const getCache = ({ name, pattern }) => ({
  urlPattern: pattern,
  handler: "CacheFirst",
  options: {
    cacheName: name,
    expiration: {
      maxEntries: 500,
      maxAgeSeconds: 60 * 60 * 24 * 365 * 2, // 2 years
    },
    cacheableResponse: {
      statuses: [200],
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,jsx,css,html,ico,png,svg}"],
        runtimeCaching: [
          getCache({
            pattern: /^https:\/\/kit.fontawesome.com\/23a2825686.js/,
            name: "font-awesome",
          }),
        ],
      },
    }),
  ],
});
