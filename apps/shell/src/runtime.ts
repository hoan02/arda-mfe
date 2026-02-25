import { init } from '@module-federation/runtime';

const env = import.meta.env as Record<string, string | undefined>;
const IAM_APP_URL = env.IAM_APP_URL || 'http://localhost:3001';

// Initialize Module Federation runtime
init({
  name: 'shell',
  remotes: [
    {
      name: 'iam',
      entry: `${IAM_APP_URL}/mf-manifest.json`,
    },
  ],
});
