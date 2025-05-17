import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Dialog, { DialogFooter } from '../components/ui/Dialog';
import Table from '../components/ui/Table';
import { mockProjects, mockPlatforms } from '../services/mockData';
import { Project } from '../types';
import { Plus, Trash2, Edit2, Package } from 'lucide-react';

const Projects: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    status: 'pending' as const,
    version: '1.0.0',
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjects(mockProjects);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleCreateProject = () => {
    // Generate a new ID and created_at date
    const newId = (Math.max(...projects.map(p => parseInt(p.id))) + 1).toString();
    const createdAt = new Date().toISOString();
    
    const projectToAdd: Project = {
      ...newProject,
      id: newId,
      created_at: createdAt,
    };
    
    // Add to projects array
    setProjects([...projects, projectToAdd]);
    setCreateDialogOpen(false);
    
    // Reset form
    setNewProject({
      name: '',
      description: '',
      status: 'pending',
      version: '1.0.0',
    });
  };

  const handleEditProject = () => {
    if (!currentProject) return;
    
    // Update the project in the array
    const updatedProjects = projects.map(p => 
      p.id === currentProject.id ? currentProject : p
    );
    
    setProjects(updatedProjects);
    setEditDialogOpen(false);
    setCurrentProject(null);
  };

  const handleDeleteProject = () => {
    if (!currentProject) return;
    
    // Remove the project from the array
    const updatedProjects = projects.filter(p => p.id !== currentProject.id);
    
    setProjects(updatedProjects);
    setDeleteDialogOpen(false);
    setCurrentProject(null);
  };

  // Count platforms for each project
  const getProjectPlatformCount = (projectId: string): number => {
    return mockPlatforms.filter(platform => platform.project_id === projectId).length;
  };

  // Get status color
  const getStatusColor = (status: Project['status']): 'success' | 'warning' | 'error' | 'info' => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'completed': return 'info';
      default: return 'default';
    }
  };

  const projectColumns = [
    {
      header: 'Name',
      accessor: (project: Project) => (
        <div className="font-medium text-gray-900">{project.name}</div>
      ),
    },
    {
      header: 'Version',
      accessor: (project: Project) => (
        <div className="text-sm font-medium text-gray-600">{project.version}</div>
      ),
    },
    {
      header: 'Status',
      accessor: (project: Project) => (
        <Badge 
          status={getStatusColor(project.status)} 
          label={project.status} 
        />
      ),
    },
    {
      header: 'Platforms',
      accessor: (project: Project) => getProjectPlatformCount(project.id),
    },
    {
      header: 'Created',
      accessor: (project: Project) => new Date(project.created_at).toLocaleDateString(),
    },
    {
      header: 'Actions',
      accessor: (project: Project) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            icon={<Edit2 size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentProject(project);
              setEditDialogOpen(true);
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            icon={<Trash2 size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentProject(project);
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
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <Button
          variant="primary"
          icon={<Plus size={16} />}
          onClick={() => setCreateDialogOpen(true)}
        >
          New Project
        </Button>
      </div>

      {/* Projects List */}
      <Card>
        <Table
          columns={projectColumns}
          data={projects}
          keyExtractor={(project) => project.id}
          isLoading={isLoading}
          onRowClick={(project) => {
            setCurrentProject(project);
            setEditDialogOpen(true);
          }}
        />
      </Card>

      {/* Create Project Dialog */}
      <Dialog
        isOpen={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        title="Create New Project"
        footer={
          <DialogFooter
            cancelText="Cancel"
            confirmText="Create Project"
            onCancel={() => setCreateDialogOpen(false)}
            onConfirm={handleCreateProject}
          />
        }
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            />
          </div>
          
          <div>
            <label htmlFor="version" className="block text-sm font-medium text-gray-700">
              Version
            </label>
            <input
              type="text"
              id="version"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newProject.version}
              onChange={(e) => setNewProject({ ...newProject, version: e.target.value })}
              placeholder="1.0.0"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newProject.status}
              onChange={(e) => setNewProject({ ...newProject, status: e.target.value as Project['status'] })}
            >
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog
        isOpen={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        title="Edit Project"
        footer={
          <DialogFooter
            cancelText="Cancel"
            confirmText="Save Changes"
            onCancel={() => setEditDialogOpen(false)}
            onConfirm={handleEditProject}
          />
        }
      >
        {currentProject && (
          <div className="space-y-4">
            <div>
              <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                id="edit-name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={currentProject.name}
                onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
              />
            </div>
            
            <div>
              <label htmlFor="edit-version" className="block text-sm font-medium text-gray-700">
                Version
              </label>
              <input
                type="text"
                id="edit-version"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={currentProject.version}
                onChange={(e) => setCurrentProject({ ...currentProject, version: e.target.value })}
              />
            </div>
            
            <div>
              <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="edit-description"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={currentProject.description}
                onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
              />
            </div>
            
            <div>
              <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="edit-status"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={currentProject.status}
                onChange={(e) => setCurrentProject({ ...currentProject, status: e.target.value as Project['status'] })}
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        )}
      </Dialog>

      {/* Delete Project Dialog */}
      <Dialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        title="Delete Project"
        footer={
          <DialogFooter
            cancelText="Cancel"
            confirmText="Delete Project"
            onCancel={() => setDeleteDialogOpen(false)}
            onConfirm={handleDeleteProject}
            danger
          />
        }
      >
        <div className="text-center py-4">
          <Package className="h-12 w-12 text-red-500 mx-auto" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            Delete Project
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Are you sure you want to delete "{currentProject?.name}"? This action cannot be undone.
          </p>
        </div>
      </Dialog>
    </div>
  );
};

export default Projects;