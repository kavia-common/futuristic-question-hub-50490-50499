import React, { useEffect, useRef } from 'react';

// PUBLIC_INTERFACE
export default function Modal({ open, title, onClose, children, footer, ariaLabel }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };
    document.addEventListener('keydown', onKey);
    // focus trap basic: focus heading on open
    setTimeout(() => {
      dialogRef.current?.focus();
    }, 0);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div className="modal-overlay" onMouseDown={handleOverlay}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-label={ariaLabel}
        tabIndex={-1}
        ref={dialogRef}
      >
        <div className="modal-header">
          <h3 id="modal-title" className="modal-title">{title}</h3>
          <button className="modal-close" aria-label="Close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-actions">
          {footer}
        </div>
      </div>
    </div>
  );
}
