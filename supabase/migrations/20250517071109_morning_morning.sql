/*
  # Add initial projects

  1. Data
    - Insert initial projects:
      - FDC
      - ICCS-X
      - DITA
      - NORA
      - PULS
*/

INSERT INTO projects (name, description, status)
VALUES 
  ('FDC', 'Fire Direction Center System', 'active'),
  ('ICCS-X', 'Integrated Command and Control System X', 'active'),
  ('DITA', 'Digital Training Assistant', 'active'),
  ('NORA', 'Network Operations and Resource Allocation', 'active'),
  ('PULS', 'Platform Unified Logistics System', 'active');