import { userApiClient } from "./user-api-client";

// Interface to match DataFetchParams from data-table
export interface DataFetchParams {
  page: number;
  limit: number;
  search: string;
  from_date: string;
  to_date: string;
  sort_by: string;
  sort_order: string;
}

// Interface for the result - match with data-table expectations
export interface DataFetchResult<TData> {
  success: boolean;
  data: TData[];
  pagination: {
    page: number;
    limit: number;
    total_pages: number;
    total_items: number;
  };
}

// Fetch function (not a hook) - can be called from async functions
export async function fetchUsersData(params: DataFetchParams): Promise<DataFetchResult<any>> {
  // Ensure date range values are properly initialized
  const safeFromDate = params.from_date || "";
  const safeToDate = params.to_date || "";

  const filters = {
    page: params.page - 1, // Convert to 0-based indexing
    size: params.limit,
    search: params.search,
    sortBy: params.sort_by,
    sortDirection: params.sort_order as "asc" | "desc",
    // Add date range filters if needed
    ...(safeFromDate && { createdFrom: safeFromDate }),
    ...(safeToDate && { createdTo: safeToDate }),
  };

  // Call the API directly
  const result = await userApiClient.getUsers(filters);

  return {
    success: true,
    data: result.content || [],
    pagination: {
      page: params.page,
      limit: params.limit,
      total_pages: result.totalPages || 0,
      total_items: result.totalElements || 0,
    },
  };
}
