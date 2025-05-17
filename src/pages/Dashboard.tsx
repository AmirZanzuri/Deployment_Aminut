import React from 'react';
import { Server, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import Card from '../components/ui/Card';

function Dashboard() {
  const stats = {
    totalPlatforms: 10,
    activeDeployments: 7,
    recentDeployments: 3,
    criticalIssues: 1
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neon-blue">Dashboard Overview</h1>
        <span className="text-sm text-neon-blue">Last updated: {new Date().toLocaleString()}</span>
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
            <p className="text-sm font-medium text-neon-blue/70">Recent Deployments</p>
          </div>
        </div>
        
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          title="Recent Activity"
          className="h-[400px]"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 border border-neon-blue/20 rounded-lg bg-neon-blue/5">
              <div className="bg-neon-blue/10 p-2 rounded-full">
                <Server className="h-5 w-5 text-neon-blue" />
              </div>
              <div>
                <p className="text-neon-blue font-medium">New platform deployed</p>
                <p className="text-sm text-neon-blue/70">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border border-neon-blue/20 rounded-lg bg-neon-blue/5">
              <div className="bg-neon-blue/10 p-2 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-neon-blue" />
              </div>
              <div>
                <p className="text-neon-blue font-medium">Deployment successful</p>
                <p className="text-sm text-neon-blue/70">4 hours ago</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border border-neon-blue/20 rounded-lg bg-neon-blue/5">
              <div className="bg-neon-blue/10 p-2 rounded-full">
                <AlertCircle className="h-5 w-5 text-neon-blue" />
              </div>
              <div>
                <p className="text-neon-blue font-medium">System alert detected</p>
                <p className="text-sm text-neon-blue/70">6 hours ago</p>
              </div>
            </div>
          </div>
        </Card>

        <Card
          title="System Status"
          className="h-[400px]"
        >
          <div className="space-y-4">
            <div className="p-4 border border-neon-blue/20 rounded-lg bg-neon-blue/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-neon-blue font-medium">CPU Usage</span>
                <span className="text-neon-blue font-bold">45%</span>
              </div>
              <div className="w-full bg-darker-blue rounded-full h-2">
                <div className="bg-neon-blue h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div className="p-4 border border-neon-blue/20 rounded-lg bg-neon-blue/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-neon-blue font-medium">Memory Usage</span>
                <span className="text-neon-blue font-bold">72%</span>
              </div>
              <div className="w-full bg-darker-blue rounded-full h-2">
                <div className="bg-neon-blue h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>

            <div className="p-4 border border-neon-blue/20 rounded-lg bg-neon-blue/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-neon-blue font-medium">Storage Usage</span>
                <span className="text-neon-blue font-bold">28%</span>
              </div>
              <div className="w-full bg-darker-blue rounded-full h-2">
                <div className="bg-neon-blue h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;