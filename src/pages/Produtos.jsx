
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ProdutosJSON from "../data/Produtos.json";

export default function Produtos() {
  const produtos = ProdutosJSON;

  function formatarTitulo(text) {
    return text
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }

  return (
    <Container className="py-4">
      {Object.entries(produtos).map(([categoria, listaProdutos]) => (
        <section key={categoria} className="mb-5">
          <h2 className="mb-4">{formatarTitulo(categoria)}</h2>

          <Row>
            {listaProdutos.map((produto) => (
              <Col key={produto.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={produto.img}
                    alt={produto.nome}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title style={{ fontSize: "1.1rem" }}>
                      {produto.nome}
                    </Card.Title>
                    <Card.Text className="text-muted mb-2">{produto.tag}</Card.Text>

                    <div className="mt-auto">
                      <span
                        className="text-decoration-line-through text-muted me-2"
                        style={{ fontSize: "0.9rem" }}
                      >
                        R$ {produto["preco-antigo"].toFixed(2)}
                      </span>
                      <span
                        className="fw-bold"
                        style={{ fontSize: "1.1rem", color: "#2c3e50" }}
                      >
                        R$ {produto.preco.toFixed(2)}
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      ))}
    </Container>
  );
}
