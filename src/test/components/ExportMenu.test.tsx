import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Column } from "../../DataTable/types";
import { ExportMenu } from "../../DataTable/components/ExportMenu";

describe("ExportMenu", () => {
  const mockData = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];

  const columns: Column<(typeof mockData)[0]>[] = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
  ];

  beforeEach(() => {
    // Mock URL.createObjectURL and URL.revokeObjectURL
    global.URL.createObjectURL = vi.fn(() => "mock-url");
    global.URL.revokeObjectURL = vi.fn();
  });

  it("renders export button", () => {
    render(<ExportMenu data={mockData} columns={columns} />);
    expect(screen.getByText("Export")).toBeInTheDocument();
  });

  it("shows export options when clicked", async () => {
    render(<ExportMenu data={mockData} columns={columns} />);
    await userEvent.click(screen.getByText("Export"));
    expect(screen.getByText("Export as CSV")).toBeInTheDocument();
    expect(screen.getByText("Export as JSON")).toBeInTheDocument();
    expect(screen.getByText("Export as Excel")).toBeInTheDocument();
  });

  it("handles CSV export", async () => {
    const { container } = render(
      <ExportMenu data={mockData} columns={columns} />
    );
    await userEvent.click(screen.getByText("Export"));
    await userEvent.click(screen.getByText("Export as CSV"));

    // Verify download link was created
    const link = container.querySelector("a");
    expect(link).toHaveAttribute("download");
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalled();
  });

  it("handles JSON export", async () => {
    const { container } = render(
      <ExportMenu data={mockData} columns={columns} />
    );
    await userEvent.click(screen.getByText("Export"));
    await userEvent.click(screen.getByText("Export as JSON"));

    expect(URL.createObjectURL).toHaveBeenCalled();
    const blob = (URL.createObjectURL as jest.Mock).mock.calls[0][0];
    const jsonContent = JSON.parse(await blob.text());
    expect(jsonContent).toEqual(mockData);
  });

  it("closes menu when clicking outside", async () => {
    render(<ExportMenu data={mockData} columns={columns} />);
    await userEvent.click(screen.getByText("Export"));
    await userEvent.click(document.body);
    expect(screen.queryByText("Export as CSV")).not.toBeInTheDocument();
  });
});
