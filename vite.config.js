import { defineConfig } from "vite";
import vitePluginFaviconsInject from "vite-plugin-favicons-inject";

export default defineConfig({
  base: "/battleship/",
  plugins: [vitePluginFaviconsInject("./src/assets/favicon.png")],
});
