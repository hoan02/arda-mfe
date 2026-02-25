import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

// Support environment variables for production URLs
const IAM_APP_URL = process.env.IAM_APP_URL || "http://localhost:3001";
const BPM_APP_URL = process.env.BPM_APP_URL || "http://localhost:3002";
const CRM_APP_URL = process.env.CRM_APP_URL || "http://localhost:3003";

const mfConfig = createModuleFederationConfig({
  name: "shell",
  remotes: {
    iam: `iam@${IAM_APP_URL}/mf-manifest.json`,
    bpm: `bpm@${BPM_APP_URL}/mf-manifest.json`,
    crm: `crm@${CRM_APP_URL}/mf-manifest.json`,
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
