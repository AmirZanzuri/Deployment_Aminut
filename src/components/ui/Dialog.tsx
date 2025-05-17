import React, { Fragment, ReactNode } from 'react';
import Button from './Button';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Fragment>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
        onClick={handleBackdropClick}
      >
        {/* Dialog */}
        <div 
          className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} transform transition-all`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-4">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              {footer}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export const DialogFooter: React.FC<{
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  isLoading?: boolean;
  danger?: boolean;
  children?: ReactNode;
}> = ({
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  onCancel,
  onConfirm,
  isLoading = false,
  danger = false,
  children,
}) => {
  if (children) {
    return <>{children}</>;
  }

  return (
    <>
      {onCancel && (
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          {cancelText}
        </Button>
      )}
      {onConfirm && (
        <Button
          variant={danger ? 'danger' : 'primary'}
          onClick={onConfirm}
          isLoading={isLoading}
        >
          {confirmText}
        </Button>
      )}
    </>
  );
};

export default Dialog;