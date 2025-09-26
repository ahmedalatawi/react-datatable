import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { generateMockData } from "../mockData";
import type { Column } from "../DataTable/types";
import { DataTable } from "../DataTable/DataTable";

interface TestData {
  id: number;
  name: string;
  email: string;
  status: string;
  details: {
    location: string;
    department: string;
  };
}

const meta = {
  title: "DataTable/Component",
  component: DataTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A powerful and flexible React DataTable component with built-in virtualization, sorting, filtering, and more.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    data: {
      control: "object",
      description: "Array of data items to display in the table",
    },
    columns: {
      control: "object",
      description: "Array of column definitions",
    },
    pageSize: {
      control: { type: "number", min: 1, max: 100 },
      description: "Number of items to display per page",
    },
    selectable: {
      control: "boolean",
      description: "Enable row selection",
    },
    expandable: {
      control: "boolean",
      description: "Enable row expansion",
    },
    stickyHeader: {
      control: "boolean",
      description: "Make header stick to top",
    },
    loading: {
      control: "boolean",
      description: "Show loading state",
    },
  },
} satisfies Meta<typeof DataTable>;

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
    width: "35%",
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    filterable: true,
    filterType: "select",
    width: "20%",
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

export const Basic: Story = {
  args: {
    data: generateMockData(50),
    columns,
    pageSize: 10,
    selectable: true,
    expandable: false,
    stickyHeader: true,
    useTailwind: false,
  },
};

export const Loading: Story = {
  args: {
    ...Basic.args,
    loading: true,
    useTailwind: false,
  },
};

export const Empty: Story = {
  args: {
    ...Basic.args,
    data: [],
    emptyMessage: "No data available",
    useTailwind: false,
  },
};

export const WithExpandableRows: Story = {
  args: {
    ...Basic.args,
    expandable: true,
    useTailwind: false,
    expandedContent: (item: TestData) => (
      <div className="p-4 bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Additional Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Location</p>
            <p className="font-medium">{item.details.location}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Department</p>
            <p className="font-medium">{item.details.department}</p>
          </div>
        </div>
      </div>
    ),
  },
};

export const LargeDataset: Story = {
  args: {
    ...Basic.args,
    data: generateMockData(10000),
    pageSize: 50,
    useTailwind: false,
  },
};
