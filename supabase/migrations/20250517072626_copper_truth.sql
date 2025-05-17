/*
  # Add version field to projects table

  1. Changes
    - Add version field to projects table with default value '1.0.0'
*/

ALTER TABLE projects 
ADD COLUMN version text NOT NULL DEFAULT '1.0.0';