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

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Deployment Matrix</h1>
        <Button onClick={() => setCreateDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Platform
        </Button>
      </div>

      {/* Filters Section */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search platforms..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="border rounded-lg px-4 py-2"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="all">All Projects</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
        <select
          className="border rounded-lg px-4 py-2"
          value={selectedComponentType}
          onChange={(e) => setSelectedComponentType(e.target.value)}
        >
          <option value="all">All Types</option>
          {componentTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select
          className="border rounded-lg px-4 py-2"
          value={grouping}
          onChange={(e) => setGrouping(e.target.value as 'project' | 'type' | 'version')}
        >
          <option value="project">Group by Project</option>
          <option value="type">Group by Type</option>
          <option value="version">Group by Version</option>
        </select>
      </div>

      {/* Content Section */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map(platform => (
            <Card key={platform.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{platform.name}</h3>
                  <p className="text-sm text-gray-500">{platform.urn}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedPlatform(platform);
                      setEditDialogOpen(true);
                    }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedPlatform(platform);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Badge>{platform.type}</Badge>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Server className="w-4 h-4" />
                  <span>Project: {projects.find(p => p.id === platform.project_id)?.name}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Dialogs */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        title="Add New Platform"
      >
        {/* Dialog content would go here */}
        <DialogFooter>
          <Button variant="ghost" onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button>Create Platform</Button>
        </DialogFooter>
      </Dialog>

      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        title="Edit Platform"
      >
        {/* Dialog content would go here */}
        <DialogFooter>
          <Button variant="ghost" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button>Save Changes</Button>
        </DialogFooter>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        title="Delete Platform"
      >
        <p>Are you sure you want to delete this platform? This action cannot be undone.</p>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button variant="destructive">Delete Platform</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default DeploymentMatrix;