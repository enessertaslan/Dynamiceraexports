import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function optimizeInitialRequests() {
  return {
    name: "dynamic-era-optimize-initial-requests",
    enforce: "post",
    transformIndexHtml(html) {
      const deferredCssHtml = html.replace(
        /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/g,
        `<script>!function(){var l=document.createElement('link');l.rel='stylesheet';l.href='$1';l.crossOrigin='';document.head.appendChild(l)}();</script><noscript><link rel="stylesheet" crossorigin href="$1"></noscript>`,
      );

      return deferredCssHtml.replace(
        /<script type="module" crossorigin src="([^"]+\.js)"><\/script>/g,
        `<script type="module" crossorigin fetchpriority="high" src="$1"></script>`,
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), optimizeInitialRequests()],
});
