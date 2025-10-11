import React from "react";
import { useLocation } from "react-router-dom";
import { createRemoteAppComponent } from "@module-federation/bridge-react";
import { loadRemote } from "@module-federation/runtime";
import { FallbackError } from "../common/FallbackError";
import { FallbackLoading } from "../common/FallbackLoading";
import { RemoteAppProps } from "../../types";

// Admin App Component
const AdminApp = createRemoteAppComponent({
  loader: () => loadRemote("admin/export-app"),
  fallback: FallbackError,
  loading: <FallbackLoading />,
});

// Data Governance App Component
const DataGovernanceApp = createRemoteAppComponent({
  loader: () => loadRemote("dataGovernance/export-app"),
  fallback: FallbackError,
  loading: <FallbackLoading />,
});

// Admin App Wrapper
export function AdminAppWrapper() {
  const location = useLocation();

  return (
    <div>
      <AdminApp
        key={location.pathname}
        basename="/admin"
        props1="props_value"
        props2="another_props_value"
      />
    </div>
  );
}

// Data Governance App Wrapper
export function DataGovernanceAppWrapper() {
  const location = useLocation();

  return (
    <div>
      <DataGovernanceApp
        key={location.pathname}
        basename="/data-governance"
        props1="props_value"
        props2="another_props_value"
      />
    </div>
  );
}
