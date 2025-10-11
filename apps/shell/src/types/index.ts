// Shell app types
export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  children?: MenuItem[];
}

export interface RemoteAppProps {
  basename: string;
  props1?: string;
  props2?: string;
}

export interface FallbackErrorProps {
  error: Error;
}

// Navigation types
export interface NavigationState {
  expandedItems: string[];
}

export interface NavigationActions {
  toggleExpanded: (itemId: string) => void;
}
