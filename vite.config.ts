import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  base: '/insura',
  plugins: [react(),
    visualizer({
      filename: 'bundle-visualizer.html',
      template: 'treemap', // 'sunburst' or 'network' also available
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  server: {
    host: true,
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
        },
      },
    },
  },
});
