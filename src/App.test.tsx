// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import App from './App';

beforeEach(() => vi.useFakeTimers());
afterEach(() => { cleanup(); vi.useRealTimers(); });

it('waits for a full pause after the latest keystroke', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText('Search products'), { target: { value: 'lap' } });
  act(() => vi.advanceTimersByTime(300));
  fireEvent.change(screen.getByLabelText('Search products'), { target: { value: 'laptop' } });
  act(() => vi.advanceTimersByTime(499));
  expect(screen.queryByRole('list')).toBeNull();
  act(() => vi.advanceTimersByTime(1));
  expect(screen.getByText('Laptop 1')).toBeTruthy();
  expect(screen.getAllByRole('listitem')).toHaveLength(50);
});

it('handles no matches and clearing the search', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText('Search products'), { target: { value: 'zzzz' } });
  act(() => vi.advanceTimersByTime(500));
  expect(screen.getByText('No products found.')).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
  act(() => vi.advanceTimersByTime(500));
  expect(screen.getByText('Type a product name to begin.')).toBeTruthy();
});

it('cancels the pending timer on unmount', () => {
  const { unmount } = render(<App />);
  fireEvent.change(screen.getByLabelText('Search products'), { target: { value: 'phone' } });
  unmount();
  expect(vi.getTimerCount()).toBe(0);
});
