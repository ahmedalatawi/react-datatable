import { vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { mockData } from "../mocks/tableData";
import { useSelection } from "../../DataTable/hooks/useSelection";

describe("useSelection", () => {
  const onSelectionChange = vi.fn();

  beforeEach(() => {
    onSelectionChange.mockClear();
  });

  it("initializes with empty selection", () => {
    const { result } = renderHook(() =>
      useSelection(mockData, onSelectionChange)
    );
    expect(result.current.selectedRows.size).toBe(0);
  });

  it("selects single row", () => {
    const { result } = renderHook(() =>
      useSelection(mockData, onSelectionChange)
    );

    act(() => {
      result.current.handleSelectRow(1);
    });

    expect(result.current.selectedRows.has(1)).toBe(true);
    expect(onSelectionChange).toHaveBeenCalledWith([mockData[0]]);
  });

  it("deselects row", () => {
    const { result } = renderHook(() =>
      useSelection(mockData, onSelectionChange)
    );

    act(() => {
      result.current.handleSelectRow(1);
      result.current.handleSelectRow(1);
    });

    expect(result.current.selectedRows.has(1)).toBe(false);
    expect(onSelectionChange).toHaveBeenLastCalledWith([]);
  });

  it("selects all rows", () => {
    const { result } = renderHook(() =>
      useSelection(mockData, onSelectionChange)
    );

    act(() => {
      result.current.handleSelectAll();
    });

    expect(result.current.selectedRows.size).toBe(mockData.length);
    expect(onSelectionChange).toHaveBeenCalledWith(mockData);
  });

  it("deselects all rows", () => {
    const { result } = renderHook(() =>
      useSelection(mockData, onSelectionChange)
    );

    act(() => {
      result.current.handleSelectAll();
      result.current.handleSelectAll();
    });

    expect(result.current.selectedRows.size).toBe(0);
    expect(onSelectionChange).toHaveBeenLastCalledWith([]);
  });
});
