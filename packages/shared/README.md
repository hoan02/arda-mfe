# @workspace/shared

Shared utilities, hooks, and providers for the workspace.

## What's included

- **lib/**: Base API client, utilities
- **hooks/**: Generic React Query hooks, router hooks
- **providers/**: React Query provider, router adapter
- **contexts/**: React contexts for cross-app communication

## Usage

```typescript
import { BaseApiClient } from "@workspace/shared/lib";
import { createQueryHooks } from "@workspace/shared/hooks";
import { QueryProvider, RouterAdapter } from "@workspace/shared/providers";
```
