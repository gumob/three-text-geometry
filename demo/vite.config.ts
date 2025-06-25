import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// const tsconfigFile = process.env.TS_NODE_PROJECT || 'tsconfig.app.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    // tsconfigPaths({ projects: [tsconfigFile] }),
    tsconfigPaths(),
  ],
  build: {
    rollupOptions: {
      external: [
      ]
    }
  },
  esbuild: {
    // jsxInject: `import React from 'react'`,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    }
  }
});
