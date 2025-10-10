import { vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "../../DataTable/components/Pagination";

describe("Pagination", () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange: vi.fn(),
    useTailwind: false,
  };

  it("renders pagination controls", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByLabelText("First page")).toBeInTheDocument();
    expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Next page")).toBeInTheDocument();
    expect(screen.getByLabelText("Last page")).toBeInTheDocument();
  });

  it("disables previous buttons on first page", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByLabelText("First page")).toBeDisabled();
    expect(screen.getByLabelText("Previous page")).toBeDisabled();
  });

  it("disables next buttons on last page", () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    expect(screen.getByLabelText("Next page")).toBeDisabled();
    expect(screen.getByLabelText("Last page")).toBeDisabled();
  });

  it("shows correct page numbers", () => {
    render(<Pagination {...defaultProps} />);
    const pageButtons = screen
      .getAllByRole("button")
      .filter((button) => /^[0-9]+$/.test(button.textContent || ""));
    expect(pageButtons).toHaveLength(5);
    expect(pageButtons[0]).toHaveTextContent("1");
    expect(pageButtons[4]).toHaveTextContent("5");
  });

  it("handles page changes", async () => {
    render(<Pagination {...defaultProps} />);
    await userEvent.click(screen.getByLabelText("Next page"));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it("shows correct range information", () => {
    const { container } = render(<Pagination {...defaultProps} />);
    const paginationInfo = container.querySelector('.pagination-info');
    expect(paginationInfo?.textContent).toContain("Showing");
    expect(paginationInfo?.textContent).toContain("1");
    expect(paginationInfo?.textContent).toContain("10");
  });

  it("applies CSS classes by default", () => {
    const { container } = render(<Pagination {...defaultProps} />);
    const paginationContainer = container.querySelector('.datatable-pagination');
    expect(paginationContainer).toHaveClass('use-css');
  });

  it("applies Tailwind classes when useTailwind is true", () => {
    const { container } = render(<Pagination {...defaultProps} useTailwind={true} />);
    const paginationContainer = container.querySelector('.datatable-pagination');
    expect(paginationContainer).toHaveClass('use-tailwind');
  });
});
