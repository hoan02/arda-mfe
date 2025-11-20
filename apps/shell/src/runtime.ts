import { init } from '@module-federation/runtime';

const env = import.meta.env as Record<string, string | undefined>;
const ADMIN_APP_URL = env.ADMIN_APP_URL || 'http://localhost:3001';
const DATA_GOVERNANCE_APP_URL = env.DATA_GOVERNANCE_APP_URL || 'http://localhost:3002';

// Initialize Module Federation runtime
init({
  name: 'shell',
  remotes: [
    {
      name: 'admin',
      entry: `${ADMIN_APP_URL}/mf-manifest.json`,
    },
    {
      name: 'dataGovernance',
      entry: `${DATA_GOVERNANCE_APP_URL}/mf-manifest.json`,
    },
  ],
});
