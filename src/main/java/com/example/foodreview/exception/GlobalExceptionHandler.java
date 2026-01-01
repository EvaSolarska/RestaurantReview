package com.example.foodreview.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Helper method to build a standardized error response body.
     */
    private ResponseEntity<Object> buildResponse(HttpStatus status, String error, String message, Object additional) {
        Map<String, Object> body = new HashMap<>();
        body.put("status", status.value());
        body.put("error", error);
        body.put("message", message);
        if (additional != null) {
            body.putAll((Map<String, Object>) additional);
        }

        return new ResponseEntity<>(body, status);
    }

    /**
     * Overloaded helper method for simple error responses without additional data.
     */
    private ResponseEntity<Object> buildResponse(HttpStatus status, String error, String message) {
        return buildResponse(status, error, message, null);
    }

    /**
     * Handles validation errors when @Valid fails on request bodies.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> fieldErrors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                fieldErrors.put(error.getField(), error.getDefaultMessage()));

        return buildResponse(
                HttpStatus.BAD_REQUEST,
                "Validation Failed",
                "The provided input data is invalid",
                Map.of("messages", fieldErrors)
        );
    }

    /**
     * Handles the case when a user tries to register with an email that already exists.
     */
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<Object> handleUserAlreadyExists(UserAlreadyExistsException ex) {
        return buildResponse(HttpStatus.CONFLICT, "Conflict", ex.getMessage());
    }

    /**
     * Handles authentication failure when provided email/password are incorrect.
     */
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Object> handleBadCredentials() {
        return buildResponse(
                HttpStatus.UNAUTHORIZED,
                "Unauthorized",
                "Invalid email or password"
        );
    }

    /**
     * Handles authorization errors when the user does not have sufficient permissions.
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Object> handleAccessDenied(AccessDeniedException ex) {
        return buildResponse(
                HttpStatus.FORBIDDEN,
                "Forbidden",
                "You do not have sufficient permissions to perform this action."
        );
    }

    /**
     * Handles unexpected runtime exceptions.
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> handleRuntimeException(RuntimeException ex) {
        return buildResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Internal Server Error",
                "An unexpected error occurred."
        );
    }

    /**
     * Handles any unhandled exceptions.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGeneralException(Exception ex) {
        return buildResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Internal Server Error",
                "Something went wrong on the server."
        );
    }
}