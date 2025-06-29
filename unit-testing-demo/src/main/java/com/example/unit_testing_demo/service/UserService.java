package com.example.unit_testing_demo.service;

import com.example.unit_testing_demo.model.User;
import com.example.unit_testing_demo.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final EmailSender emailSender;

    public UserService(UserRepository userRepository, EmailSender emailSender) {
        this.userRepository = userRepository;
        this.emailSender = emailSender;
    }

    public void processUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        emailSender.send(user, "Welcome " + user.getName());
    }

    public void handleMissingUser(Long id) {
        System.out.println("Fallback: Handle missing user with id " + id);
    }
}
