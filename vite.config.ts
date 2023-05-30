import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  resolve: {
    alias: {
      "@pages": "/src/pages",
      "@components": "/src/components",
      "@constants": "/src/constants",
      "@configs": "/src/configs",
      "@hooks": "/src/hooks",
      "@utils": "/src/utils",
      "@styles": "/src/styles",
      "@assets": "/src/assets",
      "@interfaces": "/src/interfaces",
      "@enums": "/src/enums",
    },
  },
});
