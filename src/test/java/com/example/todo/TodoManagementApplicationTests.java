package com.example.todo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class TodoManagementApplicationTests {

    @Test
    void contextLoads() {
        // Verifies that the Spring application context starts without errors
    }
}
