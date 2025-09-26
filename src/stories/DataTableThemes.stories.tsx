import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "../DataTable";
import { generateMockData } from "../mockData";
import { DataTableTheme } from "../DataTable/types";

const meta = {
  title: "DataTable/Themes",
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
    searchable: false,
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
    filterable: true,
    filterType: "select",
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    filterable: true,
    filterType: "select",
  },
];

const data = generateMockData(50);

const modernTheme: DataTableTheme = {
  container: "bg-white rounded-xl shadow-lg border border-gray-100",
  header: "bg-gray-50 text-gray-700",
  row: "hover:bg-gray-50 transition-colors duration-150",
  cell: "px-6 py-4",
  pagination: "bg-white border-t border-gray-100",
  selectedRow: "bg-blue-50",
  loadingOverlay: "bg-white bg-opacity-75",
  checkbox: "text-blue-500 rounded",
  sortIcon: "text-gray-400",
  expandIcon: "text-gray-400",
};

const darkTheme: DataTableTheme = {
  container: "bg-gray-900 rounded-xl shadow-lg border border-gray-800",
  header: "bg-gray-800 text-gray-200",
  row: "text-gray-300 hover:bg-gray-800 border-gray-700",
  cell: "px-6 py-4 border-gray-700",
  pagination: "bg-gray-900 border-t border-gray-800 text-gray-300",
  selectedRow: "bg-gray-800",
  loadingOverlay: "bg-gray-900 bg-opacity-75",
  checkbox: "text-blue-500 bg-gray-700 border-gray-600 rounded",
  sortIcon: "text-gray-500",
  expandIcon: "text-gray-500",
};

const minimalTheme: DataTableTheme = {
  container: "bg-white",
  header: "border-b border-gray-200 font-normal",
  row: "hover:bg-gray-50",
  cell: "px-4 py-3",
  pagination: "border-t border-gray-200",
  selectedRow: "bg-blue-50",
  loadingOverlay: "bg-white bg-opacity-90",
  checkbox: "text-blue-500 rounded",
  sortIcon: "text-gray-400",
  expandIcon: "text-gray-400",
};

const colorfulTheme: DataTableTheme = {
  container: "bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg",
  header: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
  row: "hover:bg-white/50 transition-all duration-200",
  cell: "px-6 py-4",
  pagination: "bg-white/50 border-t border-purple-100",
  selectedRow: "bg-purple-50",
  loadingOverlay: "bg-white bg-opacity-75",
  checkbox: "text-purple-500 rounded",
  sortIcon: "text-purple-200",
  expandIcon: "text-purple-200",
};

export const Modern: Story = {
  args: {
    data,
    columns,
    theme: modernTheme,
    pageSize: 10,
    selectable: true,
    expandable: true,
    searchable: true,
    exportable: true,
    useTailwind: true,
  },
};

export const Dark: Story = {
  args: {
    data,
    columns,
    theme: darkTheme,
    pageSize: 10,
    selectable: true,
    expandable: true,
    searchable: true,
    exportable: true,
    useTailwind: true,
  },
};

export const Minimal: Story = {
  args: {
    data,
    columns,
    theme: minimalTheme,
    pageSize: 10,
    selectable: true,
    expandable: true,
    searchable: true,
    exportable: true,
    useTailwind: true,
  },
};

export const Colorful: Story = {
  args: {
    data,
    columns,
    theme: colorfulTheme,
    pageSize: 10,
    selectable: true,
    expandable: true,
    searchable: true,
    exportable: true,
    useTailwind: true,
  },
};
