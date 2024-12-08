import { useState, useCallback, useMemo } from 'react';

export interface SortConfig<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
}

export function useSorting<T>(
  data: T[],
  defaultSortColumn?: keyof T,
  defaultSortDirection: 'asc' | 'desc' = 'asc',
  enabled: boolean = true
) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(
    defaultSortColumn && enabled ? { key: defaultSortColumn, direction: defaultSortDirection } : null
  );

  const handleSort = useCallback((key: keyof T) => {
    if (!enabled) return;
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, [enabled]);

  const sortedData = useMemo(() => {
    if (!sortConfig || !enabled) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      const comparison = String(aValue).localeCompare(String(bValue), undefined, {
        numeric: true,
        sensitivity: 'base'
      });
      
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortConfig, enabled]);

  return {
    sortConfig: enabled ? sortConfig : null,
    handleSort,
    sortedData,
  };
}