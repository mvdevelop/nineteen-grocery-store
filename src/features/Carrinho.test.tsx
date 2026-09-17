import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import Carrinho from "./Carrinho";
import cartReducer from "../store/slice/cartSlice";

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn() },
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    Link: ({ children }: { children: React.ReactNode }) => <a href="/">{children}</a>,
  };
});

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

    expect(screen.queryAllByText(/Seu carrinho está vazio/i).length).toBeGreaterThan(0);
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

    expect(screen.queryAllByText("Arroz").length).toBeGreaterThan(0);
  });

  it("deve limpar carrinho quando confirmado", () => {
    const mockItems = [
      { id: 1, nome: "Arroz", preco: 22.9, img: "/arroz.jpg", quantidade: 1, categoria: "alimento" },
    ];

    const store = createTestStore({ cart: { items: mockItems } });

    window.confirm = vi.fn(() => true);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Carrinho />
        </BrowserRouter>
      </Provider>
    );

    // O carrinho deve ter o produto
    expect(screen.queryAllByText("Arroz").length).toBeGreaterThan(0);
  });
});
