![](https://github.com/AhmedAlatawi/react-datatable/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/github/ahmedalatawi/react-datatable/graph/badge.svg?token=95A4BRXOT5)](https://codecov.io/github/ahmedalatawi/react-datatable)
[![License: MIT](https://img.shields.io/github/license/AhmedAlatawi/react-datatable)](https://github.com/AhmedAlatawi/react-datatable/blob/master/LICENSE)

# React Datatable

A powerful and flexible React DataTable component with built-in virtualization, sorting, filtering, and more. Built for performance and scalability, handling large datasets with ease.

[DataTable Demo](https://react-datatable-demo.netlify.app)

[DataTable Storybook](https://react-datatable-storybook.netlify.app)

[Codesandbox using CSS](https://codesandbox.io/p/sandbox/kjj4ld)

[Codesandbox using Tailwind](https://codesandbox.io/p/devbox/festive-tess-928f89)

## Features

- 📦 **Virtual Scrolling**: Efficiently handle large datasets with virtualized rendering
- 🔍 **Advanced Search**:
  - Global text search across all columns
  - Column-specific filtering with multiple operators
  - Support for text, select, date, and numeric filters
- 🔄 **Smart Sorting**:
  - Multi-column sorting
  - Custom sort functions
  - Persistent sort state
- 🎯 **Powerful Filtering**:
  - Multiple filter types (contains, equals, starts/ends with)
  - Date range filters
  - Numeric comparisons
- ✨ **Row Management**:
  - Single and multi-row selection
  - Expandable rows with custom content
  - Row click handlers
- 📱 **Responsive Design**:
  - Mobile-friendly layout
  - Adaptive column sizing
  - Horizontal scrolling on small screens
- 🎨 **Customization**:
  - Custom cell renderers
  - Theming support
  - Custom CSS classes
- 📊 **Data Export**:
  - Export to CSV
  - Export to JSON
  - Export to Excel
- 🧪 **Quality Assured**:
  - Comprehensive test coverage
  - TypeScript support
  - Accessibility compliant
- ⚡ **Performance Optimized**:
  - Virtualized scrolling
  - Efficient re-rendering
  - Optimized for large datasets

## Installation

```bash
npm install @atawi/react-datatable
```

Or

```bash
yarn add @atawi/react-datatable
```

## CSS Setup

The library uses CSS by default and optionally supports Tailwind CSS.

### Default CSS (Recommended)

By default, the library uses its own CSS styles that work in any project:

```tsx
import { DataTable } from "@atawi/react-datatable";
import "@atawi/react-datatable/dist/style.css";
```

### With Tailwind CSS

If you prefer to use Tailwind CSS utilities, set the `useTailwind` prop to `true`:

```tsx
import { DataTable } from "@atawi/react-datatable";
import "@atawi/react-datatable/dist/style.css";

<DataTable data={data} columns={columns} useTailwind={true} />;
```

**Note:** When using `useTailwind={true}`, make sure your project has Tailwind CSS installed and configured.

### Custom Styling

You can customize the appearance regardless of which styling approach you use:

**With CSS Classes:**

```tsx
<DataTable
  data={data}
  columns={columns}
  className="my-custom-table"
  theme={{
    container: "custom-container",
    header: "custom-header",
    row: "custom-row",
    selectedRow: "custom-selected-row",
  }}
/>
```

**With Tailwind Classes (when useTailwind={true}):**

```tsx
<DataTable
  data={data}
  columns={columns}
  useTailwind={true}
  className="border-2 border-blue-500 rounded-xl"
  theme={{
    container: "bg-gradient-to-r from-blue-50 to-indigo-50",
    header: "bg-blue-600 text-white",
    row: "hover:bg-blue-50 transition-all duration-200",
    selectedRow: "bg-blue-100 border-l-4 border-blue-500",
  }}
/>
```

## Quick Start

```tsx
import { DataTable } from "@atawi/react-datatable";
import "@atawi/react-datatable/dist/style.css";

const columns = [
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
    key: "status",
    header: "Status",
    sortable: true,
    filterable: true,
    filterType: "select",
    render: (value) => <span className={`status-${value}`}>{value}</span>,
  },
];

const data = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive" },
];

function App() {
  const handleSelectionChange = (selectedItems) => {
    console.log("Selected:", selectedItems);
  };

  return (
    <DataTable
      data={data}
      columns={columns}
      pageSize={10}
      selectable={true}
      expandable={true}
      stickyHeader={true}
      searchable={true}
      exportable={true}
      useTailwind={false} // Use CSS by default
      onSelectionChange={handleSelectionChange}
    />
  );
}
```

## API Reference

### DataTable Props

| Prop                    | Type                              | Default              | Description                 |
| ----------------------- | --------------------------------- | -------------------- | --------------------------- |
| `data`                  | `T[]`                             | Required             | Array of data items         |
| `columns`               | `Column<T>[]`                     | Required             | Array of column definitions |
| `pageSize`              | `number`                          | `10`                 | Number of items per page    |
| `selectable`            | `boolean`                         | `true`               | Enable row selection        |
| `expandable`            | `boolean`                         | `false`              | Enable row expansion        |
| `stickyHeader`          | `boolean`                         | `true`               | Make header stick to top    |
| `loading`               | `boolean`                         | `false`              | Show loading state          |
| `pagination`            | `boolean`                         | `true`               | Enable pagination           |
| `searchable`            | `boolean`                         | `true`               | Show search box             |
| `exportable`            | `boolean`                         | `true`               | Show export options         |
| `disableInternalSearch` | `boolean`                         | `false`              | disable internal search     |
| `theme`                 | `DataTableTheme`                  | `undefined`          | Custom theme object         |
| `onSelectionChange`     | `(items: T[]) => void`            | `undefined`          | Selection callback          |
| `onRowClick`            | `(item: T) => void`               | `undefined`          | Row click callback          |
| `onPageChange`          | `(page: number) => void`          | `undefined`          | Page number change callback |
| `onSearchTextChange`    | `(text: string) => void`          | `undefined`          | Search text change callback |
| `emptyMessage`          | `string`                          | `'No results found'` | Message shown when no data  |
| `className`             | `string`                          | `''`                 | Additional CSS class        |
| `rowClassName`          | `string \| ((item: T) => string)` | `''`                 | Row CSS class               |

### Column Definition

```typescript
interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  searchable?: boolean;
  filterable?: boolean;
  filterType?: "text" | "select" | "date" | "number";
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  align?: "left" | "center" | "right";
  render?: (value: T[keyof T], item: T) => ReactNode;
}
```

### Theme Customization

```typescript
interface DataTableTheme {
  container?: string;
  header?: string;
  table?: string;
  row?: string;
  cell?: string;
  pagination?: string;
  expandedRow?: string;
  selectedRow?: string;
  loadingOverlay?: string;
  checkbox?: string;
  sortIcon?: string;
  expandIcon?: string;
}
```

## Advanced Usage

### Styling Approaches

The library supports multiple styling approaches to fit your project needs:

#### 1. Tailwind CSS Classes

```tsx
const customTheme = {
  container: "bg-white border-2 border-gray-300 rounded-xl shadow-lg",
  header: "bg-gradient-to-r from-gray-700 to-gray-900 text-white",
  row: "hover:bg-gray-50 hover:shadow-sm transition-all duration-200",
  cell: "px-6 py-4 border-r border-gray-100 last:border-r-0",
  selectedRow: "bg-blue-50 border-l-4 border-blue-500",
  pagination: "bg-gray-50 border-t-2 border-gray-200",
};

<DataTable data={data} columns={columns} theme={customTheme} />;
```

#### 2. CSS Classes

```css
.dark-theme {
  background-color: #1f2937;
  color: white;
}

.dark-theme .datatable-header {
  background-color: #374151;
  color: #f3f4f6;
}

.dark-theme .virtual-row:hover {
  background-color: #374151;
}
```

```tsx
<DataTable data={data} columns={columns} className="dark-theme" />
```

#### 3. CSS-in-JS / Styled Components

```tsx
const StyledDataTable = styled(DataTable)`
  .datatable-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .virtual-row:hover {
    background-color: rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }
`;
```

### Custom Cell Rendering

```tsx
const columns = [
  {
    key: "status",
    header: "Status",
    render: (value, row) => (
      <Badge color={value === "active" ? "green" : "red"} label={value} />
    ),
  },
];
```

### Expandable Rows

```tsx
<DataTable
  data={data}
  columns={columns}
  expandable={true}
  expandedContent={(item) => (
    <div className="expanded-details">
      <h3>Details for {item.name}</h3>
      <pre>{JSON.stringify(item, null, 2)}</pre>
    </div>
  )}
/>
```

### Custom Filtering

```tsx
const columns = [
  {
    key: "date",
    header: "Date",
    filterable: true,
    filterType: "date",
    render: (value) => new Date(value).toLocaleDateString(),
  },
];
```

### Large Dataset Handling

```tsx
const largeData = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
  // ... other fields
}));

<DataTable
  data={largeData}
  columns={columns}
  pageSize={50}
  pagination={false} // Use virtual scrolling instead
/>;
```

## Component Exports

The library exports individual components and hooks for advanced customization:

```tsx
import {
  DataTable,
  SearchBar,
  ExportMenu,
  Pagination,
  TableHeader,
  TableRow,
  ColumnFilter,
  LoadingSpinner,
  useDataTableLogic,
  useSorting,
  useSelection,
  usePagination,
  useVirtualization,
  useRowInteraction,
  type Column,
  type DataTableProps,
  type DataTableTheme,
  type Filter,
} from "@atawi/react-datatable";
```

### Building Custom Tables

Use the exported hooks to build completely custom table implementations:

```tsx
import {
  useDataTableLogic,
  useSorting,
  useSelection,
} from "@atawi/react-datatable";

function CustomTable({ data, columns }) {
  const { filteredData } = useDataTableLogic(data, ["name", "email"]);
  const { sortedData, handleSort } = useSorting(filteredData);
  const { selectedRows, handleSelectRow } = useSelection(sortedData);

  return (
    <div className="my-custom-table">{/* Your custom implementation */}</div>
  );
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari (latest)
- Chrome for Android (latest)

## Contributing

Any contributions are welcome! Please see the [Contributing Guide](CONTRIBUTING.md) for details.

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Build for production
npm run build
```

## License

MIT © Atawi
