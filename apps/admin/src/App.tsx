import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { Button } from "@workspace/ui/components/button";

// Admin Dashboard Component
function AdminDashboard() {
  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to the admin panel</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
          <h3 className="text-sm font-medium text-gray-500 mb-4">
            👥 Total Users
          </h3>
          <div className="text-3xl font-bold text-gray-900 mb-2">1,234</div>
          <div className="text-sm text-green-600 font-medium">
            +12% from last month
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
          <h3 className="text-sm font-medium text-gray-500 mb-4">📊 Orders</h3>
          <div className="text-3xl font-bold text-gray-900 mb-2">567</div>
          <div className="text-sm text-green-600 font-medium">
            +8% from last month
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
          <h3 className="text-sm font-medium text-gray-500 mb-4">💰 Revenue</h3>
          <div className="text-3xl font-bold text-gray-900 mb-2">$45,678</div>
          <div className="text-sm text-green-600 font-medium">
            +15% from last month
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
          <h3 className="text-sm font-medium text-gray-500 mb-4">📈 Growth</h3>
          <div className="text-3xl font-bold text-gray-900 mb-2">23%</div>
          <div className="text-sm text-green-600 font-medium">
            +3% from last month
          </div>
        </div>
      </div>
    </div>
  );
}

// Users Management Component
function UsersManagement() {
  const users = [
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
    {
      id: 16,
      name: "Noah Kim",
      email: "noah@example.com",
      role: "Admin",
      status: "Inactive",
    },
    {
      id: 17,
      name: "Olivia Taylor",
      email: "olivia@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 18,
      name: "Paul Rodriguez",
      email: "paul@example.com",
      role: "Moderator",
      status: "Active",
    },
    {
      id: 19,
      name: "Quinn Williams",
      email: "quinn@example.com",
      role: "User",
      status: "Inactive",
    },
    {
      id: 20,
      name: "Rachel Green",
      email: "rachel@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 21,
      name: "Samuel White",
      email: "samuel@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 22,
      name: "Tina Johnson",
      email: "tina@example.com",
      role: "User",
      status: "Inactive",
    },
    {
      id: 23,
      name: "Uma Sharma",
      email: "uma@example.com",
      role: "Moderator",
      status: "Active",
    },
    {
      id: 24,
      name: "Victor Chen",
      email: "victor@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 25,
      name: "Wendy Brown",
      email: "wendy@example.com",
      role: "User",
      status: "Inactive",
    },
  ];

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
        <Button>Add New User</Button>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === "Admin"
                        ? "bg-yellow-100 text-yellow-800"
                        : user.role === "Moderator"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Settings Component
function Settings() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Configure your application settings
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            General Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application Name
              </label>
              <input
                type="text"
                defaultValue="Admin Panel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Light</option>
                <option>Dark</option>
                <option>Auto</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Security</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-3" />
              <label className="text-sm font-medium text-gray-700">
                Enable Two-Factor Authentication
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <label className="text-sm font-medium text-gray-700">
                Require Strong Passwords
              </label>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-3" />
              <label className="text-sm font-medium text-gray-700">
                Email Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <label className="text-sm font-medium text-gray-700">
                Push Notifications
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex space-x-4">
        <Button>Save Changes</Button>
        <Button variant="outline">Reset to Default</Button>
      </div>
    </div>
  );
}

function App({ currentPath = "/" }: { currentPath?: string }) {
  // Render component based on currentPath
  const renderComponent = () => {
    switch (currentPath) {
      case "/":
        return <AdminDashboard />;
      case "/users":
        return <UsersManagement />;
      case "/settings":
        return <Settings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="h-full bg-gray-50">
      <main className="p-8 h-full overflow-auto">{renderComponent()}</main>
    </div>
  );
}

export default App;
