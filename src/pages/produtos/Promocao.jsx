
import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import PromosJSON from "../../data/Promocao.json";

export default function Promocao() {

  const [produtos] = useState(PromosJSON);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4 fw-bold">Promoções da Semana</h2>

      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={3}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
      >
        {produtos.map((produto) => (
          <SwiperSlide key={produto.id}>
            <Card className="shadow-sm p-2 text-center">
              <Card.Img
                variant="top"
                src={produto.img}
                alt={produto.nome}
                style={{ height: "180px", objectFit: "contain" }}
              />

              <Card.Body>
                <Card.Title className="fw-bold">{produto.nome}</Card.Title>
                <Card.Text className="text-muted">{produto.tag}</Card.Text>

                <div className="mt-2">
                  <span className="text-danger text-decoration-line-through me-2">
                    R$ {produto["preco-antigo"].toFixed(2)}
                  </span>

                  <span className="fw-bold text-success fs-5">
                    R$ {produto.preco.toFixed(2)}
                  </span>
                </div>
              </Card.Body>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
