// Tipos de produto
export interface Produto {
  id: number;
  nome: string;
  tag: string;
  "preco-antigo": number;
  preco: number;
  img: string;
  emPromocao?: boolean;
  categoria?: string;
  bestseller?: boolean;
  estoque?: number;
  precoOriginal?: number;
}

export interface ProdutoCarrinho {
  id: number;
  nome: string;
  preco: number;
  img: string;
  quantidade: number;
  categoria?: string;
  emPromocao?: boolean;
  precoOriginal?: number;
}

export interface ProdutoPromo {
  id: number;
  nome: string;
  tag: string;
  "preco-antigo": number;
  preco: number;
  img: string;
  bestseller?: boolean;
  estoque?: number;
}

export type ProdutosPorCategoria = Record<string, Produto[]>;
