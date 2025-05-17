import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  headerActions?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  footer,
  className = '',
  headerActions,
}) => {
  return (
    <div className={`futuristic-card ${className}`}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-neon-blue/20 flex justify-between items-center">
          <div>
            {title && <h3 className="text-lg font-medium neon-text">{title}</h3>}
            {subtitle && <p className="text-sm text-neon-blue/70 mt-1">{subtitle}</p>}
          </div>
          {headerActions && (
            <div className="flex space-x-2">
              {headerActions}
            </div>
          )}
        </div>
      )}
      <div className="px-6 py-4 relative">
        <div className="futuristic-grid absolute inset-0 opacity-10"></div>
        <div className="relative">{children}</div>
      </div>
      {footer && (
        <div className="px-6 py-3 bg-darker-blue/50 border-t border-neon-blue/20">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;