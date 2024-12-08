export const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active' },
];

export const columns = [
  { key: 'name', header: 'Name', sortable: true, searchable: true, filterable: true },
  { key: 'email', header: 'Email', sortable: true, searchable: true },
  { key: 'status', header: 'Status', sortable: true, filterable: true, filterType: 'select' },
];

export function generateLargeMockData(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Person ${i + 1}`,
    email: `person${i + 1}@example.com`,
    status: i % 2 === 0 ? 'active' : 'inactive',
  }));
}