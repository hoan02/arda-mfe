import { useState, useCallback } from 'react';
import { NavigationState, NavigationActions } from '../types';

export function useNavigation(): NavigationState & NavigationActions {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = useCallback((itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  return {
    expandedItems,
    toggleExpanded,
  };
}
