import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import Carrinho from "./Carrinho";
import cartReducer from "../store/slice/cartSlice";

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn() },
}));

const createTestStore = (preloadedState: Record<string, unknown> = {}) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      user: (state: unknown = null) => state,
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
      </Provider>
    );

    expect(screen.getAllByText(/Seu carrinho está vazio/i).length).toBeGreaterThan(0);
  });

  it("deve renderizar itens do carrinho", () => {
    const mockItems = [
      { id: 1, nome: "Arroz", preco: 22.9, img: "/arroz.jpg", quantidade: 2, categoria: "alimento" },
    ];

    const store = createTestStore({ cart: { items: mockItems } });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Carrinho />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Arroz")).toBeTruthy();
  });

  it("deve aplicar cupom PROMO10 com 10% de desconto", () => {
    const mockItems = [
      { id: 1, nome: "Produto Caro", preco: 100, img: "/prod.jpg", quantidade: 1, categoria: "alimento" },
    ];

    const store = createTestStore({ cart: { items: mockItems } });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Carrinho />
        </BrowserRouter>
      </Provider>
    );

    // Usar window.alert mock para evitar erro
    globalThis.alert = vi.fn();

    const inputs = screen.getAllByPlaceholderText(/Digite o cupom/i);
    fireEvent.change(inputs[0], { target: { value: "PROMO10" } });

    // Usar getAllByRole porque há múltiplos botões com texto "Aplicar"
    const buttons = screen.getAllByRole("button", { name: /Aplicar/i });
    fireEvent.click(buttons[0]);

    expect(screen.queryAllByText(/Desconto \(10%\)/i).length).toBeGreaterThan(0);

    // Limpa o mock
    vi.restoreAllMocks();
  });

  it("deve mostrar frete grátis acima de R$ 150", () => {
    const mockItems = [
      { id: 1, nome: "Produto Caro", preco: 200, img: "/prod.jpg", quantidade: 1, categoria: "alimento" },
    ];

    const store = createTestStore({ cart: { items: mockItems } });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Carrinho />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryAllByText("Grátis").length).toBeGreaterThan(0);
  });
});
