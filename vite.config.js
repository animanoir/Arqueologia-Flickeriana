import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // REACT_APP_ se mantiene para no romper la variable ya configurada en Vercel
  envPrefix: ["VITE_", "REACT_APP_"],
  build: {
    outDir: "build",
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
  },
});
