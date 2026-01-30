package com.todo.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.todo.model.Todo;
import com.todo.service.TodoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TodoController.class)
class TodoControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private TodoService todoService;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    private Todo testTodo;
    
    @BeforeEach
    void setUp() {
        testTodo = new Todo("Test Todo", "Test Description");
        testTodo.setId(1L);
    }
    
    @Test
    void testCreateTodo_Success() throws Exception {
        // Arrange
        when(todoService.createTodo(any(Todo.class))).thenReturn(testTodo);
        
        // Act & Assert
        mockMvc.perform(post("/api/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testTodo)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Test Todo"))
                .andExpect(jsonPath("$.description").value("Test Description"));
    }
    
    @Test
    void testCreateTodo_InvalidData_ReturnsBadRequest() throws Exception {
        // Arrange
        Todo invalidTodo = new Todo("", "Description");
        when(todoService.createTodo(any(Todo.class)))
                .thenThrow(new IllegalArgumentException("Title cannot be empty"));
        
        // Act & Assert
        mockMvc.perform(post("/api/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidTodo)))
                .andExpect(status().isBadRequest());
    }
    
    @Test
    void testGetAllTodos_Success() throws Exception {
        // Arrange
        Todo todo2 = new Todo("Second Todo", "Second Description");
        todo2.setId(2L);
        List<Todo> todos = Arrays.asList(testTodo, todo2);
        when(todoService.getAllTodos()).thenReturn(todos);
        
        // Act & Assert
        mockMvc.perform(get("/api/todos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].title").value("Test Todo"))
                .andExpect(jsonPath("$[1].title").value("Second Todo"));
    }
    
    @Test
    void testGetAllTodos_EmptyList() throws Exception {
        // Arrange
        when(todoService.getAllTodos()).thenReturn(Arrays.asList());
        
        // Act & Assert
        mockMvc.perform(get("/api/todos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(0));
    }
}
