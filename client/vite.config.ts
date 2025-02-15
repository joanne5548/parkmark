import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@json_data": path.resolve(__dirname, "../scripts/json_data"),
            "@lib": path.resolve(__dirname, "src/lib"),
            "@assets": path.resolve(__dirname, "src/assets"),
        },
        extensions: [".js", ".ts", ".jsx", ".tsx"],
    },
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
});
