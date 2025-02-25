import { ReactNode } from "react";

export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  searchable?: boolean;
  filterable?: boolean;
  filterType?: "text" | "select" | "date" | "number";
  expandable?: boolean;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  align?: "left" | "center" | "right";
  render?: (value: T[keyof T], item: T) => ReactNode;
  ariaLabel?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pagination?: boolean;
  pageSize?: number;
  selectable?: boolean;
  expandable?: boolean;
  expandedContent?: (item: T) => ReactNode;
  onSelectionChange?: (selectedItems: T[]) => void;
  onRowClick?: (item: T) => void;
  onPageChange?: (page: number) => void;
  onSearchTextChange?: (searchText: string) => void;
  theme?: DataTableTheme;
  sortable?: boolean;
  defaultSortColumn?: keyof T;
  defaultSortDirection?: "asc" | "desc";
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  rowClassName?: string | ((item: T) => string);
  headerClassName?: string;
  cellClassName?: string;
  stickyHeader?: boolean;
  "aria-label"?: string;
  "aria-describedby"?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  exportable?: boolean;
  exportFilename?: string;
}

export interface DataTableTheme {
  container?: string;
  toolbar?: string;
  headerWrapper?: string;
  header?: string;
  body?: string;
  row?: string;
  cell?: string;
  footer?: string;
  pagination?: string;
  expandedRow?: string;
  selectedRow?: string;
  loadingOverlay?: string;
  emptyMessage?: string;
  checkbox?: string;
  sortIcon?: string;
  expandIcon?: string;
  searchBar?: string;
  exportMenu?: string;
}

export interface Filter<T> {
  column: keyof T;
  value: string | number | Date | null;
  type: "text" | "select" | "date" | "number";
  operator?:
    | "equals"
    | "contains"
    | "startsWith"
    | "endsWith"
    | "greaterThan"
    | "lessThan";
}
