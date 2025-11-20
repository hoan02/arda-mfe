// Shell app types
export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  path: string;
  iconColor?: string;
  children?: MenuItem[];
}

// API menu type returned by backend
export interface ApiMenuItem {
  id: number;
  label: string;
  icon?: string;
  iconColor?: string;
  path?: string;
  orderIndex?: number;
  type?: string;
  children?: ApiMenuItem[];
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
