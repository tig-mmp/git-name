import { defineConfig } from "vite";

export default defineConfig({
  build: {
    cssCodeSplit: true,
    outDir: "dist",
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
});
