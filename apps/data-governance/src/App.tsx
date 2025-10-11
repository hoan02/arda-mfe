import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@workspace/ui/components/sonner";
import { DataGovernanceDashboard } from "./features/dashboard/DataGovernanceDashboard";
import { ReferenceData } from "./features/reference-data/ReferenceData";
import { MasterData } from "./features/master-data/MasterData";
import { DataModel } from "./features/data-model/DataModel";
import { DataType } from "./features/data-type/DataType";
import "./index.css";

function App() {
  return (
    <BrowserRouter basename="/data-governance">
      <div className="h-full bg-gray-50 flex flex-col">
        <main className="flex-1 overflow-auto p-2">
          <Routes>
            <Route path="/" element={<DataGovernanceDashboard />} />
            <Route path="/reference-data" element={<ReferenceData />} />
            <Route path="/master-data" element={<MasterData />} />
            <Route path="/data-model" element={<DataModel />} />
            <Route path="/data-type" element={<DataType />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
