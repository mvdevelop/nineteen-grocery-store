
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          
          {/* Logo e descrição */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex flex-col items-center md:items-start">
              <img 
                src="/icon.ico" 
                alt="Logo" 
                className="w-12 h-12 rounded mb-3"
              />
              <h4 className="text-xl font-bold mb-2">19 Market</h4>
            </div>
            <p className="text-gray-300 max-w-md mx-auto md:mx-0">
              Qualidade, variedade e praticidade em um só lugar.
              A sua mercearia completa, moderna e confiável.
            </p>
          </div>

          {/* Links */}
          <div className="flex-1 text-center md:text-left">
            <h5 className="font-semibold mb-4 text-lg">Links úteis</h5>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition">Home</a></li>
              <li><a href="/produtos" className="text-gray-300 hover:text-white transition">Produtos</a></li>
              <li><a href="/sobre" className="text-gray-300 hover:text-white transition">Sobre</a></li>
              <li><a href="/contato" className="text-gray-300 hover:text-white transition">Contato</a></li>
            </ul>
          </div>

          {/* Redes sociais */}
          <div className="flex-1 text-center md:text-left">
            <h5 className="font-semibold mb-4 text-lg">Siga-nos</h5>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition text-2xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-300 hover:text-pink-400 transition text-2xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-300 hover:text-green-400 transition text-2xl">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} 19 Market — Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
