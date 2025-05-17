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
        <h1 className="text-2xl font-bold neon-text">Dashboard Overview</h1>
        <span className="text-sm text-neon-blue/60">Last updated: {new Date().toLocaleString()}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="stat-icon">
            <Server className="h-6 w-6 text-neon-blue" />
          </div>
          <div>
            <p className="stat-label">Total Platforms</p>
            <p className="stat-value">{stats.totalPlatforms}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <CheckCircle2 className="h-6 w-6 text-neon-blue" />
          </div>
          <div>
            <p className="stat-label">Active Deployments</p>
            <p className="stat-value">{stats.activeDeployments}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Clock className="h-6 w-6 text-neon-blue" />
          </div>
          <div>
            <p className="stat-label">Recent Deployments</p>
            <p className="stat-value">{stats.recentDeployments}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <AlertCircle className="h-6 w-6 text-neon-blue" />
          </div>
          <div>
            <p className="stat-label">Critical Issues</p>
            <p className="stat-value">{stats.criticalIssues}</p>
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
                <p className="text-neon-blue">New platform deployed</p>
                <p className="text-sm text-neon-blue/60">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border border-neon-blue/20 rounded-lg bg-neon-blue/5">
              <div className="bg-neon-blue/10 p-2 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-neon-blue" />
              </div>
              <div>
                <p className="text-neon-blue">Deployment successful</p>
                <p className="text-sm text-neon-blue/60">4 hours ago</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border border-neon-blue/20 rounded-lg bg-neon-blue/5">
              <div className="bg-neon-blue/10 p-2 rounded-full">
                <AlertCircle className="h-5 w-5 text-neon-blue" />
              </div>
              <div>
                <p className="text-neon-blue">System alert detected</p>
                <p className="text-sm text-neon-blue/60">6 hours ago</p>
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
                <span className="text-neon-blue">CPU Usage</span>
                <span className="text-neon-blue">45%</span>
              </div>
              <div className="w-full bg-darker-blue rounded-full h-2">
                <div className="bg-neon-blue h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div className="p-4 border border-neon-blue/20 rounded-lg bg-neon-blue/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-neon-blue">Memory Usage</span>
                <span className="text-neon-blue">72%</span>
              </div>
              <div className="w-full bg-darker-blue rounded-full h-2">
                <div className="bg-neon-blue h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>

            <div className="p-4 border border-neon-blue/20 rounded-lg bg-neon-blue/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-neon-blue">Storage Usage</span>
                <span className="text-neon-blue">28%</span>
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