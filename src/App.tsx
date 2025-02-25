import React, { useState } from "react";
import { DataTable } from "./DataTable/DataTable";
import type { Column } from "./DataTable/types";
import { generateMockData } from "./mockData";

const users = generateMockData(50);
const largeDataset = generateMockData(10000);

function App() {
  const [activeTab, setActiveTab] = useState<"basic" | "large">("basic");
  const [stickyHeader, setStickyHeader] = useState(true);
  const [loading, setLoading] = useState(false);

  const columns: Column<any>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      searchable: true,
      width: "20%",
      filterable: true,
    },
    {
      key: "email",
      header: "Email",
      sortable: true,
      searchable: true,
      width: "25%",
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      searchable: true,
      width: "15%",
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      searchable: true,
      width: "15%",
      render: (value) => (
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
      searchable: false,
      width: "25%",
      render: (value) => new Date(value as string).toLocaleDateString(),
    },
  ];

  const handleSelectionChange = (selectedItems: any[]) => {
    console.log("Selected items:", selectedItems);
  };

  const expandedContent = (item: any) => (
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
  );

  const handleTabChange = async (tab: "basic" | "large") => {
    setLoading(true);
    setActiveTab(tab);
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            DataTable Examples
          </h1>
          <div className="flex flex-wrap gap-4">
            <div className="flex space-x-4">
              <button
                onClick={() => handleTabChange("basic")}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "basic"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Basic Example (50 rows)
              </button>
              <button
                onClick={() => handleTabChange("large")}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "large"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Large Dataset (10,000 rows)
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="stickyHeader"
                checked={stickyHeader}
                onChange={(e) => setStickyHeader(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="stickyHeader" className="text-sm text-gray-700">
                Sticky Header
              </label>
            </div>
          </div>
        </div>

        {activeTab === "basic" ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Basic Features Demo</h2>
            <p className="text-gray-600 mb-6">
              Demonstrates sorting, searching, selection, and expandable rows
              with a smaller dataset.
            </p>
            <DataTable
              data={users}
              columns={columns}
              pageSize={10}
              selectable={true}
              expandable={true}
              expandedContent={expandedContent}
              onSelectionChange={handleSelectionChange}
              onPageChange={(page) => console.log("Page changed:", page)}
              onSearchTextChange={(searchText) =>
                console.log("Search text changed:", searchText)
              }
              defaultSortColumn="name"
              defaultSortDirection="asc"
              stickyHeader={stickyHeader}
              searchable={true}
              searchPlaceholder="Search users..."
              exportable={true}
              exportFilename="users-data"
              loading={loading}
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">
              Large Dataset Performance
            </h2>
            <p className="text-gray-600 mb-6">
              Demonstrates virtualized rendering and efficient handling of
              10,000 rows.
            </p>
            <DataTable
              data={largeDataset}
              columns={columns}
              pageSize={50}
              selectable={true}
              expandable={false}
              onSelectionChange={handleSelectionChange}
              onPageChange={(page) => console.log("Page changed:", page)}
              defaultSortColumn="name"
              defaultSortDirection="asc"
              stickyHeader={stickyHeader}
              pagination={false}
              searchable={false}
              exportable={false}
              loading={loading}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
