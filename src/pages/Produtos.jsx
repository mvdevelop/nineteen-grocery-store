
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slice/cartSlice";
import ProdutosJSON from "../data/Produtos.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaShoppingCart } from "react-icons/fa";

export default function Produtos() {
  const produtos = ProdutosJSON;
  const dispatch = useDispatch();

  function formatarTitulo(text) {
    return text
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }

  const handleAdd = (produto) => {
    dispatch(
      addToCart({
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        img: produto.img,
      })
    );

    toast.success(`${produto.nome} foi adicionado ao carrinho! 🛒`, {
      position: "top-right",
    });
  };

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">
        {Object.entries(produtos).map(([categoria, listaProdutos]) => (
          <section key={categoria} className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">
              {formatarTitulo(categoria)}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {listaProdutos.map((produto) => (
                <div
                  key={produto.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  {/* Imagem do produto */}
                  <div className="h-48 overflow-hidden">
                    <img
                      src={produto.img}
                      alt={produto.nome}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Conteúdo */}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {produto.nome}
                    </h3>
                    
                    <p className="text-gray-500 text-sm mb-4 flex-grow">
                      {produto.tag}
                    </p>

                    {/* Preço */}
                    <div className="mb-4">
                      {produto["preco-antigo"] > produto.preco ? (
                        <div className="space-y-1">
                          <div className="text-sm text-gray-400 line-through">
                            R$ {produto["preco-antigo"].toFixed(2)}
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-gray-800">
                              R$ {produto.preco.toFixed(2)}
                            </span>
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                              Economize R$ {(produto["preco-antigo"] - produto.preco).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-lg font-bold text-gray-800">
                          R$ {produto.preco.toFixed(2)}
                        </div>
                      )}
                    </div>

                    {/* Botão */}
                    <button
                      onClick={() => handleAdd(produto)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <FaShoppingCart />
                      <span>Adicionar ao Carrinho</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
