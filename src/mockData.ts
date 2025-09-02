interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  details: {
    location: string;
    department: string;
  };
}

const LOCATIONS = [
  'New York', 'London', 'Tokyo', 'Paris', 'Berlin', 'Sydney', 'Toronto',
  'Singapore', 'Dubai', 'Mumbai', 'São Paulo', 'Hong Kong'
];

const DEPARTMENTS = [
  'Engineering', 'Marketing', 'Sales', 'Support', 'HR', 'Finance',
  'Operations', 'Product', 'Design', 'Legal', 'Research'
];

const ROLES = [
  'Admin', 'User', 'Editor', 'Viewer', 'Manager', 'Developer',
  'Analyst', 'Coordinator', 'Director', 'Consultant'
];

const FIRST_NAMES = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael',
  'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan',
  'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen'
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
  'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
  'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function generateMockData(count: number): User[] {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago

  return Array.from({ length: count }, (_, i) => {
    const firstName = getRandomElement(FIRST_NAMES);
    const lastName = getRandomElement(LAST_NAMES);
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;

    return {
      id: i + 1,
      name,
      email,
      role: getRandomElement(ROLES),
      status: Math.random() > 0.3 ? 'active' : 'inactive',
      lastLogin: generateRandomDate(startDate, endDate).toISOString(),
      details: {
        location: getRandomElement(LOCATIONS),
        department: getRandomElement(DEPARTMENTS),
      },
    };
  });
}