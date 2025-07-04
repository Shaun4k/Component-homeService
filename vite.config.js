import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr(), cssInjectedByJsPlugin()],
  build: {
    assetsInlineLimit: Infinity // forces all images to be inlined as base64
  }
});

