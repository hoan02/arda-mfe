import React from "react";
import { Button } from "@workspace/ui/components/button";

export function Settings() {
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
