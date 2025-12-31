package com.example.foodreview.controllers;

import com.example.foodreview.dto.AuthResponse;
import com.example.foodreview.dto.LoginRequest;
import com.example.foodreview.dto.RegisterRequest;
import com.example.foodreview.entities.*;
import com.example.foodreview.security.AppUserDetails;
import com.example.foodreview.security.AuthenticationService;
import com.example.foodreview.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;
    private final UserService userService;

    @Value("${jwt.expirationMs}")
    private long expiresInMs;
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        UserDetails userDetails = authenticationService.authenticate(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );
        return createAuthResponse(userDetails);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        User user = User.builder()
                .username(registerRequest.getUsername())
                .email(registerRequest.getEmail())
                .password(registerRequest.getPassword())
                .role(Role.USER)
                .build();

        User registeredUser = userService.registerUser(user);
        AppUserDetails userDetails = new AppUserDetails(registeredUser);

        return createAuthResponse(userDetails);
    }

    private ResponseEntity<AuthResponse> createAuthResponse(UserDetails userDetails) {
        if (!(userDetails instanceof AppUserDetails appUserDetails)) {
            throw new IllegalStateException("Unexpected UserDetails type");
        }

        String token = authenticationService.generateToken(userDetails);

        AuthResponse authResponse = AuthResponse.builder()
                .token(token)
                .expiresIn(expiresInMs / 1000)
                .username(appUserDetails.getDisplayName())
                .role(appUserDetails.getRoleName())
                .build();

        return ResponseEntity.ok(authResponse);
    }
}
