import { vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { mockData } from "../mocks/tableData";
import { useDataTableLogic } from "../../DataTable/hooks/useDataTableLogic";

describe("useDataTableLogic", () => {
  const searchableKeys = ["name", "email"];

  it("initializes with empty search term", () => {
    const { result } = renderHook(() =>
      useDataTableLogic(mockData, searchableKeys)
    );
    expect(result.current.searchTerm).toBe("");
    expect(result.current.filteredData).toEqual(mockData);
  });

  it("filters data by search term", () => {
    const { result } = renderHook(() =>
      useDataTableLogic(mockData, searchableKeys)
    );

    act(() => {
      result.current.handleSearch("John");
    });

    expect(result.current.filteredData).toHaveLength(2);
    expect(result.current.filteredData.map(d => d.name)).toContain("John Doe");
    expect(result.current.filteredData.map(d => d.name)).toContain("Bob Johnson");
  });

  it("handles column filtering", () => {
    const { result } = renderHook(() =>
      useDataTableLogic(mockData, searchableKeys)
    );

    act(() => {
      result.current.handleFilterChange("name", {
        column: "name",
        value: "John",
        type: "text",
        operator: "contains",
      });
    });

    expect(result.current.filteredData).toHaveLength(2);
    expect(result.current.filteredData.map(d => d.name)).toContain("John Doe");
    expect(result.current.filteredData.map(d => d.name)).toContain("Bob Johnson");
  });

  it("handles row expansion", () => {
    const { result } = renderHook(() =>
      useDataTableLogic(mockData, searchableKeys)
    );

    act(() => {
      result.current.toggleExpandRow(1);
    });

    expect(result.current.expandedRows.has(1)).toBe(true);

    act(() => {
      result.current.toggleExpandRow(1);
    });

    expect(result.current.expandedRows.has(1)).toBe(false);
  });

  it("generates unique column values", () => {
    const { result } = renderHook(() =>
      useDataTableLogic(mockData, searchableKeys)
    );

    const statusValues = result.current.uniqueColumnValues.get("status");
    expect(statusValues).toBeDefined();
    expect(statusValues?.has("active")).toBe(true);
    expect(statusValues?.has("inactive")).toBe(true);
  });
});
