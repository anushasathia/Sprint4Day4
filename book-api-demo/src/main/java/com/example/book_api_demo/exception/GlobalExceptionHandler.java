package com.example.book_api_demo.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BookNotFoundException.class)
    public ResponseEntity<?> handleBookNotFound(BookNotFoundException ex) {
        return ResponseEntity.status(404)
                .body(Map.of("error", ex.getMessage()));
    }
}
