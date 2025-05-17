export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'pending' | 'completed';
  version: string;
  created_at: string;
}

export interface Platform {
  id: string;
  name: string;
  urn: string;
  application_version_id: string;
  type: 'HQ Server' | 'Mounted Station';
  project_id: string;
  created_at: string;
  component_nodes?: ComponentNode[];
}

export interface ComponentNode {
  id: string;
  platform_id: string;
  component_id: string;
  component_type: 'HQ Server' | 'Client' | 'Tactical Computer';
  hardware: string;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface ComponentVersion {
  id: string;
  platform_id: string;
  component_type: 'HQ Server' | 'Client' | 'Tactical Computer';
  version_number: string;
  status: 'testing' | 'deployed' | 'rollback_needed' | 'deprecated';
  deployment_date: string;
  known_issues?: string[];
  release_notes_url?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface ApplicationVersion {
  id: string;
  version_number: string;
  ecix_version: string;
  core_version: string;
  tiger_x_version: string;
  map_core_version: string;
  created_at: string;
  platforms_count?: number;
  platforms?: Platform[];
  projects?: Project[];
}

export interface ElynxVersion {
  id: string;
  version_number: string;
  radio_version: string;
  firmware_version: string;
  created_at: string;
}

export interface GrxVersion {
  id: string;
  version_number: string;
  software_version: string;
  protocol_version: string;
  created_at: string;
}

export interface SmartTmrVersion {
  id: string;
  version_number: string;
  hardware_version: string;
  software_version: string;
  created_at: string;
}

export type StatusType = 'success' | 'warning' | 'error' | 'info' | 'default';

export interface Component {
  id: string;
  name: string;
  type: 'HQ Server' | 'Client' | 'Tactical Computer';
  description: string;
  ip: string;
  version: string;
  hardware: string;
  created_at: string;
  node_id?: string;
}