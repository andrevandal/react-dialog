import { useEffect, useRef } from 'react';
import dialogPolyfill from 'dialog-polyfill';

import './BaseDialog.css';

interface BaseDialogProps {
  title?: string;
  isOpen: boolean;
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


  if (dialogRef?.current && typeof HTMLDialogElement !== "function") {
    dialogPolyfill.registerDialog(dialogRef?.current);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', close);

    return () => {
      document.removeEventListener('keydown', close);
    };
  }, [onClose]);


  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <dialog ref={dialogRef} className='dialog' onClick={handleOverlayClick} role="dialog" open={isOpen} aria-hidden={!isOpen}>
      <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
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