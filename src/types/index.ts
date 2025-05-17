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
  version: string;
  type: 'web' | 'mobile' | 'desktop' | 'server';
  environment: 'production' | 'staging' | 'testing' | 'development';
  project_id: string;
  created_at: string;
}

export interface ComponentVersion {
  id: string;
  platform_id: string;
  component_type: 'product' | 'app' | 'radio' | 'framework' | 'map';
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
  ecix_version: string;
  core_version: string;
  tiger_x_version: string;
  map_core_version: string;
  created_at: string;
  platforms_count?: number;
  platforms?: Platform[];
  projects?: Project[];
}

export type StatusType = 'success' | 'warning' | 'error' | 'info' | 'default';