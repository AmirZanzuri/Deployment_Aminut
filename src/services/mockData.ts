import { Project, Platform, ComponentVersion, Product, ApplicationVersion, ElynxVersion, GrxVersion, SmartTmrVersion, Component } from '../types';

// Generate a random date in the past (up to maxDays ago)
const randomPastDate = (maxDays = 365) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * maxDays));
  return date.toISOString();
};

// Mock Components
const mockComponents: Component[] = [
  {
    id: '1',
    name: 'HQ Server Alpha',
    type: 'HQ Server',
    description: 'Primary HQ Server',
    ip: '192.168.1.100',
    version: '1.0.0',
    hardware: 'Intel Xeon E5-2680, 64GB RAM',
    created_at: randomPastDate(100),
  },
  {
    id: '2',
    name: 'Smart TMR Unit 1',
    type: 'Smart TMR',
    description: 'Field Smart TMR Unit',
    ip: '192.168.1.101',
    version: '1.0.0',
    hardware: 'Intel i7-1185G7, 32GB RAM',
    created_at: randomPastDate(90),
  },
  {
    id: '3',
    name: 'E-Lynks Radio Alpha',
    type: 'E-Lynks Radio',
    description: 'Primary Communication Radio',
    ip: '192.168.1.102',
    version: '1.0.0',
    hardware: 'Custom Radio Hardware v2',
    created_at: randomPastDate(80),
  },
  {
    id: '4',
    name: 'GRX System Beta',
    type: 'GRX',
    description: 'GRX Processing Unit',
    ip: '192.168.1.103',
    version: '1.0.0',
    hardware: 'Custom GRX Hardware v3',
    created_at: randomPastDate(70),
  }
];

// Mock Projects
const mockProjects: Project[] = [
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

// Mock Component Versions
const mockComponentVersions: ComponentVersion[] = [
  {
    id: '1',
    platform_id: '1',
    component_type: 'HQ Server',
    version_number: '1.0.0',
    status: 'deployed',
    deployment_date: randomPastDate(5),
    known_issues: [],
  },
  {
    id: '2',
    platform_id: '2',
    component_type: 'Client',
    version_number: '1.1.0',
    status: 'testing',
    deployment_date: randomPastDate(3),
    known_issues: ['Performance issues on older devices'],
  },
  {
    id: '3',
    platform_id: '3',
    component_type: 'Tactical Computer',
    version_number: '2.0.0',
    status: 'rollback_needed',
    deployment_date: randomPastDate(2),
    known_issues: ['Critical authentication bug', 'Data sync issues'],
  }
];

// Mock Application Versions
const mockApplicationVersions: ApplicationVersion[] = [
  {
    id: '1',
    version_number: '1.0.0',
    ecix_version: '2.1.0',
    core_version: '3.0.0',
    tiger_x_version: '1.5.0',
    map_core_version: '4.2.1',
    created_at: randomPastDate(20),
  },
  {
    id: '2',
    version_number: '1.1.0',
    ecix_version: '2.2.0',
    core_version: '3.1.0',
    tiger_x_version: '1.6.0',
    map_core_version: '4.3.0',
    created_at: randomPastDate(10),
  },
];

// Mock E-lynx Versions
const mockElynxVersions: ElynxVersion[] = [
  {
    id: '1',
    version_number: '1.0.0',
    radio_version: '2.1.0',
    firmware_version: '3.0.0',
    created_at: randomPastDate(15),
  },
  {
    id: '2',
    version_number: '1.1.0',
    radio_version: '2.2.0',
    firmware_version: '3.1.0',
    created_at: randomPastDate(5),
  },
];

// Mock GRX Versions
const mockGrxVersions: GrxVersion[] = [
  {
    id: '1',
    version_number: '1.0.0',
    software_version: '2.1.0',
    protocol_version: '3.0.0',
    created_at: randomPastDate(12),
  },
  {
    id: '2',
    version_number: '1.1.0',
    software_version: '2.2.0',
    protocol_version: '3.1.0',
    created_at: randomPastDate(3),
  },
];

// Mock Smart-TMR Versions
const mockSmartTmrVersions: SmartTmrVersion[] = [
  {
    id: '1',
    version_number: '1.0.0',
    hardware_version: '2.1.0',
    software_version: '3.0.0',
    created_at: randomPastDate(8),
  },
  {
    id: '2',
    version_number: '1.1.0',
    hardware_version: '2.2.0',
    software_version: '3.1.0',
    created_at: randomPastDate(2),
  },
];

// Mock Platforms
const mockPlatforms: Platform[] = [
  {
    id: '1',
    name: 'Node 1',
    urn: '1234567',
    application_version_id: '1',
    type: 'HQ Server',
    project_id: '1',
    component_id: '1',
    created_at: randomPastDate(250),
  },
  {
    id: '2',
    name: 'Node 2',
    urn: '2345678',
    application_version_id: '1',
    type: 'Mounted Station',
    project_id: '1',
    component_id: '2',
    created_at: randomPastDate(180),
  },
  {
    id: '3',
    name: 'Node 3',
    urn: '3456789',
    application_version_id: '2',
    type: 'HQ Server',
    project_id: '1',
    component_id: '3',
    created_at: randomPastDate(120),
  },
  {
    id: '4',
    name: 'Node 4',
    urn: '4567890',
    application_version_id: '2',
    type: 'Mounted Station',
    project_id: '2',
    created_at: randomPastDate(80),
  },
  {
    id: '5',
    name: 'Node 5',
    urn: '5678901',
    application_version_id: '1',
    type: 'HQ Server',
    project_id: '2',
    created_at: randomPastDate(60),
  },
  {
    id: '6',
    name: 'Node 6',
    urn: '6789012',
    application_version_id: '1',
    type: 'Mounted Station',
    project_id: '3',
    created_at: randomPastDate(40),
  },
];

export {
  mockComponents,
  mockPlatforms,
  mockProjects,
  mockComponentVersions,
  mockApplicationVersions,
  mockElynxVersions,
  mockGrxVersions,
  mockSmartTmrVersions,
};