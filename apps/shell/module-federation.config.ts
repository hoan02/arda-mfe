import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

const mfConfig = createModuleFederationConfig({
  name: 'shell',
  remotes: {
    admin: 'admin@http://localhost:3001/mf-manifest.json',
  },
  dts: false,
  shared: {
    react: {
      singleton: true,
      requiredVersion: '^19.1.1',
      eager: true,
    },
    'react-dom': {
      singleton: true,
      requiredVersion: '^19.1.1',
      eager: true,
    },
    'react-router-dom': {
      singleton: true,
      requiredVersion: '^6.28.0',
      eager: true,
    },
    'lucide-react': {
      singleton: true,
      requiredVersion: '^0.475.0',
      eager: true,
    },
  },
});

// 👇 Thêm type annotation rõ ràng cho export
export default mfConfig as ReturnType<typeof createModuleFederationConfig>;
