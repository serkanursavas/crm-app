import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "dist", // Bu satırın mevcut olduğunu kontrol edin
    },
});
