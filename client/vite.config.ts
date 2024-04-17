import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://brianatzori.it/spendilow/',
  plugins: [react()],
  server: {
    host: true,
  },

  // server: {
  //   watch: {
  //     usePolling: true,
  //   },
  //   // host: true, // needed for the Docker Container port mapping to work
  //   // port: 80, // you can replace this port with any port
  // },
});
