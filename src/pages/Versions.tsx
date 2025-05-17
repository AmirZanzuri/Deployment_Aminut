import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Dialog, { DialogFooter } from '../components/ui/Dialog';
import Table from '../components/ui/Table';
import { ApplicationVersion, Platform } from '../types';
import { Plus, Trash2, Edit2, Box } from 'lucide-react';
import { mockPlatforms } from '../services/mockData';

const mockVersions: ApplicationVersion[] = [
  {
    id: '1',
    ecix_version: '2.1.0',
    core_version: '3.0.0',
    tiger_x_version: '1.5.0',
    map_core_version: '4.2.1',
    created_at: new Date().toISOString(),
    platforms_count: 3,
  },
];

const Versions: React.FC = () => {
  const [versions, setVersions] = useState<ApplicationVersion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVersion, setSelectedVersion] = useState<ApplicationVersion | null>(null);
  const [showPlatformsDialog, setShowPlatformsDialog] = useState(false);
  const [showNewVersionDialog, setShowNewVersionDialog] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [showPlatformDetailsDialog, setShowPlatformDetailsDialog] = useState(false);
  const [newVersion, setNewVersion] = useState({
    ecix_version: '',
    core_version: '',
    tiger_x_version: '',
    map_core_version: '',
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setVersions(mockVersions);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleCreateVersion = () => {
    const versionToAdd: ApplicationVersion = {
      id: (versions.length + 1).toString(),
      ...newVersion,
      created_at: new Date().toISOString(),
      platforms_count: 0,
    };

    setVersions([...versions, versionToAdd]);
    setShowNewVersionDialog(false);
    setNewVersion({
      ecix_version: '',
      core_version: '',
      tiger_x_version: '',
      map_core_version: '',
    });
  };

  const columns = [
    {
      header: 'E-CIX Version',
      accessor: 'ecix_version',
    },
    {
      header: 'Core Version',
      accessor: 'core_version',
    },
    {
      header: 'Tiger-X Version',
      accessor: 'tiger_x_version',
    },
    {
      header: 'MapCore Version',
      accessor: 'map_core_version',
    },
    {
      header: 'Platforms',
      accessor: (version: ApplicationVersion) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedVersion(version);
            setShowPlatformsDialog(true);
          }}
        >
          {version.platforms_count} Platforms
        </Button>
      ),
    },
    {
      header: 'Created',
      accessor: (version: ApplicationVersion) => 
        new Date(version.created_at).toLocaleDateString(),
    },
  ];

  const platformColumns = [
    {
      header: 'Name',
      accessor: (platform: Platform) => (
        <Button
          variant="ghost"
          onClick={() => {
            setSelectedPlatform(platform);
            setShowPlatformDetailsDialog(true);
          }}
        >
          {platform.name}
        </Button>
      ),
    },
    {
      header: 'Version',
      accessor: 'version',
    },
    {
      header: 'Type',
      accessor: (platform: Platform) => (
        <span className="capitalize">{platform.type}</span>
      ),
    },
    {
      header: 'Environment',
      accessor: (platform: Platform) => (
        <Badge
          status={platform.environment === 'production' ? 'success' : 'info'}
          label={platform.environment}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Application Versions</h1>
        <Button
          variant="primary"
          icon={<Plus size={16} />}
          onClick={() => setShowNewVersionDialog(true)}
        >
          New Version
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          data={versions}
          keyExtractor={(version) => version.id}
          isLoading={isLoading}
        />
      </Card>

      {/* New Version Dialog */}
      <Dialog
        isOpen={showNewVersionDialog}
        onClose={() => setShowNewVersionDialog(false)}
        title="Create New Version"
        footer={
          <DialogFooter
            cancelText="Cancel"
            confirmText="Create Version"
            onCancel={() => setShowNewVersionDialog(false)}
            onConfirm={handleCreateVersion}
          />
        }
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="ecix_version" className="block text-sm font-medium text-gray-700">
              E-CIX Version
            </label>
            <input
              type="text"
              id="ecix_version"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newVersion.ecix_version}
              onChange={(e) => setNewVersion({ ...newVersion, ecix_version: e.target.value })}
              placeholder="2.1.0"
            />
          </div>
          
          <div>
            <label htmlFor="core_version" className="block text-sm font-medium text-gray-700">
              Core Version
            </label>
            <input
              type="text"
              id="core_version"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newVersion.core_version}
              onChange={(e) => setNewVersion({ ...newVersion, core_version: e.target.value })}
              placeholder="3.0.0"
            />
          </div>
          
          <div>
            <label htmlFor="tiger_x_version" className="block text-sm font-medium text-gray-700">
              Tiger-X Version
            </label>
            <input
              type="text"
              id="tiger_x_version"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newVersion.tiger_x_version}
              onChange={(e) => setNewVersion({ ...newVersion, tiger_x_version: e.target.value })}
              placeholder="1.5.0"
            />
          </div>
          
          <div>
            <label htmlFor="map_core_version" className="block text-sm font-medium text-gray-700">
              MapCore Version
            </label>
            <input
              type="text"
              id="map_core_version"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newVersion.map_core_version}
              onChange={(e) => setNewVersion({ ...newVersion, map_core_version: e.target.value })}
              placeholder="4.2.1"
            />
          </div>
        </div>
      </Dialog>

      {/* Platforms Dialog */}
      <Dialog
        isOpen={showPlatformsDialog}
        onClose={() => setShowPlatformsDialog(false)}
        title="Connected Platforms"
        size="lg"
      >
        <div className="space-y-6">
          {selectedVersion && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">E-CIX Version</h3>
                  <p className="mt-1 text-lg font-semibold">{selectedVersion.ecix_version}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Core Version</h3>
                  <p className="mt-1 text-lg font-semibold">{selectedVersion.core_version}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Tiger-X Version</h3>
                  <p className="mt-1 text-lg font-semibold">{selectedVersion.tiger_x_version}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">MapCore Version</h3>
                  <p className="mt-1 text-lg font-semibold">{selectedVersion.map_core_version}</p>
                </div>
              </div>

              <Table
                columns={platformColumns}
                data={mockPlatforms.slice(0, 3)} // Simulated connected platforms
                keyExtractor={(platform) => platform.id}
                isLoading={false}
              />
            </>
          )}
        </div>
      </Dialog>

      {/* Platform Details Dialog */}
      <Dialog
        isOpen={showPlatformDetailsDialog}
        onClose={() => setShowPlatformDetailsDialog(false)}
        title="Platform Details"
        size="md"
      >
        {selectedPlatform && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Name</label>
                <p className="mt-1 text-sm text-gray-900">{selectedPlatform.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Version</label>
                <p className="mt-1 text-sm text-gray-900">{selectedPlatform.version}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Type</label>
                <p className="mt-1 text-sm text-gray-900 capitalize">{selectedPlatform.type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Environment</label>
                <p className="mt-1">
                  <Badge
                    status={selectedPlatform.environment === 'production' ? 'success' : 'info'}
                    label={selectedPlatform.environment}
                  />
                </p>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default Versions;