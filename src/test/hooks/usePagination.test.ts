import { renderHook, act } from "@testing-library/react";
import { generateLargeMockData } from "../mocks/tableData";
import { usePagination } from "../../DataTable/hooks/usePagination";

describe("usePagination", () => {
  const data = generateLargeMockData(25);
  const pageSize = 10;

  it("initializes with first page", () => {
    const { result } = renderHook(() => usePagination(data, pageSize, true));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.paginatedData).toHaveLength(10);
    expect(result.current.totalPages).toBe(3);
  });

  it("changes page", () => {
    const { result } = renderHook(() => usePagination(data, pageSize, true));

    act(() => {
      result.current.setCurrentPage(2);
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.paginatedData[0].name).toBe("Person 11");
  });

  it("handles invalid page numbers", () => {
    const { result } = renderHook(() => usePagination(data, pageSize, true));

    act(() => {
      result.current.setCurrentPage(0);
    });
    expect(result.current.currentPage).toBe(1);

    act(() => {
      result.current.setCurrentPage(999);
    });
    expect(result.current.currentPage).toBe(3);
  });

  it("returns all data when pagination is disabled", () => {
    const { result } = renderHook(() => usePagination(data, pageSize, false));

    expect(result.current.paginatedData).toEqual(data);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(1);
  });
});
