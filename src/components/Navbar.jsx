
import React, { useContext, useState, useRef, useEffect } from "react";
import {
  FaUser,
  FaUserPlus,
  FaBars,
  FaTimes,
  FaSearch,
  FaMoon,
  FaSun,
  FaShoppingCart,
} from "react-icons/fa";

import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

import { supabase } from "../supabaseClient"; 
import "./components.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const searchRef = useRef();

  // Monitorar estado do usuário Supabase
  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    }
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Fecha menu mobile ao clicar fora da search bar
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
    if (searchTerm.trim() !== "") {
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
    setMenuOpen(false);
    navigate("/");
  }

  return (
    <nav className={`nav ${theme === "dark" ? "nav-dark" : "nav-light"}`}>
      <div className="nav-container">
        {/* Logo */}
        <img src="/icon.ico" alt="Logo" className="nav-logo-img" />
        <div className="nav-logo">19 Grocery Store</div>

        {/* Menu hamburguer (mobile) */}
        <div className="nav-toggle" onClick={() => setMenuOpen((prev) => !prev)}>
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </div>

        {/* Items */}
        <div className={`nav-items ${menuOpen ? "active" : ""}`}>
          {/* Links */}
          <ul className="nav-links fw-bold pt-3">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/produtos">Produtos</a>
            </li>
            <li>
              <a href="/sobre">Sobre</a>
            </li>
            <li>
              <a href="/contato">Contato</a>
            </li>
          </ul>

          {/* Search bar */}
          <form
            className="nav-search"
            ref={searchRef}
            style={{ position: "relative" }}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Buscar produtos..."
              className={theme === "dark" ? "input-dark" : "input-light"}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar produtos"
            />
            <button
              type="submit"
              aria-label="Buscar"
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: theme === "dark" ? "#eee" : "#222",
              }}
            >
              <FaSearch />
            </button>
          </form>

          {/* Icons */}
          <div className="nav-icons" style={{ alignItems: "center" }}>
            <FaShoppingCart className="nav-icon" title="Carrinho" />

            {user ? (
              <>
                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                  Olá, {user.email}
                </span>
                <button
                  onClick={handleLogoutClick}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: theme === "dark" ? "#eee" : "#222",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  title="Sair"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <FaUser
                  className="nav-icon"
                  title="Login"
                  onClick={handleLoginClick}
                  style={{ cursor: "pointer" }}
                />
                {/* <FaUserPlus
                  className="nav-icon"
                  title="Criar conta"
                  onClick={handleLoginClick}
                  style={{ cursor: "pointer" }}
                /> */}
              </>
            )}

            <button className="theme-button" onClick={toggleTheme}>
              {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
