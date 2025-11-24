
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find((p) => p.id === item.id);

      if (existing) {
        existing.quantidade += 1;
      } else {
        state.items.push({ ...item, quantidade: 1 });
      }
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const existing = state.items.find((p) => p.id === id);

      if (!existing) return;

      if (existing.quantidade > 1) {
        existing.quantidade -= 1;
      } else {
        state.items = state.items.filter((p) => p.id !== id);
      }
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
