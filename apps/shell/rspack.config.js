import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: './src/index.tsx',
    },
  },
  html: {
    template: './index.html',
  },
  server: {
    port: 3000,
    open: true,
  },
  tools: {
    rspack: {
      resolve: {
        alias: {
          '@': './src',
        },
      },
    },
  },
});