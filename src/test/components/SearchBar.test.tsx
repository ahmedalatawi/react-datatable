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
    expect(defaultProps.onChange).toHaveBeenCalledWith("test");
  });

  it("displays custom placeholder", () => {
    render(<SearchBar {...defaultProps} placeholder="Custom search..." />);
    expect(screen.getByPlaceholderText("Custom search...")).toBeInTheDocument();
  });

  it("shows search icon", () => {
    render(<SearchBar {...defaultProps} />);
    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
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
