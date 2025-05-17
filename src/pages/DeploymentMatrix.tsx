import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Filter, Search } from 'lucide-react';
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

    // Initialize groups based on grouping type
    if (grouping === 'project') {
      projects.forEach(project => {
        groups[project.name] = [];
      });
    } else if (grouping === 'type') {
      ['HQ Server', 'Mounted Station'].forEach(type => {
        groups[type] = [];
      });
    } else if (grouping === 'version') {
      applicationVersions.forEach(version => {
        groups[`Version ${version.version_number}`] = [];
      });
      groups['Unknown Version'] = [];
    }

    // Distribute platforms to their respective groups
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
          const version = applicationVersions.find(v => v.id === platform.application_version_id);
          groupKey = version ? `Version ${version.version_number}` : 'Unknown Version';
          break;
      }

      if (groups[groupKey]) {
        groups[groupKey].push(platform);
      }
    });

    // Remove empty groups
    Object.keys(groups).forEach(key => {
      if (groups[key].length === 0) {
        delete groups[key];
      }
    });

    return groups;
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
              onChange={(e) => setGrouping(e.target.value as 'project' | 'type' | 'version')}
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
                placeholder="Search platforms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Matrix Display */}
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
                    Components
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(groups).map(([groupName, platforms]) => (
                  platforms.map((platform, platformIndex) => (
                    <tr key={platform.id} className={platformIndex === 0 ? 'bg-gray-50' : ''}>
                      {platformIndex === 0 && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" rowSpan={platforms.length}>
                          {groupName}
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {platform.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                        {platform.urn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {platform.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-2">
                          {getComponentsForPlatform(platform.id).map((component) => (
                            <Badge
                              key={component.id}
                              status={getStatusColor(component.status)}
                              label={`${component.component_type} ${component.version_number}`}
                            />
                          ))}
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
    </div>
  );
};

export default DeploymentMatrix;