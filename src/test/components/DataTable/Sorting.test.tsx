import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockData, columns } from "../../mocks/tableData";
import { DataTable } from "../../../DataTable/DataTable";

describe("DataTable Sorting", () => {
  const defaultProps = {
    data: mockData,
    columns,
    pageSize: 10,
  };

  it("sorts by default column and direction", () => {
    render(
      <DataTable
        {...defaultProps}
        defaultSortColumn="name"
        defaultSortDirection="asc"
      />
    );

    const cells = screen.getAllByRole("cell");
    expect(cells[0]).toHaveTextContent("Bob Johnson");
  });

  it("handles column sort click", async () => {
    render(<DataTable {...defaultProps} />);

    const nameHeader = screen.getByText("Name");
    await userEvent.click(nameHeader);

    const cells = screen.getAllByRole("cell");
    expect(cells[0]).toHaveTextContent("Bob Johnson");

    await userEvent.click(nameHeader);
    expect(cells[0]).toHaveTextContent("John Doe");
  });

  it("disables sorting when sortable is false", async () => {
    render(<DataTable {...defaultProps} sortable={false} />);

    const nameHeader = screen.getByText("Name");
    await userEvent.click(nameHeader);

    const cells = screen.getAllByRole("cell");
    expect(cells[0]).toHaveTextContent("John Doe");
  });
});
