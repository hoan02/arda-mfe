import React from "react";
import { Layers, Database, FileText, Plus, Search, Filter } from "lucide-react";

export function DataModel() {
  return (
    <div className="h-full bg-gray-50">
      <main className="p-8 h-full overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Data Model Management
                </h1>
                <p className="text-lg text-gray-600">
                  Design and manage data models for your organization
                </p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Data Model
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Layers className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Logical Models
                  </h3>
                  <p className="text-sm text-gray-600">Business concepts</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">24</div>
              <div className="text-sm text-green-600">+2 this month</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Database className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Physical Models
                  </h3>
                  <p className="text-sm text-gray-600">Database schemas</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">18</div>
              <div className="text-sm text-green-600">+1 this month</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Conceptual Models
                  </h3>
                  <p className="text-sm text-gray-600">High-level views</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">12</div>
              <div className="text-sm text-gray-600">No change</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search data models..."
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
                    <Layers className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Customer Model
                    </h3>
                    <p className="text-sm text-gray-600">Logical</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">15</span> entities,{" "}
                  <span className="font-medium">42</span> attributes
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Published
                  </span>
                  <span className="text-xs text-gray-500">v2.1.0</span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Database className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Product Catalog
                    </h3>
                    <p className="text-sm text-gray-600">Physical</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">8</span> tables,{" "}
                  <span className="font-medium">28</span> columns
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Published
                  </span>
                  <span className="text-xs text-gray-500">v1.5.2</span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FileText className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Order Management
                    </h3>
                    <p className="text-sm text-gray-600">Conceptual</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">6</span> entities,{" "}
                  <span className="font-medium">18</span> relationships
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                    Draft
                  </span>
                  <span className="text-xs text-gray-500">v0.3.0</span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Layers className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Financial Data
                    </h3>
                    <p className="text-sm text-gray-600">Logical</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">12</span> entities,{" "}
                  <span className="font-medium">35</span> attributes
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Published
                  </span>
                  <span className="text-xs text-gray-500">v1.8.1</span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Database className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Inventory System
                    </h3>
                    <p className="text-sm text-gray-600">Physical</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">5</span> tables,{" "}
                  <span className="font-medium">22</span> columns
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
                    Deprecated
                  </span>
                  <span className="text-xs text-gray-500">v0.9.5</span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FileText className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      HR Management
                    </h3>
                    <p className="text-sm text-gray-600">Conceptual</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">9</span> entities,{" "}
                  <span className="font-medium">24</span> relationships
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    Review
                  </span>
                  <span className="text-xs text-gray-500">v1.0.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
