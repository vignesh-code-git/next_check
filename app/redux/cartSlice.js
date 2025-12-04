// redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const exist = state.items.find(item => item.id === product.id);

      if (exist) {
        state.items = state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        state.items = [...state.items, { ...product, quantity: 1 }];
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      state.items = state.items.map(item =>
        item.id === id
          ? { ...item, quantity: quantity < 1 ? 1 : quantity }
          : item
      );
    },

    // clear cart reducer
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
