import { useState, useCallback, useMemo } from "react";

export function usePagination<T>(
  data: T[],
  pageSize: number,
  enabled: boolean = true
) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(
    () => (enabled ? Math.max(1, Math.ceil(data.length / pageSize)) : 1),
    [data.length, pageSize, enabled]
  );

  //Ensure current page is valid when data length changes
  useMemo(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const paginatedData = useMemo(() => {
    if (!enabled) return data;

    //Ensure we're using valid indices
    const startIndex = Math.min((currentPage - 1) * pageSize, data.length);
    const endIndex = Math.min(startIndex + pageSize, data.length);

    return data.slice(startIndex, endIndex);
  }, [data, currentPage, pageSize, enabled]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (!enabled) return;
      const validPage = Math.min(Math.max(1, page), totalPages);
      setCurrentPage(validPage);
    },
    [totalPages, enabled]
  );

  return {
    currentPage: enabled ? currentPage : 1,
    setCurrentPage: handlePageChange,
    totalPages,
    paginatedData,
    pageSize,
  };
}
