import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders navbar title and Add Question button', () => {
  render(<App />);
  expect(screen.getByText('Futuristic Question Hub')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add question/i })).toBeInTheDocument();
});

test('can open Add Question modal and add a question', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /add question/i }));
  expect(screen.getByRole('dialog', { name: /add question/i })).toBeInTheDocument();

  const qInput = screen.getByLabelText(/question/i);
  const aInput = screen.getByLabelText(/answer/i);
  fireEvent.change(qInput, { target: { value: 'What is React?' } });
  fireEvent.change(aInput, { target: { value: 'A library for building UIs.' } });

  fireEvent.click(screen.getByRole('button', { name: /save/i }));
  expect(screen.getByText(/what is react\?/i)).toBeInTheDocument();

  // View Answer
  fireEvent.click(screen.getByRole('button', { name: /view answer/i }));
  expect(screen.getByRole('dialog', { name: /answer/i })).toBeInTheDocument();
  expect(screen.getByText(/a library for building uis\./i)).toBeInTheDocument();
});
