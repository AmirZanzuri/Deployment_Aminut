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
import { useSelectedComponentsStore } from '../store/useSelectedComponentsStore';

const DeploymentMatrix: React.FC = () => {
  const { components: availableComponents } = useComponentStore();
  const { selectedComponents, toggleComponent } = useSelectedComponentsStore();
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
  const [showComponentDialogForPlatform, setShowComponentDialogForPlatform] = useState<string | null>(null);

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

  const handleCreatePlatform = () => {
    const platformToAdd: Platform = {
      id: (platforms.length + 1).toString(),
      ...newPlatform,
      created_at: new Date().toISOString(),
    };
    
    setPlatforms([...platforms, platformToAdd]);
    setCreateDialogOpen(false);
    setNewPlatform({
      name: '',
      urn: '',
      type: 'HQ Server',
      project_id: newPlatform.project_id,
      application_version_id: '',
      component_id: '',
    });
  };

  const handleEditPlatform = () => {
    if (!selectedPlatform) return;
    
    const updatedPlatforms = platforms.map(p => 
      p.id === selectedPlatform.id ? selectedPlatform : p
    );
    
    setPlatforms(updatedPlatforms);
    setEditDialogOpen(false);
    setSelectedPlatform(null);
  };

  const handleDeletePlatform = () => {
    if (!selectedPlatform) return;
    
    const updatedPlatforms = platforms.filter(p => p.id !== selectedPlatform.id);
    
    setPlatforms(updatedPlatforms);
    setDeleteDialogOpen(false);
    setSelectedPlatform(null);
  };

  const getProjectName = (projectId: string) => {
    return projects.find(p => p.id === projectId)?.name || 'Unknown Project';
  };

  const getComponentDetails = (componentId?: string) => {
    return availableComponents.find(c => c.id === componentId);
  };

  const handleComponentSelection = (platformId: string) => {
    setShowComponentDialogForPlatform(platformId);
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
      header: 'Components',
      accessor: (platform: Platform) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleComponentSelection(platform.id)}
          >
            {selectedComponents[platform.id]?.length || 0} Selected
          </Button>
        </div>
      ),
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
            onConfirm={handleCreatePlatform}
          />
        }
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Platform Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newPlatform.name}
              onChange={(e) => setNewPlatform({ ...newPlatform, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="urn" className="block text-sm font-medium text-gray-700">
              URN
            </label>
            <input
              type="text"
              id="urn"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-mono"
              value={newPlatform.urn}
              onChange={(e) => setNewPlatform({ ...newPlatform, urn: e.target.value })}
              placeholder="1234567"
              maxLength={7}
            />
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              id="type"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newPlatform.type}
              onChange={(e) => setNewPlatform({ ...newPlatform, type: e.target.value as Platform['type'] })}
            >
              <option value="HQ Server">HQ Server</option>
              <option value="Mounted Station">Mounted Station</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="project" className="block text-sm font-medium text-gray-700">
              Project
            </label>
            <select
              id="project"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newPlatform.project_id}
              onChange={(e) => setNewPlatform({ ...newPlatform, project_id: e.target.value })}
            >
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="component" className="block text-sm font-medium text-gray-700">
              Hardware Component
            </label>
            <select
              id="component"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newPlatform.component_id}
              onChange={(e) => setNewPlatform({ ...newPlatform, component_id: e.target.value })}
            >
              <option value="">Select Component</option>
              {availableComponents.map((component) => (
                <option key={component.id} value={component.id}>
                  {component.name} - {component.hardware}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="version" className="block text-sm font-medium text-gray-700">
              Application Version
            </label>
            <select
              id="version"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newPlatform.application_version_id}
              onChange={(e) => setNewPlatform({ ...newPlatform, application_version_id: e.target.value })}
            >
              <option value="">Select Version</option>
              {applicationVersions.map((version) => (
                <option key={version.id} value={version.id}>
                  Version {version.version_number}
                </option>
              ))}
            </select>
          </div>
        </div>
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
            onConfirm={handleEditPlatform}
          />
        }
      >
        {selectedPlatform && (
          <div className="space-y-4">
            <div>
              <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">
                Platform Name
              </label>
              <input
                type="text"
                id="edit-name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={selectedPlatform.name}
                onChange={(e) => setSelectedPlatform({ ...selectedPlatform, name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="edit-urn" className="block text-sm font-medium text-gray-700">
                URN
              </label>
              <input
                type="text"
                id="edit-urn"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-mono"
                value={selectedPlatform.urn}
                onChange={(e) => setSelectedPlatform({ ...selectedPlatform, urn: e.target.value })}
                maxLength={7}
              />
            </div>
            
            <div>
              <label htmlFor="edit-type" className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                id="edit-type"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={selectedPlatform.type}
                onChange={(e) => setSelectedPlatform({ ...selectedPlatform, type: e.target.value as Platform['type'] })}
              >
                <option value="HQ Server">HQ Server</option>
                <option value="Mounted Station">Mounted Station</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="edit-project" className="block text-sm font-medium text-gray-700">
                Project
              </label>
              <select
                id="edit-project"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={selectedPlatform.project_id}
                onChange={(e) => setSelectedPlatform({ ...selectedPlatform, project_id: e.target.value })}
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="edit-component" className="block text-sm font-medium text-gray-700">
                Hardware Component
              </label>
              <select
                id="edit-component"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={selectedPlatform.component_id}
                onChange={(e) => setSelectedPlatform({ ...selectedPlatform, component_id: e.target.value })}
              >
                <option value="">Select Component</option>
                {availableComponents.map((component) => (
                  <option key={component.id} value={component.id}>
                    {component.name} - {component.hardware}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="edit-version" className="block text-sm font-medium text-gray-700">
                Application Version
              </label>
              <select
                id="edit-version"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={selectedPlatform.application_version_id}
                onChange={(e) => setSelectedPlatform({ ...selectedPlatform, application_version_id: e.target.value })}
              >
                <option value="">Select Version</option>
                {applicationVersions.map((version) => (
                  <option key={version.id} value={version.id}>
                    Version {version.version_number}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
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
            onConfirm={handleDeletePlatform}
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

      {/* Component Selection Dialog */}
      <Dialog
        isOpen={!!showComponentDialogForPlatform}
        onClose={() => setShowComponentDialogForPlatform(null)}
        title="Select Components"
        footer={
          <DialogFooter
            cancelText="Close"
            onCancel={() => setShowComponentDialogForPlatform(null)}
          />
        }
      >
        <div className="space-y-4">
          {availableComponents.map((component) => {
            const isSelected = selectedComponents[showComponentDialogForPlatform || '']?.includes(component.id);
            
            return (
              <div
                key={component.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => {
                  if (showComponentDialogForPlatform) {
                    toggleComponent(showComponentDialogForPlatform, component.id);
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{component.name}</h3>
                    <p className="text-sm text-gray-500">{component.type}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      status={isSelected ? 'success' : 'default'}
                      label={isSelected ? 'Selected' : 'Available'}
                    />
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <p>{component.description}</p>
                  <p className="mt-1 font-mono">{component.ip}</p>
                  <p className="mt-1">Hardware: {component.hardware}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Dialog>
    </div>
  );
};

export default DeploymentMatrix;