
import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./pages.css";

import banner1 from "../assets/banners/banner1.jpg";
import banner2 from "../assets/banners/banner2.jpg";
import banner3 from "../assets/banners/banner3.jpg";
import banner4 from "../assets/banners/banner4.jpg";
import banner5 from "../assets/banners/banner5.jpg";

import Promocao from "./produtos/Promocao";
import Produtos from "./Produtos";

import Forum from "./Forum";

export default function Home() {
  return (
    <>
      {/* Banner */}
      <section className="banner-container">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop={true}
          className="banner-swiper"
        >
          <SwiperSlide>
            <img src={banner1} alt="Banner 1" className="banner-img" />
          </SwiperSlide>

          <SwiperSlide>
            <img src={banner2} alt="Banner 2" className="banner-img" />
          </SwiperSlide>

          <SwiperSlide>
            <img src={banner3} alt="Banner 3" className="banner-img" />
          </SwiperSlide>

          <SwiperSlide>
            <img src={banner4} alt="Banner 4" className="banner-img" />
          </SwiperSlide>

          <SwiperSlide>
            <img src={banner5} alt="Banner 5" className="banner-img" />
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="">
        <Promocao />
        <Produtos />
      </section>

      <Forum />

      {/* Sobre */}
      <section className="py-5" id="sobre">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <h2 className="text-success mb-3">Sobre Nós</h2>

              <p>
                A <strong>19 Market</strong> nasceu com o propósito de
                oferecer produtos de qualidade, preços acessíveis e um
                atendimento que realmente faz diferença no seu dia a dia.
                Acreditamos que ir às compras deve ser algo simples, rápido e
                agradável.
              </p>

              <p>
                Trabalhamos com uma seleção cuidadosa de alimentos, produtos
                frescos, itens de higiene e utilidades domésticas, garantindo
                sempre o melhor para você e sua família.
              </p>

              <p>
                Nosso compromisso é proporcionar uma experiência prática,
                confiável e moderna — combinando variedade, comodidade e um
                ambiente acolhedor.
              </p>
            </Col>

            {/* Imagem opcional */}
            {/* 
          <Col md={6} className="d-flex justify-content-center">
            <img
              src="/assets/sobre/store.jpg"
              alt="Nossa loja"
              className="img-fluid rounded shadow"
            />
          </Col>
          */}
          </Row>
        </Container>
      </section>

      {/* Contato */}
      <section className="py-5" id="contato">
        <Container>
          <h2 className="text-success text-center mb-4">Contato</h2>

          <Row className="g-4">
            {/* Formulário */}
            <Col md={6}>
              <h5 className="fw-semibold mb-3">Envie uma mensagem</h5>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" placeholder="Seu nome" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Seu email" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mensagem</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Escreva sua mensagem..."
                  />
                </Form.Group>

                <Button variant="success" className="px-4">
                  Enviar
                </Button>
              </Form>
            </Col>

            {/* Informações de contato */}
            <Col md={6}>
              <h5 className="fw-semibold mb-3">Informações</h5>

              <p className="d-flex align-items-center gap-2">
                <FaWhatsapp className="text-success" size={20} />
                <span>(11) 99999-9999</span>
              </p>

              <p className="d-flex align-items-center gap-2">
                <FaEnvelope className="text-success" size={20} />
                <span>contato@19market.com</span>
              </p>

              <p className="d-flex align-items-center gap-2">
                <FaMapMarkerAlt className="text-success" size={20} />
                <span>Rua das Palmeiras, 123 — RJ, RJ</span>
              </p>

              <div className="mt-4">
                <h6 className="fw-semibold">Horários</h6>
                <p className="mb-1">Seg a Sex: 08h às 18h</p>
                <p className="mb-0">Sábados: 09h às 13h</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
