package com.example.book_api_demo.exception;

public class BookNotFoundException extends RuntimeException {
    public BookNotFoundException(Long id) {
        super("Book with ID " + id + " not found");
    }
}
