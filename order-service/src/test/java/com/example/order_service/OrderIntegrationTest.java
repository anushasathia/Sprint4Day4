package com.example.order_service;

import com.example.order_service.client.PaymentGatewayClient;
import com.example.order_service.model.Order;
import com.example.order_service.repository.OrderRepository;
import com.example.order_service.service.OrderService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class OrderIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @MockBean
    private PaymentGatewayClient paymentGatewayClient;

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    @Test
    void placeOrder_RealContext_MockedPaymentGateway() {
        String item = "Laptop";

        var response = restTemplate.postForEntity("/orders", item, String.class);

        assertThat(response.getStatusCode().value()).isEqualTo(200);
        verify(paymentGatewayClient, times(1)).processPayment(item);

        assertThat(orderRepository.findAll()).hasSize(1);
        assertThat(orderRepository.findAll().get(0).getItem()).isEqualTo(item);

        assertThat(orderService).isNotNull();
    }
}
