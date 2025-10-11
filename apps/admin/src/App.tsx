import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { AdminDashboard } from "./components/AdminDashboard";
import { UsersManagement } from "./components/UsersManagement";
import { Settings } from "./components/Settings";
import { Toaster } from "@workspace/ui/components/sonner";

function App() {
  return (
    <BrowserRouter basename="/admin">
      <div className="h-full bg-gray-50 flex flex-col">
        <main className="flex-1 overflow-auto p-2">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/users" element={<UsersManagement />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
