import { vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockData, columns } from "../../mocks/tableData";
import { DataTable } from "../../../DataTable/DataTable";

describe("DataTable Filtering", () => {
  const defaultProps = {
    data: mockData,
    columns,
    pageSize: 10,
    useTailwind: false,
  };

  it("filters data by text search", async () => {
    render(<DataTable {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText("Search...");
    await userEvent.type(searchInput, "John");

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
  });

  it("filters by column", async () => {
    render(<DataTable {...defaultProps} />);

    const filterButton = screen.getAllByLabelText(/Filter/)[0];
    await userEvent.click(filterButton);

    const filterInput = screen.getByPlaceholderText("Filter value...");
    await userEvent.type(filterInput, "John");

    const applyButton = screen.getByText("Apply");
    await userEvent.click(applyButton);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
  });

  it("clears column filter", async () => {
    render(<DataTable {...defaultProps} />);

    const filterButton = screen.getAllByLabelText(/Filter/)[0];
    await userEvent.click(filterButton);

    const clearButton = screen.getByText("Clear");
    await userEvent.click(clearButton);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });
});
