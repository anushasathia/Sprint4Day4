import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { clearCart } from './features/cart/cartSlice';
import { logout } from './features/user/userSlice';


function within(element) {
  return {
    getByRole: (role, options) => screen.getByRole(role, { ...options, container: element }),
    getByText: (text, options) => screen.getByText(text, { ...options, container: element }),
    queryByText: (text, options) => screen.queryByText(text, { ...options, container: element }),
    findByText: (text, options) => screen.findByText(text, { ...options, container: element }),
    queryByRole: (role, options) => screen.queryByRole(role, { ...options, container: element }),
  };
}


beforeEach(() => {
  store.dispatch(clearCart());
  store.dispatch(logout());
});


describe('E-commerce Application', () => {

  test('renders login button and empty cart on initial load', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument();
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByText(/your cart \(0\)/i)).toBeInTheDocument();
    expect(screen.getByText(/total amount: \$0\.00/i)).toBeInTheDocument();
  });


  test('allows user to log in and displays welcome message', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/welcome, testuser!/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /login/i })).not.toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith("User logged in:", "TestUser");

    consoleSpy.mockRestore();
  });


  test('allows user to log out and returns to login state', async () => {
    const consoleSpy = jest.spyOn(console, 'log');

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/welcome, testuser!/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /logout/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
      expect(screen.queryByText(/welc