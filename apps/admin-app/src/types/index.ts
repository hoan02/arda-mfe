// Admin app types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  createdAt: string;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface TableState {
  data: User[];
  columns: TableColumn[];
  pagination: PaginationState;
  selectedRows: string[];
  searchTerm: string;
}
