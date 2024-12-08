import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockData, columns } from "../../mocks/tableData";
import { DataTable } from "../../../DataTable/DataTable";

describe("DataTable", () => {
  const defaultProps = {
    data: mockData,
    columns,
    pageSize: 10,
  };

  it("renders table with data", () => {
    render(<DataTable {...defaultProps} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
  });

  it("handles row selection", async () => {
    const onSelectionChange = vi.fn();
    render(
      <DataTable
        {...defaultProps}
        selectable={true}
        onSelectionChange={onSelectionChange}
      />
    );

    const checkbox = screen.getAllByRole("checkbox")[1];
    await userEvent.click(checkbox);
    expect(onSelectionChange).toHaveBeenCalledWith([mockData[0]]);
  });

  it("handles row click", async () => {
    const onRowClick = vi.fn();
    render(<DataTable {...defaultProps} onRowClick={onRowClick} />);

    await userEvent.click(screen.getByText("John Doe"));
    expect(onRowClick).toHaveBeenCalledWith(mockData[0]);
  });

  it("respects sticky header setting", () => {
    const { container } = render(
      <DataTable {...defaultProps} stickyHeader={false} />
    );

    const header = container.querySelector(".datatable-header-wrapper");
    expect(header).not.toHaveClass("sticky");
  });

  it("shows loading state", () => {
    render(<DataTable {...defaultProps} loading={true} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows empty state message", () => {
    render(
      <DataTable
        {...defaultProps}
        data={[]}
        emptyMessage="Custom empty message"
      />
    );
    expect(screen.getByText("Custom empty message")).toBeInTheDocument();
  });

  it("hides pagination when disabled", () => {
    const { container } = render(
      <DataTable {...defaultProps} pagination={false} />
    );
    expect(
      container.querySelector(".datatable-footer")
    ).not.toBeInTheDocument();
  });

  it("hides search when disabled", () => {
    render(<DataTable {...defaultProps} searchable={false} />);
    expect(screen.queryByPlaceholderText("Search...")).not.toBeInTheDocument();
  });

  it("hides export when disabled", () => {
    render(<DataTable {...defaultProps} exportable={false} />);
    expect(screen.queryByText("Export")).not.toBeInTheDocument();
  });
});
