package com.example.book_api_demo.service;

import com.example.book_api_demo.model.Book;

public interface BookService {
    Book getBookById(Long id);
}
