package com.example.foodreview.exception;

/**
 * Exception thrown when a user attempts to register with
 * an email address that already exists.
 */
public class UserAlreadyExistsException extends RuntimeException {

    public UserAlreadyExistsException(String message) {
        super(message);
    }
}