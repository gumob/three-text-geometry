import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
// import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  build: {
    rollupOptions: {
      external: [
        // '~/error',
        // '~/layout',
        // '~/parser',
        // '~/shader',
        // '~/shaders',
        // '~/types',
        // '~/utils',
      ]
    }
  },
  resolve: {
    alias: {
      // '~': path.resolve(__dirname, './src'),
    }
  }
});
