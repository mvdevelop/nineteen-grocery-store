
import React, { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import PromosJSON from "../../data/Promocao.json";

import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slice/cartSlice";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Promocao() {
  const [produtos] = useState(PromosJSON);
  const dispatch = useDispatch();

  const handleAddToCart = (produto) => {
    dispatch(
      addToCart({
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        img: produto.img,
      })
    );

    toast.success(`${produto.nome} adicionado ao carrinho! 🛒`, {
      position: "top-right",
    });
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4 fw-bold">Promoções da Semana</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={3}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3500,     
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1200: { slidesPerView: 5 },
        }}
      >
        {produtos.map((produto) => (
          <SwiperSlide key={produto.id}>
            <Card className="shadow-sm p-2 text-center h-100 d-flex flex-column">

              <Card.Img
                variant="top"
                src={produto.img}
                alt={produto.nome}
                style={{ height: "180px", objectFit: "contain" }}
              />

              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold">
                  {produto.nome}
                </Card.Title>

                <Card.Text className="text-muted">{produto.tag}</Card.Text>

                <div className="mt-2">
                  <span className="text-danger text-decoration-line-through me-2">
                    R$ {produto["preco-antigo"].toFixed(2)}
                  </span>

                  <span className="fw-bold text-success fs-5">
                    R$ {produto.preco.toFixed(2)}
                  </span>
                </div>

                <Button
                  variant="success"
                  className="mt-auto w-100 fw-bold"
                  onClick={() => handleAddToCart(produto)}
                >
                  Adicionar ao Carrinho
                </Button>
              </Card.Body>

            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
