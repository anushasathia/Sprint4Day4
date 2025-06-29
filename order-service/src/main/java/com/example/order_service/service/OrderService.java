package com.example.order_service.service;

import com.example.order_service.client.PaymentGatewayClient;
import com.example.order_service.model.Order;
import com.example.order_service.repository.OrderRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final PaymentGatewayClient paymentGatewayClient;

    public OrderService(OrderRepository orderRepository, PaymentGatewayClient paymentGatewayClient) {
        this.orderRepository = orderRepository;
        this.paymentGatewayClient = paymentGatewayClient;
    }

    public Order createOrder(String item) {
        paymentGatewayClient.processPayment(item);
        return orderRepository.save(new Order(item));
    }
}
