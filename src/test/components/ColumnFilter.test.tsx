import { vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Column, Filter } from "../../DataTable/types";
import { ColumnFilter } from "../../DataTable/components/ColumnFilter";

describe("ColumnFilter", () => {
  const column: Column<any> = {
    key: "name",
    header: "Name",
    filterable: true,
  };

  const defaultProps = {
    column,
    onFilterChange: vi.fn(),
    currentFilter: null as Filter<any> | null,
    uniqueValues: new Set(["value1", "value2"]),
    useTailwind: false,
  };

  it("renders filter button", () => {
    render(<ColumnFilter {...defaultProps} />);
    expect(screen.getByLabelText(/Filter/)).toBeInTheDocument();
  });

  it("shows filter options when clicked", async () => {
    render(<ColumnFilter {...defaultProps} />);
    await userEvent.click(screen.getByLabelText(/Filter/));
    expect(screen.getByText("Contains")).toBeInTheDocument();
  });

  it("handles filter application", async () => {
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
      operator: "contains",
    });
  });

  it("handles filter clearing", async () => {
    render(<ColumnFilter {...defaultProps} />);
    await userEvent.click(screen.getByLabelText(/Filter/));
    await userEvent.click(screen.getByText("Clear"));
    expect(defaultProps.onFilterChange).toHaveBeenCalledWith(null);
  });

  it("shows select options for select filter type", () => {
    render(
      <ColumnFilter
        {...defaultProps}
        column={{ ...column, filterType: "select" }}
      />
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows active filter state", () => {
    render(
      <ColumnFilter
        {...defaultProps}
        currentFilter={{
          column: "name",
          value: "test",
          type: "text",
          operator: "contains",
        }}
      />
    );
    expect(screen.getByLabelText(/Filter/)).toHaveClass("active");
  });

  it("applies CSS classes by default", () => {
    const { container } = render(<ColumnFilter {...defaultProps} />);
    const filterContainer = container.querySelector('.column-filter');
    expect(filterContainer).toHaveClass('use-css');
  });

  it("applies Tailwind classes when useTailwind is true", () => {
    const { container } = render(<ColumnFilter {...defaultProps} useTailwind={true} />);
    const filterContainer = container.querySelector('.column-filter');
    expect(filterContainer).toHaveClass('use-tailwind');
  });
});
