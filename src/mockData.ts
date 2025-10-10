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

interface Invoice {
  id: number;
  submissionDate: string;
  invoiceNumber: string;
  contract: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Not Paid';
  type: 'time' | 'fixed' | 'milestone';
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
  const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);

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

const CONTRACT_TYPES = ['Time tracking contract', 'Fixed price contract', 'Milestone contract'];
const INVOICE_AMOUNTS = [2720, 3400, 6800];

export function generateInvoiceData(count: number): Invoice[] {
  const today = new Date('2025-10-10');
  const startDate = new Date('2025-05-01');

  return Array.from({ length: count }, (_, i) => {
    const submissionDate = generateRandomDate(startDate, today);
    const dueDate = new Date(submissionDate);
    dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 30) + 10);

    const isPaid = Math.random() > 0.2;
    const contractType = getRandomElement(CONTRACT_TYPES);
    const type = contractType.includes('Time') ? 'time' : contractType.includes('Fixed') ? 'fixed' : 'milestone';

    return {
      id: i + 1,
      submissionDate: submissionDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      invoiceNumber: `INV_${submissionDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '/')}_${i + 4}`,
      contract: contractType,
      dueDate: dueDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      amount: getRandomElement(INVOICE_AMOUNTS),
      status: isPaid ? 'Paid' : 'Not Paid',
      type,
    };
  });
}