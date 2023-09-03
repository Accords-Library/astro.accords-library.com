import node from "@astrojs/node";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  srcDir: "./src",
  publicDir: "./public",
  outDir: "./dist",
  adapter: node({
    mode: "standalone",
  }),
  server: {
    port: import.meta.env.ASTRO_PORT,
    host: import.meta.env.ASTRO_HOST,
  },
});
