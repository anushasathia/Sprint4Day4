package com.example.book_api_demo.controller;

import com.example.book_api_demo.exception.BookNotFoundException;
import com.example.book_api_demo.model.Book;
import com.example.book_api_demo.service.BookService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.mockmvc.RestDocumentationExtension;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = BookController.class)
@ExtendWith(RestDocumentationExtension.class)
public class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookService bookService;

    @Test
    void getBook_ValidId_Returns200AndJson() throws Exception {
        Book book = new Book(1L, "Spring Boot", "John Doe");
        when(bookService.getBookById(1L)).thenReturn(book);

        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/books/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Spring Boot"))
                .andDo(document("get-book-success"))
                .andDo(print());
    }

    @Test
    void getBook_InvalidId_Returns404AndErrorJson() throws Exception {
        when(bookService.getBookById(99L)).thenThrow(new BookNotFoundException(99L));

        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/books/{id}", 99L))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("Book with ID 99 not found"))
                .andDo(document("get-book-not-found"))
                .andDo(print());
    }
}
