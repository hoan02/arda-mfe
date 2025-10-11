import React, { useMemo, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { Button } from "@workspace/ui/components/button";
import { DataTablePagination } from "../../components/ui/DataTablePagination";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  Download,
  Eye,
  Search,
} from "lucide-react";
import { Input } from "@workspace/ui/components/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

export function UsersManagement() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const users: User[] = useMemo(
    () => [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "Active",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "User",
        status: "Active",
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "User",
        status: "Inactive",
      },
      {
        id: 4,
        name: "Alice Brown",
        email: "alice@example.com",
        role: "Moderator",
        status: "Active",
      },
      {
        id: 5,
        name: "Charlie Wilson",
        email: "charlie@example.com",
        role: "User",
        status: "Active",
      },
      {
        id: 6,
        name: "Diana Prince",
        email: "diana@example.com",
        role: "Admin",
        status: "Active",
      },
      {
        id: 7,
        name: "Eva Martinez",
        email: "eva@example.com",
        role: "User",
        status: "Inactive",
      },
      {
        id: 8,
        name: "Frank Miller",
        email: "frank@example.com",
        role: "Moderator",
        status: "Active",
      },
      {
        id: 9,
        name: "Grace Lee",
        email: "grace@example.com",
        role: "User",
        status: "Active",
      },
      {
        id: 10,
        name: "Henry Davis",
        email: "henry@example.com",
        role: "User",
        status: "Inactive",
      },
      {
        id: 11,
        name: "Ivy Chen",
        email: "ivy@example.com",
        role: "Admin",
        status: "Active",
      },
      {
        id: 12,
        name: "Jack Thompson",
        email: "jack@example.com",
        role: "User",
        status: "Active",
      },
      {
        id: 13,
        name: "Kate Anderson",
        email: "kate@example.com",
        role: "Moderator",
        status: "Inactive",
      },
      {
        id: 14,
        name: "Liam O'Connor",
        email: "liam@example.com",
        role: "User",
        status: "Active",
      },
      {
        id: 15,
        name: "Maya Patel",
        email: "maya@example.com",
        role: "User",
        status: "Active",
      },
    ],
    []
  );

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={(e) =>
              table.toggleAllPageRowsSelected(!!e.target.checked)
            }
            className="rounded border-gray-300"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={(e) => row.toggleSelected(!!e.target.checked)}
            className="rounded border-gray-300"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "id",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              ID
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                status === "Active"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {status}
            </span>
          );
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          return (
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    enableMultiRowSelection: true,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
    },
  });

  const handleAdd = useCallback(() => {
    console.log("Add user");
  }, []);

  const handleEdit = useCallback(() => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    console.log("Edit user", selectedRows[0]?.original);
  }, [table]);

  const handleDelete = useCallback(() => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    console.log(
      "Delete users",
      selectedRows.map((row) => row.original)
    );
  }, [table]);

  const handleRefresh = useCallback(() => {
    console.log("Refresh data");
  }, []);

  const handleExport = useCallback(() => {
    console.log("Export data to Excel");
    // TODO: Implement Excel export functionality
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
      </div> */}

      <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-2 border-b">
          <div className="flex items-center space-x-2">
            <Button onClick={handleAdd}>Add User</Button>
            {table.getFilteredSelectedRowModel().rows.length === 1 && (
              <Button variant="outline" onClick={handleEdit}>
                Edit
              </Button>
            )}
            {table.getFilteredSelectedRowModel().rows.length > 0 && (
              <Button variant="outline" onClick={handleDelete}>
                Delete ({table.getFilteredSelectedRowModel().rows.length})
              </Button>
            )}
            <Button variant="outline" onClick={handleRefresh}>
              Refresh
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={globalFilter ?? ""}
                onChange={(event) =>
                  setGlobalFilter(String(event.target.value))
                }
                className="pl-8 w-[250px]"
              />
            </div>

            {/* Download Excel */}
            <Button variant="outline" size="icon" onClick={handleExport}>
              <Download className="h-4 w-4" />
            </Button>

            {/* Column Visibility */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Table */}
        {/* <div className="[&>div]:max-h-[calc(100vh-172px)]"> */}
        <div className="[&>div]:h-[calc(100vh-172px)]">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
