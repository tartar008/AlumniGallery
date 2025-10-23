import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    base: "/AlumniGallery/",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@shared": path.resolve(__dirname, "../shared"), // ✅ เพิ่มบรรทัดนี้
        },
    },
    build: {
        outDir: "dist",
    },
});
