import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'admin',
      exposes: {
        './export-app': './src/export-app.tsx',
      },
      dts: false,
    }),
  ],
  source: {
    entry: {
      index: './src/index.tsx',
    },
  },
  html: {
    template: './index.html',
  },
  server: {
    port: 3001,
    open: false,
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
