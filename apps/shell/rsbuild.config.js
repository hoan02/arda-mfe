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
    // pnpm symlinks workspace packages (@workspace/ui, @workspace/shared) into
    // node_modules, which Rspack excludes from SWC by default. We must explicitly
    // include them so SWC applies the 'automatic' JSX runtime transform — without
    // this, JSX in those packages compiles to React.createElement() (classic
    // runtime) and throws "React is not defined" at runtime.
    include: [/packages[\\/](ui|shared)[\\/]/],
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
          'react-router-dom$': path.resolve(
            __dirname,
            'node_modules/@module-federation/bridge-react/dist/router-v7.es.js',
          ),
        },
      },
    },
  },
});
