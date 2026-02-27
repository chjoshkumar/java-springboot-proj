package com.example.todo.service;

import com.example.todo.dto.TaskRequestDTO;
import com.example.todo.dto.TaskResponseDTO;

import java.util.List;

public interface TaskService {

    TaskResponseDTO createTask(TaskRequestDTO request);

    List<TaskResponseDTO> getAllTasks();

    TaskResponseDTO getTaskById(Long id);

    TaskResponseDTO updateTask(Long id, TaskRequestDTO request);

    void deleteTask(Long id);

    TaskResponseDTO completeTask(Long id);
}
