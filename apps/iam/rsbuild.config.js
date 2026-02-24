import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import mfConfig from './module-federation.config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation(mfConfig),
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
  dev: {
    lazyCompilation: false,
    client: {
      overlay: false,
    },
  },
  builtins: {
    react: {
      refresh: true,
    },
  },
  experiments: {
    rspackFuture: {
      disableApplyEntryLazily: true,
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