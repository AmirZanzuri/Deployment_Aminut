import React from 'react';
import { Server, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import { useComponentStore } from '../store/useComponentStore';

function Dashboard() {
  const { components } = useComponentStore();
  
  const stats = {
    totalPlatforms: components.length,
    activeDeployments: components.filter(c => c.type === 'HQ Server').length,
    recentDeployments: components.filter(c => {
      const deployDate = new Date(c.created_at);
      const now = new Date();
      const diffInDays = Math.floor((now.getTime() - deployDate.getTime()) / (1000 * 60 * 60 * 24));
      return diffInDays <= 7;
    }).length,
    criticalIssues: 0 // This would come from a real monitoring system
  };

  const recentActivity = components
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)
    .map(component => ({
      id: component.id,
      title: `${component.name} deployed`,
      type: component.type,
      timestamp: new Date(component.created_at)
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
          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <AlertCircle className="h-8 w-8 text-neon-blue" />
              <span className="text-xs font-medium text-neon-blue/70">Issues</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-neon-blue">{stats.criticalIssues}</p>
              <p className="text-sm font-medium text-neon-blue/70">Critical Issues</p>
            </div>
          </div>
        )}
      </div>

      <Card
        title="Recent Activity"
        className="h-[400px]"
      >
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={activity.id} className="flex items-center space-x-4 p-4 border border-neon-blue/20 rounded-lg bg-neon-blue/5">
              <div className="bg-neon-blue/10 p-2 rounded-full">
                <Server className="h-5 w-5 text-neon-blue" />
              </div>
              <div className="flex-1">
                <p className="text-neon-blue font-medium">{activity.title}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-neon-blue/70">
                    {activity.timestamp.toLocaleDateString()} {activity.timestamp.toLocaleTimeString()}
                  </span>
                  <span className="text-sm text-neon-blue/50">•</span>
                  <span className="text-sm text-neon-blue/70">{activity.type}</span>
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