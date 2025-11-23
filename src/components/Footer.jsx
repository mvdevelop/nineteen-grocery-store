
import { Container, Row, Col, Image } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import "./components.css";

export default function Footer() {
  return (
    <footer className="footer-dark py-4 mt-5">
      <Container>
        <Row className="text-center text-md-start align-items-center">
          {/* Coluna 1 - Logo + descrição */}
          <Col md={4} className="mb-4 d-flex flex-column align-items-center align-items-md-start">
            <Image
              src="/icon.ico"
              alt="Logo"
              width={48}
              height={48}
              rounded
              className="mb-2"
            />
            <h4 className="fw-bold footer-title">19 Grocery Store</h4>
            <p className="footer-text">
              Qualidade, variedade e praticidade em um só lugar.
              A sua mercearia completa, moderna e confiável.
            </p>
          </Col>

          {/* Coluna 2 - Links */}
          <Col md={4} className="mb-4">
            <h5 className="fw-semibold footer-subtitle">Links úteis</h5>
            <ul className="list-unstyled footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/produtos">Produtos</a></li>
              <li><a href="/sobre">Sobre</a></li>
              <li><a href="/contato">Contato</a></li>
            </ul>
          </Col>

          {/* Coluna 3 - Redes sociais */}
          <Col md={4} className="mb-4">
            <h5 className="fw-semibold footer-subtitle">Siga-nos</h5>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <a href="#" className="footer-social"><FaFacebook size={22} /></a>
              <a href="#" className="footer-social"><FaInstagram size={22} /></a>
              <a href="#" className="footer-social"><FaWhatsapp size={22} /></a>
            </div>
          </Col>
        </Row>

        {/* Linha de baixo */}
        <Row>
          <Col className="text-center mt-3">
            <p className="footer-copy small m-0">
              © {new Date().getFullYear()} 19 Grocery Store — Todos os direitos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
