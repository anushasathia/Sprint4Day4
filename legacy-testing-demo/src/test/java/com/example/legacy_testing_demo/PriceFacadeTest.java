package com.example.legacy_testing_demo;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Spy;
import org.mockito.junit.MockitoJUnitRunner;

import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class PriceFacadeTest {

    @Spy
    private PriceFacade priceFacade;

    @Test
    public void testPriceWithStubbedExceptionAndReset() throws Exception {
        double basePrice = 100.0;

        // Spy on PriceCalculator
        PriceCalculator priceCalculatorSpy = spy(new PriceCalculator());

        // Stub calculateTax to throw exception
        doThrow(new ArithmeticException("Forced error"))
                .when(priceCalculatorSpy).calculateTax(anyDouble());

        // Inject spy using reflection
        var field = PriceFacade.class.getDeclaredField("priceCalculator");
        field.setAccessible(true);
        field.set(priceFacade, priceCalculatorSpy);

        // First call: fallback returns base price
        double price = priceFacade.getPrice(basePrice);
        System.out.println("Price returned (after exception): " + price);
        assert price == basePrice;

        // Reset spy
        reset(priceCalculatorSpy);

        // Real method works now
        double realPrice = priceFacade.getPrice(basePrice);
        System.out.println("Real price returned: " + realPrice);
        assert realPrice > basePrice;
    }
}
