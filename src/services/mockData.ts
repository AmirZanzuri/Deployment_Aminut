import { Project, Platform, ComponentVersion, Product } from '../types';

// Generate a random date in the past (up to maxDays ago)
const randomPastDate = (maxDays = 365) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * maxDays));
  return date.toISOString();
};

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'FDC',
    description: 'Fire Direction Center System',
    status: 'active',
    version: '2.1.0',
    created_at: randomPastDate(300),
  },
  {
    id: '2',
    name: 'ICCS-X',
    description: 'Integrated Command and Control System X',
    status: 'active',
    version: '1.5.0',
    created_at: randomPastDate(200),
  },
  {
    id: '3',
    name: 'DITA',
    description: 'Digital Training Assistant',
    status: 'active',
    version: '3.0.0',
    created_at: randomPastDate(100),
  },
  {
    id: '4',
    name: 'NORA',
    description: 'Network Operations and Resource Allocation',
    status: 'active',
    version: '1.2.3',
    created_at: randomPastDate(150),
  },
  {
    id: '5',
    name: 'PULS',
    description: 'Platform Unified Logistics System',
    status: 'active',
    version: '2.0.1',
    created_at: randomPastDate(90),
  },
];

// Mock Platforms
export const mockPlatforms: Platform[] = [
  {
    id: '1',
    name: 'Web Portal',
    version: '2.5.0',
    type: 'web',
    environment: 'production',
    project_id: '1',
    created_at: randomPastDate(250),
  },
  {
    id: '2',
    name: 'Mobile Client',
    version: '3.1.2',
    type: 'mobile',
    environment: 'production',
    project_id: '1',
    created_at: randomPastDate(180),
  },
  {
    id: '3',
    name: 'Desktop Application',
    version: '4.0.1',
    type: 'desktop',
    environment: 'staging',
    project_id: '1',
    created_at: randomPastDate(120),
  },
  {
    id: '4',
    name: 'Backend Infrastructure',
    version: '1.9.0',
    type: 'server',
    environment: 'development',
    project_id: '2',
    created_at: randomPastDate(80),
  },
  {
    id: '5',
    name: 'Secure Messaging',
    version: '2.0.0',
    type: 'web',
    environment: 'testing',
    project_id: '2',
    created_at: randomPastDate(60),
  },
  {
    id: '6',
    name: 'Field Terminal',
    version: '1.5.3',
    type: 'mobile',
    environment: 'production',
    project_id: '3',
    created_at: randomPastDate(40),
  },
];

// Mock Component Versions
export const mockComponentVersions: ComponentVersion[] = [
  {
    id: '1',
    platform_id: '1',
    component_type: 'app',
    version_number: '2.5.0',
    status: 'deployed',
    deployment_date: randomPastDate(20),
    known_issues: [],
    release_notes_url: 'https://example.com/release-notes/v2.5.0',
  },
  {
    id: '2',
    platform_id: '1',
    component_type: 'framework',
    version_number: '1.2.3',
    status: 'deployed',
    deployment_date: randomPastDate(19),
  },
  {
    id: '3',
    platform_id: '1',
    component_type: 'map',
    version_number: '3.4.1',
    status: 'testing',
    deployment_date: randomPastDate(5),
    known_issues: ['Performance issues with large datasets'],
  },
  {
    id: '4',
    platform_id: '2',
    component_type: 'app',
    version_number: '3.1.2',
    status: 'deployed',
    deployment_date: randomPastDate(15),
  },
  {
    id: '5',
    platform_id: '2',
    component_type: 'radio',
    version_number: '2.0.0',
    status: 'rollback_needed',
    deployment_date: randomPastDate(3),
    known_issues: ['Connectivity issues in remote areas', 'Battery drain issue'],
  },
  {
    id: '6',
    platform_id: '3',
    component_type: 'app',
    version_number: '4.0.1',
    status: 'deployed',
    deployment_date: randomPastDate(10),
  },
  {
    id: '7',
    platform_id: '3',
    component_type: 'product',
    version_number: '2.1.0',
    status: 'deployed',
    deployment_date: randomPastDate(9),
  },
  {
    id: '8',
    platform_id: '4',
    component_type: 'app',
    version_number: '1.9.0',
    status: 'deprecated',
    deployment_date: randomPastDate(50),
  },
  {
    id: '9',
    platform_id: '5',
    component_type: 'app',
    version_number: '2.0.0',
    status: 'deployed',
    deployment_date: randomPastDate(8),
  },
  {
    id: '10',
    platform_id: '6',
    component_type: 'app',
    version_number: '1.5.3',
    status: 'deployed',
    deployment_date: randomPastDate(7),
  },
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Command Console',
    description: 'Central command and control console',
    status: 'active',
    created_at: randomPastDate(300),
  },
  {
    id: '2',
    name: 'Field Communicator',
    description: 'Portable communication device for field operations',
    status: 'active',
    created_at: randomPastDate(250),
  },
  {
    id: '3',
    name: 'Tactical Map',
    description: 'Interactive mapping and situational awareness tool',
    status: 'active',
    created_at: randomPastDate(200),
  },
  {
    id: '4',
    name: 'Sensor Hub',
    description: 'Integration platform for various sensor types',
    status: 'inactive',
    created_at: randomPastDate(150),
  },
];