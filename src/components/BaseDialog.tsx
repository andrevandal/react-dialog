import { useEffect, useRef } from 'react';
let dialogPolyfill: any;

import './BaseDialog.css';

interface BaseDialogProps {
  title?: string;
  isOpen?: boolean;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
  children?: React.ReactNode;
}

const BaseDialog: React.FC<BaseDialogProps> = ({
  title,
  isOpen,
  onClose,
  closeOnOverlayClick,
  children,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = isOpen || false;

  useEffect(() => {
    const loadDialogPolyfill = async () => {
      dialogPolyfill = (await import('dialog-polyfill')).default;
    };
    if (dialogRef.current && typeof HTMLDialogElement !== "function") {
      if (!dialogPolyfill) {
          loadDialogPolyfill().then(() => {
            dialogPolyfill.registerDialog(dialogRef.current);
          });
        }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  const handleInnerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <dialog ref={dialogRef} className='dialog' onClick={handleOverlayClick} role="dialog" open={open} aria-hidden={!open}>
      <div className="dialog-box" onClick={handleInnerClick}>
        <div className="dialog-header">
          {title && <h2>{title}</h2>}
          <button type="button" onClick={onClose} aria-label='Fechar' role="close-button" className="close-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 1L8 8L15 15" stroke="black" strokeWidth="1.2"/>
              <path d="M1 1L8 8L0.999999 15" stroke="black" strokeWidth="1.2"/>
            </svg>
          </button>
        </div>
        <div className="dialog-content" role='dialog-content'>
          {children}
        </div>
      </div>
    </dialog>
  );
};

export default BaseDialog;