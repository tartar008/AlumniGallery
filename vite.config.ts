import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // ✅ สำหรับ local dev และ deploy แบบ root (frontend only)
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    open: true, // optional เปิด browser อัตโนมัติ
  },
});
