import React from 'react';
import Modal from './Modal';

// PUBLIC_INTERFACE
export default function ViewAnswerModal({ open, item, onClose }) {
  const footer = (
    <>
      <button className="btn btn-primary" onClick={onClose}>Close</button>
    </>
  );

  return (
    <Modal
      open={open}
      title="Answer"
      ariaLabel="Answer"
      onClose={onClose}
      footer={footer}
    >
      <div>
        <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{item?.answer}</p>
      </div>
    </Modal>
  );
}
