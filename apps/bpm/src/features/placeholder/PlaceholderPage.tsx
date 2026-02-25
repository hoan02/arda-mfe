import React from "react";

const PlaceholderPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-white rounded-lg shadow-sm border border-gray-100 mt-10">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-8 h-8 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">BPM Application</h1>
      <p className="text-gray-500 text-center max-w-md">
        Welcome to the Business Process Management (BPM) module. This
        application is currently being initialized.
      </p>
      <div className="mt-8">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          Status: Ready
        </span>
      </div>
    </div>
  );
};

export default PlaceholderPage;
