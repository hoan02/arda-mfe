import { useState } from 'react';
import { NavigationState, NavigationActions } from '../types';

export function useNavigation(): NavigationState & NavigationActions {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // React 19 handles this automatically, no need for useCallback
  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  return {
    expandedItems,
    toggleExpanded,
  };
}
