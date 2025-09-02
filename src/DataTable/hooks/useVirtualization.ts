import { debounce } from "lodash";
import { useCallback, useRef, useEffect } from "react";
import { VariableSizeList } from "react-window";

interface VirtualizationConfig {
  itemHeight: number;
  expandedHeight: number;
  overscanCount?: number;
}

export function useVirtualization<T extends { id: string | number }>(
  data: T[],
  expandedRows: Set<T["id"]>,
  config: VirtualizationConfig
) {
  const listRef = useRef<VariableSizeList>(null);

  const getItemSize = useCallback(
    (index: number) => {
      const item = data[index];
      return expandedRows.has(item.id)
        ? config.expandedHeight
        : config.itemHeight;
    },
    [data, expandedRows, config.expandedHeight, config.itemHeight]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resetList = useCallback(
    debounce(() => {
      if (listRef.current) {
        listRef.current.resetAfterIndex(0);
      }
    }, 50),
    []
  );

  useEffect(() => {
    resetList();
  }, [expandedRows, resetList]);

  return {
    listRef,
    getItemSize,
  };
}
