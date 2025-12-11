import React from 'react';

// PUBLIC_INTERFACE
export default function Navbar({ onAdd, onToggleTheme, theme }) {
  /** Navbar with app title, Add Question button, and optional theme toggle */
  return (
    <nav className="navbar" role="navigation" aria-label="Main">
      <div className="navbar-inner">
        <div className="brand" aria-label="Brand">
          <h1 className="title">
            <span className="accent">Futuristic</span> Question Hub
          </h1>
        </div>
        <div className="nav-actions">
          <button className="btn btn-primary btn-icon" onClick={onAdd} aria-label="Add Question">
            <span aria-hidden="true">＋</span>
            Add Question
          </button>
          {onToggleTheme && (
            <button
              className="btn"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title="Toggle theme"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
