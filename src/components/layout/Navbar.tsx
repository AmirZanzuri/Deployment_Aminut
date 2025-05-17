import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Server, Cpu, Menu, X, Captions as Versions } from 'lucide-react';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/matrix', label: 'Deployment Matrix', icon: <Server size={18} /> },
    { path: '/components', label: 'Components', icon: <Cpu size={18} /> },
    { path: '/versions', label: 'Versions', icon: <Versions size={18} /> },
  ];

  const NavItem: React.FC<{ path: string; label: string; icon: React.ReactNode }> = ({ path, label, icon }) => {
    return (
      <NavLink
        to={path}
        className={({ isActive }) => `
          flex items-center px-4 py-2 text-sm font-medium rounded-md group transition-colors
          ${isActive 
            ? 'bg-neon-blue/20 text-neon-blue' 
            : 'text-neon-blue/60 hover:bg-neon-blue/10 hover:text-neon-blue'}
        `}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <span className="mr-3">{icon}</span>
        {label}
      </NavLink>
    );
  };

  return (
    <nav className="bg-dark-blue border-b border-neon-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Server className="block h-8 w-auto text-neon-blue" />
              <span className="ml-2 text-xl font-bold text-neon-blue">C2 Dashboard</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-2">
              {navItems.map((item) => (
                <NavItem key={item.path} {...item} />
              ))}
            </div>
          </div>

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