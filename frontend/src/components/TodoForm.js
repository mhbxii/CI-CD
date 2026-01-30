import React, { useState } from 'react';

function TodoForm({ onTodoCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      await onTodoCreated({ title, description });
      setTitle('');
      setDescription('');
    } catch (err) {
      setError('Failed to create todo. Please try again.');
    }
  };

  return (
    <div className="todo-form">
      <h2>Add New Todo</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Todo title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            data-testid="todo-title-input"
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input"
            rows="3"
            data-testid="todo-description-input"
          />
        </div>
        <button type="submit" className="btn-primary" data-testid="add-todo-button">
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
