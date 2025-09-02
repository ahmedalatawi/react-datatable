import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "../DataTable/DataTable";
import { generateMockData } from "../mockData";
import type { Column } from "../DataTable/types";

const meta = {
  title: "DataTable/Migration Examples",
  component: DataTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Examples showing how to migrate from other table libraries and integrate with popular UI frameworks.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

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

const columns: Column<TestData>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    searchable: true,
    filterable: true,
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

const data = generateMockData(50);

// Example: Ant Design style
export const AntDesignStyle: Story = {
  args: {
    data,
    columns,
    pageSize: 10,
    selectable: true,
    searchable: true,
    exportable: true,
    theme: {
      container: "bg-white rounded-lg border border-gray-300",
      header: "bg-gray-50 text-gray-700 border-b border-gray-300",
      row: "hover:bg-blue-50 border-b border-gray-100",
      cell: "px-4 py-3 text-sm",
      selectedRow: "bg-blue-50",
      pagination: "bg-white border-t border-gray-300 px-4 py-3",
    },
  },
};

// Example: Material-UI style
export const MaterialUIStyle: Story = {
  args: {
    data,
    columns,
    pageSize: 10,
    selectable: true,
    searchable: true,
    exportable: true,
    theme: {
      container: "bg-white rounded-lg shadow-md border-0",
      header: "bg-gray-100 text-gray-700 font-medium",
      row: "hover:bg-gray-50 border-b border-gray-200",
      cell: "px-6 py-4 text-sm",
      selectedRow: "bg-blue-50",
      pagination: "bg-white px-6 py-3",
    },
  },
};

// Example: Bootstrap style
export const BootstrapStyle: Story = {
  args: {
    data,
    columns,
    pageSize: 10,
    selectable: true,
    searchable: true,
    exportable: true,
    className: "table-responsive",
    theme: {
      container: "bg-white border border-gray-300 rounded",
      header: "bg-gray-100 text-gray-700 border-b border-gray-300",
      row: "hover:bg-gray-50 border-b border-gray-200",
      cell: "px-4 py-3",
      selectedRow: "bg-blue-50",
      pagination: "bg-white border-t border-gray-300",
    },
  },
};

// Example: Chakra UI style
export const ChakraUIStyle: Story = {
  args: {
    data,
    columns,
    pageSize: 10,
    selectable: true,
    searchable: true,
    exportable: true,
    theme: {
      container: "bg-white rounded-md shadow-sm border border-gray-200",
      header: "bg-gray-50 text-gray-600 font-semibold",
      row: "hover:bg-gray-50 border-b border-gray-100",
      cell: "px-6 py-4",
      selectedRow: "bg-blue-50",
      pagination: "bg-white border-t border-gray-200",
    },
  },
};

// Example: Custom CSS variables approach
export const CSSVariables: Story = {
  args: {
    data,
    columns,
    pageSize: 10,
    selectable: true,
    searchable: true,
    exportable: true,
    className: "css-variables-theme",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          "--datatable-primary": "#6366f1",
          "--datatable-primary-light": "#e0e7ff",
          "--datatable-text": "#1f2937",
          "--datatable-text-light": "#6b7280",
          "--datatable-border": "#e5e7eb",
          "--datatable-hover": "#f9fafb",
        } as React.CSSProperties}
      >
        <style>{`
          .css-variables-theme {
            border: 2px solid var(--datatable-primary);
            border-radius: 12px;
          }
          .css-variables-theme .datatable-header {
            background-color: var(--datatable-primary);
            color: white;
          }
          .css-variables-theme .virtual-row:hover {
            background-color: var(--datatable-primary-light);
          }
          .css-variables-theme .virtual-row.selected {
            background-color: var(--datatable-primary-light);
            border-left: 4px solid var(--datatable-primary);
          }
        `}</style>
        <Story />
      </div>
    ),
  ],
};