package com.example.unit_testing_demo.service;

import com.example.unit_testing_demo.model.User;

public interface EmailSender {
    void send(User user, String subject);
}

