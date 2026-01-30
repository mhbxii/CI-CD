import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://backend:8080/api';

const todoAPI = {
  // GET all todos
  getAllTodos: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/todos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  // POST create a new todo
  createTodo: async (todo) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, todo);
      return response.data;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  }
};

export default todoAPI;
