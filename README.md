# React Datatable

A powerful and flexible React DataTable component with built-in virtualization, sorting, filtering, and more. Built for performance and scalability, handling large datasets with ease.

![DataTable Demo](https://github.com/ahmedalatawi/react-datatable/raw/main/demo.gif)

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
      onSelectionChange={handleSelectionChange}
    />
  );
}
```

## API Reference

### DataTable Props

| Prop                | Type                              | Default              | Description                 |
| ------------------- | --------------------------------- | -------------------- | --------------------------- |
| `data`              | `T[]`                             | Required             | Array of data items         |
| `columns`           | `Column<T>[]`                     | Required             | Array of column definitions |
| `pageSize`          | `number`                          | `10`                 | Number of items per page    |
| `selectable`        | `boolean`                         | `true`               | Enable row selection        |
| `expandable`        | `boolean`                         | `false`              | Enable row expansion        |
| `stickyHeader`      | `boolean`                         | `true`               | Make header stick to top    |
| `loading`           | `boolean`                         | `false`              | Show loading state          |
| `pagination`        | `boolean`                         | `true`               | Enable pagination           |
| `searchable`        | `boolean`                         | `true`               | Show search box             |
| `exportable`        | `boolean`                         | `true`               | Show export options         |
| `theme`             | `DataTableTheme`                  | `undefined`          | Custom theme object         |
| `onSelectionChange` | `(items: T[]) => void`            | `undefined`          | Selection callback          |
| `onRowClick`        | `(item: T) => void`               | `undefined`          | Row click callback          |
| `emptyMessage`      | `string`                          | `'No results found'` | Message shown when no data  |
| `className`         | `string`                          | `''`                 | Additional CSS class        |
| `rowClassName`      | `string \| ((item: T) => string)` | `''`                 | Row CSS class               |

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
