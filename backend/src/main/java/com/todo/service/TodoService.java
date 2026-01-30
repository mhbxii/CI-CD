package com.todo.service;

import com.todo.model.Todo;
import com.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    
    private final TodoRepository todoRepository;
    
    @Autowired
    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }
    
    /**
     * Create a new todo
     * @param todo The todo to create
     * @return The created todo with generated ID
     */
    public Todo createTodo(Todo todo) {
        if (todo.getTitle() == null || todo.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Todo title cannot be empty");
        }
        return todoRepository.save(todo);
    }
    
    /**
     * Get all todos
     * @return List of all todos
     */
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }
}
