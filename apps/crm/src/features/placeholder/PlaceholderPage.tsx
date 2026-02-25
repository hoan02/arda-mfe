import React from "react";

const PlaceholderPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-white rounded-lg shadow-sm border border-gray-100 mt-10">
      <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-8 h-8 text-emerald-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">CRM Application</h1>
      <p className="text-gray-500 text-center max-w-md">
        Welcome to the Customer Relationship Management (CRM) module. This
        application is currently being initialized.
      </p>
      <div className="mt-8">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
          Status: Ready
        </span>
      </div>
    </div>
  );
};

export default PlaceholderPage;
