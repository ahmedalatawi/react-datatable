import { Column, Filter } from "../types";
import { ChevronUp, ChevronDown } from "../icons/Icons";
import { ColumnFilter } from "./ColumnFilter";

import "../styles/TableHeader.scss";

interface TableHeaderProps<T> {
  columns: Column<T>[];
  sortConfig: { key: keyof T; direction: "asc" | "desc" } | null;
  onSort?: (key: keyof T) => void;
  selectable: boolean;
  selectedAll: boolean;
  onSelectAll?: () => void;
  theme?: string;
  sticky?: boolean;
  filters: Map<keyof T, Filter<T>>;
  onFilterChange: (columnKey: keyof T, filter: Filter<T> | null) => void;
  uniqueColumnValues: Map<keyof T, Set<string | number>>;
}

export function TableHeader<T>({
  columns,
  sortConfig,
  onSort,
  selectable,
  selectedAll,
  onSelectAll,
  theme,
  sticky = true,
  filters,
  onFilterChange,
  uniqueColumnValues,
}: TableHeaderProps<T>) {
  return (
    <div className={`datatable-header ${theme} ${sticky ? "sticky" : ""}`}>
      <div className="header-row">
        {selectable && (
          <div className="header-cell checkbox-cell">
            <input
              type="checkbox"
              checked={selectedAll}
              onChange={onSelectAll}
              className="checkbox"
              aria-label="Select all rows"
            />
          </div>
        )}
        {columns.map((column) => (
          <div
            key={String(column.key)}
            className={`header-cell ${column.sortable ? "sortable" : ""}`}
            style={{
              width: column.width || `${100 / columns.length}%`,
              minWidth: column.minWidth,
              maxWidth: column.maxWidth,
              textAlign: column.align || "left",
            }}
          >
            <div className="header-content">
              {/* eslint-disable-next-line */}
              <div
                className="header-text-wrapper"
                onClick={() => column.sortable && onSort?.(column.key)}
                role={column.sortable ? "button" : undefined}
                tabIndex={column.sortable ? 0 : undefined}
                aria-sort={
                  sortConfig?.key === column.key
                    ? sortConfig.direction === "asc"
                      ? "ascending"
                      : "descending"
                    : undefined
                }
              >
                <span className="header-text">{column.header}</span>
                {column.sortable && (
                  <span className="sort-icons">
                    {sortConfig?.key === column.key ? (
                      sortConfig.direction === "asc" ? (
                        <ChevronUp size={14} className="active" />
                      ) : (
                        <ChevronDown size={14} className="active" />
                      )
                    ) : (
                      <ChevronDown size={14} />
                    )}
                  </span>
                )}
              </div>
              {column.filterable && (
                <ColumnFilter
                  column={column}
                  onFilterChange={(filter) =>
                    onFilterChange(column.key, filter)
                  }
                  currentFilter={filters.get(column.key) || null}
                  uniqueValues={uniqueColumnValues.get(column.key)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
