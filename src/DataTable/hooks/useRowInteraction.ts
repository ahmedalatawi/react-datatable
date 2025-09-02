import { useCallback } from 'react';

export function useRowInteraction<T>(onRowClick?: (item: T) => void) {
  const handleRowClick = useCallback((item: T) => {
    onRowClick?.(item);
  }, [onRowClick]);

  const handleKeyPress = useCallback((event: React.KeyboardEvent, item: T) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onRowClick?.(item);
    }
  }, [onRowClick]);

  return {
    handleRowClick,
    handleKeyPress,
  };
}