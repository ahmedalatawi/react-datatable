import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "../DataTable/DataTable";
import { generateMockData } from "../mockData";
import type { Column } from "../DataTable/types";

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
  title: "DataTable/Customization Guide",
  component: DataTable<TestData>,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Comprehensive examples showing different ways to customize the DataTable component for various design systems and requirements.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable<TestData>>;

export default meta;
type Story = StoryObj<typeof meta>;

const columns: Column<TestData>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    searchable: true,
    filterable: true,
    width: "25%",
  },
  {
    key: "email",
    header: "Email",
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
    width: "20%",
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    filterable: true,
    filterType: "select",
    width: "25%",
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
];

const data = generateMockData(30);

const expandedContent = (item: TestData) => (
  <div className="p-6 bg-slate-50 border-t border-slate-200">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="font-semibold text-slate-900 mb-2">Contact Info</h4>
        <p className="text-sm text-slate-600">Email: {item.email}</p>
        <p className="text-sm text-slate-600">
          Location: {item.details.location}
        </p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="font-semibold text-slate-900 mb-2">Department</h4>
        <p className="text-sm text-slate-600">{item.details.department}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="font-semibold text-slate-900 mb-2">Activity</h4>
        <p className="text-sm text-slate-600">
          Last Login: {new Date(item.lastLogin).toLocaleDateString()}
        </p>
      </div>
    </div>
  </div>
);

// Example 1: Material Design inspired
export const MaterialDesign: Story = {
  args: {
    data,
    columns,
    pageSize: 10,
    selectable: true,
    searchable: true,
    exportable: true,
    theme: {
      container: "bg-white rounded-lg shadow-md border-0 overflow-hidden",
      toolbar: "bg-blue-600 text-white px-6 py-4",
      header: "bg-blue-50 text-blue-900 font-semibold",
      row: "hover:bg-blue-25 transition-colors duration-200",
      cell: "px-6 py-4 border-b border-blue-100",
      selectedRow: "bg-blue-100 border-l-4 border-blue-600",
      pagination: "bg-blue-50 px-6 py-3",
      searchBar: "bg-white/20 border-white/30 text-white placeholder-blue-100",
      exportMenu: "text-white hover:bg-white/20",
    },
  },
};

// Example 2: Neumorphism style
export const Neumorphism: Story = {
  args: {
    data,
    columns,
    pageSize: 10,
    selectable: true,
    searchable: true,
    exportable: true,
    className: "bg-gray-100 p-4",
    theme: {
      container: "bg-gray-100 rounded-2xl shadow-inner border-0",
      toolbar: "bg-gray-100 shadow-sm rounded-t-2xl",
      header: "bg-gray-100 text-gray-700 shadow-sm",
      row: "hover:shadow-sm hover:bg-white/50 transition-all duration-300",
      cell: "px-6 py-4",
      selectedRow: "bg-white shadow-md border-l-4 border-blue-500",
      pagination: "bg-gray-100 shadow-inner rounded-b-2xl",
    },
  },
};

// Example 3: High contrast accessibility
export const HighContrast: Story = {
  args: {
    data,
    columns,
    pageSize: 10,
    selectable: true,
    searchable: true,
    exportable: true,
    theme: {
      container: "bg-white border-4 border-black rounded-lg",
      toolbar: "bg-black text-white border-b-4 border-black",
      header: "bg-yellow-300 text-black font-bold border-b-4 border-black",
      row: "hover:bg-yellow-100 border-b-2 border-gray-300",
      cell: "px-6 py-4 text-black font-medium",
      selectedRow: "bg-yellow-200 border-l-8 border-black",
      pagination: "bg-gray-100 border-t-4 border-black",
      searchBar: "border-4 border-black text-black font-bold",
      exportMenu: "text-white hover:bg-gray-800 border-2 border-white",
    },
  },
};

// Example 4: Compact mobile-first
export const CompactMobile: Story = {
  args: {
    data,
    columns: columns.slice(0, 3), // Fewer columns for mobile
    pageSize: 15,
    selectable: true,
    searchable: true,
    exportable: false,
    useTailwind: false,
    theme: {
      container: "bg-white rounded-lg shadow-sm border border-gray-200",
      header: "bg-gray-50 text-gray-600 text-xs",
      row: "hover:bg-gray-25 active:bg-gray-50",
      cell: "px-3 py-2 text-sm",
      selectedRow: "bg-blue-50",
      pagination: "bg-gray-50 px-4 py-2",
    },
  },
};

// Example 5: Enterprise dashboard style
export const EnterpriseDashboard: Story = {
  args: {
    data,
    columns,
    pageSize: 20,
    selectable: true,
    expandable: true,
    expandedContent,
    searchable: true,
    exportable: true,
    useTailwind: false,
    theme: {
      container: "bg-white rounded-lg shadow-lg border border-slate-200",
      toolbar: "bg-slate-800 text-white px-6 py-4",
      header: "bg-slate-100 text-slate-700 font-semibold",
      row: "hover:bg-slate-50 transition-colors duration-150",
      cell: "px-6 py-4 text-slate-700",
      selectedRow: "bg-blue-50 border-l-4 border-blue-600",
      pagination: "bg-slate-50 border-t border-slate-200",
      searchBar: "bg-white/20 border-white/30 text-white placeholder-slate-300",
      exportMenu: "text-white hover:bg-white/20",
    },
  },
};

// Example 6: Colorful creative theme
export const CreativeColorful: Story = {
  args: {
    data,
    columns,
    pageSize: 10,
    selectable: true,
    expandable: true,
    expandedContent,
    searchable: true,
    exportable: true,
    useTailwind: false,
    theme: {
      container:
        "bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 rounded-3xl shadow-2xl border-2 border-pink-200",
      toolbar:
        "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white",
      header:
        "bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 text-purple-900 font-bold",
      row: "hover:bg-white/70 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]",
      cell: "px-6 py-4",
      selectedRow:
        "bg-gradient-to-r from-pink-100 to-purple-100 border-l-4 border-pink-500 shadow-lg",
      pagination: "bg-gradient-to-r from-pink-50 to-indigo-50",
      searchBar: "bg-white/30 border-white/50 text-white placeholder-pink-200",
      exportMenu: "text-white hover:bg-white/20",
    },
  },
};
