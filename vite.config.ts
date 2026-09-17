
import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    createHtmlPlugin({
      inject: {
        head: [
          // Content Security Policy — previne XSS e carregamento de recursos não autorizados
          // Referência: https://owasp.org/www-project-secure-headers/
          {
            tag: "meta",
            attrs: {
              "http-equiv": "Content-Security-Policy",
              "content": [
                "default-src 'self'",
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com https://cdnjs.cloudflare.com",
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                "font-src 'self' https://fonts.gstatic.com data:",
                "img-src 'self' data: https: blob:",
                "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
                "frame-src 'self' https://accounts.google.com https://*.supabase.co",
                "object-src 'none'",
                "base-uri 'self'",
                "form-action 'self'",
                "frame-ancestors 'none'",
              ].join("; "),
            },
          },
          // X-Content-Type-Options — previne MIME sniffing
          {
            tag: "meta",
            attrs: {
              "http-equiv": "X-Content-Type-Options",
              "content": "nosniff",
            },
          },
          // X-Frame-Options — previne clickjacking
          {
            tag: "meta",
            attrs: {
              "http-equiv": "X-Frame-Options",
              "content": "DENY",
            },
          },
          // Referrer-Policy — controla quanto do referrer é enviado
          {
            tag: "meta",
            attrs: {
              name: "referrer",
              "content": "strict-origin-when-cross-origin",
            },
          },
          // Theme color para PWA
          {
            tag: "meta",
            attrs: {
              name: "theme-color",
              content: "#10b981",
            },
          },
        ],
      },
    }),
  ] as PluginOption[],
  // Resolução de aliases (compatível com tsconfig.json paths)
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  // Testes com Vitest
  test: {
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
    include: ["src/**/*.{test,spec}.{js,jsx}"],
    isolate: false,
    coverage: {
      reporter: ["text", "lcov"],
      include: ["src/**/*.{js,jsx}"],
      exclude: ["src/main.jsx", "src/setupTests.js"],
    },
  },
});
