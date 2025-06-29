package com.example.unit_testing_demo.repository;

import com.example.unit_testing_demo.model.User;
import java.util.Optional;

public interface UserRepository {
    Optional<User> findById(Long id);
}
