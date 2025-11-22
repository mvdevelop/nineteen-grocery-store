
import React, { useContext, useState } from "react";
import { FaUser, FaUserPlus, FaBars, FaTimes, FaSearch, FaMoon, FaSun, FaShoppingCart } from "react-icons/fa";

import { ThemeContext } from "../context/ThemeContext";
import "./components.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`nav ${theme === "dark" ? "nav-dark" : "nav-light"}`}>
      <div className="nav-container">

        {/* Logo */}
        <img src="/icon.ico" alt="Logo" className="nav-logo-img" />
        <div className="nav-logo">19 Grocery Store</div>

        {/* Menu hamburguer (mobile) */}
        <div className="nav-toggle" onClick={() => setMenuOpen(prev => !prev)}>
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </div>

        {/* Items */}
        <div className={`nav-items ${menuOpen ? "active" : ""}`}>

          {/* Links */}
          <ul className="nav-links fw-bold">
            <li><a href="/">Home</a></li>
            <li><a href="/produtos">Produtos</a></li>
            <li><a href="/sobre">Sobre</a></li>
            <li><a href="/contato">Contato</a></li>
          </ul>

          {/* Search bar */}
          <div className="nav-search">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className={theme === "dark" ? "input-dark" : "input-light"}
            />
            <FaSearch className="search-icon" />
          </div>

          {/* Icons */}
          <div className="nav-icons">
            {/* Carrinho */}
            <FaShoppingCart className="nav-icon" title="Carrinho" />

            {/* Login / Cadastro */}
            <FaUser className="nav-icon" title="Login" />
            <FaUserPlus className="nav-icon" title="Criar conta" />

            {/* Botão de tema */}
            <button className="theme-button" onClick={toggleTheme}>
              {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
