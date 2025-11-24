
import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";

export default function Pagamento() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center py-5"
      style={{ minHeight: "80vh" }}
    >
      <Card className="shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center mb-4 fw-bold">Pagamento</h3>

        <Form>

          {/* Nome */}
          <Form.Group className="mb-3">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu nome"
              required
            />
          </Form.Group>

          {/* CPF */}
          <Form.Group className="mb-3">
            <Form.Label>CPF</Form.Label>
            <Form.Control
              type="text"
              placeholder="000.000.000-00"
              maxLength={14}
              required
            />
          </Form.Group>

          {/* CEP */}
          <Form.Group className="mb-3">
            <Form.Label>CEP</Form.Label>
            <Form.Control
              type="text"
              placeholder="00000-000"
              maxLength={9}
              required
            />
          </Form.Group>

          {/* Endereço */}
          <Form.Group className="mb-3">
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              type="text"
              placeholder="Rua, número, bairro"
              required
            />
          </Form.Group>

          {/* Forma de pagamento */}
          <Form.Group className="mb-4">
            <Form.Label>Forma de Pagamento</Form.Label>
            <Form.Select required>
              <option value="">Selecione...</option>
              <option value="pix">Pix</option>
              <option value="cartao">Cartão de Crédito</option>
              <option value="boleto">Boleto Bancário</option>
            </Form.Select>
          </Form.Group>

          {/* Botão */}
          <Button variant="primary" className="w-100 py-2">
            Finalizar Compra
          </Button>

        </Form>
      </Card>
    </Container>
  );
}
