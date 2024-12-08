import { renderHook, act } from "@testing-library/react";
import { useDataTableLogic } from "../DataTable/hooks/useDataTableLogic";

const mockData = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
];

describe("useDataTableLogic", () => {
  it("initializes with correct default values", () => {
    const { result } = renderHook(() =>
      useDataTableLogic(mockData, 10, ["name", "email"])
    );

    expect(result.current.currentPage).toBe(1);
    expect(result.current.paginatedData).toHaveLength(3);
    expect(result.current.totalPages).toBe(1);
  });

  it("handles search correctly", async () => {
    const { result } = renderHook(() =>
      useDataTableLogic(mockData, 10, ["name", "email"])
    );

    act(() => {
      result.current.handleSearch("John");
    });

    // Wait for debounced search to complete
    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(result.current.paginatedData).toHaveLength(1);
    expect(result.current.paginatedData[0].name).toBe("John Doe");
  });

  it("handles sorting correctly", () => {
    const { result } = renderHook(() =>
      useDataTableLogic(mockData, 10, ["name", "email"])
    );

    act(() => {
      result.current.handleSort("name");
    });

    expect(result.current.sortConfig).toEqual({
      key: "name",
      direction: "asc",
    });
    expect(result.current.paginatedData[0].name).toBe("Bob Johnson");
  });

  it("handles row selection correctly", () => {
    const { result } = renderHook(() =>
      useDataTableLogic(mockData, 10, ["name", "email"])
    );

    act(() => {
      result.current.handleSelectRow(1);
    });

    expect(result.current.selectedRows.has(1)).toBe(true);
    expect(result.current.selectedRows.has(2)).toBe(false);
  });

  it("handles filtering correctly", async () => {
    const { result } = renderHook(() =>
      useDataTableLogic(mockData, 10, ["name", "email"])
    );

    act(() => {
      result.current.handleFilterChange("name", {
        column: "name",
        value: "John",
        type: "text",
        operator: "contains",
      });
    });

    // Wait for debounced filter to complete
    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(result.current.paginatedData).toHaveLength(1);
    expect(result.current.paginatedData[0].name).toBe("John Doe");
  });

  it("handles pagination correctly", () => {
    const largeData = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `Person ${i + 1}`,
      email: `person${i + 1}@example.com`,
    }));

    const { result } = renderHook(() =>
      useDataTableLogic(largeData, 10, ["name", "email"])
    );

    act(() => {
      result.current.setCurrentPage(2);
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.paginatedData).toHaveLength(10);
    expect(result.current.paginatedData[0].id).toBe(11);
  });
});
