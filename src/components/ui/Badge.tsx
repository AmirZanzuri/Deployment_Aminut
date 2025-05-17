import React from 'react';
import { StatusType } from '../../types';

interface BadgeProps {
  status: StatusType;
  label: string;
  animate?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ status, label, animate = false }) => {
  const baseClasses = "px-2.5 py-0.5 text-xs font-medium rounded-full border";
  
  const statusClasses = {
    success: "border-green-500 bg-green-500/10 text-green-500",
    warning: "border-amber-500 bg-amber-500/10 text-amber-500",
    error: "border-red-500 bg-red-500/10 text-red-500",
    info: "border-neon-blue bg-neon-blue/10 text-neon-blue",
    default: "border-gray-500 bg-gray-500/10 text-gray-500",
  };

  const animateClasses = animate ? "transition-all duration-300 ease-in-out" : "";

  return (
    <span className={`${baseClasses} ${statusClasses[status]} ${animateClasses}`}>
      {label}
    </span>
  );
};

export default Badge;