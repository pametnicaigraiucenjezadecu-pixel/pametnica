import React, { useEffect } from 'react';
import { Button } from './Button';

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  showClose?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, children, showClose = true }) => {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={showClose ? onClose : undefined}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {title && <h2 className="modal__title">{title}</h2>}
        <div className="modal__body">{children}</div>
        {showClose && onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="modal__close">
            ✕
          </Button>
        )}
      </div>
    </div>
  );
};
