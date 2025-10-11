import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@workspace/ui/components/sonner";
import { AdminDashboard } from "./features/dashboard/AdminDashboard";
import { UsersManagement } from "./features/users/UsersManagement";
import { Settings } from "./features/settings/Settings";
import "./index.css";

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
