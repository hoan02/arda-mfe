// Legacy API client - now just re-exports the new structure
// This file is kept for backward compatibility

import { userApiClient } from '../features/users/utils/user-api-client';

export { BaseApiClient } from '@workspace/shared/lib/base-api-client';
export { userApiClient as apiClient } from '../features/users/utils/user-api-client';

// Export specific functions for DataTable (backward compatibility)
export const fetchUsersByIds = (ids: number[] | string[]) => userApiClient.getUsersByIds(ids);

// Re-export types
export * from '../types/api';
