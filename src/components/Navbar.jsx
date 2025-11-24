
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

import "./components.css";

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

  return (
    <nav className={`nav ${theme === "dark" ? "nav-dark" : "nav-light"}`}>
      <div className="nav-container">

        {/* Logo */}
        <Link to="/">
          <img src="/icon.ico" alt="Logo" className="nav-logo-img" />
        </Link>
        <div className="nav-logo">19 Market</div>

        {/* Menu mobile */}
        <div className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </div>

        {/* Itens */}
        <div className={`nav-items ${menuOpen ? "active" : ""}`}>

          {/* Links */}
          <ul className="nav-links fw-bold pt-3">
            <li><a href="/">Home</a></li>
            <li><a href="/produtos">Produtos</a></li>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>

          {/* Search */}
          <form
            className="nav-search"
            ref={searchRef}
            onSubmit={handleSubmit}
            style={{ position: "relative" }}
          >
            <input
              type="text"
              placeholder="Buscar produtos..."
              className={theme === "dark" ? "input-dark" : "input-light"}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button
              type="submit"
              aria-label="Buscar"
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: theme === "dark" ? "#eee" : "#222",
              }}
            >
              <FaSearch />
            </button>
          </form>

          {/* Ícones */}
          <div className="nav-icons" style={{ alignItems: "center" }}>
            <Link to="/carrinho">
              <FaShoppingCart className="nav-icon" title="Carrinho" />
            </Link>

            {user ? (
              <>
                <span style={{ margin: "0 10px" }}>
                  Olá, {user.user_metadata?.name ?? user.email}
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
                >
                  Sair
                </button>
              </>
            ) : (
              <FaUser
                className="nav-icon"
                title="Login"
                onClick={handleLoginClick}
                style={{ cursor: "pointer" }}
              />
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
