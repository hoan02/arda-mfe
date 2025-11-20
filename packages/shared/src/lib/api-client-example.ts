import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BaseApiClient, ApiError } from './base-api-client';

// Example API client extending BaseApiClient
class ExampleApiClient extends BaseApiClient {
  constructor() {
    super('http://localhost:8000/api/v1');
  }

  // Example: Get all items
  async getItems(params?: { page?: number; limit?: number }) {
    return this.get<{ items: any[]; total: number }>('/items', params);
  }

  // Example: Get single item
  async getItem(id: string) {
    return this.get<any>(`/items/${id}`);
  }

  // Example: Create item
  async createItem(data: any) {
    return this.post<any>('/items', data);
  }

  // Example: Update item
  async updateItem(id: string, data: any) {
    return this.put<any>(`/items/${id}`, data);
  }

  // Example: Delete item
  async deleteItem(id: string) {
    return this.delete(`/items/${id}`);
  }
}

// Create instance
const apiClient = new ExampleApiClient();

// Example React hooks using TanStack Query
export function useItems(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: apiClient.getQueryKey('/items', params),
    queryFn: () => apiClient.getItems(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useItem(id: string) {
  return useQuery({
    queryKey: apiClient.getQueryKey(`/items/${id}`),
    queryFn: () => apiClient.getItem(id),
    enabled: !!id, // Only run if id exists
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => apiClient.createItem(data),
    onSuccess: () => {
      // Invalidate and refetch items list
      queryClient.invalidateQueries({
        queryKey: apiClient.getQueryKeysForEndpoint('/items'),
      });
    },
    onError: (error: ApiError) => {
      console.error('Failed to create item:', error.message);
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiClient.updateItem(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate specific item and items list
      queryClient.invalidateQueries({
        queryKey: apiClient.getQueryKey(`/items/${id}`),
      });
      queryClient.invalidateQueries({
        queryKey: apiClient.getQueryKeysForEndpoint('/items'),
      });
    },
    onError: (error: ApiError) => {
      console.error('Failed to update item:', error.message);
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteItem(id),
    onSuccess: () => {
      // Invalidate items list
      queryClient.invalidateQueries({
        queryKey: apiClient.getQueryKeysForEndpoint('/items'),
      });
    },
    onError: (error: ApiError) => {
      console.error('Failed to delete item:', error.message);
    },
  });
}

// Example usage in component:
/*
function ItemsList() {
  const { data: items, isLoading, error } = useItems({ page: 1, limit: 10 });
  const createItemMutation = useCreateItem();
  const deleteItemMutation = useDeleteItem();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {items?.items.map(item => (
        <div key={item.id}>
          {item.name}
          <button onClick={() => deleteItemMutation.mutate(item.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
*/
