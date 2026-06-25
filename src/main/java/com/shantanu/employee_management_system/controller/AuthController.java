package com.shantanu.employee_management_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shantanu.employee_management_system.dto.LoginRequest;
import com.shantanu.employee_management_system.dto.LoginResponse;
import com.shantanu.employee_management_system.entity.User;
import com.shantanu.employee_management_system.security.JwtUtil;
import com.shantanu.employee_management_system.service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // Register User
    @PostMapping("/register")
    public User register(@RequestBody User user) {

        return userService.register(user);

    }

    // Login User
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        boolean authenticated =
                userService.authenticate(
                        request.getUsername(),
                        request.getPassword()
                );

        if (authenticated) {

            String token =
                    jwtUtil.generateToken(
                            request.getUsername()
                    );

            return new LoginResponse(token);

        }

        throw new RuntimeException(
                "Invalid Username or Password"
        );

    }

}