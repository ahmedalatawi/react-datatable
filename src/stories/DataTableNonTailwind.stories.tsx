import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "../DataTable/DataTable";
import { generateMockData } from "../mockData";
import type { Column } from "../DataTable/types";

// Custom CSS for non-Tailwind examples
const customStyles = `
  .non-tailwind-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  }

  .corporate-theme {
    border: 2px solid #2c5aa0;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(44, 90, 160, 0.15);
  }

  .corporate-theme .datatable-header {
    background: linear-gradient(135deg, #2c5aa0 0%, #1e3a8a 100%);
    color: white;
    font-weight: 600;
  }

  .corporate-theme .virtual-row:hover {
    background-color: #f0f4ff;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .corporate-theme .virtual-row.selected {
    background-color: #e0e7ff;
    border-left: 4px solid #2c5aa0;
  }

  .modern-theme {
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .modern-theme .datatable-header {
    background: linear-gradient(to right, #f8fafc, #e2e8f0);
    color: #334155;
    border-bottom: 2px solid #e2e8f0;
  }

  .modern-theme .virtual-row {
    border-bottom: 1px solid #f1f5f9;
  }

  .modern-theme .virtual-row:hover {
    background: linear-gradient(to right, #f8fafc, #f1f5f9);
  }

  .modern-theme .virtual-row.selected {
    background: linear-gradient(to right, #dbeafe, #bfdbfe);
  }

  .dark-theme {
    background-color: #1a202c;
    border: 1px solid #2d3748;
    color: #e2e8f0;
  }

  .dark-theme .datatable-header {
    background-color: #2d3748;
    color: #e2e8f0;
    border-bottom: 1px solid #4a5568;
  }

  .dark-theme .virtual-row {
    border-bottom: 1px solid #2d3748;
    color: #e2e8f0;
  }

  .dark-theme .virtual-row:hover {
    background-color: #2d3748;
  }

  .dark-theme .virtual-row.selected {
    background-color: #3182ce;
  }

  .dark-theme .virtual-cell {
    color: #e2e8f0;
  }

  .dark-theme .loading-overlay {
    background-color: rgba(26, 32, 44, 0.75);
  }

  .dark-theme .loading-text {
    color: #e2e8f0;
  }

  .minimal-theme {
    border: none;
    box-shadow: none;
    background: transparent;
  }

  .minimal-theme .datatable-header {
    background: transparent;
    border-bottom: 2px solid #e5e7eb;
    font-weight: 500;
  }

  .minimal-theme .virtual-row {
    border-bottom: 1px solid #f3f4f6;
  }

  .minimal-theme .virtual-row:hover {
    background-color: #f9fafb;
  }
`;

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
  title: "DataTable/Non-Tailwind Examples",
  component: DataTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Examples showing how to use the DataTable component in projects without Tailwind CSS, using custom CSS for styling.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="non-tailwind-container">
        <style>{customStyles}</style>
        <Story />
      </div>
    ),
  ],
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
    render: (value: string) => {
      const style = {
        display: "inline-flex",
        alignItems: "center",
        padding: "0.25rem 0.625rem",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: "500",
        backgroundColor: value === "active" ? "#dcfce7" : "#fee2e2",
        color: value === "active" ? "#166534" : "#991b1b",
      };
      return <span style={style}>{value}</span>;
    },
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
  <div style={{ padding: "1rem", backgroundColor: "#f9fafb" }}>
    <h3
      style={{
        fontSize: "1.125rem",
        fontWeight: "600",
        marginBottom: "0.5rem",
      }}
    >
      Additional Details
    </h3>
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
    >
      <div>
        <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>Location</p>
        <p style={{ fontWeight: "500" }}>{item.details.location}</p>
      </div>
      <div>
        <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>Department</p>
        <p style={{ fontWeight: "500" }}>{item.details.department}</p>
      </div>
    </div>
  </div>
);

export const Corporate: Story = {
  args: {
    data,
    columns,
    pageSize: 10,
    selectable: true,
    expandable: true,
    expandedContent,
    searchable: true,
    exportable: true,
    className: "corporate-theme",
  },
};

export const Modern: Story = {
  args: {
    data,
    columns,
    pageSize: 10,
    selectable: true,
    expandable: true,
    expandedContent,
    searchable: true,
    exportable: true,
    className: "modern-theme",
  },
};

export const Dark: Story = {
  args: {
    data,
    columns,
    pageSize: 10,
    selectable: true,
    expandable: true,
    expandedContent,
    searchable: true,
    exportable: true,
    className: "dark-theme",
  },
};

export const Minimal: Story = {
  args: {
    data,
    columns,
    pageSize: 10,
    selectable: true,
    expandable: false,
    searchable: true,
    exportable: true,
    className: "minimal-theme",
  },
};

export const CustomCSSInJS: Story = {
  args: {
    data,
    columns,
    pageSize: 10,
    selectable: true,
    expandable: true,
    expandedContent,
    searchable: true,
    exportable: true,
    theme: {
      container: "",
      header: "",
      row: "",
      cell: "",
      selectedRow: "",
      pagination: "",
    },
  },
  render: (args) => {
    const customTheme = {
      container: {
        border: "2px solid #8b5cf6",
        borderRadius: "12px",
        boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.1)",
        background: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)",
      },
      header: {
        background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
        color: "white",
        fontWeight: "600",
      },
      row: {
        transition: "all 0.2s ease",
      },
    };

    return (
      <div style={customTheme.container}>
        <DataTable {...args} />
      </div>
    );
  },
};
