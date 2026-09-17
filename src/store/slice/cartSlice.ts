import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProdutoCarrinho } from "@/types/products";

interface CartState {
  items: ProdutoCarrinho[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ProdutoCarrinho>) {
      const item = action.payload;
      const existing = state.items.find((p) => p.id === item.id);

      if (existing) {
        existing.quantidade += 1;
      } else {
        state.items.push({ ...item, quantidade: 1 });
      }
    },

    removeFromCart(state, action: PayloadAction<number>) {
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
