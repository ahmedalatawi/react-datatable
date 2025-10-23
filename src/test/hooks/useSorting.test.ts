import { describe, expect, test } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { mockData } from "../mocks/tableData";
import { useSorting } from "../../DataTable/hooks/useSorting";

describe("useSorting", () => {
  test("initializes with default sort config", () => {
    const { result } = renderHook(() =>
      useSorting(mockData, "name", "asc", true)
    );
    expect(result.current.sortConfig).toEqual({
      key: "name",
      direction: "asc",
    });
  });

  test("sorts data ascending", () => {
    const { result } = renderHook(() =>
      useSorting(mockData, undefined, "asc", true)
    );

    act(() => {
      result.current.handleSort("name");
    });

    expect(result.current.sortedData[0].name).toBe("Bob Johnson");
  });

  test("toggles sort direction", () => {
    const { result } = renderHook(() =>
      useSorting(mockData, undefined, "asc", true)
    );

    act(() => {
      result.current.handleSort("name");
      result.current.handleSort("name");
    });

    expect(result.current.sortConfig?.direction).toBe("desc");
    expect(result.current.sortedData[0].name).toBe("John Doe");
  });

  test("disables sorting when enabled is false", () => {
    const { result } = renderHook(() =>
      useSorting(mockData, undefined, "asc", false)
    );

    act(() => {
      result.current.handleSort("name");
    });

    expect(result.current.sortConfig).toBeNull();
    expect(result.current.sortedData).toEqual(mockData);
  });
});
