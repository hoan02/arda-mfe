import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

// Support environment variables for production URLs
const ADMIN_APP_URL = process.env.ADMIN_APP_URL || 'http://localhost:3001';
const DATA_GOVERNANCE_APP_URL = process.env.DATA_GOVERNANCE_APP_URL || 'http://localhost:3002';

const mfConfig = createModuleFederationConfig({
  name: 'shell',
  remotes: {
    'admin': `admin@${ADMIN_APP_URL}/mf-manifest.json`,
    'dataGovernance': `dataGovernance@${DATA_GOVERNANCE_APP_URL}/mf-manifest.json`,
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
