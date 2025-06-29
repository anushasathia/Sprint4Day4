import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      state.totalItems++;
      state.totalAmount += product.price;
    },
    removeItem: (state, action) => {
      const idToRemove = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === idToRemove);

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        state.totalItems -= existingItem.quantity;
        state.totalAmount -= (existingItem.price * existingItem.quantity);

        state.items.splice(existingItemIndex, 1);
      }
    },
    decreaseQuantity: (state, action) => {
      const idToDecrease = action.payload;
      const existingItem = state.items.find(item => item.id === idToDecrease);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
          state.totalItems--;
          state.totalAmount -= existingItem.price;
        } else {
          const existingItemIndex = state.items.findIndex(item => item.id === idToDecrease);
          state.totalItems--;
          state.totalAmount -= existingItem.price;
          state.items.splice(existingItemIndex, 1);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addItem, removeItem, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
