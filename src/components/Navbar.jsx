
import React, { useContext, useState, useRef, useEffect } from "react";
import {
  FaUser,
  FaBars,
  FaTimes,
  FaSearch,
  FaMoon,
  FaSun,
  FaShoppingCart,
} from "react-icons/fa";

import { ThemeContext } from "../context/ThemeContext";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

import { useDispatch } from "react-redux";
import {
  setUser as setUserRedux,
  logout as logoutRedux,
} from "../store/slice/userSlice";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [welcomeShown, setWelcomeShown] = useState(false);

  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const searchRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadSession() {
      const { data: { session } } = await supabase.auth.getSession();
      const userData = session?.user ?? null;

      setUser(userData);
      dispatch(setUserRedux(userData));
    }

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const userData = session?.user ?? null;

        setUser(userData);
        dispatch(setUserRedux(userData));

        if (event === "SIGNED_IN" && userData && !welcomeShown) {
          toast.success(
            `Bem-vindo, ${userData.user_metadata?.name ?? userData.email}!`
          );
          setWelcomeShown(true);
        }

        if (event === "SIGNED_OUT") {
          setWelcomeShown(false);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [dispatch, welcomeShown]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchTerm("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/busca?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setMenuOpen(false);
    }
  }

  function handleLoginClick() {
    navigate("/login");
    setMenuOpen(false);
  }

  async function handleLogoutClick() {
    await supabase.auth.signOut();
    dispatch(logoutRedux());
    navigate("/");
    setMenuOpen(false);
  }

  // Classes condicionais para tema
  const themeClasses = {
    nav: theme === "dark" 
      ? "bg-gray-900 text-white border-gray-800" 
      : "bg-white text-gray-800 border-gray-200 shadow-sm",
    searchInput: theme === "dark"
      ? "bg-gray-800 text-white border-gray-700 placeholder-gray-400"
      : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500",
    icon: theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900",
    link: theme === "dark" 
      ? "text-gray-300 hover:text-white" 
      : "text-gray-700 hover:text-blue-600",
    button: theme === "dark"
      ? "text-gray-300 hover:text-white"
      : "text-gray-700 hover:text-blue-600",
    mobileMenu: theme === "dark"
      ? "bg-gray-900 border-gray-800"
      : "bg-white border-gray-200"
  };

  return (
    <nav className={`sticky top-0 z-50 border-b ${themeClasses.nav}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo e marca */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/icon.ico" 
                alt="Logo" 
                className="h-8 w-8 object-contain"
              />
              <span className="text-xl font-bold tracking-tight">19 Market</span>
            </Link>
          </div>

          {/* Links de navegação - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`font-medium transition-colors ${themeClasses.link}`}>
              Home
            </Link>
            <Link to="/produtos" className={`font-medium transition-colors ${themeClasses.link}`}>
              Produtos
            </Link>
            <a href="#sobre" className={`font-medium transition-colors ${themeClasses.link}`}>
              Sobre
            </a>
            <a href="#contato" className={`font-medium transition-colors ${themeClasses.link}`}>
              Contato
            </a>
          </div>

          {/* Search, ícones e ações - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Formulário de busca */}
            <form 
              ref={searchRef}
              onSubmit={handleSubmit}
              className="relative"
            >
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-64 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${themeClasses.searchInput}`}
              />
              <button
                type="submit"
                aria-label="Buscar"
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${themeClasses.icon}`}
              >
                <FaSearch />
              </button>
            </form>

            {/* Ícones e ações */}
            <div className="flex items-center space-x-6">
              <Link to="/carrinho" className={`transition-colors ${themeClasses.icon}`}>
                <FaShoppingCart size={20} title="Carrinho" />
              </Link>

              <button
                onClick={toggleTheme}
                className={`transition-colors ${themeClasses.icon}`}
                aria-label="Alternar tema"
              >
                {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
              </button>

              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium">
                    Olá, {user.user_metadata?.name ?? user.email}
                  </span>
                  <button
                    onClick={handleLogoutClick}
                    className={`px-3 py-1 rounded-md font-medium transition-colors ${
                      theme === "dark" 
                        ? "bg-red-600 hover:bg-red-700 text-white" 
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className={`flex items-center space-x-2 transition-colors ${themeClasses.button}`}
                >
                  <FaUser size={18} title="Login" />
                  <span className="font-medium">Login</span>
                </button>
              )}
            </div>
          </div>

          {/* Botão do menu mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-md transition-colors ${themeClasses.button}`}
            aria-label="Menu"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Menu mobile expandido */}
        {menuOpen && (
          <div className={`md:hidden border-t py-4 ${themeClasses.mobileMenu}`}>
            
            {/* Links mobile */}
            <div className="flex flex-col space-y-4 mb-6">
              <Link 
                to="/" 
                className={`font-medium py-2 transition-colors ${themeClasses.link}`}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/produtos" 
                className={`font-medium py-2 transition-colors ${themeClasses.link}`}
                onClick={() => setMenuOpen(false)}
              >
                Produtos
              </Link>
              <a 
                href="#sobre" 
                className={`font-medium py-2 transition-colors ${themeClasses.link}`}
                onClick={() => setMenuOpen(false)}
              >
                Sobre
              </a>
              <a 
                href="#contato" 
                className={`font-medium py-2 transition-colors ${themeClasses.link}`}
                onClick={() => setMenuOpen(false)}
              >
                Contato
              </a>
            </div>

            {/* Search mobile */}
            <form 
              ref={searchRef}
              onSubmit={handleSubmit}
              className="relative mb-6"
            >
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${themeClasses.searchInput}`}
              />
              <button
                type="submit"
                aria-label="Buscar"
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${themeClasses.icon}`}
              >
                <FaSearch />
              </button>
            </form>

            {/* Ações mobile */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <Link 
                  to="/carrinho" 
                  className={`flex items-center space-x-2 transition-colors ${themeClasses.button}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <FaShoppingCart size={20} />
                  <span>Carrinho</span>
                </Link>
                
                <button
                  onClick={toggleTheme}
                  className={`flex items-center space-x-2 transition-colors ${themeClasses.button}`}
                  aria-label="Alternar tema"
                >
                  {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
                  <span>{theme === "dark" ? "Modo claro" : "Modo escuro"}</span>
                </button>
              </div>

              {user ? (
                <div className="pt-4 border-t">
                  <p className="mb-3 font-medium">
                    Olá, <span className="font-bold">{user.user_metadata?.name ?? user.email}</span>
                  </p>
                  <button
                    onClick={() => {
                      handleLogoutClick();
                      setMenuOpen(false);
                    }}
                    className={`w-full px-4 py-2 rounded-md font-medium transition-colors ${
                      theme === "dark" 
                        ? "bg-red-600 hover:bg-red-700 text-white" 
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                  >
                    Sair da conta
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleLoginClick();
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-center space-x-2 py-3 rounded-md font-medium transition-colors ${
                    theme === "dark"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  <FaUser size={18} />
                  <span>Fazer Login</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
