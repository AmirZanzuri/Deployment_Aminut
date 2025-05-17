/*
  # Add Application Versions Table

  1. New Tables
    - `application_versions`
      - `id` (uuid, primary key)
      - `ecix_version` (text)
      - `core_version` (text)
      - `tiger_x_version` (text)
      - `map_core_version` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `application_versions` table
    - Add policy for authenticated users to read data
*/

CREATE TABLE IF NOT EXISTS application_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ecix_version text NOT NULL,
  core_version text NOT NULL,
  tiger_x_version text NOT NULL,
  map_core_version text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create junction table for platforms using specific versions
CREATE TABLE IF NOT EXISTS platform_versions (
  platform_id uuid REFERENCES platforms(id) ON DELETE CASCADE,
  version_id uuid REFERENCES application_versions(id) ON DELETE CASCADE,
  PRIMARY KEY (platform_id, version_id)
);

ALTER TABLE application_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access to authenticated users" ON application_versions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read access to authenticated users" ON platform_versions
  FOR SELECT TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS platform_versions_platform_id_idx ON platform_versions(platform_id);
CREATE INDEX IF NOT EXISTS platform_versions_version_id_idx ON platform_versions(version_id);