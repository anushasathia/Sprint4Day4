package com.example.order_service.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Order {
    @Id
    @GeneratedValue
    private Long id;
    private String item;

    public Order() {}

    public Order(String item) {
        this.item = item;
    }

    public Long getId() { return id; }
    public String getItem() { return item; }
}
