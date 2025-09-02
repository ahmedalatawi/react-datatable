import { useState } from "react";
import { utils, write } from "xlsx";
import { Column } from "../types";

interface ExportMenuProps<T> {
  data: T[];
  columns: Column<T>[];
  filename?: string;
  theme?: string;
}

export function ExportMenu<T>({
  data,
  columns,
  theme = "",
  filename = "data",
}: ExportMenuProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const exportToCSV = () => {
    const csvContent = data
      .map((row) =>
        columns
          .map((col) => {
            const value = row[col.key];
            return col.render
              ? col.render(value, row)?.toString()
              : String(value);
          })
          .join(",")
      )
      .join("\n");

    const header = columns.map((col) => col.header).join(",");
    const csv = `${header}\n${csvContent}`;
    downloadFile(csv, `${filename}.csv`, "text/csv");
    setIsOpen(false);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, `${filename}.json`, "application/json");
    setIsOpen(false);
  };

  const exportToExcel = () => {
    const ws = utils.json_to_sheet(
      data.map((row) =>
        columns.reduce(
          (acc, col) => ({
            ...acc,
            [col.header]: col.render
              ? col.render(row[col.key], row)
              : row[col.key],
          }),
          {}
        )
      )
    );
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");
    const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
    downloadFile(
      new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      `${filename}.xlsx`,
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    setIsOpen(false);
  };

  const downloadFile = (
    content: string | Blob,
    filename: string,
    mimeType: string
  ) => {
    const blob =
      content instanceof Blob
        ? content
        : new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={`export-menu-container ${theme}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="export-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Export
        <svg
          className={`arrow-icon ${isOpen ? "open" : ""}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <path
            d="M2 4L6 8L10 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="export-menu-overlay"
            onClick={() => setIsOpen(false)}
          />
          <div className="export-menu" role="menu">
            <button
              onClick={exportToCSV}
              className="export-option"
              role="menuitem"
            >
              Export as CSV
            </button>
            <button
              onClick={exportToJSON}
              className="export-option"
              role="menuitem"
            >
              Export as JSON
            </button>
            <button
              onClick={exportToExcel}
              className="export-option"
              role="menuitem"
            >
              Export as Excel
            </button>
          </div>
        </>
      )}
    </div>
  );
}
