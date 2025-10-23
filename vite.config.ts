import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "./", // 👈 ต้องเป็นชื่อ repo
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "docs", // 🟢 build ลง docs
    emptyOutDir: true, // 🧹 เคลียร์ของเก่าก่อน build ทุกครั้ง
  },
});
