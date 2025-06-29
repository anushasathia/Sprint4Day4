package com.example.order_service.client;

import org.springframework.stereotype.Component;

@Component
public class PaymentGatewayClient {

    public void processPayment(String item) {
        // Imagine calling external API
        System.out.println("Processing payment for: " + item);
    }
}
