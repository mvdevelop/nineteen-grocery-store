
import React from "react";
import { useSearchParams } from "react-router-dom";
import ProdutosJSON from "../data/Produtos.json";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Busca() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  // Junta todas as categorias num array só
  const todosProdutos = Object.values(ProdutosJSON).flat();

  const resultados = todosProdutos.filter((p) => {
    const nome = p.nome?.toLowerCase() || "";
    const tag = p.tag?.toLowerCase() || "";
    return nome.includes(query) || tag.includes(query);
  });

  return (
    <Container className="mt-4">
      <h2>Resultados da busca: "{query}"</h2>

      {resultados.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <Row xs={1} md={3} className="g-4">
          {resultados.map((produto) => (
            <Col key={produto.id}>
              <Card>
                <Card.Img variant="top" src={produto.img} alt={produto.nome} />
                <Card.Body>
                  <Card.Title>{produto.nome}</Card.Title>
                  <Card.Text>{produto.tag}</Card.Text>
                  <Card.Text>
                    <del>R$ {produto["preco-antigo"].toFixed(2)}</del>{" "}
                    <strong>R$ {produto.preco.toFixed(2)}</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
