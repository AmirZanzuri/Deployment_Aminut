import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Dialog, { DialogFooter } from '../components/ui/Dialog';
import { Component } from '../types';
import { Plus, Edit2, Trash2, Cpu } from 'lucide-react';

const Components: React.FC = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [newComponent, setNewComponent] = useState({
    name: '',
    type: 'Tactical Computer' as Component['type'],
    description: '',
    ip: '',
    version: '',
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setComponents([
        {
          id: '1',
          name: 'Main Computer',
          type: 'Tactical Computer',
          description: 'Primary tactical computer system',
          ip: '192.168.1.100',
          version: '1.0.0',
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Radio System',
          type: 'E-Lynks Radio',
          description: 'Communication radio system',
          ip: '192.168.1.101',
          version: '2.1.0',
          created_at: new Date().toISOString(),
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleCreateComponent = () => {
    const componentToAdd: Component = {
      id: (components.length + 1).toString(),
      ...newComponent,
      created_at: new Date().toISOString(),
    };

    setComponents([...components, componentToAdd]);
    setCreateDialogOpen(false);
    setNewComponent({
      name: '',
      type: 'Tactical Computer',
      description: '',
      ip: '',
      version: '',
    });
  };

  const handleEditComponent = () => {
    if (!selectedComponent) return;

    const updatedComponents = components.map(c =>
      c.id === selectedComponent.id ? selectedComponent : c
    );

    setComponents(updatedComponents);
    setEditDialogOpen(false);
    setSelectedComponent(null);
  };

  const handleDeleteComponent = () => {
    if (!selectedComponent) return;

    const updatedComponents = components.filter(c => c.id !== selectedComponent.id);

    setComponents(updatedComponents);
    setDeleteDialogOpen(false);
    setSelectedComponent(null);
  };

  const componentTypes: Component['type'][] = [
    'Tactical Computer',
    'Smart TMR',
    'E-Lynks Radio',
    'HQ Server',
    'Client',
    'GRX',
  ];

  // Group components by type
  const groupedComponents = components.reduce((acc, component) => {
    if (!acc[component.type]) {
      acc[component.type] = [];
    }
    acc[component.type].push(component);
    return acc;
  }, {} as Record<Component['type'], Component[]>);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-gray-200 h-48 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Components</h1>
        <Button
          variant="primary"
          icon={<Plus size={16} />}
          onClick={() => setCreateDialogOpen(true)}
        >
          New Component
        </Button>
      </div>

      {/* Components by Type */}
      <div className="space-y-6">
        {componentTypes.map((type) => (
          <Card
            key={type}
            title={type}
            subtitle={`${groupedComponents[type]?.length || 0} components`}
          >
            {groupedComponents[type]?.length ? (
              <div className="divide-y divide-gray-200">
                {groupedComponents[type].map((component) => (
                  <div key={component.id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {component.name}
                          </h3>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            v{component.version}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                          <span className="font-mono">{component.ip}</span>
                          <span>•</span>
                          <span>{component.description}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Edit2 size={16} />}
                          onClick={() => {
                            setSelectedComponent(component);
                            setEditDialogOpen(true);
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Trash2 size={16} />}
                          onClick={() => {
                            setSelectedComponent(component);
                            setDeleteDialogOpen(true);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No {type} components added yet
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Create Component Dialog */}
      <Dialog
        isOpen={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        title="Create New Component"
        footer={
          <DialogFooter
            cancelText="Cancel"
            confirmText="Create Component"
            onCancel={() => setCreateDialogOpen(false)}
            onConfirm={handleCreateComponent}
          />
        }
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Component Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newComponent.name}
              onChange={(e) => setNewComponent({ ...newComponent, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              id="type"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newComponent.type}
              onChange={(e) => setNewComponent({ ...newComponent, type: e.target.value as Component['type'] })}
            >
              {componentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="ip" className="block text-sm font-medium text-gray-700">
              IP Address
            </label>
            <input
              type="text"
              id="ip"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-mono"
              value={newComponent.ip}
              onChange={(e) => setNewComponent({ ...newComponent, ip: e.target.value })}
              placeholder="192.168.1.100"
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
              value={newComponent.version}
              onChange={(e) => setNewComponent({ ...newComponent, version: e.target.value })}
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
              value={newComponent.description}
              onChange={(e) => setNewComponent({ ...newComponent, description: e.target.value })}
            />
          </div>
        </div>
      </Dialog>

      {/* Edit Component Dialog */}
      <Dialog
        isOpen={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        title="Edit Component"
        footer={
          <DialogFooter
            cancelText="Cancel"
            confirmText="Save Changes"
            onCancel={() => setEditDialogOpen(false)}
            onConfirm={handleEditComponent}
          />
        }
      >
        {selectedComponent && (
          <div className="space-y-4">
            <div>
              <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">
                Component Name
              </label>
              <input
                type="text"
                id="edit-name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={selectedComponent.name}
                onChange={(e) => setSelectedComponent({ ...selectedComponent, name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="edit-type" className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                id="edit-type"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={selectedComponent.type}
                onChange={(e) => setSelectedComponent({ ...selectedComponent, type: e.target.value as Component['type'] })}
              >
                {componentTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="edit-ip" className="block text-sm font-medium text-gray-700">
                IP Address
              </label>
              <input
                type="text"
                id="edit-ip"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-mono"
                value={selectedComponent.ip}
                onChange={(e) => setSelectedComponent({ ...selectedComponent, ip: e.target.value })}
                placeholder="192.168.1.100"
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
                value={selectedComponent.version}
                onChange={(e) => setSelectedComponent({ ...selectedComponent, version: e.target.value })}
                placeholder="1.0.0"
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
                value={selectedComponent.description}
                onChange={(e) => setSelectedComponent({ ...selectedComponent, description: e.target.value })}
              />
            </div>
          </div>
        )}
      </Dialog>

      {/* Delete Component Dialog */}
      <Dialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        title="Delete Component"
        footer={
          <DialogFooter
            cancelText="Cancel"
            confirmText="Delete Component"
            onCancel={() => setDeleteDialogOpen(false)}
            onConfirm={handleDeleteComponent}
            danger
          />
        }
      >
        {selectedComponent && (
          <div className="text-center py-4">
            <Cpu className="h-12 w-12 text-red-500 mx-auto" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Delete Component
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Are you sure you want to delete "{selectedComponent.name}"? This action cannot be undone.
            </p>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default Components;