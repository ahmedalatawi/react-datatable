import { vi } from "vitest";
import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
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

    // Mock HTMLAnchorElement.prototype.click
    HTMLAnchorElement.prototype.click = vi.fn();
  });

  it("renders export button", () => {
    render(<ExportMenu data={mockData} columns={columns} useTailwind={false} />);
    expect(screen.getByText("Export")).toBeInTheDocument();
  });

  it("shows export options when clicked", async () => {
    render(<ExportMenu data={mockData} columns={columns} useTailwind={false} />);
    await userEvent.click(screen.getByText("Export"));
    expect(screen.getByText("Export as CSV")).toBeInTheDocument();
    expect(screen.getByText("Export as JSON")).toBeInTheDocument();
    expect(screen.getByText("Export as Excel")).toBeInTheDocument();
  });

  it("handles CSV export", async () => {
    render(
      <ExportMenu data={mockData} columns={columns} useTailwind={false} />
    );
    await userEvent.click(screen.getByText("Export"));

    await act(async () => {
      await userEvent.click(screen.getByText("Export as CSV"));
    });

    // Verify URL methods were called
    await waitFor(() => {
      expect(URL.createObjectURL).toHaveBeenCalled();
      expect(URL.revokeObjectURL).toHaveBeenCalled();
    });
  });

  it("handles JSON export", async () => {
    render(
      <ExportMenu data={mockData} columns={columns} useTailwind={false} />
    );
    await userEvent.click(screen.getByText("Export"));

    await act(async () => {
      await userEvent.click(screen.getByText("Export as JSON"));
    });

    await waitFor(() => {
      expect(URL.createObjectURL).toHaveBeenCalled();
    });
  });

  it("closes menu when clicking outside", async () => {
    render(<ExportMenu data={mockData} columns={columns} useTailwind={false} />);
    await userEvent.click(screen.getByText("Export"));

    await act(async () => {
      const overlay = document.querySelector('.export-menu-overlay');
      if (overlay) {
        await userEvent.click(overlay);
      }
    });

    await waitFor(() => {
      expect(screen.queryByText("Export as CSV")).not.toBeInTheDocument();
    });
  });

  it("applies CSS classes by default", () => {
    const { container } = render(<ExportMenu data={mockData} columns={columns} useTailwind={false} />);
    const exportContainer = container.querySelector('.export-menu-container');
    expect(exportContainer).toHaveClass('use-css');
  });

  it("applies Tailwind classes when useTailwind is true", () => {
    const { container } = render(<ExportMenu data={mockData} columns={columns} useTailwind={true} />);
    const exportContainer = container.querySelector('.export-menu-container');
    expect(exportContainer).toHaveClass('use-tailwind');
  });
});
