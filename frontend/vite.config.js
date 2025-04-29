import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { Buffer } from 'buffer';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
    global: 'globalThis'
  },
  resolve: {
    alias: {
      buffer: 'buffer/' // Use ES Module path for buffer
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
      '.gitpod.io' // This allows any Gitpod workspace
    ]
  },
  build: {
    rollupOptions: {
      plugins: [
        {
          name: 'buffer-polyfill',
          transform(code, id) {
            if (id.includes('node_modules')) return;
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
