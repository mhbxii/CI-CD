package com.todo.service;

import com.todo.model.Todo;
import com.todo.repository.TodoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TodoServiceTest {
    
    @Mock
    private TodoRepository todoRepository;
    
    @InjectMocks
    private TodoService todoService;
    
    private Todo testTodo;
    
    @BeforeEach
    void setUp() {
        testTodo = new Todo("Test Todo", "Test Description");
        testTodo.setId(1L);
    }
    
    @Test
    void testCreateTodo_Success() {
        // Arrange
        when(todoRepository.save(any(Todo.class))).thenReturn(testTodo);
        
        // Act
        Todo created = todoService.createTodo(testTodo);
        
        // Assert
        assertNotNull(created);
        assertEquals("Test Todo", created.getTitle());
        assertEquals("Test Description", created.getDescription());
        verify(todoRepository, times(1)).save(any(Todo.class));
    }
    
    @Test
    void testCreateTodo_EmptyTitle_ThrowsException() {
        // Arrange
        Todo emptyTodo = new Todo("", "Description");
        
        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            todoService.createTodo(emptyTodo);
        });
        verify(todoRepository, never()).save(any(Todo.class));
    }
    
    @Test
    void testCreateTodo_NullTitle_ThrowsException() {
        // Arrange
        Todo nullTodo = new Todo(null, "Description");
        
        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            todoService.createTodo(nullTodo);
        });
        verify(todoRepository, never()).save(any(Todo.class));
    }
    
    @Test
    void testGetAllTodos_Success() {
        // Arrange
        Todo todo2 = new Todo("Second Todo", "Second Description");
        todo2.setId(2L);
        List<Todo> expectedTodos = Arrays.asList(testTodo, todo2);
        when(todoRepository.findAll()).thenReturn(expectedTodos);
        
        // Act
        List<Todo> actualTodos = todoService.getAllTodos();
        
        // Assert
        assertNotNull(actualTodos);
        assertEquals(2, actualTodos.size());
        assertEquals("Test Todo", actualTodos.get(0).getTitle());
        assertEquals("Second Todo", actualTodos.get(1).getTitle());
        verify(todoRepository, times(1)).findAll();
    }
    
    @Test
    void testGetAllTodos_EmptyList() {
        // Arrange
        when(todoRepository.findAll()).thenReturn(Arrays.asList());
        
        // Act
        List<Todo> actualTodos = todoService.getAllTodos();
        
        // Assert
        assertNotNull(actualTodos);
        assertEquals(0, actualTodos.size());
        verify(todoRepository, times(1)).findAll();
    }
}
