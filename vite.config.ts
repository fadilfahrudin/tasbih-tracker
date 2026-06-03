import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",

      devOptions: {
        enabled: true
      },

      includeAssets: [
        "favicon.svg",
        "apple-touch-icon.png",
      ],

      manifest: {
        name: "Tasbih Tracker",
        short_name: "Tasbih",

        description:
          "Tasbih | Tracker",

        theme_color: "#051f20",

        background_color: "#051f20",

        display: "standalone",

        start_url: "/",

        icons: [
          {
            src: "/tasbih-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "/tasbih-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    })
  ],
})
