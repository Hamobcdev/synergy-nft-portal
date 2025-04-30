import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/synergy-nft-portal/',
  define: {
    'process.env': {},
    global: 'globalThis'
  },
  resolve: {
    alias: {
      buffer: 'buffer'
    }
  },
  optimizeDeps: {
    include: ['buffer']
  },
  server: {
    port: 5173,
    open: true,
    allowedHosts: [
      '5173-hamobcdev-synergynftpor-ti6oz6hrnfe.ws-us118.gitpod.io',
      '.gitpod.io'
    ]
  },
  build: {
    rollupOptions: {
      plugins: [
        {
          name: 'buffer-polyfill',
          transform(code, id) {
            if (!code.includes('Buffer') || id.includes('node_modules')) {
              return null;
            }
            return {
              code: `
                import { Buffer } from 'buffer';
                window.Buffer = window.Buffer || Buffer;
                ${code}
              `,
              map: null
            };
          }
        }
      ]
    }
  }
});
