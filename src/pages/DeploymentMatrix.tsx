Here's the fixed version with all closing brackets added:

```javascript
                id="edit-component"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={selectedPlatform.component_id}
                onChange={(e) => setSelectedPlatform({ ...selectedPlatform, component_id: e.target.value })}
              >
                <option value="">Select Component</option>
                {getAvailableComponents().map((component) => (
                  <option key={component.id} value={component.id}>
                    {component.name} - {component.hardware}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </Dialog>

      {/* Delete Node Dialog */}
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

      {/* Components Dialog */}
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
```