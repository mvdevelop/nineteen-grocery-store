
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import banner1 from "../assets/banners/banner1.jpg";
import banner2 from "../assets/banners/banner2.jpg";
import banner3 from "../assets/banners/banner3.jpg";
import banner4 from "../assets/banners/banner4.jpg";
import banner5 from "../assets/banners/banner5.jpg";

import Promocao from "./produtos/Promocao";
import Produtos from "./Produtos";
import Forum from "./Forum";

export default function Home() {
  const banners = [
    { id: 1, src: banner1, alt: "Banner 1" },
    { id: 2, src: banner2, alt: "Banner 2" },
    { id: 3, src: banner3, alt: "Banner 3" },
    { id: 4, src: banner4, alt: "Banner 4" },
    { id: 5, src: banner5, alt: "Banner 5" },
  ];

  return (
    <div className="min-h-screen">
      {/* Banner Carousel */}
      <section className="relative w-full overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ 
            delay: 10000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true 
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true 
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          loop={true}
          speed={800}
          className="h-[500px] md:h-[600px]"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="relative w-full h-full">
                <img
                  src={banner.src}
                  alt={banner.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </SwiperSlide>
          ))}
          
          {/* Custom navigation buttons */}
          <div className="swiper-button-next hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 right-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div className="swiper-button-prev hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 left-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </Swiper>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Destaques da Loja
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Confira nossas promoções imperdíveis e produtos mais vendidos
            </p>
          </div>
          
          <div className="space-y-16">
            <Promocao />
            <Produtos />
          </div>
        </div>
      </section>

      {/* Fórum da Comunidade */}
      <Forum />

      {/* Sobre Nós */}
      <section id="sobre" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <div className="mb-6">
                <span className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-3">
                  Conheça nossa história
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Sobre a <span className="text-green-600">19 Market</span>
                </h2>
              </div>

              <div className="space-y-4 text-gray-600">
                <p className="text-lg leading-relaxed">
                  A <strong className="text-gray-800">19 Market</strong> nasceu com o propósito de
                  oferecer produtos de qualidade, preços acessíveis e um
                  atendimento que realmente faz diferença no seu dia a dia.
                  Acreditamos que ir às compras deve ser algo simples, rápido e
                  agradável.
                </p>

                <p className="leading-relaxed">
                  Trabalhamos com uma seleção cuidadosa de alimentos, produtos
                  frescos, itens de higiene e utilidades domésticas, garantindo
                  sempre o melhor para você e sua família.
                </p>

                <p className="leading-relaxed">
                  Nosso compromisso é proporcionar uma experiência prática,
                  confiável e moderna — combinando variedade, comodidade e um
                  ambiente acolhedor.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span className="font-medium">Qualidade Garantida</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span className="font-medium">Preços Acessíveis</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span className="font-medium">Atendimento Personalizado</span>
                </div>
              </div>
            </div>

            {/* Imagem opcional */}
            <div className="md:w-1/2">
              <div className="relative">
                <div className="bg-green-500/10 rounded-2xl p-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                      <div className="text-3xl font-bold text-green-600 mb-2">5+</div>
                      <div className="text-gray-700">Anos no mercado</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                      <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                      <div className="text-gray-700">Produtos disponíveis</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                      <div className="text-3xl font-bold text-green-600 mb-2">1K+</div>
                      <div className="text-gray-700">Clientes satisfeitos</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                      <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                      <div className="text-gray-700">Suporte online</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Entre em Contato
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tem alguma dúvida ou sugestão? Fale conosco!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Formulário */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Envie uma mensagem
              </h3>

              <form className="space-y-6">
                <div>
                  <label htmlFor="nome" className="block text-gray-700 font-medium mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="nome"
                    placeholder="Seu nome completo"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="mensagem" className="block text-gray-700 font-medium mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    rows={4}
                    placeholder="Escreva sua mensagem aqui..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>

            {/* Informações de contato */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Informações de Contato
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <FaWhatsapp className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">WhatsApp</h4>
                      <p className="text-gray-600">(11) 99999-9999</p>
                      <p className="text-sm text-gray-500">Atendimento rápido via mensagem</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <FaEnvelope className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <p className="text-gray-600">contato@19market.com</p>
                      <p className="text-sm text-gray-500">Respondemos em até 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <FaMapMarkerAlt className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Endereço</h4>
                      <p className="text-gray-600">Rua das Palmeiras, 123 — Rio de Janeiro, RJ</p>
                      <p className="text-sm text-gray-500">Venha nos visitar!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horários */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Horários de Funcionamento
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Segunda a Sexta</span>
                    <span className="font-semibold text-green-600">08h às 18h</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Sábados</span>
                    <span className="font-semibold text-green-600">09h às 13h</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Domingos e Feriados</span>
                    <span className="font-semibold text-gray-400">Fechado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
