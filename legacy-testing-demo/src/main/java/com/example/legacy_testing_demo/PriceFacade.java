package com.example.legacy_testing_demo;

public class PriceFacade {

    private final PriceCalculator priceCalculator = new PriceCalculator();

    public double getPrice(double basePrice) {
        try {
            return priceCalculator.getPriceWithTax(basePrice);
        } catch (ArithmeticException e) {
            System.out.println("Exception caught, returning default price");
            return basePrice;
        }
    }
}

