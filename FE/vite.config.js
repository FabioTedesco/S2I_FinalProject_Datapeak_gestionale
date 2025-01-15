import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Change to "/subdirectory/" if deploying in a subdirectory
  build: {
    outDir: "build", // Specify the output directory for the production build
    assetsDir: "assets", // Directory for static assets
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("src/assets")) {
            return "assets";
          }
        },
      },
    },
  },
});
