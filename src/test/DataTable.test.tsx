import { vi } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Column } from "../DataTable/types";
import { DataTable } from "../DataTable/DataTable";

interface TestData {
  id: number;
  name: string;
  email: string;
  status: string;
}

const mockData: TestData[] = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "active" },
];

const columns: Column<TestData>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    searchable: true,
    filterable: true,
  },
  { key: "email", header: "Email", sortable: true, searchable: true },
  {
    key: "status",
    header: "Status",
    sortable: true,
    filterable: true,
    filterType: "select",
  },
];

describe("DataTable", () => {
  test("renders table with correct data", async () => {
    render(<DataTable data={mockData} columns={columns} loading={false} useTailwind={false} />);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    });
  });

  it("handles sorting", async () => {
    render(<DataTable data={mockData} columns={columns} useTailwind={false} />);

    const nameHeader = screen.getByText("Name");
    await userEvent.click(nameHeader);

    const cells = screen.getAllByRole("cell");
    expect(cells[0]).toHaveTextContent("Bob Johnson");
  });

  it("handles searching", async () => {
    render(<DataTable data={mockData} columns={columns} useTailwind={false} />);

    const searchInput = screen.getByPlaceholderText("Search...");
    await userEvent.type(searchInput, "John");

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
  });

  it("handles row selection", async () => {
    const onSelectionChange = vi.fn();
    render(
      <DataTable
        data={mockData}
        columns={columns}
        selectable={true}
        onSelectionChange={onSelectionChange}
        useTailwind={false}
      />
    );

    const checkbox = screen.getAllByRole("checkbox")[1]; // First row checkbox
    await userEvent.click(checkbox);

    expect(onSelectionChange).toHaveBeenCalledWith([mockData[0]]);
  });

  it("handles filtering", async () => {
    render(<DataTable data={mockData} columns={columns} useTailwind={false} />);

    const filterButton = screen.getAllByLabelText(/Filter/)[0];
    await userEvent.click(filterButton);

    const operatorSelect = screen.getByDisplayValue("Equals");
    await userEvent.selectOptions(operatorSelect, "contains");

    const filterInput = screen.getByPlaceholderText("Filter value...");
    await userEvent.type(filterInput, "John");

    const applyButton = screen.getByText("Apply");
    await userEvent.click(applyButton);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
      expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
    });
  });

  test.skip("handles pagination", async () => {
    const largeData = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `Person ${i + 1}`,
      email: `person${i + 1}@example.com`,
      status: i % 2 === 0 ? "active" : "inactive",
    }));

    render(<DataTable data={largeData} columns={columns} pageSize={10} useTailwind={false} />);

    const nextButton = screen.getByLabelText("Next page");
    await userEvent.click(nextButton);

    expect(screen.getByText("Person 11")).toBeInTheDocument();
    expect(screen.queryByText("Person 1")).not.toBeInTheDocument();
  });

  it("handles empty data state", () => {
    render(
      <DataTable data={[]} columns={columns} emptyMessage="No data available" useTailwind={false} />
    );
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("handles loading state", () => {
    render(<DataTable data={mockData} columns={columns} loading={true} useTailwind={false} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("uses CSS by default", () => {
    const { container } = render(<DataTable data={mockData} columns={columns} />);
    const tableContainer = container.querySelector('.datatable-container');
    expect(tableContainer).toHaveClass('use-css');
    expect(tableContainer).not.toHaveClass('use-tailwind');
  });

  it("uses Tailwind when useTailwind prop is true", () => {
    const { container } = render(<DataTable data={mockData} columns={columns} useTailwind={true} />);
    const tableContainer = container.querySelector('.datatable-container');
    expect(tableContainer).toHaveClass('use-tailwind');
    expect(tableContainer).not.toHaveClass('use-css');
  });
});
