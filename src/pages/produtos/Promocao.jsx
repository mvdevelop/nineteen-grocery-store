
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaShoppingCart, FaFire, FaClock, FaTag, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { GiPriceTag } from "react-icons/gi";

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
  const [timer, setTimer] = useState({
    days: 2,
    hours: 12,
    minutes: 30,
    seconds: 45
  });

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
      icon: "🛒"
    });
  };

  const calcularDesconto = (precoOriginal, precoPromo) => {
    return Math.round(((precoOriginal - precoPromo) / precoOriginal) * 100);
  };

  return (
    <div className="py-12 bg-gradient-to-b from-red-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header com timer */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-amber-500 rounded-full flex items-center justify-center">
              <FaFire className="text-2xl text-white" />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                Promoções <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">Relâmpago</span>
              </h2>
              <p className="text-gray-600 mt-2">Ofertas especiais por tempo limitado!</p>
            </div>
          </div>

          {/* Timer de contagem regressiva */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <FaClock className="text-red-500 text-xl" />
                <span className="text-gray-700 font-semibold">Estas promoções terminam em:</span>
              </div>
              <div className="flex justify-center gap-4 md:gap-6">
                {Object.entries(timer).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-amber-500 rounded-xl flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{value.toString().padStart(2, '0')}</span>
                    </div>
                    <span className="text-gray-600 text-sm mt-2 capitalize">{unit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Swiper de Promoções */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={24}
            navigation={{
              nextEl: '.promo-next',
              prevEl: '.promo-prev',
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true 
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            breakpoints={{
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            className="pb-12"
          >
            {produtos.map((produto) => {
              const desconto = calcularDesconto(produto["preco-antigo"], produto.preco);
              
              return (
                <SwiperSlide key={produto.id}>
                  <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-amber-300 relative h-full flex flex-col">
                    
                    {/* Badge de desconto */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-amber-500 text-white px-4 py-2 rounded-full shadow-lg">
                        <GiPriceTag className="text-sm" />
                        <span className="font-bold">{desconto}% OFF</span>
                      </div>
                    </div>

                    {/* Badge de mais vendido */}
                    {produto.bestseller && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          MAIS VENDIDO
                        </div>
                      </div>
                    )}

                    {/* Imagem do produto */}
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                      <img
                        src={produto.img}
                        alt={produto.nome}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Overlay de promoção */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
                      
                      {/* Efeito de chamas no hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <FaFire className="text-amber-500 text-4xl animate-pulse" />
                        </div>
                      </div>
                    </div>

                    {/* Conteúdo do card */}
                    <div className="p-5 flex flex-col flex-grow">
                      {/* Categoria/Tag */}
                      <div className="mb-3">
                        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {produto.tag}
                        </span>
                      </div>

                      {/* Nome do produto */}
                      <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                        {produto.nome}
                      </h3>

                      {/* Preços */}
                      <div className="mb-6 mt-auto">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-sm text-gray-400">De:</span>
                          <span className="text-lg text-gray-400 line-through">
                            R$ {produto["preco-antigo"].toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-3">
                          <span className="text-xs text-gray-500">Por apenas:</span>
                          <div className="flex items-baseline">
                            <span className="text-xs text-gray-600">R$</span>
                            <span className="text-2xl font-bold text-red-600 ml-1">
                              {produto.preco.toFixed(2).split(',')[0]}
                            </span>
                            <span className="text-lg font-bold text-red-600">
                              ,{produto.preco.toFixed(2).split(',')[1]}
                            </span>
                          </div>
                        </div>
                        
                        {/* Economia */}
                        <div className="mt-3 p-3 bg-gradient-to-r from-red-50 to-amber-50 rounded-lg">
                          <div className="text-sm text-gray-700">
                            <span className="font-semibold">Economize:</span>
                            <span className="text-red-600 font-bold ml-2">
                              R$ {(produto["preco-antigo"] - produto.preco).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Botão de adicionar ao carrinho */}
                      <button
                        onClick={() => handleAddToCart(produto)}
                        className="w-full bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group-hover:shadow-lg transform group-hover:-translate-y-1"
                      >
                        <FaShoppingCart />
                        <span>COMPRAR AGORA</span>
                      </button>
                    </div>

                    {/* Barra de progresso (opcional para estoque limitado) */}
                    {produto.estoque && (
                      <div className="px-5 pb-5">
                        <div className="mb-2 flex justify-between text-xs">
                          <span className="text-gray-600">Estoque limitado</span>
                          <span className="font-bold text-red-600">{produto.estoque} restantes</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" 
                            style={{ width: `${(produto.estoque / 100) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Botões de navegação personalizados */}
          <button className="promo-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all duration-300 group">
            <FaArrowLeft className="text-gray-700 group-hover:text-red-500" />
          </button>
          <button className="promo-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all duration-300 group">
            <FaArrowRight className="text-gray-700 group-hover:text-red-500" />
          </button>
        </div>

        {/* Informações adicionais */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTag className="text-2xl text-green-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Preços Imbatíveis</h4>
              <p className="text-gray-600 text-sm">Os melhores preços do mercado, garantidos!</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-2xl text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Tempo Limitado</h4>
              <p className="text-gray-600 text-sm">Estas ofertas estão disponíveis por pouco tempo</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaFire className="text-2xl text-amber-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Ofertas Quentes</h4>
              <p className="text-gray-600 text-sm">Produtos mais vendidos com desconto especial</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
