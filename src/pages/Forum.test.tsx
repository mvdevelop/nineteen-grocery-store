import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Forum from "./Forum";

vi.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }: { children: React.ReactNode }) => <div data-testid="slide">{children}</div>,
}));

vi.mock("swiper/modules", () => ({
  Navigation: {},
  Pagination: {},
  Autoplay: {},
}));

vi.mock("dompurify", () => ({
  default: {
    sanitize: (text: string) => text.replace(/<[^>]*>/g, ""),
  },
}));

describe("Forum", () => {
  it("deve renderizar o título principal", () => {
    render(<Forum />);
    expect(screen.queryAllByText(/O que nossos clientes dizem/i).length).toBeGreaterThan(0);
  });

  it("deve exibir comentários iniciais", () => {
    render(<Forum />);
    const slides = screen.getAllByTestId("slide");
    expect(slides.length).toBeGreaterThan(0);
  });

  it("deve atualizar o campo de mensagem ao digitar", () => {
    render(<Forum />);
    const textareas = screen.getAllByPlaceholderText(/Compartilhe/i);
    const textarea = textareas[0] as HTMLTextAreaElement;

    fireEvent.change(textarea, { target: { value: "Excelente!" } });
    expect(textarea.value).toBe("Excelente!");
  });
});
