import React from 'react';
import { NavLink } from 'react-router-dom';
import { Cpu, LayoutDashboard, Server, Package, Settings, Menu, X, Versions } from 'lucide-react';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/matrix', label: 'Deployment Matrix', icon: <Cpu size={18} /> },
    { path: '/projects', label: 'Projects', icon: <Package size={18} /> },
    { path: '/platforms', label: 'Platforms', icon: <Server size={18} /> },
    { path: '/versions', label: 'Versions', icon: <Versions size={18} /> },
  ];

  const NavItem: React.FC<{ path: string; label: string; icon: React.ReactNode }> = ({ path, label, icon }) => {
    return (
      <NavLink
        to={path}
        className={({ isActive }) => `
          flex items-center px-4 py-2 text-sm font-medium rounded-md group transition-colors
          ${isActive 
            ? 'bg-blue-100 text-blue-700' 
            : 'text-gray-700 hover:bg-gray-100'}
        `}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <span className="mr-3">{icon}</span>
        {label}
      </NavLink>
    );
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Cpu className="block h-8 w-auto text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">C2 Dashboard</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-2">
              {navItems.map((item) => (
                <NavItem key={item.path} {...item} />
              ))}
            </div>
          </div>

          {/* User menu and mobile menu button */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              icon={<Settings size={18} />}
              className="mr-2"
            >
              Settings
            </Button>

            {/* Mobile menu button */}
            <div className="sm:hidden">
              <Button
                variant="ghost"
                onClick={toggleMobileMenu}
                icon={isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                aria-expanded={isMobileMenuOpen}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;