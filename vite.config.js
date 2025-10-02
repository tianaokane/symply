import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: { port: 5173 },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",         // no manual code needed
      devOptions: { enabled: true },  // lets you test in dev
      manifest: {
        name: "Symply",
        short_name: "Symply",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#2e7d6b",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" }
        ]
      }
    })
  ]
});

