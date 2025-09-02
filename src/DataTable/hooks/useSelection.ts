import { useState, useCallback } from "react";

export function useSelection<T extends { id: string | number }>(
  data: T[],
  onSelectionChange?: (selectedItems: T[]) => void
) {
  const [selectedRows, setSelectedRows] = useState<Set<T["id"]>>(new Set());

  const handleSelectAll = useCallback(() => {
    if (!onSelectionChange) return;

    const newSelected: Set<T["id"]> =
      selectedRows.size === data.length
        ? new Set()
        : new Set(data.map((item) => item.id));
    setSelectedRows(newSelected);
    onSelectionChange(
      Array.from(newSelected).map((id) => data.find((item) => item.id === id)!)
    );
  }, [data, selectedRows, onSelectionChange]);

  const handleSelectRow = useCallback(
    (id: T["id"]) => {
      if (!onSelectionChange) return;

      setSelectedRows((prev) => {
        const newSelected = new Set(prev);
        if (newSelected.has(id)) {
          newSelected.delete(id);
        } else {
          newSelected.add(id);
        }
        onSelectionChange(
          Array.from(newSelected).map(
            (selectedId) => data.find((item) => item.id === selectedId)!
          )
        );
        return newSelected;
      });
    },
    [data, onSelectionChange]
  );

  return {
    selectedRows,
    handleSelectAll,
    handleSelectRow,
  };
}
