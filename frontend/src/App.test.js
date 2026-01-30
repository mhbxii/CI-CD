import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the todoAPI
jest.mock('./services/todoAPI', () => ({
  getAllTodos: jest.fn(),
  createTodo: jest.fn()
}));

describe('App Component', () => {
  test('renders app header with title', () => {
    render(<App />);
    expect(screen.getByText(/Todo App - Release 1.0/i)).toBeInTheDocument();
  });

  test('renders app footer with version', () => {
    render(<App />);
    expect(screen.getByText(/Version 1.0.0/i)).toBeInTheDocument();
    expect(screen.getByText(/CREATE & READ/i)).toBeInTheDocument();
  });

  test('shows loading state initially', () => {
    render(<App />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
