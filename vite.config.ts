import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

import { visualizer } from "rollup-plugin-visualizer";

import tailwindcss from "@tailwindcss/vite";

import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "ShowBar",
        short_name: "ShowBar",
        description: "پلتفرم حمل‌ونقل و باربری شوبار",
        theme_color: "#0D674E",
        background_color: "#F9FAFA",
        display: "standalone",
        start_url: "/",
        scope: "/",

        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/icon-192-maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/icons/icon-512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
      },
    }),

    visualizer({
      filename: "dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: "treemap",
    }),
  ],

  resolve: {
    conditions:
      command === "build"
        ? ["production", "browser", "module", "import", "default"]
        : ["development", "browser", "module", "import", "default"],
  },

  server: {
    proxy: {
      "/api": {
        target: "https://showbar.ir",
        changeOrigin: true,
        secure: false,
      },
    },
  },
}));
