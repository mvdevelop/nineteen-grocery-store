import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginSignup from "./LoginSignup";

// Mock do Supabase
vi.mock("../supabaseClient", () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn().mockResolvedValue({ error: null }),
      signInWithOAuth: vi.fn().mockResolvedValue({ error: null }),
      signUp: vi.fn().mockResolvedValue({ error: null }),
    },
  },
}));

describe("LoginSignup", () => {
  it("deve renderizar o formulário de login", () => {
    render(
      <BrowserRouter>
        <LoginSignup />
      </BrowserRouter>
    );
    expect(screen.getAllByText("Bem-vindo de volta!")[0]).toBeTruthy();
  });

  it("deve alternar entre login e cadastro", () => {
    render(
      <BrowserRouter>
        <LoginSignup />
      </BrowserRouter>
    );

    // Estado inicial: login
    expect(screen.getAllByText("Entrar na conta")[0]).toBeTruthy();

    // Encontra o botão que alterna para cadastro
    // Debug: verifica todos os elementos do documento
    const container = document.querySelector("body");
    const allText = container?.textContent ?? "";

    // Encontra pelo texto exato
    const toggleByText = screen.queryAllByText("Cadastre-se gratificamente");
    const toggleByRole = screen.queryAllByRole("button", { name: /Cadastre/i });

    const toggleElement = toggleByText[0] ?? toggleByRole[0];

    expect(toggleElement).toBeTruthy();
    fireEvent.click(toggleElement!);

    // Estado: cadastro
    expect(screen.queryAllByText("Criar minha conta").length).toBeGreaterThan(0);
  });

  it("deve renderizar botões de login social", () => {
    render(
      <BrowserRouter>
        <LoginSignup />
      </BrowserRouter>
    );

    expect(screen.getAllByText("Google")[0]).toBeTruthy();
    expect(screen.getAllByText("Facebook")[0]).toBeTruthy();
  });
});
