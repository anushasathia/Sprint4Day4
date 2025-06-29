import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

const products = [
  { id: 'p1', name: 'Laptop Pro', price: 1200 },
  { id: 'p2', name: 'Mechanical Keyboard', price: 150 },
  { id: 'p3', name: 'Gaming Mouse', price: 75 },
  { id: 'p4', name: 'Webcam HD', price: 60 },
  { id: 'p5', name: 'External SSD', price: 100 },
];

const ProductList = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  const listContainerStyle = {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  };

  const productItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 0',
    borderBottom: '1px solid #eee',
  };

  const lastProductItemStyle = {
    ...productItemStyle,
    borderBottom: 'none',
  };

  const productNamePriceStyle = {
    flexGrow: 1,
    fontSize: '1.1rem',
    color: '#333',
  };

  const addToCartButtonStyle = {
    padding: '8px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease-in-out',
  };

  return (
    <div style={listContainerStyle}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#333' }}>Available Products</h2>
      <div>
        {products.map((product, index) => (
          <div
            key={product.id}
            style={index === products.length - 1 ? lastProductItemStyle : productItemStyle}
          >
            <span style={productNamePriceStyle}>
              {product.name} - ${product.price.toFixed(2)}
            </span>
            <button
              onClick={() => handleAddToCart(product)}
              style={addToCartButtonStyle}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
