
import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Forum() {
  const [mensagem, setMensagem] = useState("");
  const [comentarios, setComentarios] = useState([
    {
      id: 1,
      usuario: "Maria Silva",
      avatar: "https://i.pravatar.cc/150?img=1",
      texto: "Excelente serviço! Recomendo muito.",
    },
    {
      id: 2,
      usuario: "João Pereira",
      avatar: "https://i.pravatar.cc/150?img=2",
      texto: "Os produtos chegaram muito rápido!",
    },
    {
      id: 3,
      usuario: "Ana Costa",
      avatar: "https://i.pravatar.cc/150?img=3",
      texto: "Ótimos preços e atendimento impecável.",
    },
    {
      id: 4,
      usuario: "Carlos Almeida",
      avatar: "https://i.pravatar.cc/150?img=4",
      texto: "Atendimento rápido e muito educado!",
    },
    {
      id: 5,
      usuario: "Fernanda Rocha",
      avatar: "https://i.pravatar.cc/150?img=5",
      texto: "A qualidade dos produtos me surpreendeu.",
    },
    {
      id: 6,
      usuario: "Pedro Santos",
      avatar: "https://i.pravatar.cc/150?img=6",
      texto: "Voltarei a comprar com certeza!",
    },
  ]);

  function enviarComentario() {
    if (mensagem.trim() === "") return;

    const novo = {
      id: Date.now(),
      usuario: "Usuário Anônimo",
      avatar: "https://i.pravatar.cc/150?u=anon",
      texto: mensagem,
    };

    setComentarios([novo, ...comentarios]);
    setMensagem("");
  }

  return (
    <Container className="py-4" style={{ maxWidth: "700px" }}>
      <h2 className="text-center mb-4 fw-bold">Comentários</h2>

      {/* Área de envio de mensagem */}
      <Card className="p-3 shadow-sm mb-4">
        <Form>
          <Form.Group>
            <Form.Label>Deixe sua mensagem</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Digite aqui..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            />
          </Form.Group>

          <Button
            className="mt-3 w-100"
            variant="primary"
            onClick={enviarComentario}
          >
            Enviar
          </Button>
        </Form>
      </Card>

      {/* Swiper de comentários (agora com TODOS os 6) */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        style={{ paddingBottom: "40px" }}
      >
        {comentarios.map((c) => (
          <SwiperSlide key={c.id}>
            <Card className="shadow-sm p-3 text-center">
              <img
                src={c.avatar}
                alt="avatar"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
              <h5 className="fw-bold">{c.usuario}</h5>
              <p className="text-muted">{c.texto}</p>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
