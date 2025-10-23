/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useCallback, useMemo } from "react";
import { Column, Filter } from "../types";

interface ColumnFilterProps<T> {
  column: Column<T>;
  onFilterChange: (filter: Filter<T> | null) => void;
  currentFilter: Filter<T> | null;
  uniqueValues?: Set<string | number>;
  useTailwind?: boolean;
}

export function ColumnFilter<T>({
  column,
  onFilterChange,
  currentFilter,
  uniqueValues,
  useTailwind = false,
}: ColumnFilterProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterValue, setFilterValue] = useState(
    currentFilter?.value?.toString() || ""
  );
  const [operator, setOperator] = useState<string>(
    currentFilter?.operator || "equals" //"contains"
  );

  const operators = useMemo(() => {
    switch (column.filterType) {
      case "number":
      case "date":
        return [
          { value: "equals", label: "Equals" },
          { value: "greaterThan", label: "Greater Than" },
          { value: "lessThan", label: "Less Than" },
        ];
      case "select":
        return [{ value: "equals", label: "Equals" }];
      default:
        return [
          { value: "contains", label: "Contains" },
          { value: "equals", label: "Equals" },
          { value: "startsWith", label: "Starts With" },
          { value: "endsWith", label: "Ends With" },
        ];
    }
  }, [column.filterType]);

  const handleApplyFilter = useCallback(() => {
    if (!filterValue) {
      onFilterChange(null);
    } else {
      onFilterChange({
        column: column.key,
        value: filterValue,
        type: column.filterType || "text",
        operator: operator as Filter<T>["operator"],
      });
    }
    setIsOpen(false);
  }, [filterValue, operator, column, onFilterChange]);

  const handleClearFilter = useCallback(() => {
    setFilterValue("");
    onFilterChange(null);
    setIsOpen(false);
  }, [onFilterChange]);

  return (
    <div
      className={`column-filter ${useTailwind ? "use-tailwind" : "use-css"}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`filter-button ${currentFilter ? "active" : ""}`}
        aria-label={`Filter ${column.header}`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          className={`filter-icon ${currentFilter ? "active" : ""}`}
        >
          <path
            d="M1 4h14M3 8h10M5 12h6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div className="filter-overlay" onClick={() => setIsOpen(false)} />
          <div className="filter-dropdown">
            <div className="filter-content">
              {column.filterType === "select" && uniqueValues ? (
                // eslint-disable-next-line jsx-a11y/no-onchange
                <select
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Select...</option>
                  {Array.from(uniqueValues).map((value) => (
                    <option key={value.toString()} value={value.toString()}>
                      {value.toString()}
                    </option>
                  ))}
                </select>
              ) : (
                <>
                  {/* eslint-disable-next-line jsx-a11y/no-onchange */}
                  <select
                    value={operator}
                    onChange={(e) => setOperator(e.target.value)}
                    className="operator-select"
                  >
                    {operators.map((op) => (
                      <option key={op.value} value={op.value}>
                        {op.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type={column.filterType === "number" ? "number" : "text"}
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    placeholder="Filter value..."
                    className="filter-input"
                  />
                </>
              )}
              <div className="filter-actions">
                <button onClick={handleApplyFilter} className="apply-button">
                  Apply
                </button>
                <button onClick={handleClearFilter} className="clear-button">
                  Clear
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
