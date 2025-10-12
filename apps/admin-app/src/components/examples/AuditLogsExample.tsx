import React, { useState } from "react";
import {
  useAuditLogs,
  useAuditLogStats,
} from "../../hooks/queries/useAuditLogs";
import { AuditLogFilterRequest } from "../../types/api";

export function AuditLogsExample() {
  const [filters, setFilters] = useState<AuditLogFilterRequest>({
    page: 0,
    size: 10,
    sortBy: "createdAt",
    sortDirection: "desc",
  });

  const { data: auditLogsData, isLoading } = useAuditLogs(filters);
  const { data: statsData } = useAuditLogStats();

  const auditLogs = auditLogsData?.content || [];
  const totalElements = auditLogsData?.totalElements || 0;
  const totalPages = auditLogsData?.totalPages || 0;
  const currentPage = auditLogsData?.number || 0;

  const handleFilterChange = (newFilters: Partial<AuditLogFilterRequest>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 0 }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const getActionTypeColor = (actionType: string) => {
    switch (actionType.toLowerCase()) {
      case "create":
        return "bg-green-100 text-green-800";
      case "update":
        return "bg-blue-100 text-blue-800";
      case "delete":
        return "bg-red-100 text-red-800";
      case "login":
        return "bg-purple-100 text-purple-800";
      case "logout":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Audit Logs</h1>

      {/* Stats */}
      {statsData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(statsData).map(([key, value]) => (
            <div key={key} className="bg-white p-4 rounded-lg shadow">
              <div className="text-sm text-gray-600 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </div>
              <div className="text-2xl font-bold text-gray-900">{value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Action Type
            </label>
            <select
              value={filters.actionType || ""}
              onChange={(e) =>
                handleFilterChange({ actionType: e.target.value || undefined })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Actions</option>
              <option value="CREATE">Create</option>
              <option value="UPDATE">Update</option>
              <option value="DELETE">Delete</option>
              <option value="LOGIN">Login</option>
              <option value="LOGOUT">Logout</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Entity Type
            </label>
            <select
              value={filters.entityType || ""}
              onChange={(e) =>
                handleFilterChange({ entityType: e.target.value || undefined })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Entities</option>
              <option value="USER">User</option>
              <option value="ROLE">Role</option>
              <option value="PERMISSION">Permission</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={filters.username || ""}
              onChange={(e) =>
                handleFilterChange({ username: e.target.value || undefined })
              }
              placeholder="Filter by username..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">User ID</label>
            <input
              type="number"
              value={filters.userId || ""}
              onChange={(e) =>
                handleFilterChange({
                  userId: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              placeholder="Filter by user ID..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <span className="ml-2">Loading audit logs...</span>
                    </div>
                  </td>
                </tr>
              ) : auditLogs.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No audit logs found
                  </td>
                </tr>
              ) : (
                auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActionTypeColor(log.actionType)}`}
                      >
                        {log.actionType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {log.entityType}
                      </div>
                      <div className="text-sm text-gray-500">
                        {log.entityName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {log.username || "System"}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {log.userId || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.ipAddress || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {log.oldValues &&
                          Object.keys(log.oldValues).length > 0 && (
                            <div className="mb-1">
                              <span className="text-xs text-gray-500">
                                Old:
                              </span>
                              <div className="text-xs bg-red-50 p-1 rounded">
                                {JSON.stringify(log.oldValues, null, 2)}
                              </div>
                            </div>
                          )}
                        {log.newValues &&
                          Object.keys(log.newValues).length > 0 && (
                            <div>
                              <span className="text-xs text-gray-500">
                                New:
                              </span>
                              <div className="text-xs bg-green-50 p-1 rounded">
                                {JSON.stringify(log.newValues, null, 2)}
                              </div>
                            </div>
                          )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  handlePageChange(Math.min(totalPages - 1, currentPage + 1))
                }
                disabled={currentPage === totalPages - 1}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">{currentPage * 10 + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min((currentPage + 1) * 10, totalElements)}
                  </span>{" "}
                  of <span className="font-medium">{totalElements}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() =>
                      handlePageChange(Math.max(0, currentPage - 1))
                    }
                    disabled={currentPage === 0}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      handlePageChange(
                        Math.min(totalPages - 1, currentPage + 1)
                      )
                    }
                    disabled={currentPage === totalPages - 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
