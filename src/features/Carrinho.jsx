
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, clearCart } from "../store/slice/cartSlice";
import { Link } from "react-router-dom";
import { 
  FaShoppingCart, 
  FaTrash, 
  FaPlus, 
  FaMinus, 
  FaArrowLeft,
  FaCreditCard,
  FaTruck,
  FaShieldAlt,
  FaGift,
  FaTimes
} from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RiCouponLine } from "react-icons/ri";

import "./features.css";

export default function Carrinho() {
  const dispatch = useDispatch();
  const produtos = useSelector((state) => state.cart.items);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const quantidadeTotal = produtos.reduce((acc, p) => acc + p.quantidade, 0);
  const valorTotal = produtos.reduce((acc, p) => acc + p.preco * p.quantidade, 0);
  const valorDesconto = couponApplied ? valorTotal * 0.1 : 0; // 10% de desconto
  const valorFinal = (valorTotal - valorDesconto).toFixed(2);

  const handleApplyCoupon = () => {
    if (couponCode === "PROMO10") {
      setCouponApplied(true);
    } else {
      alert("Cupom inválido!");
    }
    setCouponCode("");
  };

  const handleClearCart = () => {
    if (window.confirm("Deseja esvaziar o carrinho?")) {
      dispatch(clearCart());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <FaShoppingCart className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Meu Carrinho
              </h1>
              <p className="text-gray-600">
                {quantidadeTotal} {quantidadeTotal === 1 ? 'item' : 'itens'} no carrinho
              </p>
            </div>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FaArrowLeft />
            <span>Continuar comprando</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coluna principal - Lista de produtos */}
          <div className="lg:col-span-2">
            {/* Card do carrinho */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <HiOutlineShoppingBag className="text-2xl text-blue-500" />
                  <h2 className="text-xl font-bold text-gray-800">Seus Produtos</h2>
                </div>
                {produtos.length > 0 && (
                  <button
                    onClick={handleClearCart}
                    className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FaTrash />
                    <span className="font-medium">Esvaziar Carrinho</span>
                  </button>
                )}
              </div>

              {/* Lista de produtos ou carrinho vazio */}
              {produtos.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <FaShoppingCart className="text-4xl text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-3">
                    Seu carrinho está vazio
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Parece que você ainda não adicionou nenhum produto ao carrinho. 
                    Explore nossos produtos e encontre ofertas incríveis!
                  </p>
                  <Link
                    to="/produtos"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1"
                  >
                    <FaShoppingCart />
                    <span>Ver Produtos</span>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {produtos.map((p) => (
                    <div
                      key={p.id}
                      className="p-6 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex gap-6">
                        {/* Imagem do produto */}
                        <div className="relative flex-shrink-0">
                          <img
                            src={p.img}
                            alt={p.nome}
                            className="w-28 h-28 object-cover rounded-xl border border-gray-200 group-hover:scale-105 transition-transform duration-300"
                          />
                          {p.emPromocao && (
                            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-xl">
                              PROMO
                            </div>
                          )}
                        </div>

                        {/* Detalhes do produto */}
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-bold text-gray-800 mb-1">
                                {p.nome}
                              </h3>
                              <p className="text-gray-600 text-sm mb-2">
                                {p.categoria || "Produto"}
                              </p>
                              <div className="flex items-center gap-4">
                                <span className="text-2xl font-bold text-gray-800">
                                  R$ {p.preco.toFixed(2)}
                                </span>
                                {p.precoOriginal && (
                                  <span className="text-lg text-gray-400 line-through">
                                    R$ {p.precoOriginal.toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => dispatch(removeFromCart(p.id, true))}
                              className="text-gray-400 hover:text-red-500 transition-colors p-2"
                              title="Remover produto"
                            >
                              <FaTimes className="text-xl" />
                            </button>
                          </div>

                          {/* Controles de quantidade */}
                          <div className="mt-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-gray-700 font-medium">Quantidade:</span>
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() => dispatch(removeFromCart(p.id))}
                                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                                >
                                  <FaMinus />
                                </button>
                                <span className="w-12 text-center font-bold text-lg">
                                  {p.quantidade}
                                </span>
                                <button
                                  onClick={() => dispatch(addToCart(p))}
                                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                                >
                                  <FaPlus />
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">Subtotal</div>
                              <div className="text-2xl font-bold text-blue-600">
                                R$ {(p.preco * p.quantidade).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Benefícios */}
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <FaTruck className="text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Frete Grátis</div>
                  <div className="text-sm text-gray-600">Acima de R$ 150</div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaShieldAlt className="text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Compra Segura</div>
                  <div className="text-sm text-gray-600">SSL 256-bit</div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <FaGift className="text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Presente Grátis</div>
                  <div className="text-sm text-gray-600">Acima de R$ 200</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Resumo do pedido */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Resumo do pedido */}
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaCreditCard />
                  <span>Resumo do Pedido</span>
                </h2>

                {/* Itens do resumo */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({quantidadeTotal} itens)</span>
                    <span className="font-semibold">R$ {valorTotal.toFixed(2)}</span>
                  </div>
                  
                  {couponApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto (10%)</span>
                      <span className="font-semibold">- R$ {valorDesconto.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete</span>
                    <span className="font-semibold">
                      {valorTotal > 150 ? "Grátis" : "R$ 15,00"}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-2xl text-blue-600">R$ {valorFinal}</span>
                    </div>
                  </div>
                </div>

                {/* Cupom de desconto */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <RiCouponLine className="text-yellow-500" />
                    <span className="font-medium text-gray-700">Cupom de desconto</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Digite o cupom"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={couponApplied}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        couponApplied
                          ? "bg-green-100 text-green-700 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {couponApplied ? "Aplicado" : "Aplicar"}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Use o cupom <span className="font-mono">PROMO10</span> para 10% de desconto
                  </p>
                </div>

                {/* Botão de finalizar compra */}
                <Link to="/pagamento" className="block">
                  <button
                    disabled={produtos.length === 0}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                      produtos.length === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    }`}
                  >
                    <FaCreditCard />
                    <span>Finalizar Compra</span>
                  </button>
                </Link>

                {/* Pagamento seguro */}
                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <div className="flex justify-center gap-3 mb-2">
                    {["visa", "mastercard", "pix", "boleto"].map((method) => (
                      <div
                        key={method}
                        className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-semibold text-gray-600"
                      >
                        {method.toUpperCase()}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    Pagamento 100% seguro
                  </p>
                </div>
              </div>

              {/* Produtos recomendados (placeholder) */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="font-bold text-gray-800 mb-4">
                  Você também pode gostar
                </h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
