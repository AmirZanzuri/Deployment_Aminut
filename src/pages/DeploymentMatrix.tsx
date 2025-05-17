import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import Dialog, { DialogFooter } from '../components/ui/Dialog';
import Table from '../components/ui/Table';
import { Filter, Search, Plus, Edit2, Trash2, Server, X, Link, ExternalLink } from 'lucide-react';
import { mockPlatforms, mockComponentVersions, mockProjects, mockApplicationVersions } from '../services/mockData';
import { Platform, ComponentVersion, Project, ApplicationVersion } from '../types';
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

  const getProjectName = (projectId: string) => {
    return projects.find(p => p.id === projectId)?.name || 'Unknown Project';
  };

  const getComponentDetails = (componentId?: string) => {
    return availableComponents.find(c => c.id === componentId);
  };

  const columns = [
    {
      header: 'Name',
      accessor: 'name',
    },
    {
      header: 'URN',
      accessor: 'urn',
      className: 'font-mono',
    },
    {
      header: 'Type',
      accessor: (platform: Platform) => (
        <Badge status="info" label={platform.type} />
      ),
    },
    {
      header: 'Project',
      accessor: (platform: Platform) => getProjectName(platform.project_id),
    },
    {
      header: 'Hardware',
      accessor: (platform: Platform) => {
        const component = getComponentDetails(platform.component_id);
        if (!component) return '-';
        return (
          <RouterLink
            to={`/components#${component.id}`}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
          >
            <span>{component.hardware}</span>
            <ExternalLink size={14} />
          </RouterLink>
        );
      },
    },
    {
      header: 'Actions',
      accessor: (platform: Platform) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            icon={<Edit2 size={16} />}
            onClick={() => {
              setSelectedPlatform(platform);
              setEditDialogOpen(true);
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            icon={<Trash2 size={16} />}
            onClick={() => {
              setSelectedPlatform(platform);
              setDeleteDialogOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  // Filter platforms based on search and filters
  const filteredPlatforms = platforms.filter(platform => {
    const matchesProject = selectedProject === 'all' || platform.project_id === selectedProject;
    const matchesSearch = platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         platform.urn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProject && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Deployment Matrix</h1>
        <Button
          variant="primary"
          icon={<Plus size={16} />}
          onClick={() => setCreateDialogOpen(true)}
        >
          New Platform
        </Button>
      </div>

      <Card>
        <div className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search platforms..."
                  className="pl-10 pr-4 py-2 w-full border rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
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
          </div>
        </div>

        <Table
          columns={columns}
          data={filteredPlatforms}
          keyExtractor={(platform) => platform.id}
          isLoading={isLoading}
        />
      </Card>

      {/* Create Platform Dialog */}
      <Dialog
        isOpen={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        title="Create New Platform"
        footer={
          <DialogFooter
            cancelText="Cancel"
            confirmText="Create Platform"
            onCancel={() => setCreateDialogOpen(false)}
            onConfirm={() => {
              // Handle platform creation
              setCreateDialogOpen(false);
            }}
          />
        }
      >
        {/* Dialog content */}
      </Dialog>

      {/* Edit Platform Dialog */}
      <Dialog
        isOpen={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        title="Edit Platform"
        footer={
          <DialogFooter
            cancelText="Cancel"
            confirmText="Save Changes"
            onCancel={() => setEditDialogOpen(false)}
            onConfirm={() => {
              // Handle platform update
              setEditDialogOpen(false);
            }}
          />
        }
      >
        {/* Dialog content */}
      </Dialog>

      {/* Delete Platform Dialog */}
      <Dialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        title="Delete Platform"
        footer={
          <DialogFooter
            cancelText="Cancel"
            confirmText="Delete Platform"
            onCancel={() => setDeleteDialogOpen(false)}
            onConfirm={() => {
              // Handle platform deletion
              setDeleteDialogOpen(false);
            }}
            danger
          />
        }
      >
        <div className="text-center py-4">
          <Server className="h-12 w-12 text-red-500 mx-auto" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            Delete Platform
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Are you sure you want to delete "{selectedPlatform?.name}"? This action cannot be undone.
          </p>
        </div>
      </Dialog>
    </div>
  );
};

export default DeploymentMatrix;