import { init } from '@module-federation/runtime';

// Initialize Module Federation runtime
init({
  name: 'shell',
  remotes: [
    {
      name: 'admin',
      entry: 'http://localhost:3001/mf-manifest.json',
    },
  ],
});
