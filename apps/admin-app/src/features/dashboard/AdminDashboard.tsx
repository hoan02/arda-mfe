export function AdminDashboard() {
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
