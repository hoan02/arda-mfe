import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

const mfConfig = createModuleFederationConfig({
  name: 'dataGovernance',
  exposes: {
    './export-app': './src/export-app.tsx',
  },
  filename: 'remoteEntry.js',
  dts: false,
  shared: {
    react: {
      singleton: true,
      requiredVersion: '^19.2.0',
      eager: true,
    },
    'react-dom': {
      singleton: true,
      requiredVersion: '^19.2.0',
      eager: true,
    },
    'lucide-react': {
      singleton: true,
      requiredVersion: '^0.554.0',
      eager: true,
    },
  },
});

// 👇 Thêm type annotation rõ ràng cho export
export default mfConfig as ReturnType<typeof createModuleFederationConfig>;
