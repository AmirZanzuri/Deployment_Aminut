import React from 'react';
import { Server, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import { useComponentStore } from '../store/useComponentStore';

function Dashboard() {
  const { components, duplicateUrns } = useComponentStore();
  
  const stats = {
    totalPlatforms: components.length,
    activeDeployments: components.filter(c => c.type === 'HQ Server').length,
    recentDeployments: components.filter(c => {
      const deployDate = new Date(c.created_at);
      const now = new Date();
      const diffInDays = Math.floor((now.getTime() - deployDate.getTime()) / (1000 * 60 * 60 * 24));
      return diffInDays <= 7;
    }).length,
    criticalIssues: duplicateUrns.length
  };

  const recentActivity = components
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)
    .map(component => ({
      id: component.id,
      title: `${component.name} deployed`,
      type: component.type,
      timestamp: new Date(component.created_at),
      urn: component.urn,
      isDuplicate: duplicateUrns.includes(component.urn)
    }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neon-blue">Dashboard Overview</h1>
        <span className="text-sm text-neon-blue/70">Last updated: {new Date().toLocaleString()}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <Server className="h-8 w-8 text-neon-blue" />
            <span className="text-xs font-medium text-neon-blue/70">Platforms</span>
          </div>
          <div>
            <p className="text-3xl font-bold text-neon-blue">{stats.totalPlatforms}</p>
            <p className="text-sm font-medium text-neon-blue/70">Total Platforms</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle2 className="h-8 w-8 text-neon-blue" />
            <span className="text-xs font-medium text-neon-blue/70">Active</span>
          </div>
          <div>
            <p className="text-3xl font-bold text-neon-blue">{stats.activeDeployments}</p>
            <p className="text-sm font-medium text-neon-blue/70">Active Deployments</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <Clock className="h-8 w-8 text-neon-blue" />
            <span className="text-xs font-medium text-neon-blue/70">Recent</span>
          </div>
          <div>
            <p className="text-3xl font-bold text-neon-blue">{stats.recentDeployments}</p>
            <p className="text-sm font-medium text-neon-blue/70">Deployments (7 days)</p>
          </div>
        </div>
        
        {stats.criticalIssues > 0 && (
          <div className="stat-card bg-red-900/20 border-red-500/40">
            <div className="flex items-center justify-between mb-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <span className="text-xs font-medium text-red-500/70">Critical</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-red-500">{stats.criticalIssues}</p>
              <p className="text-sm font-medium text-red-500/70">Duplicate URNs</p>
            </div>
          </div>
        )}
      </div>

      <Card
        title="Recent Activity"
        className="h-[400px]"
      >
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div 
              key={activity.id} 
              className={`flex items-center space-x-4 p-4 border rounded-lg transition-colors ${
                activity.isDuplicate 
                  ? 'border-red-500/40 bg-red-900/20' 
                  : 'border-neon-blue/20 bg-neon-blue/5'
              }`}
            >
              <div className={`p-2 rounded-full ${
                activity.isDuplicate ? 'bg-red-500/20' : 'bg-neon-blue/10'
              }`}>
                <Server className={`h-5 w-5 ${
                  activity.isDuplicate ? 'text-red-500' : 'text-neon-blue'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className={`font-medium ${
                    activity.isDuplicate ? 'text-red-500' : 'text-neon-blue'
                  }`}>{activity.title}</p>
                  {activity.isDuplicate && (
                    <span className="text-xs font-medium bg-red-500/20 text-red-500 px-2 py-0.5 rounded-full">
                      Duplicate URN: {activity.urn}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${
                    activity.isDuplicate ? 'text-red-500/70' : 'text-neon-blue/70'
                  }`}>
                    {activity.timestamp.toLocaleDateString()} {activity.timestamp.toLocaleTimeString()}
                  </span>
                  <span className={`text-sm ${
                    activity.isDuplicate ? 'text-red-500/50' : 'text-neon-blue/50'
                  }`}>•</span>
                  <span className={`text-sm ${
                    activity.isDuplicate ? 'text-red-500/70' : 'text-neon-blue/70'
                  }`}>{activity.type}</span>
                </div>
              </div>
            </div>
          ))}

          {recentActivity.length === 0 && (
            <div className="flex items-center justify-center h-32 text-neon-blue/50">
              No recent activity
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;