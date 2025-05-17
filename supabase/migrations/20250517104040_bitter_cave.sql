/*
  # Add Hardware field to component_nodes table

  1. Changes
    - Add hardware field to component_nodes table
    - Update component_type enum to restrict types
*/

-- Add hardware field to component_nodes
ALTER TABLE component_nodes 
ADD COLUMN hardware text;

-- Update component_type enum
ALTER TABLE component_nodes 
DROP CONSTRAINT IF EXISTS component_nodes_component_type_check;

ALTER TABLE component_nodes 
ADD CONSTRAINT component_nodes_component_type_check 
CHECK (component_type IN ('HQ Server', 'Client', 'Tactical Computer'));