package com.example.unit_testing_demo;

import com.example.unit_testing_demo.service.EmailSender;
import com.example.unit_testing_demo.service.UserService;
import com.example.unit_testing_demo.model.User;
import com.example.unit_testing_demo.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private EmailSender emailSender;

    @InjectMocks
    private UserService userService;

    @Captor
    private ArgumentCaptor<User> userCaptor;

    @Captor
    private ArgumentCaptor<String> subjectCaptor;

    @Test
    void testProcessUser_WithStubbingAndVerification() {
        Long userId = 1L;
        User user = new User(userId, "Alice", "alice@example.com");

        // Stub: First call returns empty, second call returns user
        when(userRepository.findById(userId))
                .thenReturn(Optional.empty())
                .thenReturn(Optional.of(user));

        // First call: Expect exception
        Exception ex = assertThrows(RuntimeException.class, () -> userService.processUser(userId));
        assertEquals("User not found", ex.getMessage());

        // Fallback method invoked manually for demo
        userService.handleMissingUser(userId);

        // Second call: Should send email
        userService.processUser(userId);

        // Verify emailSender.send() called once
        verify(emailSender, times(1)).send(userCaptor.capture(), subjectCaptor.capture());

        User capturedUser = userCaptor.getValue();
        String capturedSubject = subjectCaptor.getValue();

        assertEquals("Alice", capturedUser.getName());
        assertTrue(capturedSubject.contains("Welcome Alice"));
    }
}
