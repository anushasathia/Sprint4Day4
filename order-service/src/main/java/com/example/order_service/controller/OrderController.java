package com.example.order_service.controller;

import com.example.order_service.service.OrderService;
import com.example.order_service.model.Order;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public Order placeOrder(@RequestBody String item) {
        return orderService.createOrder(item);
    }
}
