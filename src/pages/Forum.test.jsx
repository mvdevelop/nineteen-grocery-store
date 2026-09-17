import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Forum from "./Forum";

// Mock do Swiper
vi.mock("swiper/react", () => ({
  Swiper: ({ children }) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }) => <div data-testid="slide">{children}</div>,
}));

vi.mock("swiper/modules", () => ({
  Navigation: {},
  Pagination: {},
  Autoplay: {},
}));

// Mock do DOMPurify
vi.mock("dompurify", () => ({
  default: {
    sanitize: (text) => {
      // Simula sanitização: remove tags HTML
      return text.replace(/<[^>]*>/g, "");
    },
  },
}));

describe("Forum", () => {
  it("deve renderizar o título principal", () => {
    render(<Forum />);
    const titulo = screen.getByText(/O que nossos clientes dizem/i);
    expect(titulo).toBeTruthy();
  });

  it("deve exibir comentários iniciais", () => {
    render(<Forum />);
    const slides = screen.getAllByTestId("slide");
    expect(slides.length).toBeGreaterThan(0);
  });

  it("não deve enviar comentário vazio (botão desabilitado)", () => {
    render(<Forum />);
    const botoes = screen.getAllByRole("button", {
      name: /Publicar Comentário/i,
    });
    const botao = botoes[0];
    // O botão deve estar disabled quando não há texto
    expect(botao.hasAttribute("disabled")).toBe(true);
  });

  it("deve atualizar o campo de mensagem ao digitar", () => {
    render(<Forum />);
    const textareas = screen.getAllByPlaceholderText(/Compartilhe/i);
    const textarea = textareas[0];

    fireEvent.change(textarea, { target: { value: "Excelente!" } });
    expect(textarea.value).toBe("Excelente!");
  });
});
