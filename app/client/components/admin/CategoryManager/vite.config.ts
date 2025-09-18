import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import RubyPlugin from "vite-plugin-ruby";

export default defineConfig({
  ssr: {
    noExternal: true,
  },
  plugins: [react(), tailwindcss(), RubyPlugin()],
  build: { sourcemap: false },
  server: {
    host: "0.0.0.0",
    port: 3000,
    open: false,
    hmr: {
      host: "localhost",
    },
    watch: { usePolling: true, interval: 500 },
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Default Rails port
        changeOrigin: true,
      }
    }
  },
});
