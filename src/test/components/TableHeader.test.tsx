import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Column } from "../../DataTable/types";
import { TableHeader } from "../../DataTable/components/TableHeader";

interface TestData {
  id: number;
  name: string;
  email: string;
}

const columns: Column<TestData>[] = [
  { key: "name", header: "Name", sortable: true, filterable: true },
  { key: "email", header: "Email", sortable: true },
];

describe("TableHeader", () => {
  const defaultProps = {
    columns,
    sortConfig: null,
    onSort: vi.fn(),
    selectable: true,
    selectedAll: false,
    onSelectAll: vi.fn(),
    sticky: true,
    filters: new Map(),
    onFilterChange: vi.fn(),
    uniqueColumnValues: new Map(),
    useTailwind: false,
  };

  test("renders all columns", () => {
    render(<TableHeader {...defaultProps} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  test("handles select all checkbox", async () => {
    render(<TableHeader {...defaultProps} />);
    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);
    expect(defaultProps.onSelectAll).toHaveBeenCalled();
  });

  test("shows sort indicators", () => {
    render(
      <TableHeader
        {...defaultProps}
        sortConfig={{ key: "name", direction: "asc" }}
      />
    );
    const nameHeader = screen.getByText("Name").closest('[role="button"]');
    expect(nameHeader).toHaveAttribute("aria-sort", "ascending");
  });

  test("handles column sorting", async () => {
    render(<TableHeader {...defaultProps} />);
    const nameHeader = screen.getByText("Name").closest('[role="button"]');
    await userEvent.click(nameHeader!);
    expect(defaultProps.onSort).toHaveBeenCalledWith("name");
  });

  test("shows filter buttons for filterable columns", () => {
    render(<TableHeader {...defaultProps} />);
    const filterButtons = screen.getAllByLabelText(/Filter/);
    expect(filterButtons).toHaveLength(1);
  });

  test("applies custom styles", () => {
    const { container } = render(
      <TableHeader {...defaultProps} theme="custom-theme" />
    );
    const header = container.querySelector(".datatable-header");
    expect(header).toHaveClass("custom-theme");
  });

  test("applies CSS classes by default", () => {
    const { container } = render(<TableHeader {...defaultProps} />);
    const headerContainer = container.querySelector(".datatable-header");
    expect(headerContainer).toHaveClass("use-css");
  });

  test("applies Tailwind classes when useTailwind is true", () => {
    const { container } = render(
      <TableHeader {...defaultProps} useTailwind={true} />
    );
    const headerContainer = container.querySelector(".datatable-header");
    expect(headerContainer).toHaveClass("use-tailwind");
  });
});
