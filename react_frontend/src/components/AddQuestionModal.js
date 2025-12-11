import React, { useEffect, useState } from 'react';
import Modal from './Modal';

// PUBLIC_INTERFACE
export default function AddQuestionModal({ open, onClose, onSave }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (open) {
      setQuestion('');
      setAnswer('');
      setTouched(false);
    }
  }, [open]);

  const disabled = question.trim().length === 0 || answer.trim().length === 0;

  const save = () => {
    setTouched(true);
    if (disabled) return;
    onSave?.({ question: question.trim(), answer: answer.trim() });
  };

  const footer = (
    <>
      <button className="btn" onClick={onClose}>Cancel</button>
      <button className="btn btn-primary" onClick={save} aria-disabled={disabled} disabled={disabled}>Save</button>
    </>
  );

  return (
    <Modal
      open={open}
      title="Add Question"
      ariaLabel="Add Question"
      onClose={onClose}
      footer={footer}
    >
      <label className="label" htmlFor="question">Question</label>
      <input
        id="question"
        className="input"
        placeholder="Type your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        aria-invalid={touched && question.trim().length === 0}
        required
      />
      <label className="label" htmlFor="answer">Answer</label>
      <textarea
        id="answer"
        className="textarea"
        placeholder="Type the answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        aria-invalid={touched && answer.trim().length === 0}
        required
      />
      {touched && disabled && (
        <p className="visually-hidden" role="alert">Question and Answer are required.</p>
      )}
    </Modal>
  );
}
