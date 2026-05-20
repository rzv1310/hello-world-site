/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

function preloadFonts() {
  let isSsrBuild = false;
  return {
    name: "preload-fonts",
    enforce: "post" as const,
    configResolved(config) {
      isSsrBuild = !!config.build.ssr;
    },
    closeBundle() {
      // The SSR build emits no index.html — skip so we don't append
      // duplicate font preloads to the client build's dist/index.html.
      if (isSsrBuild) return;
      const distDir = path.resolve(__dirname, "dist");
      const htmlPath = path.join(distDir, "index.html");
      if (!fs.existsSync(htmlPath)) return;

      const assetsDir = path.join(distDir, "assets");
      const fonts = fs.readdirSync(assetsDir).filter((f) => f.endsWith(".woff2"));
      if (!fonts.length) return;

      const tags = fonts.map(
        (f) =>
          `<link rel="preload" as="font" type="font/woff2" href="/assets/${f}" crossorigin />`
      );
      let html = fs.readFileSync(htmlPath, "utf-8");
      html = html.replace("</head>", `    ${tags.join("\n    ")}\n  </head>`);
      fs.writeFileSync(htmlPath, html);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), preloadFonts()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
  },
}));
