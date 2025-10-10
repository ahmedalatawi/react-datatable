import React, { useCallback } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeList as List } from "react-window";
import { SearchBar } from "./components/SearchBar";
import { ExportMenu } from "./components/ExportMenu";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { useDataTableLogic } from "./hooks/useDataTableLogic";
import { TableHeader } from "./components/TableHeader";
import { Pagination } from "./components/Pagination";
import { TableRow } from "./components/TableRow";
import { useSelection } from "./hooks/useSelection";
import { useSorting } from "./hooks/useSorting";
import { useRowInteraction } from "./hooks/useRowInteraction";
import { useVirtualization } from "./hooks/useVirtualization";
import { usePagination } from "./hooks/usePagination";
import { DataTableProps } from "./types";

import "./styles/index.scss";

const ROW_HEIGHT = 48;
const EXPANDED_ROW_HEIGHT = 248;
const OVERSCAN_COUNT = 5;

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  pagination = true,
  pageSize = 10,
  selectable = true,
  expandable = false,
  expandedContent,
  onSelectionChange,
  onRowClick,
  onPageChange,
  onSearchTextChange,
  theme = {},
  sortable = true,
  defaultSortColumn,
  defaultSortDirection = "asc",
  loading = false,
  emptyMessage = "No results found",
  className = "",
  rowClassName = "",
  headerClassName = "",
  cellClassName = "",
  stickyHeader = true,
  "aria-label": ariaLabel = "Data table",
  "aria-describedby": ariaDescribedby,
  searchable = true,
  searchPlaceholder = "Search...",
  exportable = true,
  exportFilename = "table-data",
  disableInternalSearch = false,
  useTailwind = false,
  rowActions,
  onRowNavigate,
  onBulkAction,
  toolbarLeft,
  toolbarRight,
}: DataTableProps<T>) {
  const { sortConfig, handleSort, sortedData } = useSorting(
    data,
    defaultSortColumn,
    defaultSortDirection,
    sortable
  );

  const {
    searchTerm,
    handleSearch,
    expandedRows,
    toggleExpandRow,
    filters,
    handleFilterChange,
    uniqueColumnValues,
    filteredData,
  } = useDataTableLogic(
    sortedData,
    searchable
      ? columns.filter((col) => col.searchable).map((col) => col.key)
      : [],
    disableInternalSearch
  );

  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(filteredData, pageSize, pagination);

  const displayData = pagination ? paginatedData : filteredData;

  const { selectedRows, handleSelectAll, handleSelectRow } = useSelection(
    displayData,
    selectable ? onSelectionChange : undefined
  );

  const { handleRowClick, handleKeyPress } = useRowInteraction(onRowClick);

  const { listRef, getItemSize } = useVirtualization(
    displayData,
    expandedRows,
    {
      itemHeight: ROW_HEIGHT,
      expandedHeight: EXPANDED_ROW_HEIGHT,
      overscanCount: OVERSCAN_COUNT,
    }
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      onPageChange?.(page);
    },
    [onPageChange, setCurrentPage]
  );

  const handleSearchChange = useCallback(
    (term: string) => {
      handleSearch(term);
      setCurrentPage(1);
      onSearchTextChange?.(term);
    },
    [handleSearch, onSearchTextChange, setCurrentPage]
  );

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const item = displayData[index];
      if (!item) return null;

      const isExpanded = expandable && expandedRows.has(item.id);
      const isSelected = selectable && selectedRows.has(item.id);

      return (
        <div style={style} className={`${cellClassName} ${theme?.cell || ""}`}>
          <TableRow
            item={item}
            columns={columns}
            selected={isSelected}
            expanded={isExpanded}
            selectable={selectable}
            expandable={expandable}
            onSelect={selectable ? () => handleSelectRow(item.id) : undefined}
            onExpand={expandable ? () => toggleExpandRow(item.id) : undefined}
            onClick={onRowClick ? () => handleRowClick(item) : undefined}
            onKeyPress={onRowClick ? (e) => handleKeyPress(e, item) : undefined}
            expandedContent={
              expandable && expandedContent ? expandedContent(item) : undefined
            }
            theme={
              typeof rowClassName === "function"
                ? rowClassName(item)
                : `${rowClassName} ${theme?.row || ""}`
            }
            useTailwind={useTailwind}
            rowActions={rowActions}
            onNavigate={onRowNavigate}
          />
        </div>
      );
    },
    [
      displayData,
      expandable,
      expandedRows,
      selectable,
      selectedRows,
      cellClassName,
      theme?.cell,
      theme?.row,
      columns,
      onRowClick,
      expandedContent,
      rowClassName,
      useTailwind,
      handleSelectRow,
      toggleExpandRow,
      handleRowClick,
      handleKeyPress,
      rowActions,
      onRowNavigate,
    ]
  );

  const showToolbar = searchable || exportable;

  return (
    <div
      className={`datatable-container ${
        useTailwind ? "use-tailwind" : "use-css"
      } ${className} ${theme?.container || ""}`}
      role="grid"
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
    >
      {(showToolbar || toolbarLeft || toolbarRight) && (
        <div className={`datatable-toolbar ${theme?.toolbar || ""}`}>
          <div className="toolbar-left">
            {toolbarLeft}
            {searchable && (
              <SearchBar
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder={searchPlaceholder}
                theme={theme?.searchBar}
                useTailwind={useTailwind}
              />
            )}
          </div>
          <div className="toolbar-right">
            {toolbarRight}
            {exportable && (
              <ExportMenu
                data={data}
                columns={columns}
                filename={exportFilename}
                theme={theme?.exportMenu}
                useTailwind={useTailwind}
              />
            )}
          </div>
        </div>
      )}

      <div
        className={`datatable-header-wrapper ${stickyHeader ? "sticky" : ""} ${
          showToolbar ? "with-toolbar" : ""
        } ${theme?.headerWrapper || ""}`}
      >
        <TableHeader
          columns={columns}
          sortConfig={sortConfig}
          onSort={sortable ? handleSort : undefined}
          selectable={selectable}
          selectedAll={
            selectedRows.size === displayData.length && displayData.length > 0
          }
          onSelectAll={selectable ? handleSelectAll : undefined}
          theme={`${headerClassName} ${theme?.header || ""}`}
          sticky={stickyHeader}
          filters={filters}
          onFilterChange={handleFilterChange}
          uniqueColumnValues={uniqueColumnValues}
          useTailwind={useTailwind}
          hasRowActions={!!(rowActions || onRowNavigate)}
        />
      </div>

      <div className={`datatable-body ${theme?.body || ""}`}>
        {loading ? (
          <div className={`loading-overlay ${theme?.loadingOverlay || ""}`}>
            <LoadingSpinner useTailwind={useTailwind} />
          </div>
        ) : displayData.length === 0 ? (
          <div
            className={`empty-message ${theme?.emptyMessage || ""}`}
            role="status"
          >
            {emptyMessage}
          </div>
        ) : (
          <AutoSizer>
            {({ height, width }: { height: number; width: number }) => (
              <List
                ref={listRef}
                height={height}
                width={width}
                itemCount={displayData.length}
                itemSize={getItemSize}
                overscanCount={OVERSCAN_COUNT}
                className="react-window-container"
              >
                {Row}
              </List>
            )}
          </AutoSizer>
        )}
      </div>

      {pagination && (
        <div className={`datatable-footer ${theme?.footer || ""}`}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            theme={theme?.pagination}
            useTailwind={useTailwind}
          />
        </div>
      )}
    </div>
  );
}
