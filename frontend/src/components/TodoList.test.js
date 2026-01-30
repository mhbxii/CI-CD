import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from './TodoList';

describe('TodoList Component', () => {
  test('displays "no todos" message when list is empty', () => {
    render(<TodoList todos={[]} />);
    
    expect(screen.getByTestId('no-todos-message')).toBeInTheDocument();
    expect(screen.getByText(/No todos yet/i)).toBeInTheDocument();
  });

  test('renders todos when list has items', () => {
    const todos = [
      {
        id: 1,
        title: 'First Todo',
        description: 'First Description',
        completed: false,
        createdAt: '2024-01-01T10:00:00'
      },
      {
        id: 2,
        title: 'Second Todo',
        description: 'Second Description',
        completed: true,
        createdAt: '2024-01-02T10:00:00'
      }
    ];

    render(<TodoList todos={todos} />);

    expect(screen.getByText('First Todo')).toBeInTheDocument();
    expect(screen.getByText('First Description')).toBeInTheDocument();
    expect(screen.getByText('Second Todo')).toBeInTheDocument();
    expect(screen.getByText('Second Description')).toBeInTheDocument();
  });

  test('displays correct number of todos in header', () => {
    const todos = [
      { id: 1, title: 'Todo 1', completed: false, createdAt: '2024-01-01T10:00:00' },
      { id: 2, title: 'Todo 2', completed: false, createdAt: '2024-01-02T10:00:00' },
      { id: 3, title: 'Todo 3', completed: false, createdAt: '2024-01-03T10:00:00' }
    ];

    render(<TodoList todos={todos} />);

    expect(screen.getByText('My Todos (3)')).toBeInTheDocument();
  });

  test('displays completed status badge correctly', () => {
    const todos = [
      { id: 1, title: 'Completed Todo', completed: true, createdAt: '2024-01-01T10:00:00' },
      { id: 2, title: 'Pending Todo', completed: false, createdAt: '2024-01-02T10:00:00' }
    ];

    render(<TodoList todos={todos} />);

    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  test('renders todo without description', () => {
    const todos = [
      { id: 1, title: 'Todo without description', completed: false, createdAt: '2024-01-01T10:00:00' }
    ];

    render(<TodoList todos={todos} />);

    expect(screen.getByText('Todo without description')).toBeInTheDocument();
    // Description should not be rendered
    expect(screen.queryByClassName('todo-description')).not.toBeInTheDocument();
  });

  test('renders correct number of todo items', () => {
    const todos = [
      { id: 1, title: 'Todo 1', completed: false, createdAt: '2024-01-01T10:00:00' },
      { id: 2, title: 'Todo 2', completed: false, createdAt: '2024-01-02T10:00:00' }
    ];

    render(<TodoList todos={todos} />);

    const todoItems = screen.getAllByTestId('todo-item');
    expect(todoItems).toHaveLength(2);
  });
});
