import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "#components": resolve(__dirname, "src/components"),
      "#constants": resolve(__dirname, "src/constants"),
      "#store": resolve(__dirname, "src/store"),
      "#windows": resolve(__dirname, "src/Windows"),
      "#hoc": resolve(__dirname, "src/hoc"),


    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (id.includes("react-pdf") || id.includes("pdfjs-dist")) {
            return "vendor-pdf";
          }

          if (id.includes("gsap") || id.includes("@gsap/react")) {
            return "vendor-animation";
          }

          if (
            id.includes("react-dom") ||
            id.includes("/react/") ||
            id.includes("scheduler")
          ) {
            return "vendor-react";
          }

          if (
            id.includes("lucide-react") ||
            id.includes("react-tooltip") ||
            id.includes("dayjs")
          ) {
            return "vendor-ui"
          }

          return "vendor"
        },
      },
    },
  },
}); 