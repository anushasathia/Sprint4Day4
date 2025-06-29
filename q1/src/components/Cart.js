import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, decreaseQuantity, clearCart } from '../features/cart/cartSlice';

const Cart = () => {
  const { items, totalItems, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const cartContainerStyle = {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  };

  const cartHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
  };

  const cartListStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };

  const cartItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px dotted #eee',
    fontSize: '0.95rem',
  };

  const cartTotalStyle = {
    marginTop: '20px',
    paddingTop: '15px',
    borderTop: '2px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
  };

  const itemQtyControlsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  };

  const qtyButtonStyle = {
    padding: '4px 8px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  };

  const removeButtonStyle = {
    padding: '4px 8px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  };

  const clearCartButtonStyle = {
    padding: '8px 15px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '15px',
    width: 'auto',
    alignSelf: 'flex-end',
  };

  return (
    <div style={cartContainerStyle}>
      <div style={cartHeaderStyle}>
        <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#333' }}>Your Cart ({totalItems})</h2>
        {items.length > 0 && (
          <button onClick={() => dispatch(clearCart())} style={clearCartButtonStyle}>
            Clear Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>Your cart is empty.</p>
      ) : (
        <ul style={cartListStyle}>
          {items.map(item => (
            <li key={item.id} style={cartItemStyle}>
              <span>
                {item.name} (x{item.quantity}) - ${item.price.toFixed(2)} each
              </span>
              <div style={itemQtyControlsStyle}>
                <button onClick={() => dispatch(decreaseQuantity(item.id))} style={qtyButtonStyle}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(addItem(item))} style={qtyButtonStyle}>+</button>
                <button onClick={() => dispatch(removeItem(item.id))} style={removeButtonStyle}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div style={cartTotalStyle}>
        <span>Total Amount:</span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Cart;
