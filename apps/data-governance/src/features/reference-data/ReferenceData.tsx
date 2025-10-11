import React from "react";
import { Database, Plus, Search, Filter } from "lucide-react";

export function ReferenceData() {
  return (
    <div className="h-full bg-gray-50">
      <main className="p-8 h-full overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Reference Data Management
                </h1>
                <p className="text-lg text-gray-600">
                  Manage standardized reference data across your organization
                </p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Reference Data
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search reference data..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Database className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Country Codes
                    </h3>
                    <p className="text-sm text-gray-600">ISO 3166-1</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">195</span> countries
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Active
                  </span>
                  <span className="text-xs text-gray-500">
                    Last updated: 2 days ago
                  </span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Database className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Currency Codes
                    </h3>
                    <p className="text-sm text-gray-600">ISO 4217</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">180</span> currencies
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Active
                  </span>
                  <span className="text-xs text-gray-500">
                    Last updated: 1 week ago
                  </span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Database className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Industry Codes
                    </h3>
                    <p className="text-sm text-gray-600">NAICS</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">1,057</span> industries
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Active
                  </span>
                  <span className="text-xs text-gray-500">
                    Last updated: 3 days ago
                  </span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Database className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Language Codes
                    </h3>
                    <p className="text-sm text-gray-600">ISO 639-1</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">184</span> languages
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Active
                  </span>
                  <span className="text-xs text-gray-500">
                    Last updated: 5 days ago
                  </span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Database className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Status Codes
                    </h3>
                    <p className="text-sm text-gray-600">Custom</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">12</span> statuses
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                    Pending
                  </span>
                  <span className="text-xs text-gray-500">
                    Last updated: 1 day ago
                  </span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Database className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Priority Levels
                    </h3>
                    <p className="text-sm text-gray-600">Custom</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">5</span> levels
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Active
                  </span>
                  <span className="text-xs text-gray-500">
                    Last updated: 1 week ago
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
