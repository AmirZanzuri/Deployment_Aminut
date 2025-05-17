import React, { useState, useEffect } from 'react';
import { BarChart3, AlertCircle, CheckCircle2, Clock, LayoutGrid } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { mockProjects, mockPlatforms, mockComponentVersions } from '../services/mockData';
import { ComponentVersion, Platform } from '../types';

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 0,
    activePlatforms: 0,
    recentDeployments: 0,
    criticalIssues: 0,
  });

  // Calculate deployment status counts
  const getStatusCounts = () => {
    const counts = {
      deployed: 0,
      testing: 0,
      rollback_needed: 0,
      deprecated: 0,
    };

    mockComponentVersions.forEach(component => {
      counts[component.status as keyof typeof counts]++;
    });

    return counts;
  };

  // Recent deployments (last 7 days)
  const getRecentDeployments = () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    return mockComponentVersions.filter(component => {
      const deploymentDate = new Date(component.deployment_date);
      return deploymentDate >= sevenDaysAgo;
    });
  };

  // Find platforms with duplicate URNs
  const getDuplicateUrnIssues = () => {
    const urnCounts = mockPlatforms.reduce((acc, platform) => {
      acc[platform.urn] = (acc[platform.urn] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const duplicateUrns = Object.entries(urnCounts)
      .filter(([_, count]) => count > 1)
      .map(([urn]) => urn);

    return mockPlatforms
      .filter(platform => duplicateUrns.includes(platform.urn))
      .map(platform => ({
        id: platform.id,
        platform_id: platform.id,
        component_type: 'platform',
        status: 'rollback_needed' as const,
        deployment_date: platform.created_at,
        known_issues: [`Duplicate URN: ${platform.urn} - This URN is used by multiple platforms`],
      }));
  };

  // Get critical issues (components with known issues or duplicate URNs)
  const getCriticalIssues = () => {
    const componentIssues = mockComponentVersions.filter(component => 
      component.known_issues && component.known_issues.length > 0
    );
    
    const duplicateUrnIssues = getDuplicateUrnIssues();
    
    return [...componentIssues, ...duplicateUrnIssues];
  };

  // Environment distribution
  const getEnvironmentCounts = () => {
    const counts = {
      production: 0,
      staging: 0,
      testing: 0,
      development: 0,
    };

    mockPlatforms.forEach(platform => {
      counts[platform.environment as keyof typeof counts]++;
    });

    return counts;
  };

  // Load data on mount
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalProjects: mockProjects.length,
        activePlatforms: mockPlatforms.filter(p => p.environment === 'production').length,
        recentDeployments: getRecentDeployments().length,
        criticalIssues: getCriticalIssues().length,
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  // Get platform details by ID
  const getPlatformDetails = (id: string): Platform | undefined => {
    return mockPlatforms.find(platform => platform.id === id);
  };

  // Status color mapping
  const getStatusColor = (status: ComponentVersion['status']): 'success' | 'warning' | 'error' | 'info' => {
    switch (status) {
      case 'deployed': return 'success';
      case 'testing': return 'info';
      case 'rollback_needed': return 'error';
      case 'deprecated': return 'warning';
      default: return 'info';
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-36 bg-gray-200 rounded-lg"></div>
        ))}
        <div className="md:col-span-2 h-72 bg-gray-200 rounded-lg"></div>
        <div className="md:col-span-2 h-72 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  const statusCounts = getStatusCounts();
  const environmentCounts = getEnvironmentCounts();
  const recentDeployments = getRecentDeployments();
  const criticalIssues = getCriticalIssues();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Deployment Dashboard</h1>
        <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</span>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="transition-all duration-300 hover:shadow-md">
          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-full">
              <LayoutGrid className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Projects</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalProjects}</p>
            </div>
          </div>
        </Card>
        
        <Card className="transition-all duration-300 hover:shadow-md">
          <div className="flex items-start">
            <div className="bg-green-100 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Platforms</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.activePlatforms}</p>
            </div>
          </div>
        </Card>
        
        <Card className="transition-all duration-300 hover:shadow-md">
          <div className="flex items-start">
            <div className="bg-purple-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Recent Deployments</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.recentDeployments}</p>
            </div>
          </div>
        </Card>
        
        <Card className="transition-all duration-300 hover:shadow-md">
          <div className="flex items-start">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Critical Issues</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.criticalIssues}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Deployment Status and Environment Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Deployment Status">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Deployed</span>
                  <Badge status="success" label={statusCounts.deployed.toString()} />
                </div>
                <p className="text-2xl font-bold text-green-700 mt-2">{statusCounts.deployed}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Testing</span>
                  <Badge status="info" label={statusCounts.testing.toString()} />
                </div>
                <p className="text-2xl font-bold text-blue-700 mt-2">{statusCounts.testing}</p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Needs Rollback</span>
                  <Badge status="error" label={statusCounts.rollback_needed.toString()} />
                </div>
                <p className="text-2xl font-bold text-red-700 mt-2">{statusCounts.rollback_needed}</p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Deprecated</span>
                  <Badge status="warning" label={statusCounts.deprecated.toString()} />
                </div>
                <p className="text-2xl font-bold text-amber-700 mt-2">{statusCounts.deprecated}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Environment Distribution">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Production</span>
                  <Badge status="success" label={environmentCounts.production.toString()} />
                </div>
                <p className="text-2xl font-bold text-indigo-700 mt-2">{environmentCounts.production}</p>
              </div>
              
              <div className="bg-cyan-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Staging</span>
                  <Badge status="info" label={environmentCounts.staging.toString()} />
                </div>
                <p className="text-2xl font-bold text-cyan-700 mt-2">{environmentCounts.staging}</p>
              </div>
              
              <div className="bg-teal-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Testing</span>
                  <Badge status="info" label={environmentCounts.testing.toString()} />
                </div>
                <p className="text-2xl font-bold text-teal-700 mt-2">{environmentCounts.testing}</p>
              </div>
              
              <div className="bg-sky-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Development</span>
                  <Badge status="default" label={environmentCounts.development.toString()} />
                </div>
                <p className="text-2xl font-bold text-sky-700 mt-2">{environmentCounts.development}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Deployments and Critical Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Deployments">
          <div className="space-y-4">
            {recentDeployments.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent deployments</p>
            ) : (
              recentDeployments.slice(0, 4).map((deployment) => {
                const platform = getPlatformDetails(deployment.platform_id);
                return (
                  <div key={deployment.id} className="flex items-center p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {platform?.name} - {deployment.component_type}
                        </p>
                        <Badge 
                          status={getStatusColor(deployment.status)}
                          label={deployment.status}
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        Version {deployment.version_number}
                      </p>
                    </div>
                    <div className="ml-3 text-xs text-gray-500">
                      {new Date(deployment.deployment_date).toLocaleDateString()}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>

        <Card title="Critical Issues">
          <div className="space-y-4">
            {criticalIssues.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No critical issues</p>
            ) : (
              criticalIssues.slice(0, 4).map((issue) => {
                const platform = getPlatformDetails(issue.platform_id);
                return (
                  <div key={issue.id} className="flex items-start p-3 border rounded-lg bg-red-50">
                    <div className="flex-shrink-0 mt-0.5">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {platform?.name} - {issue.component_type}
                        </p>
                        <Badge 
                          status={getStatusColor(issue.status)}
                          label={issue.status}
                        />
                      </div>
                      <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                        {issue.known_issues?.map((knownIssue, index) => (
                          <li key={index}>{knownIssue}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;