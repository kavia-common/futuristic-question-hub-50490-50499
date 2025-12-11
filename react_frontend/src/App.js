import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import QuestionCard from './components/QuestionCard';
import AddQuestionModal from './components/AddQuestionModal';
import ViewAnswerModal from './components/ViewAnswerModal';
import useLocalStorage from './hooks/useLocalStorage';
import { getEnv } from './utils/env';

// PUBLIC_INTERFACE
function App() {
  /** Theme: retain toggle if exists */
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  /** Questions persisted in localStorage */
  const [questions, setQuestions] = useLocalStorage('questions', []);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [viewing, setViewing] = useState(null);

  // Env reading is safe and optional, not affecting core features
  useEffect(() => {
    const env = getEnv();
    if (env.REACT_APP_LOG_LEVEL === 'debug') {
      // eslint-disable-next-line no-console
      console.debug('Env flags', env);
    }
  }, []);

  const onAdd = useCallback(() => setIsAddOpen(true), []);
  const onCloseAdd = useCallback(() => setIsAddOpen(false), []);
  const onSaveAdd = useCallback((payload) => {
    const now = new Date().toISOString();
    const newItem = { id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), createdAt: now, ...payload };
    setQuestions(prev => [newItem, ...prev]);
    setIsAddOpen(false);
  }, [setQuestions]);

  const onView = useCallback((item) => setViewing(item), []);
  const onCloseView = useCallback(() => setViewing(null), []);

  const sorted = useMemo(() => {
    return [...questions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [questions]);

  const toggleTheme = useCallback(() => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
  }, [setTheme]);

  return (
    <div className="app-root">
      <Navbar onAdd={onAdd} onToggleTheme={toggleTheme} theme={theme} />

      <main className="content">
        <div className="container">
          <section className="header" aria-labelledby="page-title">
            <h1 id="page-title" className="title">Your Questions</h1>
            <p className="subtitle">Add questions and view answers in a clean, futuristic interface.</p>
          </section>

          {sorted.length === 0 ? (
            <div className="empty" data-testid="empty-state">
              No questions yet. Click “Add Question” to create your first one.
            </div>
          ) : (
            <section className="grid" aria-label="Questions grid">
              {sorted.map(item => (
                <QuestionCard key={item.id} item={item} onView={() => onView(item)} />
              ))}
            </section>
          )}
        </div>
      </main>

      <AddQuestionModal open={isAddOpen} onClose={onCloseAdd} onSave={onSaveAdd} />
      <ViewAnswerModal open={!!viewing} item={viewing} onClose={onCloseView} />
    </div>
  );
}

export default App;
