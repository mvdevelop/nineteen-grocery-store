import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginSignup from "./LoginSignup";

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
    expect(screen.queryAllByText("Bem-vindo de volta!")[0]).toBeTruthy();
  });

  it("deve alternar para cadastro ao clicar", () => {
    render(
      <BrowserRouter>
        <LoginSignup />
      </BrowserRouter>
    );

    // Encontra o link de alternância (botão ou link)
    const toggleByText = screen.queryAllByText("Cadastre-se gratificamente");
    const toggleByRole = screen.queryAllByRole("button", { name: /Cadastre/i });

    const toggleElement = toggleByText[0] ?? toggleByRole[0];

    expect(toggleElement).toBeTruthy();
    if (toggleElement) {
      fireEvent.click(toggleElement);
    }

    // Estado: cadastro - deve mostrar "Criar minha conta"
    expect(screen.queryAllByText("Criar minha conta").length).toBeGreaterThan(0);
  });

  it("deve renderizar botões de login social", () => {
    render(
      <BrowserRouter>
        <LoginSignup />
      </BrowserRouter>
    );

    expect(screen.queryAllByText("Google")[0]).toBeTruthy();
    expect(screen.queryAllByText("Facebook")[0]).toBeTruthy();
  });
});
