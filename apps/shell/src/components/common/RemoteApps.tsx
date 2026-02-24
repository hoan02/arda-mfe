import React from "react";
import { useLocation } from "react-router-dom";
import { createRemoteAppComponent } from "@module-federation/bridge-react";
import { loadRemote } from "@module-federation/runtime";
import { FallbackError } from "../common/FallbackError";
import { FallbackLoading } from "../common/FallbackLoading";
import { RemoteAppProps } from "../../types";

// IAM App Component
const IamApp = createRemoteAppComponent({
  loader: () => loadRemote("iam/export-app"),
  fallback: FallbackError,
  loading: <FallbackLoading />,
});

// IAM App Wrapper
export function IamAppWrapper() {
  const location = useLocation();

  return (
    <div>
      <IamApp
        key={location.pathname}
        basename="/iam"
        props1="props_value"
        props2="another_props_value"
      />
    </div>
  );
}
