
import React from "react";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";

export default function Carrinho() {
  const produtos = [
    { id: 1, nome: "Produto A", preco: 49.9, quantidade: 1, img: "https://via.placeholder.com/80" },
    { id: 2, nome: "Produto B", preco: 89.9, quantidade: 2, img: "https://via.placeholder.com/80" },
  ];

  const quantidadeTotal = produtos.reduce((acc, p) => acc + p.quantidade, 0);
  const valorTotal = produtos.reduce((acc, p) => acc + p.preco * p.quantidade, 0).toFixed(2);

  return (
    <Container className="py-4">
      <Row className="g-4">

        <Col xs={12} md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4 fs-4 fw-semibold">Seu Carrinho</Card.Title>

              <ListGroup variant="flush">
                {produtos.map((p) => (
                  <ListGroup.Item
                    key={p.id}
                    className="d-flex align-items-center gap-3 py-3 border rounded mb-3"
                  >
                    <img
                      src={p.img}
                      alt={p.nome}
                      className="rounded"
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    />

                    <div className="flex-grow-1">
                      <h5 className="mb-1">{p.nome}</h5>
                      <small className="text-muted">Quantidade: {p.quantidade}</small>
                    </div>

                    <strong className="fs-5">R$ {p.preco.toFixed(2)}</strong>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={4}>
          <Card className="shadow-sm position-sticky" style={{ top: "20px" }}>
            <Card.Body>
              <Card.Title className="fs-4 fw-semibold mb-3">Resumo</Card.Title>

              <div className="d-flex justify-content-between fs-5 mb-2">
                <span>Produtos:</span>
                <span>{quantidadeTotal}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fs-4 fw-bold mb-3">
                <span>Total:</span>
                <span>R$ {valorTotal}</span>
              </div>

              <Button variant="primary" className="w-100 py-2 fs-5">
                Ir para o Pagamento
              </Button>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
}
