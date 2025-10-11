import React from "react";
import { FallbackErrorProps } from "../../types";

export function FallbackError({ error }: FallbackErrorProps) {
  return (
    <div className="p-8 text-center bg-white rounded-xl border border-gray-200 m-8">
      <h1 className="text-red-600 text-xl font-semibold mb-4">
        Error loading remote component
      </h1>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
