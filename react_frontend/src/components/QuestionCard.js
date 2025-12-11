import React, { useMemo } from 'react';

/** Format ISO time to a readable short string */
function formatTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
}

// PUBLIC_INTERFACE
export default function QuestionCard({ item, onView }) {
  const created = useMemo(() => formatTime(item.createdAt), [item.createdAt]);
  return (
    <article className="card" aria-labelledby={`q-${item.id}`}>
      <h2 id={`q-${item.id}`} className="card-title">{item.question}</h2>
      <div className="card-meta">Created {created}</div>
      <div className="card-actions">
        <button className="link" onClick={onView} aria-label="View Answer">View Answer</button>
      </div>
    </article>
  );
}
