import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "../DataTable";
import { generateMockData } from "../mockData";
import { DataTableTheme } from "../DataTable/types";

import "./styles.css";

const meta = {
  title: "DataTable/Borders",
  component: DataTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const columns = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    searchable: true,
    filterable: false,
  },
  {
    key: "email",
    header: "Email",
    sortable: true,
    searchable: true,
  },
  {
    key: "role",
    header: "Role",
    sortable: true,
    // filterable: true,
    // filterType: "select",
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    // filterable: true,
    // filterType: "select",
  },
];

const data = generateMockData(50);

const borderedTheme: DataTableTheme = {
  container: "bg-white rounded-lg shadow-sm border border-gray-200",
  headerWrapper: "border-b border-gray-200",
  header: "bg-gray-50 text-gray-700",
  body: "divide-y divide-gray-200",
  row: "hover:bg-gray-50 transition-colors duration-150",
  cell: "px-6 py-4 border-x first:border-l-0 last:border-r-0 border-gray-200",
  footer: "border-t border-gray-200",
  pagination: "bg-white",
  selectedRow: "bg-blue-50",
  loadingOverlay: "bg-white bg-opacity-75",
  checkbox: "text-blue-500 rounded border-gray-300",
  sortIcon: "text-gray-400",
  expandIcon: "text-gray-400",
  toolbar: "border-b border-gray-200 bg-white",
  searchBar: "focus-within:border-blue-500",
  exportMenu: "text-gray-700 hover:bg-gray-50",
};

const borderlessTheme: DataTableTheme = {
  container: "bg-white rounded-lg shadow-sm",
  headerWrapper: "border-b border-gray-100",
  header: "bg-gray-50/50 text-gray-700",
  body: "divide-y divide-gray-100",
  row: "hover:bg-gray-50/50 transition-colors duration-150",
  cell: "px-6 py-4",
  footer: "border-t border-gray-100",
  pagination: "bg-white",
  selectedRow: "bg-blue-50/50",
  loadingOverlay: "bg-white bg-opacity-75",
  checkbox: "text-blue-500 rounded border-gray-200",
  sortIcon: "text-gray-400",
  expandIcon: "text-gray-400",
  toolbar: "border-b border-gray-100 bg-white",
  searchBar: "focus-within:ring-2 focus-within:ring-blue-500/20",
  exportMenu: "text-gray-700 hover:bg-gray-50/50",
};

const stripedBorderedTheme: DataTableTheme = {
  container: "bg-white rounded-lg shadow-sm border-2 border-gray-200",
  headerWrapper: "border-b-2 border-gray-200",
  header: "bg-gray-100 text-gray-800 font-semibold",
  body: "[&>div:nth-child(even)]:bg-gray-50",
  row: "hover:bg-blue-50/30 transition-colors duration-150",
  cell: "px-6 py-4 border-x border-gray-200 first:border-l-0 last:border-r-0",
  footer: "border-t-2 border-gray-200",
  pagination: "bg-white",
  selectedRow: "bg-blue-50 hover:bg-blue-100/50",
  loadingOverlay: "bg-white bg-opacity-75",
  checkbox: "text-blue-500 rounded border-gray-300",
  sortIcon: "text-gray-500",
  expandIcon: "text-gray-500",
  toolbar: "border-b-2 border-gray-200 bg-white",
  searchBar: "focus-within:border-blue-500",
  exportMenu: "text-gray-700 hover:bg-gray-50",
};

const modernBorderedTheme: DataTableTheme = {
  container:
    "bg-white rounded-xl shadow-lg border border-gray-200/50 overflow-hidden",
  headerWrapper: "border-b border-gray-200/75",
  header: "bg-gradient-to-r from-gray-50 to-white text-gray-700",
  body: "divide-y divide-gray-100",
  row: "hover:bg-gray-50/50 transition-all duration-200 ease-in-out",
  cell: "px-6 py-4 border-x border-gray-100 first:border-l-0 last:border-r-0",
  footer: "border-t border-gray-200/75",
  pagination: "bg-gradient-to-r from-gray-50 to-white",
  selectedRow: "bg-blue-50/50 hover:bg-blue-50",
  loadingOverlay: "bg-white bg-opacity-90 backdrop-blur-sm",
  checkbox: "text-blue-500 rounded-md border-gray-200",
  sortIcon: "text-gray-400",
  expandIcon: "text-gray-400",
  toolbar: "border-b border-gray-200/75 bg-gradient-to-r from-gray-50 to-white",
  searchBar: "focus-within:ring-2 focus-within:ring-blue-500/20",
  exportMenu: "text-gray-700 hover:bg-gray-50/80",
};

export const Bordered: Story = {
  args: {
    data,
    columns,
    theme: borderedTheme,
    pageSize: 10,
    selectable: true,
    // expandable: true,
    searchable: true,
    exportable: true,
    useTailwind: true,
  },
};

export const Borderless: Story = {
  args: {
    data,
    columns,
    theme: borderlessTheme,
    pageSize: 10,
    selectable: true,
    // expandable: true,
    searchable: true,
    exportable: true,
    className: "borderless",
    useTailwind: true,
  },
};

export const StripedBordered: Story = {
  args: {
    data,
    columns,
    theme: stripedBorderedTheme,
    pageSize: 10,
    selectable: true,
    expandable: true,
    searchable: true,
    exportable: true,
    useTailwind: true,
  },
};

export const ModernBordered: Story = {
  args: {
    data,
    columns,
    theme: modernBorderedTheme,
    pageSize: 10,
    selectable: true,
    expandable: true,
    searchable: true,
    exportable: true,
    useTailwind: true,
  },
};
