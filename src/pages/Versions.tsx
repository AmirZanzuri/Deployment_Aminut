import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Dialog, { DialogFooter } from '../components/ui/Dialog';
import Table from '../components/ui/Table';
import { ApplicationVersion, Platform, ElynxVersion, GrxVersion, SmartTmrVersion } from '../types';
import { Plus, Radio, Cpu, Laptop } from 'lucide-react';
import { mockPlatforms, mockApplicationVersions, mockElynxVersions, mockGrxVersions, mockSmartTmrVersions } from '../services/mockData';

const Versions: React.FC = () => {
  const [applicationVersions, setApplicationVersions] = useState<ApplicationVersion[]>([]);
  const [elynxVersions, setElynxVersions] = useState<ElynxVersion[]>([]);
  const [grxVersions, setGrxVersions] = useState<GrxVersion[]>([]);
  const [smartTmrVersions, setSmartTmrVersions] = useState<SmartTmrVersion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVersion, setSelectedVersion] = useState<ApplicationVersion | null>(null);
  const [showPlatformsDialog, setShowPlatformsDialog] = useState(false);
  const [showNewVersionDialog, setShowNewVersionDialog] = useState(false);
  const [showNewElynxDialog, setShowNewElynxDialog] = useState(false);
  const [showNewGrxDialog, setShowNewGrxDialog] = useState(false);
  const [showNewSmartTmrDialog, setShowNewSmartTmrDialog] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [showPlatformDetailsDialog, setShowPlatformDetailsDialog] = useState(false);

  const [newVersion, setNewVersion] = useState({
    version_number: '',
    ecix_version: '',
    core_version: '',
    tiger_x_version: '',
    map_core_version: '',
  });

  const [newElynxVersion, setNewElynxVersion] = useState({
    version_number: '',
    radio_version: '',
    firmware_version: '',
  });

  const [newGrxVersion, setNewGrxVersion] = useState({
    version_number: '',
    software_version: '',
    protocol_version: '',
  });

  const [newSmartTmrVersion, setNewSmartTmrVersion] = useState({
    version_number: '',
    hardware_version: '',
    software_version: '',
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setApplicationVersions(mockApplicationVersions);
      setElynxVersions(mockElynxVersions);
      setGrxVersions(mockGrxVersions);
      setSmartTmrVersions(mockSmartTmrVersions);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleCreateVersion = () => {
    const versionToAdd: ApplicationVersion = {
      id: (applicationVersions.length + 1).toString(),
      ...newVersion,
      created_at: new Date().toISOString(),
      platforms_count: 0,
    };

    setApplicationVersions([...applicationVersions, versionToAdd]);
    setShowNewVersionDialog(false);
    setNewVersion({
      version_number: '',
      ecix_version: '',
      core_version: '',
      tiger_x_version: '',
      map_core_version: '',
    });
  };

  const handleCreateElynxVersion = () => {
    const versionToAdd: ElynxVersion = {
      id: (elynxVersions.length + 1).toString(),
      ...newElynxVersion,
      created_at: new Date().toISOString(),
    };

    setElynxVersions([...elynxVersions, versionToAdd]);
    setShowNewElynxDialog(false);
    setNewElynxVersion({
      version_number: '',
      radio_version: '',
      firmware_version: '',
    });
  };

  const handleCreateGrxVersion = () => {
    const versionToAdd: GrxVersion = {
      id: (grxVersions.length + 1).toString(),
      ...newGrxVersion,
      created_at: new Date().toISOString(),
    };

    setGrxVersions([...grxVersions, versionToAdd]);
    setShowNewGrxDialog(false);
    setNewGrxVersion({
      version_number: '',
      software_version: '',
      protocol_version: '',
    });
  };

  const handleCreateSmartTmrVersion = () => {
    const versionToAdd: SmartTmrVersion = {
      id: (smartTmrVersions.length + 1).toString(),
      ...newSmartTmrVersion,
      created_at: new Date().toISOString(),
    };

    setSmartTmrVersions([...smartTmrVersions, versionToAdd]);
    setShowNewSmartTmrDialog(false);
    setNewSmartTmrVersion({
      version_number: '',
      hardware_version: '',
      software_version: '',
    });
  };

  const applicationColumns = [
    {
      header: 'Version Number',
      accessor: 'version_number',
    },
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
          {version.platforms_count || 0} Platforms
        </Button>
      ),
    },
    {
      header: 'Created',
      accessor: (version: ApplicationVersion) => 
        new Date(version.created_at).toLocaleDateString(),
    },
  ];

  const elynxColumns = [
    {
      header: 'Version Number',
      accessor: 'version_number',
    },
    {
      header: 'Radio Version',
      accessor: 'radio_version',
    },
    {
      header: 'Firmware Version',
      accessor: 'firmware_version',
    },
    {
      header: 'Created',
      accessor: (version: ElynxVersion) => 
        new Date(version.created_at).toLocaleDateString(),
    },
  ];

  const grxColumns = [
    {
      header: 'Version Number',
      accessor: 'version_number',
    },
    {
      header: 'Software Version',
      accessor: 'software_version',
    },
    {
      header: 'Protocol Version',
      accessor: 'protocol_version',
    },
    {
      header: 'Created',
      accessor: (version: GrxVersion) => 
        new Date(version.created_at).toLocaleDateString(),
    },
  ];

  const smartTmrColumns = [
    {
      header: 'Version Number',
      accessor: 'version_number',
    },
    {
      header: 'Hardware Version',
      accessor: 'hardware_version',
    },
    {
      header: 'Software Version',
      accessor: 'software_version',
    },
    {
      header: 'Created',
      accessor: (version: SmartTmrVersion) => 
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
    <div className="space-y-8">
      {/* Application Versions Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Application Versions</h2>
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
            columns={applicationColumns}
            data={applicationVersions}
            keyExtractor={(version) => version.id}
            isLoading={isLoading}
          />
        </Card>
      </div>

      {/* E-lynx Versions Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">E-lynx Versions</h2>
          <Button
            variant="primary"
            icon={<Radio size={16} />}
            onClick={() => setShowNewElynxDialog(true)}
          >
            New E-lynx Version
          </Button>
        </div>

        <Card>
          <Table
            columns={elynxColumns}
            data={elynxVersions}
            keyExtractor={(version) => version.id}
            isLoading={isLoading}
          />
        </Card>
      </div>

      {/* GRX Versions Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">GRX Versions</h2>
          <Button
            variant="primary"
            icon={<Cpu size={16} />}
            onClick={() => setShowNewGrxDialog(true)}
          >
            New GRX Version
          </Button>
        </div>

        <Card>
          <Table
            columns={grxColumns}
            data={grxVersions}
            keyExtractor={(version) => version.id}
            isLoading={isLoading}
          />
        </Card>
      </div>

      {/* Smart-TMR Versions Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Smart-TMR Versions</h2>
          <Button
            variant="primary"
            icon={<Laptop size={16} />}
            onClick={() => setShowNewSmartTmrDialog(true)}
          >
            New Smart-TMR Version
          </Button>
        </div>

        <Card>
          <Table
            columns={smartTmrColumns}
            data={smartTmrVersions}
            keyExtractor={(version) => version.id}
            isLoading={isLoading}
          />
        </Card>
      </div>

      {/* New Application Version Dialog */}
      <Dialog
        isOpen={showNewVersionDialog}
        onClose={() => setShowNewVersionDialog(false)}
        title="Create New Application Version"
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
            <label htmlFor="version_number" className="block text-sm font-medium text-gray-700">
              Version Number
            </label>
            <input
              type="text"
              id="version_number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newVersion.version_number}
              onChange={(e) => setNewVersion({ ...newVersion, version_number: e.target.value })}
              placeholder="1.0.0"
            />
          </div>

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

      {/* New E-lynx Version Dialog */}
      <Dialog
        isOpen={showNewElynxDialog}
        onClose={() => setShowNewElynxDialog(false)}
        title="Create New E-lynx Version"
        footer={
          <DialogFooter
            cancelText="Cancel"
            confirmText="Create Version"
            onCancel={() => setShowNewElynxDialog(false)}
            onConfirm={handleCreateElynxVersion}
          />
        }
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="elynx_version_number" className="block text-sm font-medium text-gray-700">
              Version Number
            </label>
            <input
              type="text"
              id="elynx_version_number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newElynxVersion.version_number}
              onChange={(e) => setNewElynxVersion({ ...newElynxVersion, version_number: e.target.value })}
              placeholder="1.0.0"
            />
          </div>

          <div>
            <label htmlFor="radio_version" className="block text-sm font-medium text-gray-700">
              Radio Version
            </label>
            <input
              type="text"
              id="radio_version"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newElynxVersion.radio_version}
              onChange={(e) => setNewElynxVersion({ ...newElynxVersion, radio_version: e.target.value })}
              placeholder="2.1.0"
            />
          </div>

          <div>
            <label htmlFor="firmware_version" className="block text-sm font-medium text-gray-700">
              Firmware Version
            </label>
            <input
              type="text"
              id="firmware_version"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newElynxVersion.firmware_version}
              onChange={(e) => setNewElynxVersion({ ...newElynxVersion, firmware_version: e.target.value })}
              placeholder="3.0.0"
            />
          </div>
        </div>
      </Dialog>

      {/* New GRX Version Dialog */}
      <Dialog
        isOpen={showNewGrxDialog}
        onClose={() => setShowNewGrxDialog(false)}
        title="Create New GRX Version"
        footer={
          <DialogFooter
            cancelText="Cancel"
            confirmText="Create Version"
            onCancel={() => setShowNewGrxDialog(false)}
            onConfirm={handleCreateGrxVersion}
          />
        }
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="grx_version_number" className="block text-sm font-medium text-gray-700">
              Version Number
            </label>
            <input
              type="text"
              id="grx_version_number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newGrxVersion.version_number}
              onChange={(e) => setNewGrxVersion({ ...newGrxVersion, version_number: e.target.value })}
              placeholder="1.0.0"
            />
          </div>

          <div>
            <label htmlFor="software_version" className="block text-sm font-medium text-gray-700">
              Software Version
            </label>
            <input
              type="text"
              id="software_version"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newGrxVersion.software_version}
              onChange={(e) => setNewGrxVersion({ ...newGrxVersion, software_version: e.target.value })}
              placeholder="2.1.0"
            />
          </div>

          <div>
            <label htmlFor="protocol_version" className="block text-sm font-medium text-gray-700">
              Protocol Version
            </label>
            <input
              type="text"
              id="protocol_version"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newGrxVersion.protocol_version}
              onChange={(e) => setNewGrxVersion({ ...newGrxVersion, protocol_version: e.target.value })}
              placeholder="3.0.0"
            />
          </div>
        </div>
      </Dialog>

      {/* New Smart-TMR Version Dialog */}
      <Dialog
        isOpen={showNewSmartTmrDialog}
        onClose={() => setShowNewSmartTmrDialog(false)}
        title="Create New Smart-TMR Version"
        footer={
          <DialogFooter
            cancelText="Cancel"
            confirmText="Create Version"
            onCancel={() => setShowNewSmartTmrDialog(false)}
            onConfirm={handleCreateSmartTmrVersion}
          />
        }
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="smart_tmr_version_number" className="block text-sm font-medium text-gray-700">
              Version Number
            </label>
            <input
              type="text"
              id="smart_tmr_version_number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newSmartTmrVersion.version_number}
              onChange={(e) => setNewSmartTmrVersion({ ...newSmartTmrVersion, version_number: e.target.value })}
              placeholder="1.0.0"
            />
          </div>

          <div>
            <label htmlFor="hardware_version" className="block text-sm font-medium text-gray-700">
              Hardware Version
            </label>
            <input
              type="text"
              id="hardware_version"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newSmartTmrVersion.hardware_version}
              onChange={(e) => setNewSmartTmrVersion({ ...newSmartTmrVersion, hardware_version: e.target.value })}
              placeholder="2.1.0"
            />
          </div>

          <div>
            <label htmlFor="software_version" className="block text-sm font-medium text-gray-700">
              Software Version
            </label>
            <input
              type="text"
              id="software_version"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newSmartTmrVersion.software_version}
              onChange={(e) => setNewSmartTmrVersion({ ...newSmartTmrVersion, software_version: e.target.value })}
              placeholder="3.0.0"
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
                  <h3 className="text-sm font-medium text-gray-500">Version Number</h3>
                  <p className="mt-1 text-lg font-semibold">{selectedVersion.version_number}</p>
                </div>
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
                data={mockPlatforms.filter(p => p.application_version_id === selectedVersion.id)}
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