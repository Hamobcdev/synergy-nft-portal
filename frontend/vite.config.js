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
    open: true
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
