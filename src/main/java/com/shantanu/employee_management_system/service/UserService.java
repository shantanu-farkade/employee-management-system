package com.shantanu.employee_management_system.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.shantanu.employee_management_system.entity.User;
import com.shantanu.employee_management_system.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder();

    // Register User
    public User register(User user) {

        user.setPassword(
                encoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    // Login User
    public boolean authenticate(
            String username,
            String password
    ) {

        Optional<User> optionalUser =
                userRepository.findByUsername(username);

        if (optionalUser.isPresent()) {

            User user = optionalUser.get();

            return encoder.matches(
                    password,
                    user.getPassword()
            );
        }

        return false;
    }
}