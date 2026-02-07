import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import todoAPI from './services/todoAPI';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await todoAPI.getAllTodos();
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos. Please check if the backend is running.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTodoCreated = async (todoData) => {
    try {
      const newTodo = await todoAPI.createTodo(todoData);
      setTodos([...todos, newTodo]);
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📝 Todo App - Release 1.1</h1>
        <p>Create and Read functionality</p>
      </header>

      <main className="app-main">
        {error && <div className="error-banner">{error}</div>}
        
        <TodoForm onTodoCreated={handleTodoCreated} />
        
        {loading ? (
          <div className="loading" data-testid="loading">Loading todos...</div>
        ) : (
          <TodoList todos={todos} />
        )}
      </main>

      <footer className="app-footer">
        <p>Version 1.0.0 - CREATE & READ</p>
      </footer>
    </div>
  );
}

export default App;
