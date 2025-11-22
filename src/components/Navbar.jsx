
import React, { useState } from "react";
import { FaUser, FaUserPlus, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import "./components.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-container">
        
        {/* Logo */}
        <img src="/public/icon.ico" alt="" />
        <div className="nav-logo">19 Grocery Store</div>

        {/* Hamburguer menu mobile */}
        <div
          className="nav-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </div>

        {/* Links + search + ícones */}
        <div className={`nav-items ${menuOpen ? "active" : ""}`}>
          
          {/* Links */}
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/produtos">Produtos</a></li>
            <li><a href="/sobre">Sobre</a></li>
            <li><a href="/contato">Contato</a></li>
          </ul>

          {/* Search bar + luneta */}
          <div className="nav-search">
            <input type="text" placeholder="Buscar produtos..." />
            <FaSearch className="search-icon" />
          </div>

          {/* Icons */}
          <div className="nav-icons">
            <FaUser className="nav-icon" title="Login" />
            <FaUserPlus className="nav-icon" title="Criar conta" />
          </div>

        </div>
      </div>
    </nav>
  );
}
