import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/AlumniGallery/", // 👈 สำคัญมาก — ทำให้ path เป็นแบบ relative (ไม่ขึ้นต้นด้วย /)
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "docs", // 🟢 บอกให้ build ไปไว้ใน docs แทน dist
  },
});
