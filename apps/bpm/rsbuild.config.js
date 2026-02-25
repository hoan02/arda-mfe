import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import mfConfig from './module-federation.config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    pluginReact({
      swcReactOptions: {
        runtime: 'automatic',
      },
    }),
    pluginModuleFederation(mfConfig),
  ],
  source: {
    entry: {
      index: './src/index.tsx',
    },
    include: [/packages[\/](ui|shared)[\/]/],
  },
  html: {
    template: './index.html',
  },
  server: {
    port: 3002,
    open: false,
  },
  dev: {
    lazyCompilation: false,
    client: {
      overlay: false,
    },
  },
  tools: {
    rspack: {
      resolve: {
        alias: {
          '@': './src',
          'react-router-dom$': path.resolve(
            __dirname,
            'node_modules/@module-federation/bridge-react/dist/router-v7.es.js',
          ),
        },
      },
      optimization: {
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            lucide: {
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              name: 'lucide',
              chunks: 'all',
            },
          },
        },
      },
    },
  },
});