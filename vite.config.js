import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { VitePWA } from 'vite-plugin-pwa';

// const PWAConfig = {
//   workbox: {
//     cleanupOutdatedCaches: true,
//     sourcemap: true
//   },

//   registerType: 'autoUpdate',

//   devOptions: {
//     enabled: true,
//     suppressWarnings: true
//   },

//   includeAssets: [
//     'icons/logo-152.png',
//     'icons/logo-196.png',
//     'icons/logo-512.png',
//     'icons/logo.ico',
//     'robots.txt'
//   ],
//   manifest: {
//     name: 'Dashify',
//     short_name: 'Dashify',
//     start_url: '/',
//     display: 'standalone',
//     background_color: '#3B86F8',
//     theme_color: '#343434',
//     description: 'Easily and quickly monitor Minecraft servers',
//     icons: [
//       {
//         src: 'icons/logo.ico',
//         sizes: '64x64 32x32 24x24 16x16',
//         type: 'image/x-icon'
//       },
//       {
//         src: 'icons/logo-152.png',
//         type: 'image/png',
//         sizes: '152x152'
//       },
//       {
//         src: 'icons/logo-196.png',
//         type: 'image/png',
//         sizes: '196x196'
//       },
//       {
//         src: 'icons/logo-512.png',
//         type: 'image/png',
//         sizes: '512x512'
//       },
//       {
//         src: 'icons/logo-512.png',
//         type: 'image/png',
//         sizes: '512x512',
//         purpose: 'any maskable'
//       }
//     ]
//   }
// };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
    // VitePWA(PWAConfig)
  ]
});
