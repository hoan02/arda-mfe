import { useState, useCallback, useMemo } from 'react';
import { TableState, User } from '../types';

export function useUsersTable() {
  const [data] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2024-01-15',
      createdAt: '2023-06-01',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'active',
      lastLogin: '2024-01-14',
      createdAt: '2023-07-15',
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Moderator',
      status: 'inactive',
      lastLogin: '2024-01-10',
      createdAt: '2023-08-20',
    },
  ]);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const handleSelectRow = useCallback((userId: string) => {
    setSelectedRows(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedRows(prev =>
      prev.length === filteredData.length
        ? []
        : filteredData.map(user => user.id)
    );
  }, [filteredData]);

  return {
    data: filteredData,
    selectedRows,
    searchTerm,
    setSearchTerm,
    handleSelectRow,
    handleSelectAll,
  };
}
