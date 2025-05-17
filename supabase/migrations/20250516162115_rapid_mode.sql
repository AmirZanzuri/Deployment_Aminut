/*
  # Initial Schema Setup for C2 Deployment Dashboard

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `status` (enum: active, pending, completed)
      - `created_at` (timestamp)
    
    - `platforms`
      - `id` (uuid, primary key)
      - `name` (text)
      - `version` (text)
      - `type` (enum: web, mobile, desktop, server)
      - `environment` (enum: production, staging, testing, development)
      - `project_id` (uuid, foreign key)
      - `created_at` (timestamp)
    
    - `component_versions`
      - `id` (uuid, primary key)
      - `platform_id` (uuid, foreign key)
      - `component_type` (enum: product, app, radio, framework, map)
      - `version_number` (text)
      - `status` (enum: testing, deployed, rollback_needed, deprecated)
      - `deployment_date` (timestamp)
      - `known_issues` (text[])
      - `release_notes_url` (text)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create custom types
CREATE TYPE project_status AS ENUM ('active', 'pending', 'completed');
CREATE TYPE platform_type AS ENUM ('web', 'mobile', 'desktop', 'server');
CREATE TYPE platform_environment AS ENUM ('production', 'staging', 'testing', 'development');
CREATE TYPE component_type AS ENUM ('product', 'app', 'radio', 'framework', 'map');
CREATE TYPE deployment_status AS ENUM ('testing', 'deployed', 'rollback_needed', 'deprecated');

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  status project_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create platforms table
CREATE TABLE IF NOT EXISTS platforms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  version text NOT NULL,
  type platform_type NOT NULL,
  environment platform_environment NOT NULL,
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create component_versions table
CREATE TABLE IF NOT EXISTS component_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_id uuid NOT NULL REFERENCES platforms(id) ON DELETE CASCADE,
  component_type component_type NOT NULL,
  version_number text NOT NULL,
  status deployment_status NOT NULL DEFAULT 'testing',
  deployment_date timestamptz NOT NULL DEFAULT now(),
  known_issues text[] DEFAULT '{}',
  release_notes_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE component_versions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to authenticated users" ON projects
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read access to authenticated users" ON platforms
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read access to authenticated users" ON component_versions
  FOR SELECT TO authenticated USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS platforms_project_id_idx ON platforms(project_id);
CREATE INDEX IF NOT EXISTS component_versions_platform_id_idx ON component_versions(platform_id);