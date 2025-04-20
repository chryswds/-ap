import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron";

export default defineConfig({
  plugins: [
    react(),
    electron({
      entry: "electron/main.cjs",
      vite: {
        build: {
          outDir: "dist/electron",
        },
      },
    }),
  ],
  server: {
    host: true,
    port: 5173,
    open: false,
  },
});
