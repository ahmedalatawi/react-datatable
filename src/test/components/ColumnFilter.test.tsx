import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Column, Filter } from "../../DataTable/types";
import { ColumnFilter } from "../../DataTable/components/ColumnFilter";

describe("ColumnFilter", () => {
  const column: Column<string> = {
    key: "name" as keyof string,
    header: "Name",
    filterable: true,
  };

  const defaultProps = {
    column,
    onFilterChange: vi.fn(),
    currentFilter: null as Filter<string> | null,
    uniqueValues: new Set(["value1", "value2"]),
    useTailwind: false,
  };

  test("renders filter button", () => {
    render(<ColumnFilter {...defaultProps} />);
    expect(screen.getByLabelText(/Filter/)).toBeInTheDocument();
  });

  test("shows filter options when clicked", async () => {
    render(<ColumnFilter {...defaultProps} />);
    await userEvent.click(screen.getByLabelText(/Filter/));
    expect(screen.getByText("Contains")).toBeInTheDocument();
  });

  test("handles filter application", async () => {
    render(<ColumnFilter {...defaultProps} />);
    await userEvent.click(screen.getByLabelText(/Filter/));
    await userEvent.type(
      screen.getByPlaceholderText("Filter value..."),
      "test"
    );
    await userEvent.click(screen.getByText("Apply"));

    expect(defaultProps.onFilterChange).toHaveBeenCalledWith({
      column: "name",
      value: "test",
      type: "text",
      operator: "equals",
    });
  });

  test("handles filter clearing", async () => {
    render(<ColumnFilter {...defaultProps} />);
    await userEvent.click(screen.getByLabelText(/Filter/));
    await userEvent.click(screen.getByText("Clear"));
    expect(defaultProps.onFilterChange).toHaveBeenCalledWith(null);
  });

  test("shows select options for select filter type", async () => {
    render(
      <ColumnFilter
        {...defaultProps}
        column={{ ...column, filterType: "select" }}
        uniqueValues={new Set(["value1", "value2"])}
      />
    );
    await userEvent.click(screen.getByLabelText(/Filter/));
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
  });

  test("shows active filter state", () => {
    render(
      <ColumnFilter
        {...defaultProps}
        currentFilter={{
          column: "name" as keyof string,
          value: "test",
          type: "text",
          operator: "contains",
        }}
      />
    );
    expect(screen.getByLabelText(/Filter/)).toHaveClass("active");
  });

  test("applies CSS classes by default", () => {
    const { container } = render(<ColumnFilter {...defaultProps} />);
    const filterContainer = container.querySelector(".column-filter");
    expect(filterContainer).toHaveClass("use-css");
  });

  test("applies Tailwind classes when useTailwind is true", () => {
    const { container } = render(
      <ColumnFilter {...defaultProps} useTailwind={true} />
    );
    const filterContainer = container.querySelector(".column-filter");
    expect(filterContainer).toHaveClass("use-tailwind");
  });
});
