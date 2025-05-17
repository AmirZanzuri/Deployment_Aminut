import React from 'react';
import { StatusType } from '../../types';

interface BadgeProps {
  status: StatusType;
  label: string;
  animate?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ status, label, animate = false }) => {
  const baseClasses = "px-2.5 py-0.5 text-xs font-medium rounded-full";
  
  const statusClasses = {
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
    default: "bg-gray-100 text-gray-800",
  };

  const animateClasses = animate ? "transition-all duration-300 ease-in-out" : "";

  return (
    <span className={`${baseClasses} ${statusClasses[status]} ${animateClasses}`}>
      {label}
    </span>
  );
};

export default Badge;