import React from 'react';
import { Button } from '../components/ui/Button';
import Dialog, { DialogFooter } from '../components/ui/Dialog';

const DeploymentMatrix = () => {
  const [selectedPlatform, setSelectedPlatform] = React.useState({ component_id: '' });
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [showComponentsDialog, setShowComponentsDialog] = React.useState(false);
  
  // Mock data for demonstration
  const availableComponents = [
    { id: '1', name: 'Component 1', hardware: 'Hardware A' },
    { id: '2', name: 'Component 2', hardware: 'Hardware B' }
  ];

  const getAvailableComponents = () => {
    return availableComponents;
  };

  const handleDeletePlatform = () => {
    setDeleteDialogOpen(false);
  };

  const isComponentSelected = (componentId: string) => {
    return selectedPlatform.component_id === componentId;
  };

  const handleComponentSelect = (component: { id: string }) => {
    setSelectedPlatform({ ...selectedPlatform, component_id: component.id });
  };

  return (
    <div>
      <Dialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        title="Delete Node"
        footer={
          <DialogFooter
            cancelText="Cancel"
            confirmText="Delete Node"
            onCancel={() => setDeleteDialogOpen(false)}
            onConfirm={handleDeletePlatform}
          />
        }
      >
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this node? This action cannot be undone.
        </p>
      </Dialog>

      <Dialog
        isOpen={showComponentsDialog}
        onClose={() => setShowComponentsDialog(false)}
        title="Manage Components"
        footer={
          <DialogFooter
            cancelText="Close"
            onCancel={() => setShowComponentsDialog(false)}
          />
        }
      >
        <div className="space-y-4">
          {availableComponents.map((component) => (
            <div
              key={component.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div>
                <h4 className="font-medium">{component.name}</h4>
                <p className="text-sm text-gray-500">{component.hardware}</p>
              </div>
              <Button
                variant={isComponentSelected(component.id) ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => handleComponentSelect(component)}
              >
                {isComponentSelected(component.id) ? 'Selected' : 'Select'}
              </Button>
            </div>
          ))}
        </div>
      </Dialog>
    </div>
  );
};

export default DeploymentMatrix;