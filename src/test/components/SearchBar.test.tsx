import { vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "../../DataTable/components/SearchBar";

describe("SearchBar", () => {
  const defaultProps = {
    value: "",
    onChange: vi.fn(),
    placeholder: "Search...",
    useTailwind: false,
  };

  it("renders search input", () => {
    render(<SearchBar {...defaultProps} />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("handles input changes", async () => {
    render(<SearchBar {...defaultProps} />);
    const input = screen.getByPlaceholderText("Search...");
    await userEvent.type(input, "test");
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(defaultProps.onChange).toHaveBeenNthCalledWith(1, "t");
    expect(defaultProps.onChange).toHaveBeenNthCalledWith(2, "e");
    expect(defaultProps.onChange).toHaveBeenNthCalledWith(3, "s");
    expect(defaultProps.onChange).toHaveBeenNthCalledWith(4, "t");
  });

  it("displays custom placeholder", () => {
    render(<SearchBar {...defaultProps} placeholder="Custom search..." />);
    expect(screen.getByPlaceholderText("Custom search...")).toBeInTheDocument();
  });

  it("shows search icon", () => {
    const { container } = render(<SearchBar {...defaultProps} />);
    const searchIcon = container.querySelector('.search-icon svg');
    expect(searchIcon).toBeInTheDocument();
  });

  it("reflects controlled value", () => {
    render(<SearchBar {...defaultProps} value="test value" />);
    expect(screen.getByPlaceholderText("Search...")).toHaveValue("test value");
  });

  it("applies CSS classes by default", () => {
    const { container } = render(<SearchBar {...defaultProps} />);
    const searchContainer = container.querySelector('.datatable-search');
    expect(searchContainer).toHaveClass('use-css');
  });

  it("applies Tailwind classes when useTailwind is true", () => {
    const { container } = render(<SearchBar {...defaultProps} useTailwind={true} />);
    const searchContainer = container.querySelector('.datatable-search');
    expect(searchContainer).toHaveClass('use-tailwind');
  });
});
