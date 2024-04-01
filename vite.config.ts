import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron/simple";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: "./dist/react/",
    },
    server: {
        port: 3000,
    },
    plugins: [
        react(),
        electron({
            main: {
                entry: "./src-electron/electron-main.ts",
            },
            preload: {
                input: "./src-electron/electron-preload.ts",
            },
        }),
    ],
});
