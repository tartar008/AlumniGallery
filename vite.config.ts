import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // 👇 สำคัญมากสำหรับ GitHub Pages
  base: "/AlumniGallery/",
  plugins: [react()],
  root: path.resolve(__dirname, "client"),
  build: {
    // 👇 ต้องให้ไฟล์ index.html อยู่ตรงนี้
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
});
