import { useState, useCallback, useMemo } from 'react';

export function usePagination<T>(data: T[], pageSize: number, enabled: boolean = true) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => 
    enabled ? Math.ceil(data.length / pageSize) : 1
  , [data.length, pageSize, enabled]);

  const paginatedData = useMemo(() => {
    if (!enabled) return data;
    const startIndex = (currentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }, [data, currentPage, pageSize, enabled]);

  const handlePageChange = useCallback((page: number) => {
    if (!enabled) return;
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  }, [totalPages, enabled]);

  return {
    currentPage: enabled ? currentPage : 1,
    setCurrentPage: handlePageChange,
    totalPages,
    paginatedData,
    pageSize,
  };
}