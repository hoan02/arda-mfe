import React from "react";
import { Database, FileText, Layers, Tag } from "lucide-react";

export function DataGovernanceDashboard() {
  return (
    <div className="h-full bg-gray-50">
      <main className="p-8 h-full overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Data Governance Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Manage and govern your organization's data assets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Database className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-sm text-gray-500">Reference Data</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">1,234</h3>
              <p className="text-sm text-gray-600">Active reference datasets</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-sm text-gray-500">Master Data</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">567</h3>
              <p className="text-sm text-gray-600">Master data entities</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Layers className="h-6 w-6 text-purple-600" />
                </div>
                <span className="text-sm text-gray-500">Data Models</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">89</h3>
              <p className="text-sm text-gray-600">Data model definitions</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Tag className="h-6 w-6 text-orange-600" />
                </div>
                <span className="text-sm text-gray-500">Data Types</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">45</h3>
              <p className="text-sm text-gray-600">Custom data types</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Recent Data Quality Issues
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      Missing Reference Data
                    </p>
                    <p className="text-sm text-gray-600">Customer table</p>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                    High
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      Data Type Mismatch
                    </p>
                    <p className="text-sm text-gray-600">Product catalog</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    Medium
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      Schema Validation
                    </p>
                    <p className="text-sm text-gray-600">Order management</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Low
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Data Governance Metrics
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Data Quality Score</span>
                    <span>87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "87%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Compliance Rate</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Data Lineage Coverage</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
