import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',

      // Include all public assets in the SW scope
      includeAssets: [
        'favicon.ico',
        'favicon.svg',
        'logo.svg',
        'apple-touch-icon-180x180.png',
        'pwa-64x64.png',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'maskable-icon-512x512.png',
      ],

      // Web App Manifest
      manifest: {
        name: 'Pametnica',
        short_name: 'Pametnica',
        description: 'Interaktivne edukativne igre za decu uzrasta 5–7 godina',
        theme_color: '#4F8CFF',
        background_color: '#ffffff',
        display: 'standalone',
        lang: 'sr',
        start_url: '/',
        scope: '/',
        orientation: 'portrait',
        icons: [
          { src: 'pwa-64x64.png',            sizes: '64x64',   type: 'image/png' },
          { src: 'pwa-192x192.png',           sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png',           sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },

      // Workbox — service worker caching strategy
      workbox: {
        // Precache all compiled assets (JS, CSS, HTML)
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,ttf,eot}'],

        // App shell — always serve from cache first
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/api\//],

        // Runtime caching for external resources
        runtimeCaching: [
          // Google Fonts stylesheet
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'pametnica-google-fonts',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // Google Fonts files
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'pametnica-gstatic-fonts',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },

      // Enable SW in dev mode for testing
      devOptions: {
        enabled: false, // turn on temporarily when testing offline; keep off during normal dev
        type: 'module',
      },
    }),
  ],

  server: {
    port: 3001,
    strictPort: true,
    open: false,
  },

  preview: {
    port: 3001,
    strictPort: true,
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor';
          }
        },
      },
    },
  },

  resolve: {
    alias: {
      '@core':     resolve(__dirname, 'src/core'),
      '@ui':       resolve(__dirname, 'src/ui'),
      '@modules':  resolve(__dirname, 'src/modules'),
      '@data':     resolve(__dirname, 'src/data'),
      '@hooks':    resolve(__dirname, 'src/hooks'),
      '@services': resolve(__dirname, 'src/services'),
    },
  },
});
