import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginSignup from "./LoginSignup";

vi.mock("../supabaseClient", () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signInWithOAuth: vi.fn(),
      signUp: vi.fn(),
    },
  },
}));

describe("LoginSignup", () => {
  it("deve renderizar o formulário de login", () => {
    render(
      <BrowserRouter>
        <LoginSignup />
      </BrowserRouter>,
    );
    expect(screen.getAllByText("Bem-vindo de volta!")[0]).toBeTruthy();
  });

  it("deve alternar entre login e cadastro", () => {
    render(
      <BrowserRouter>
        <LoginSignup />
      </BrowserRouter>,
    );

    // Estado inicial: login
    expect(screen.getAllByText("Entrar na conta")[0]).toBeTruthy();

    // Clica em "Cadastre-se gratuitamente"
    fireEvent.click(screen.getAllByText(/Cadastre-se gratuitamente/i)[0]);

    // Estado: cadastro
    expect(screen.getAllByText("Criar minha conta")[0]).toBeTruthy();
  });

  it("deve mostrar erro quando senhas não coincidem no cadastro", () => {
    render(
      <BrowserRouter>
        <LoginSignup />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getAllByText(/Cadastre-se gratuitamente/i)[0]);

    const inputs = screen.getAllByPlaceholderText(/senha/i);
    fireEvent.change(inputs[0], { target: { value: "senha123" } });
    fireEvent.change(inputs[1], { target: { value: "senha456" } });

    const form = screen
      .getAllByRole("button", { name: /Criar minha conta/i })[0]
      .closest("form");
    fireEvent.submit(form);

    expect(screen.getAllByText(/As senhas não coincidem/i)[0]).toBeTruthy();
  });

  it("deve mostrar erro quando senha tem menos de 6 caracteres", () => {
    render(
      <BrowserRouter>
        <LoginSignup />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getAllByText(/Cadastre-se gratuitamente/i)[0]);

    const inputs = screen.getAllByPlaceholderText(/senha/i);
    fireEvent.change(inputs[0], { target: { value: "12345" } });
    fireEvent.change(inputs[1], { target: { value: "12345" } });

    fireEvent.click(screen.getAllByText("Criar minha conta")[0]);

    expect(screen.getAllByText(/pelo menos 6 caracteres/i)[0]).toBeTruthy();
  });

  it("deve renderizar botões de login social", () => {
    render(
      <BrowserRouter>
        <LoginSignup />
      </BrowserRouter>,
    );

    expect(screen.getAllByText("Google")[0]).toBeTruthy();
    expect(screen.getAllByText("Facebook")[0]).toBeTruthy();
  });
});
