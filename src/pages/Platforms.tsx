import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Dialog, { DialogFooter } from '../components/ui/Dialog';
import Table from '../components/ui/Table';
import { mockPlatforms, mockProjects } from '../services/mockData';
import { Platform, Project } from '../types';
import { Plus, Trash2, Edit2, Server } from 'lucide-react';

const Platforms: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState<Platform | null>(null);
  const [newPlatform, setNewPlatform] = useState({
    name: '',
    urn: '',
    type: 'HQ Server' as const,
    project_id: '',
    application_version_id: '',
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPlatforms(mockPlatforms);
      setProjects(mockProjects);
      
      if (mockProjects.length > 0) {
        setNewPlatform(prev => ({ ...prev, project_id: mockProjects[0].id }));
      }
      
      setIsLoading(false);
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
    if (!currentPlatform) return;
    
    // Update the platform in the array
    const updatedPlatforms = platforms.map(p => 
      p.id === currentPlatform.id ? currentPlatform : p
    );
    
    setPlatforms(updatedPlatforms);
    setEditDialogOpen(false);
    setCurrentPlatform(null);
  };

  const handleDeletePlatform = () => {
    if (!currentPlatform) return;
    
    // Remove the platform from the array
    const updatedPlatforms = platforms.filter(p => p.id !== currentPlatform.id);
    
    setPlatforms(updatedPlatforms);
    setDeleteDialogOpen(false);
    setCurrentPlatform(null);
  };

  // Get project name by id
  const getProjectName = (id: string): string => {
    const project = projects.find(p => p.id === id);
    return project ? project.name : 'Unknown Project';
  };

  const platformColumns = [
    {
      header: 'URN',
      accessor: 'urn',
      className: 'font-mono text-sm',
    },
    {
      header: 'Name',
      accessor: (platform: Platform) => (
        <div className="font-medium text-gray-900">{platform.name}</div>
      ),
    },
    {
      header: 'Type',
      accessor: (platform: Platform) => (
        <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
          {platform.type}
        </span>
      ),
    },
    {
      header: 'Project',
      accessor: (platform: Platform) => getProjectName(platform.project_id),
    },
    {
      header: 'Actions',
      accessor: (platform: Platform) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            icon={<Edit2 size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentPlatform(platform);
              setEditDialogOpen(true);
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            icon={<Trash2 size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentPlatform(platform);
              setDeleteDialogOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

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

      {/* Platforms List */}
      <Card>
        <Table
          columns={platformColumns}
          data={platforms}
          keyExtractor={(platform) => platform.id}
          isLoading={isLoading}
          onRowClick={(platform) => {
            setCurrentPlatform(platform);
            setEditDialogOpen(true);
          }}
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
        {currentPlatform && (
          <div className="space-y-4">
            <div>
              <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">
                Platform Name
              </label>
              <input
                type="text"
                id="edit-name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={currentPlatform.name}
                onChange={(e) => setCurrentPlatform({ ...currentPlatform, name: e.target.value })}
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
                value={currentPlatform.urn}
                onChange={(e) => setCurrentPlatform({ ...currentPlatform, urn: e.target.value })}
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
                value={currentPlatform.type}
                onChange={(e) => setCurrentPlatform({ ...currentPlatform, type: e.target.value as Platform['type'] })}
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
                value={currentPlatform.project_id}
                onChange={(e) => setCurrentPlatform({ ...currentPlatform, project_id: e.target.value })}
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
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
            Are you sure you want to delete "{currentPlatform?.name}"? This action cannot be undone.
          </p>
        </div>
      </Dialog>
    </div>
  );
};

export default Platforms;