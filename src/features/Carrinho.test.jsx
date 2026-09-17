import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter, Link } from "react-router-dom";
import Carrinho from "./Carrinho";
import cartReducer from "../store/slice/cartSlice";

// Mock do toast
vi.mock("react-toastify", () => ({
  toast: { success: vi.fn() },
}));

// Store de teste
const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      user: (state = null) => state,
    },
    preloadedState,
  });
};

describe("Carrinho", () => {
  it("deve exibir mensagem de carrinho vazio", () => {
    const store = createTestStore({ cart: { items: [] } });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Carrinho />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Seu carrinho está vazio/i)).toBeTruthy();
  });

  it("deve renderizar itens do carrinho", () => {
    const mockItems = [
      {
        id: 1,
        nome: "Arroz",
        preco: 22.9,
        img: "/arroz.jpg",
        quantidade: 2,
        categoria: "alimento",
      },
    ];

    const store = createTestStore({ cart: { items: mockItems } });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Carrinho />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("Arroz")).toBeTruthy();
    // Subtotal = 22.90 * 2 = 45.80
    expect(screen.getAllByText("R$ 45.80").length).toBeGreaterThanOrEqual(1);
  });

  it("deve aplicar cupom PROMO10 com 10% de desconto", () => {
    const mockItems = [
      {
        id: 1,
        nome: "Produto Caro",
        preco: 100,
        img: "/prod.jpg",
        quantidade: 1,
        categoria: "alimento",
      },
    ];

    const store = createTestStore({ cart: { items: mockItems } });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Carrinho />
        </BrowserRouter>
      </Provider>,
    );

    fireEvent.change(screen.getAllByPlaceholderText(/Digite o cupom/i)[0], {
      target: { value: "PROMO10" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Aplicar/i }));

    expect(screen.getByText(/Desconto \(10%\)/i)).toBeTruthy();
  });

  it("deve mostrar frete grátis acima de R$ 150", () => {
    const mockItems = [
      {
        id: 1,
        nome: "Produto Caro",
        preco: 200,
        img: "/prod.jpg",
        quantidade: 1,
        categoria: "alimento",
      },
    ];

    const store = createTestStore({ cart: { items: mockItems } });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Carrinho />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getAllByText("Grátis").length).toBeGreaterThan(0);
  });
});
