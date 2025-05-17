import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Dialog, { DialogFooter } from '../components/ui/Dialog';
import { Filter, Search, Plus, Edit2, Trash2, Server, X, Grid } from 'lucide-react';
import { mockPlatforms, mockComponentVersions, mockProjects, mockApplicationVersions } from '../services/mockData';
import { Platform, ComponentVersion, Project, ApplicationVersion } from '../types';

const DeploymentMatrix: React.FC = () => {
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
  const [selectedComponents, setSelectedComponents] = useState<Record<string, string[]>>({});
  const [showComponentsDialog, setShowComponentsDialog] = useState(false);
  const [currentPlatformId, setCurrentPlatformId] = useState<string | null>(null);
  const [newPlatform, setNewPlatform] = useState({
    name: '',
    urn: '',
    type: 'HQ Server' as const,
    project_id: '',
    application_version_id: '',
  });

  // Find platforms with duplicate URNs
  const getDuplicateUrns = () => {
    const urnCounts = platforms.reduce((acc, platform) => {
      acc[platform.urn] = (acc[platform.urn] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(urnCounts).filter(urn => urnCounts[urn] > 1);
  };

  const duplicateUrns = getDuplicateUrns();

  // Get version number by id
  const getVersionNumber = (versionId: string): string => {
    const version = applicationVersions.find(v => v.id === versionId);
    return version ? version.version_number : 'No Version';
  };

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
    // Generate a new ID and created_at date
    const newId = (Math.max(...platforms.map(p => parseInt(p.id))) + 1).toString();
    const createdAt = new Date().toISOString();
    
    const platformToAdd: Platform = {
      ...newPlatform,
      id: newId,
      created_at: createdAt,
    };
    
    // Add to platforms array
    setPlatforms([...platforms, platformToAdd]);
    setCreateDialogOpen(false);
    
    // Reset form (but keep the project_id)
    setNewPlatform({
      name: '',
      urn: '',
      type: 'HQ Server',
      project_id: newPlatform.project_id,
      application_version_id: '',
    });
  };

  const handleEditPlatform = () => {
    if (!selectedPlatform) return;

    // Update the platform in the array
    const updatedPlatforms = platforms.map(p => 
      p.id === selectedPlatform.id ? selectedPlatform : p
    );
    
    setPlatforms(updatedPlatforms);
    setEditDialogOpen(false);
    setSelectedPlatform(null);
  };

  const handleDeletePlatform = () => {
    if (!selectedPlatform) return;
    
    // Remove the platform from the array
    const updatedPlatforms = platforms.filter(p => p.id !== selectedPlatform.id);
    
    setPlatforms(updatedPlatforms);
    setDeleteDialogOpen(false);
    setSelectedPlatform(null);
  };

  // Get project by ID
  const getProjectName = (projectId: string): string => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown Project';
  };

  // Filter platforms based on selected project and search query
  const filteredPlatforms = platforms.filter(platform => {
    const matchesProject = selectedProject === 'all' || platform.project_id === selectedProject;
    const matchesSearch = platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         platform.urn.includes(searchQuery);
    return matchesProject && matchesSearch;
  });

  // Get components for a specific platform
  const getComponentsForPlatform = (platformId: string): ComponentVersion[] => {
    return componentVersions.filter(component => {
      const matchesComponentType = selectedComponentType === 'all' || 
                                component.component_type === selectedComponentType;
      return component.platform_id === platformId && matchesComponentType;
    });
  };

  // Get status color
  const getStatusColor = (status: ComponentVersion['status']): 'success' | 'warning' | 'error' | 'info' => {
    switch (status) {
      case 'deployed': return 'success';
      case 'testing': return 'info';
      case 'rollback_needed': return 'error';
      case 'deprecated': return 'warning';
      default: return 'info';
    }
  };

  // Group platforms based on selected grouping option
  const groupedPlatforms = () => {
    const groups: Record<string, Platform[]> = {};

    if (grouping === 'project') {
      projects.forEach(project => {
        groups[project.name] = filteredPlatforms.filter(p => p.project_id === project.id);
      });
    } else if (grouping === 'type') {
      ['HQ Server', 'Mounted Station'].forEach(type => {
        groups[type] = filteredPlatforms.filter(p => p.type === type);
      });
    } else if (grouping === 'version') {
      applicationVersions.forEach(version => {
        groups[`Version ${version.version_number}`] = filteredPlatforms.filter(
          p => p.application_version_id === version.id
        );
      });
      const noVersion = filteredPlatforms.filter(p => !p.application_version_id);
      if (noVersion.length > 0) {
        groups['No Version'] = noVersion;
      }
    }

    // Remove empty groups
    Object.keys(groups).forEach(key => {
      if (groups[key].length === 0) {
        delete groups[key];
      }
    });

    return groups;
  };

  // Group components by type
  const componentTypes = ['Tactical Computer', 'Smart TMR', 'E-Lynks Radio', 'HQ Server', 'Client', 'GRX'];
  
  const getComponentsForType = (type: string) => {
    return mockComponentVersions.filter(c => c.component_type === type);
  };

  const handleComponentSelect = (componentId: string) => {
    if (!currentPlatformId) return;
    
    setSelectedComponents(prev => {
      const current = prev[currentPlatformId] || [];
      const updated = current.includes(componentId)
        ? current.filter(id => id !== componentId)
        : [...current, componentId];
      
      return {
        ...prev,
        [currentPlatformId]: updated
      };
    });
  };

  const isComponentSelected = (componentId: string) => {
    return currentPlatformId 
      ? (selectedComponents[currentPlatformId] || []).includes(componentId)
      : false;
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-96 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  const groups = groupedPlatforms();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Deployment Matrix</h1>
        <Button
          variant="primary"
          icon={<Plus size={16} />}
          onClick={() => setCreateDialogOpen(true)}
        >
          New Node
        </Button>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="grouping" className="block text-sm font-medium text-gray-700 mb-1">
              Group By
            </label>
            <div className="flex items-center gap-2">
              <select
                id="grouping"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={grouping}
                onChange={(e) => setGrouping(e.target.value as 'project' | 'type' | 'version')}
              >
                <option value="project">By Project</option>
                <option value="type">By Type</option>
                <option value="version">By Version</option>
              </select>
              <Button
                variant="ghost"
                size="sm"
                icon={<X size={16} />}
                onClick={() => setGrouping('project')}
                className="flex-shrink-0"
              />
            </div>
          </div>

          <div className="flex-1">
            <label htmlFor="project-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Project
            </label>
            <select
              id="project-filter"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="all">All Projects</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="component-type-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Component Type
            </label>
            <select
              id="component-type-filter"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={selectedComponentType}
              onChange={(e) => setSelectedComponentType(e.target.value)}
            >
              <option value="all">All Component Types</option>
              {componentTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Search platforms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Card>

      {Object.keys(groups).length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Filter className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No platforms match your filters</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          <div className="mt-6">
            <Button 
              onClick={() => {
                setSelectedProject('all');
                setSelectedComponentType('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Group
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Platform
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    URN
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Version
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Components
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(groups).map(([groupName, platforms]) => (
                  platforms.map((platform, platformIndex) => (
                    <tr 
                      key={platform.id} 
                      className={`
                        ${platformIndex === 0 ? 'bg-gray-50' : ''}
                        ${duplicateUrns.includes(platform.urn) ? 'bg-red-50' : ''}
                      `}
                    >
                      {platformIndex === 0 && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" rowSpan={platforms.length}>
                          {groupName}
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {platform.name}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-mono ${duplicateUrns.includes(platform.urn) ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                        {platform.urn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {platform.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getProjectName(platform.project_id)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getVersionNumber(platform.application_version_id)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Grid size={16} />}
                          onClick={() => {
                            setCurrentPlatformId(platform.id);
                            setShowComponentsDialog(true);
                          }}
                        >
                          {(selectedComponents[platform.id] || []).length} Components
                        </Button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Node Dialog */}
      <Dialog
        isOpen={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        title="Create New Node"
        footer={
          <DialogFooter
            cancelText="Cancel"
            confirmText="Create Node"
            onCancel={() => setCreateDialogOpen(false)}
            onConfirm={handleCreatePlatform}
          />
        }
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Node Name
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

      {/* Edit Node Dialog */}
      <Dialog
        isOpen={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        title="Edit Node"
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
                Node Name
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
                placeholder="1234567"
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

      {/* Delete Node Dialog */}
      <Dialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        title="Delete Node"
        footer={
          <DialogFooter
            cancelText="Cancel"
            confirmText="Delete Node"
            onCancel={() => setDeleteDialogOpen(false)}
            onConfirm={handleDeletePlatform}
            danger
          />
        }
      >
        {selectedPlatform && (
          <div className="text-center py-4">
            <Server className="h-12 w-12 text-red-500 mx-auto" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Delete Node
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Are you sure you want to delete "{selectedPlatform.name}"? This action cannot be undone.
            </p>
          </div>
        )}
      </Dialog>

      {/* Components Selection Dialog */}
      <Dialog
        isOpen={showComponentsDialog}
        onClose={() => setShowComponentsDialog(false)}
        title="Select Components"
        size="xl"
        footer={
          <DialogFooter
            cancelText="Cancel"
            confirmText="Save Components"
            onCancel={() => setShowComponentsDialog(false)}
            onConfirm={() => setShowComponentsDialog(false)}
          />
        }
      >
        <div className="space-y-6">
          {componentTypes.map(type => (
            <div key={type} className="space-y-2">
              <h3 className="font-medium text-gray-900">{type}</h3>
              <div className="grid grid-cols-3 gap-4">
                {getComponentsForType(type).map(component => (
                  <div
                    key={component.id}
                    className={`
                      p-4 rounded-lg border cursor-pointer transition-colors
                      ${isComponentSelected(component.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'}
                    `}
                    onClick={() => handleComponentSelect(component.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">
                          {component.component_type} {component.version_number}
                        </p>
                        <p className="text-sm text-gray-500">
                          Deployed: {new Date(component.deployment_date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge
                        status={getStatusColor(component.status)}
                        label={component.status}
                      />
                    </div>
                    {component.known_issues && component.known_issues.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-red-600">
                          Issues: {component.known_issues.length}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Dialog>
    </div>
  );
};

export default DeploymentMatrix;