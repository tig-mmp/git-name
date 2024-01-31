export default {
  build: {
    cssCodeSplit: true,
    outDir: "dist",
  },
  server: {
    host: true,
    hmr: {
      host: "0.0.0.0",
      port: 3010,
    },
  }
};
