import React from "react";

export function ShellDashboard() {
  return (
    <div className="h-full bg-gray-50">
      <main className="p-8 h-full overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-lg text-gray-600">
              Welcome to the micro-frontend shell application!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                🚀 Module Federation
              </h3>
              <p className="text-gray-600 mb-4">
                Dynamic micro-frontend loading
              </p>
              <div className="text-2xl font-bold text-green-600">Active</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                ⚛️ React Bridge
              </h3>
              <p className="text-gray-600 mb-4">
                Cross-framework compatibility
              </p>
              <div className="text-2xl font-bold text-green-600">Enabled</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                🔄 Hot Reload
              </h3>
              <p className="text-gray-600 mb-4">Instant development feedback</p>
              <div className="text-2xl font-bold text-green-600">Running</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                📊 Performance
              </h3>
              <p className="text-gray-600 mb-4">Optimized build process</p>
              <div className="text-2xl font-bold text-green-600">Fast</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
