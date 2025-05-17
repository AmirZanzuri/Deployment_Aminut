import { Project, Platform, ComponentVersion, Product, ApplicationVersion, ElynxVersion, GrxVersion, SmartTmrVersion } from '../types';

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

// Mock Component Versions
export const mockComponentVersions: ComponentVersion[] = [
  {
    id: '1',
    platform_id: '1',
    component_type: 'product',
    version_number: '1.0.0',
    status: 'deployed',
    deployment_date: randomPastDate(5),
    known_issues: [],
  },
  {
    id: '2',
    platform_id: '2',
    component_type: 'app',
    version_number: '1.1.0',
    status: 'testing',
    deployment_date: randomPastDate(3),
    known_issues: ['Performance issues on older devices'],
  },
  {
    id: '3',
    platform_id: '3',
    component_type: 'framework',
    version_number: '2.0.0',
    status: 'rollback_needed',
    deployment_date: randomPastDate(2),
    known_issues: ['Critical authentication bug', 'Data sync issues'],
  },
  {
    id: '4',
    platform_id: '4',
    component_type: 'radio',
    version_number: '1.5.0',
    status: 'deprecated',
    deployment_date: randomPastDate(30),
    known_issues: ['Deprecated API endpoints'],
  },
  {
    id: '5',
    platform_id: '5',
    component_type: 'map',
    version_number: '3.0.0',
    status: 'deployed',
    deployment_date: randomPastDate(1),
    known_issues: [],
  },
];

// Mock Application Versions
export const mockApplicationVersions: ApplicationVersion[] = [
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
export const mockElynxVersions: ElynxVersion[] = [
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
export const mockGrxVersions: GrxVersion[] = [
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
export const mockSmartTmrVersions: SmartTmrVersion[] = [
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
export const mockPlatforms: Platform[] = [
  {
    id: '1',
    name: 'Web Portal',
    urn: '1234567',
    application_version_id: '1',
    type: 'web',
    environment: 'production',
    project_id: '1',
    created_at: randomPastDate(250),
  },
  {
    id: '2',
    name: 'Mobile Client',
    urn: '2345678',
    application_version_id: '1',
    type: 'mobile',
    environment: 'production',
    project_id: '1',
    created_at: randomPastDate(180),
  },
  {
    id: '3',
    name: 'Desktop Application',
    urn: '3456789',
    application_version_id: '2',
    type: 'desktop',
    environment: 'staging',
    project_id: '1',
    created_at: randomPastDate(120),
  },
  {
    id: '4',
    name: 'Backend Infrastructure',
    urn: '4567890',
    application_version_id: '2',
    type: 'server',
    environment: 'development',
    project_id: '2',
    created_at: randomPastDate(80),
  },
  {
    id: '5',
    name: 'Secure Messaging',
    urn: '5678901',
    application_version_id: '1',
    type: 'web',
    environment: 'testing',
    project_id: '2',
    created_at: randomPastDate(60),
  },
  {
    id: '6',
    name: 'Field Terminal',
    urn: '6789012',
    application_version_id: '1',
    type: 'mobile',
    environment: 'production',
    project_id: '3',
    created_at: randomPastDate(40),
  },
];