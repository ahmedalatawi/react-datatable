import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { generateLargeMockData } from "../../mocks/tableData";
import { DataTable } from "../../../DataTable/DataTable";

describe("DataTable Pagination", () => {
  const largeData = generateLargeMockData(25);

  const defaultProps = {
    data: largeData,
    columns: [
      { key: "name", header: "Name", sortable: true },
      { key: "email", header: "Email", sortable: true },
      { key: "status", header: "Status", sortable: true },
    ],
    pageSize: 10,
  };

  it("shows correct number of items per page", () => {
    render(<DataTable {...defaultProps} />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(10);
  });

  it("navigates to next page", async () => {
    render(<DataTable {...defaultProps} />);

    const nextButton = screen.getByLabelText("Next page");
    await userEvent.click(nextButton);

    expect(screen.getByText("Person 11")).toBeInTheDocument();
    expect(screen.queryByText("Person 1")).not.toBeInTheDocument();
  });

  it("navigates to previous page", async () => {
    render(<DataTable {...defaultProps} />);

    const nextButton = screen.getByLabelText("Next page");
    await userEvent.click(nextButton);

    const prevButton = screen.getByLabelText("Previous page");
    await userEvent.click(prevButton);

    expect(screen.getByText("Person 1")).toBeInTheDocument();
    expect(screen.queryByText("Person 11")).not.toBeInTheDocument();
  });

  it("jumps to specific page", async () => {
    render(<DataTable {...defaultProps} />);

    const pageThreeButton = screen.getByText("3");
    await userEvent.click(pageThreeButton);

    expect(screen.getByText("Person 21")).toBeInTheDocument();
    expect(screen.queryByText("Person 1")).not.toBeInTheDocument();
  });
});
