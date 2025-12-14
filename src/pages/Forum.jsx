
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaPaperPlane, FaStar, FaHeart, FaQuoteLeft, FaUser, FaRegSmile } from "react-icons/fa";
import { BsEmojiHeartEyes, BsEmojiSunglasses } from "react-icons/bs";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Forum() {
  const [mensagem, setMensagem] = useState("");
  const [comentarios, setComentarios] = useState([
    {
      id: 1,
      usuario: "Maria Silva",
      avatar: "https://i.pravatar.cc/150?img=1",
      texto: "Excelente serviço! Recomendo muito.",
      data: "2 dias atrás",
      rating: 5,
      likes: 24,
      emoji: "❤️"
    },
    {
      id: 2,
      usuario: "João Pereira",
      avatar: "https://i.pravatar.cc/150?img=2",
      texto: "Os produtos chegaram muito rápido e bem embalados!",
      data: "5 dias atrás",
      rating: 5,
      likes: 18,
      emoji: "⚡"
    },
    {
      id: 3,
      usuario: "Ana Costa",
      avatar: "https://i.pravatar.cc/150?img=3",
      texto: "Ótimos preços e atendimento impecável. Super indico!",
      data: "1 semana atrás",
      rating: 4,
      likes: 32,
      emoji: "🌟"
    },
    {
      id: 4,
      usuario: "Carlos Almeida",
      avatar: "https://i.pravatar.cc/150?img=4",
      texto: "Atendimento rápido e muito educado! Voltarei a comprar!",
      data: "2 semanas atrás",
      rating: 5,
      likes: 15,
      emoji: "👍"
    },
    {
      id: 5,
      usuario: "Fernanda Rocha",
      avatar: "https://i.pravatar.cc/150?img=5",
      texto: "A qualidade dos produtos me surpreendeu positivamente!",
      data: "3 semanas atrás",
      rating: 5,
      likes: 28,
      emoji: "😊"
    },
    {
      id: 6,
      usuario: "Pedro Santos",
      avatar: "https://i.pravatar.cc/150?img=6",
      texto: "Voltarei a comprar com certeza! Melhor experiência de compra online.",
      data: "1 mês atrás",
      rating: 5,
      likes: 21,
      emoji: "🎯"
    },
  ]);

  function enviarComentario() {
    if (mensagem.trim() === "") return;

    const novo = {
      id: Date.now(),
      usuario: "Você",
      avatar: "https://i.pravatar.cc/150?u=anon",
      texto: mensagem,
      data: "Agora mesmo",
      rating: 5,
      likes: 0,
      emoji: "💬"
    };

    setComentarios([novo, ...comentarios]);
    setMensagem("");
    
    // Feedback visual
    const button = document.getElementById("enviar-btn");
    button.classList.add("scale-95");
    setTimeout(() => button.classList.remove("scale-95"), 150);
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarComentario();
    }
  }

  return (
    <div className="py-12 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4">
            <FaQuoteLeft className="text-2xl text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Participe da conversa! Compartilhe sua experiência e veja o que outras pessoas estão falando sobre a 19 Market.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-xl" />
            ))}
            <span className="ml-2 text-gray-700 font-semibold">4.9/5 baseado em {comentarios.length} avaliações</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Coluna 1 - Formulário de comentário */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Deixe seu comentário</h3>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3">
                  Sua mensagem <span className="text-gray-400">(máx. 300 caracteres)</span>
                </label>
                <div className="relative">
                  <textarea
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Compartilhe sua experiência com a 19 Market..."
                    className="w-full h-40 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none transition-all"
                    maxLength={300}
                  />
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <span className={`text-sm ${mensagem.length > 250 ? 'text-red-500' : 'text-gray-400'}`}>
                      {mensagem.length}/300
                    </span>
                    <FaRegSmile className="text-gray-400 hover:text-blue-500 cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3">
                  Sua avaliação
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-amber-100 flex items-center justify-center transition-all"
                    >
                      <FaStar className="text-amber-400" />
                    </button>
                  ))}
                </div>
              </div>

              <button
                id="enviar-btn"
                onClick={enviarComentario}
                disabled={!mensagem.trim()}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                  mensagem.trim()
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <FaPaperPlane />
                <span>Publicar Comentário</span>
              </button>

              <p className="text-center text-gray-500 text-sm mt-4">
                Seu comentário será moderado antes de aparecer publicamente
              </p>
            </div>
          </div>

          {/* Coluna 2 e 3 - Comentários em Swiper */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 2,
                  },
                }}
                autoplay={{ 
                  delay: 4000, 
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true 
                }}
                pagination={{ 
                  clickable: true,
                  dynamicBullets: true 
                }}
                navigation={{
                  nextEl: '.custom-next',
                  prevEl: '.custom-prev',
                }}
                className="pb-12"
              >
                {comentarios.map((c) => (
                  <SwiperSlide key={c.id}>
                    <div className="bg-white rounded-2xl shadow-lg p-6 h-full transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100">
                      {/* Cabeçalho do comentário */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          <img
                            src={c.avatar}
                            alt={c.usuario}
                            className="w-14 h-14 rounded-full object-cover border-4 border-white shadow"
                          />
                          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white text-sm">
                            {c.emoji}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-gray-800">{c.usuario}</h4>
                              <div className="flex items-center gap-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={`text-sm ${i < c.rating ? 'text-amber-400' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {c.data}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Texto do comentário */}
                      <div className="mb-6">
                        <div className="text-gray-600 leading-relaxed pl-4 border-l-4 border-green-200">
                          "{c.texto}"
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                            <FaHeart className="text-lg" />
                            <span className="text-sm font-medium">{c.likes}</span>
                          </button>
                          <button className="text-gray-500 hover:text-blue-500 transition-colors">
                            <BsEmojiHeartEyes className="text-xl" />
                          </button>
                          <button className="text-gray-500 hover:text-green-500 transition-colors">
                            <BsEmojiSunglasses className="text-xl" />
                          </button>
                        </div>
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                          Responder
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Botões de navegação personalizados */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none z-10">
                <button className="custom-prev w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 pointer-events-auto transition-all">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="custom-next w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 pointer-events-auto transition-all">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl">
                <div className="text-3xl font-bold">{comentarios.length}+</div>
                <div className="text-blue-100">Comentários</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl">
                <div className="text-3xl font-bold">4.9</div>
                <div className="text-green-100">Avaliação Média</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-purple-100">Satisfação</div>
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-6 rounded-2xl">
                <div className="text-3xl font-bold">24h</div>
                <div className="text-amber-100">Resposta Média</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
