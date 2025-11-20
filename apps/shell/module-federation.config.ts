import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

const mfConfig = createModuleFederationConfig({
  name: 'shell',
  remotes: {
    'admin': 'admin@http://localhost:3001/mf-manifest.json',
    'dataGovernance': 'dataGovernance@http://localhost:3002/mf-manifest.json',
  },
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
