import React from "react";

function TodoList({ todos, onTodoDeleted }) {
  if (todos.length === 0) {
    return (
      <div className="todo-list">
        <h2>My Todos</h2>
        <p className="no-todos" data-testid="no-todos-message">
          No todos yet. Create one above!
        </p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <h2>My Todos ({todos.length})</h2>
      <ul className="todos-container">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item" data-testid="todo-item">
            <div className="todo-content">
              <h3 className="todo-title">{todo.title}</h3>
              {todo.description && (
                <p className="todo-description">{todo.description}</p>
              )}
              <small className="todo-date">
                Created: {new Date(todo.createdAt).toLocaleString()}
              </small>
            </div>
            <div className="todo-status">
              {todo.completed ? (
                <span className="badge badge-completed">Completed</span>
              ) : (
                <span className="badge badge-pending">Pending</span>
              )}
            </div>
            <button
              className="delete-btn"
              onClick={() => onTodoDeleted(todo.id)}
            >
              🗑 Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
