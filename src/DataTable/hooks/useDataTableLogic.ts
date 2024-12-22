import { useState, useMemo, useCallback } from "react";
import { Filter } from "../types";

export function useDataTableLogic<T extends { id: string | number }>(
  data: T[],
  searchableKeys: (keyof T)[]
) {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<T["id"]>>(new Set());
  const [filters, setFilters] = useState<Map<keyof T, Filter<T>>>(new Map());

  const uniqueColumnValues = useMemo(() => {
    const values = new Map<keyof T, Set<string | number>>();
    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        const columnKey = key as keyof T;
        if (!values.has(columnKey)) {
          values.set(columnKey, new Set());
        }
        values.get(columnKey)?.add(String(item[columnKey]));
      });
    });
    return values;
  }, [data]);

  const filteredData = useMemo(() => {
    let result = [...data];

    if (filters.size > 0) {
      result = result.filter((item) => {
        return Array.from(filters.values()).every((filter) => {
          const value = item[filter.column];
          if (value === null || value === undefined) return false;

          const stringValue = String(value).toLowerCase();
          const filterValue = String(filter.value).toLowerCase();

          switch (filter.operator) {
            case "equals":
              return stringValue === filterValue;
            case "contains":
              return stringValue.includes(filterValue);
            case "startsWith":
              return stringValue.startsWith(filterValue);
            case "endsWith":
              return stringValue.endsWith(filterValue);
            case "greaterThan":
              return Number(value) > Number(filter.value);
            case "lessThan":
              return Number(value) < Number(filter.value);
            default:
              return stringValue.includes(filterValue);
          }
        });
      });
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((item) => {
        return searchableKeys.some((key) => {
          const value = item[key];
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(searchLower);
        });
      });
    }

    return result;
  }, [data, searchTerm, filters, searchableKeys]);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleFilterChange = useCallback(
    (columnKey: keyof T, filter: Filter<T> | null) => {
      setFilters((prev) => {
        const next = new Map(prev);
        if (filter) {
          next.set(columnKey, filter);
        } else {
          next.delete(columnKey);
        }
        return next;
      });
    },
    []
  );

  const toggleExpandRow = useCallback((id: T["id"]) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  return {
    searchTerm,
    handleSearch,
    expandedRows,
    toggleExpandRow,
    filters,
    handleFilterChange,
    uniqueColumnValues,
    filteredData,
  };
}
