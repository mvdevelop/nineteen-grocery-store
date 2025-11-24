
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // cada item = { id, nome, preco, quantidade, img }
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
      state.items = state.items.filter((p) => p.id !== action.payload);
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
