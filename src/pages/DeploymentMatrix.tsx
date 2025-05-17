import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { mockPlatforms, mockComponentVersions, mockProjects, mockApplicationVersions } from '../services/mockData';
import { Platform, ComponentVersion, Project } from '../types';
import { Filter, DownloadCloud, Search, Layers } from 'lucide-react';

type GroupingOption = 'project' | 'type' | 'version';

const DeploymentMatrix: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [componentVersions, setComponentVersions] = useState<ComponentVersion[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [componentTypes, setComponentTypes] = useState<string[]>([]);
  const [selectedComponentType, setSelectedComponentType] = useState<string>('all');
  const [grouping, setGrouping] = useState<GroupingOption>('project');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPlatforms(mockPlatforms);
      setComponentVersions(mockComponentVersions);
      setProjects(mockProjects);
      
      // Extract unique component types
      const types = Array.from(new Set(mockComponentVersions.map(c => c.component_type)));
      setComponentTypes(types);
      
      setIsLoading(false);
    }, 1000);
  }, []);

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

    filteredPlatforms.forEach(platform => {
      let groupKey = '';
      
      switch (grouping) {
        case 'project':
          groupKey = getProjectName(platform.project_id);
          break;
        case 'type':
          groupKey = platform.type;
          break;
        case 'version':
          const version = mockApplicationVersions.find(v => v.id === platform.application_version_id);
          groupKey = version ? version.version_number : 'Unknown Version';
          break;
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(platform);
    });

    return groups;
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="grid grid-cols-1 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  const groups = groupedPlatforms();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Deployment Matrix</h1>
        <Button 
          variant="outline" 
          size="sm"
          icon={<DownloadCloud size={16} />}
        >
          Export Data
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="grouping" className="block text-sm font-medium text-gray-700 mb-1">
              Group By
            </label>
            <select
              id="grouping"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={grouping}
              onChange={(e) => setGrouping(e.target.value as GroupingOption)}
            >
              <option value="project">By Project</option>
              <option value="type">By Type</option>
              <option value="version">By Version</option>
            </select>
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
                placeholder="Search nodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Matrix Display */}
      <div className="space-y-6">
        {Object.keys(groups).length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Filter className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No nodes match your filters</h3>
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
          Object.entries(groups).map(([group, platforms]) => (
            <Card
              key={group}
              title={group}
              subtitle={`${platforms.length} ${platforms.length === 1 ? 'node' : 'nodes'}`}
              className="transition-all duration-300 hover:shadow-md"
            >
              <div className="space-y-4">
                {platforms.map((platform) => {
                  const components = getComponentsForPlatform(platform.id);
                  
                  return (
                    <div key={platform.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{platform.name}</h4>
                          <p className="text-sm text-gray-500">URN: {platform.urn}</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                          {platform.type}
                        </span>
                      </div>
                      
                      <div className="mt-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Components</h5>
                        {components.length === 0 ? (
                          <p className="text-sm text-gray-500 py-2">No components match the current filters</p>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Version
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Deployed
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Issues
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {components.map((component) => (
                                  <tr key={component.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {component.component_type.charAt(0).toUpperCase() + component.component_type.slice(1)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {component.version_number}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <Badge
                                        status={getStatusColor(component.status)}
                                        label={component.status}
                                        animate={true}
                                      />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {new Date(component.deployment_date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {component.known_issues && component.known_issues.length > 0 ? (
                                        <span className="text-red-600 font-medium">
                                          {component.known_issues.length} {component.known_issues.length === 1 ? 'issue' : 'issues'}
                                        </span>
                                      ) : (
                                        <span className="text-green-600">None</span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DeploymentMatrix;