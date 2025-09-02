import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "../DataTable/DataTable";
import { generateMockData } from "../mockData";
import type { Column, DataTableTheme } from "../DataTable/types";

interface TestData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  details: {
    location: string;
    department: string;
  };
}

const meta = {
  title: "DataTable/Tailwind Examples",
  component: DataTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Examples showcasing the DataTable component with Tailwind CSS styling and customization options.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const columns: Column<TestData>[] = [
  {
    key: "name",
    header: "Full Name",
    sortable: true,
    searchable: true,
    filterable: true,
    width: "25%",
  },
  {
    key: "email",
    header: "Email Address",
    sortable: true,
    searchable: true,
    width: "30%",
  },
  {
    key: "role",
    header: "Role",
    sortable: true,
    filterable: true,
    filterType: "select",
    width: "15%",
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    filterable: true,
    filterType: "select",
    width: "15%",
    render: (value: string) => (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === "active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    key: "lastLogin",
    header: "Last Login",
    sortable: true,
    width: "15%",
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
];

const data = generateMockData(50);

const expandedContent = (item: TestData) => (
  <div className="p-4 bg-gray-50 border-t border-gray-200">
    <h3 className="text-lg font-semibold mb-2 text-gray-900">Additional Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p className="text-sm text-gray-600">Location</p>
        <p className="font-medium text-gray-900">{item.details.location}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Department</p>
        <p className="font-medium text-gray-900">{item.details.department}</p>
      </div>
    </div>
  </div>
);

// Tailwind-based themes
const modernTailwindTheme: DataTableTheme = {
  container: "bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden",
  toolbar: "bg-gradient-to-r from-gray-50 to-white border-b border-gray-200/75",
  headerWrapper: "border-b border-gray-200/75",
  header: "bg-gradient-to-r from-gray-50 to-white text-gray-700",
  body: "divide-y divide-gray-100",
  row: "hover:bg-gray-50/50 transition-all duration-200 ease-in-out",
  cell: "px-6 py-4",
  footer: "border-t border-gray-200/75",
  pagination: "bg-gradient-to-r from-gray-50 to-white",
  selectedRow: "bg-blue-50/50 hover:bg-blue-50 border-l-4 border-blue-500",
  loadingOverlay: "bg-white bg-opacity-90 backdrop-blur-sm",
  checkbox: "text-blue-500 rounded-md border-gray-200",
  sortIcon: "text-gray-400",
  expandIcon: "text-gray-400",
  searchBar: "focus-within:ring-2 focus-within:ring-blue-500/20",
  exportMenu: "text-gray-700 hover:bg-gray-50/80",
};

const vibrantTailwindTheme: DataTableTheme = {
  container: "bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 rounded-2xl shadow-xl border-2 border-purple-200/50",
  toolbar: "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-b-0",
  headerWrapper: "border-b-0",
  header: "bg-gradient-to-r from-purple-600 to-blue-600 text-white",
  body: "divide-y divide-purple-100",
  row: "hover:bg-white/60 hover:shadow-sm transition-all duration-300 ease-in-out hover:scale-[1.01]",
  cell: "px-6 py-4 text-gray-700",
  footer: "border-t border-purple-200",
  pagination: "bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700",
  selectedRow: "bg-purple-100 border-l-4 border-purple-500 shadow-md",
  loadingOverlay: "bg-gradient-to-br from-purple-50/90 to-blue-50/90 backdrop-blur-sm",
  checkbox: "text-purple-500 rounded-lg border-purple-300",
  sortIcon: "text-purple-200",
  expandIcon: "text-purple-200",
  searchBar: "bg-white/80 backdrop-blur-sm border-white/50 focus-within:ring-2 focus-within:ring-white/50",
  exportMenu: "text-white hover:bg-white/20 border-white/30",
};

const glassmorphismTheme: DataTableTheme = {
  container: "bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30",
  toolbar: "bg-white/10 backdrop-blur-md border-b border-white/20",
  headerWrapper: "border-b border-white/20",
  header: "bg-white/10 backdrop-blur-md text-gray-800",
  body: "divide-y divide-white/20",
  row: "hover:bg-white/30 transition-all duration-200 ease-in-out",
  cell: "px-6 py-4 text-gray-800",
  footer: "border-t border-white/20",
  pagination: "bg-white/10 backdrop-blur-md text-gray-800",
  selectedRow: "bg-blue-500/20 border-l-4 border-blue-500",
  loadingOverlay: "bg-white/50 backdrop-blur-sm",
  checkbox: "text-blue-600 rounded border-white/50",
  sortIcon: "text-gray-600",
  expandIcon: "text-gray-600",
  searchBar: "bg-white/50 border-white/50 focus-within:ring-2 focus-within:ring-blue-500/50",
  exportMenu: "text-gray-800 hover:bg-white/20",
};

export const ModernTailwind: Story = {
  args: {
    data,
    columns,
    pageSize: 10,
    selectable: true,
    expandable: true,
    expandedContent,
    searchable: true,
    exportable: true,
    theme: modernTailwindTheme,
  },
};

export const VibrantGradient: Story = {
  args: {
    data,
    columns,
    pageSize: 10,
    selectable: true,
    expandable: true,
    expandedContent,
    searchable: true,
    exportable: true,
    theme: vibrantTailwindTheme,
  },
};

export const Glassmorphism: Story = {
  args: {
    data,
    columns,
    pageSize: 10,
    selectable: true,
    expandable: true,
    expandedContent,
    searchable: true,
    exportable: true,
    theme: glassmorphismTheme,
  },
  decorators: [
    (Story) => (
      <div 
        className="p-8 min-h-screen"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const TailwindUtilities: Story = {
  args: {
    data,
    columns,
    pageSize: 10,
    selectable: true,
    expandable: true,
    expandedContent,
    searchable: true,
    exportable: true,
    className: "border-4 border-indigo-500 rounded-2xl shadow-2xl",
    theme: {
      header: "bg-indigo-600 text-white",
      row: "hover:bg-indigo-50 hover:shadow-md transition-all duration-300",
      selectedRow: "bg-indigo-100 border-l-8 border-indigo-600",
      cell: "px-8 py-4",
      pagination: "bg-indigo-50 border-t-4 border-indigo-200",
    },
  },
};

export const ResponsiveTailwind: Story = {
  args: {
    data,
    columns,
    pageSize: 10,
    selectable: true,
    expandable: true,
    expandedContent,
    searchable: true,
    exportable: true,
    className: "mx-auto max-w-7xl",
    theme: {
      container: "bg-white rounded-lg md:rounded-xl shadow-sm md:shadow-lg border border-gray-200",
      toolbar: "p-3 md:p-4 bg-gray-50 md:bg-white",
      header: "bg-gray-100 md:bg-gray-50 text-gray-700",
      cell: "px-3 py-2 md:px-6 md:py-4 text-xs md:text-sm",
      row: "hover:bg-gray-50 md:hover:bg-gray-25",
    },
  },
};