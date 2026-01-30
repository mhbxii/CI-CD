import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoForm from './TodoForm';

describe('TodoForm Component', () => {
  test('renders the form with title and description inputs', () => {
    render(<TodoForm onTodoCreated={jest.fn()} />);
    
    expect(screen.getByTestId('todo-title-input')).toBeInTheDocument();
    expect(screen.getByTestId('todo-description-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-todo-button')).toBeInTheDocument();
  });

  test('shows error when submitting empty title', async () => {
    render(<TodoForm onTodoCreated={jest.fn()} />);
    
    const submitButton = screen.getByTestId('add-todo-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeInTheDocument();
    });
  });

  test('calls onTodoCreated with correct data when form is submitted', async () => {
    const mockOnTodoCreated = jest.fn().mockResolvedValue({});
    render(<TodoForm onTodoCreated={mockOnTodoCreated} />);

    const titleInput = screen.getByTestId('todo-title-input');
    const descriptionInput = screen.getByTestId('todo-description-input');
    const submitButton = screen.getByTestId('add-todo-button');

    fireEvent.change(titleInput, { target: { value: 'Test Todo' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnTodoCreated).toHaveBeenCalledWith({
        title: 'Test Todo',
        description: 'Test Description'
      });
    });
  });

  test('clears form after successful submission', async () => {
    const mockOnTodoCreated = jest.fn().mockResolvedValue({});
    render(<TodoForm onTodoCreated={mockOnTodoCreated} />);

    const titleInput = screen.getByTestId('todo-title-input');
    const descriptionInput = screen.getByTestId('todo-description-input');
    const submitButton = screen.getByTestId('add-todo-button');

    fireEvent.change(titleInput, { target: { value: 'Test Todo' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(titleInput.value).toBe('');
      expect(descriptionInput.value).toBe('');
    });
  });

  test('shows error message when creation fails', async () => {
    const mockOnTodoCreated = jest.fn().mockRejectedValue(new Error('API Error'));
    render(<TodoForm onTodoCreated={mockOnTodoCreated} />);

    const titleInput = screen.getByTestId('todo-title-input');
    const submitButton = screen.getByTestId('add-todo-button');

    fireEvent.change(titleInput, { target: { value: 'Test Todo' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to create todo. Please try again.')).toBeInTheDocument();
    });
  });
});
