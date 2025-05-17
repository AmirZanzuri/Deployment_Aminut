import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import Dialog, { DialogFooter } from '../components/ui/Dialog';
import { Filter, Search, Plus, Edit2, Trash2, Server, X, Link, ExternalLink } from 'lucide-react';
import { mockPlatforms, mockComponentVersions, mockProjects, mockApplicationVersions } from '../services/mockData';
import { Platform, ComponentVersion, Project, ApplicationVersion, Component } from '../types';
import { Link as RouterLink } from 'react-router-dom';
import { useComponentStore } from '../store/useComponentStore';

const DeploymentMatrix: React.FC = () => {
  const { components: availableComponents } = useComponentStore();
  const [isLoading, setIsLoading] = useState(true);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [componentVersions, setComponentVersions] = useState<ComponentVersion[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [applicationVersions, setApplicationVersions] = useState<ApplicationVersion[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [componentTypes, setComponentTypes] = useState<string[]>([]);
  const [selectedComponentType, setSelectedComponentType] = useState<string>('all');
  const [grouping, setGrouping] = useState<'project' | 'type' | 'version'>('project');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [showComponentsDialog, setShowComponentsDialog] = useState(false);

  const [newPlatform, setNewPlatform] = useState({
    name: '',
    urn: '',
    type: 'HQ Server' as const,
    project_id: '',
    application_version_id: '',
    component_id: '',
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPlatforms(mockPlatforms);
      setComponentVersions(mockComponentVersions);
      setProjects(mockProjects);
      setApplicationVersions(mockApplicationVersions);
      
      // Extract unique component types
      const types = Array.from(new Set(mockComponentVersions.map(c => c.component_type)));
      setComponentTypes(types);
      
      setIsLoading(false);

      // Set default project_id for new platform
      if (mockProjects.length > 0) {
        setNewPlatform(prev => ({ ...prev, project_id: mockProjects[0].id }));
      }
    }, 1000);
  }, []);

  // Rest of the component implementation remains exactly the same...
  // All the existing functions, JSX, and other logic continue here unchanged

  return (
    // Existing JSX remains exactly the same...
  );
};

export default DeploymentMatrix;