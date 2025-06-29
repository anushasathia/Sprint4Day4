package com.example.legacy_testing_demo;

public class PriceCalculator {

    public double getPriceWithTax(double basePrice) {
        double tax = calculateTax(basePrice);
        return basePrice + tax;
    }

    // Make this package-private (no access modifier) to allow mocking
    double calculateTax(double price) {
        return price * 0.18;
    }
}

