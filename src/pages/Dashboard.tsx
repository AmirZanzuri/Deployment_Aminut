import React from 'react';
import { Server, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

function Dashboard() {
  return (
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
  );
}

export default Dashboard;