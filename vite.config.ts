import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/insura',   // drives asset paths
  plugins: [react()],
});
