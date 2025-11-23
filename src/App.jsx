
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeContext } from "./context/ThemeContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";

import Busca from "./pages/Busca";
import LoginSignup from "./pages/LoginSignup";

import ProdutosJSON from "./data/Produtos.json"; 

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <BrowserRouter>
        {/* Passa produtos para Navbar */}
        <Navbar produtos={ProdutosJSON} />

        {/* Wrapper para aplicar tema */}
        <div
          className={theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}
        >
          <Routes>
            <Route path="/login" element={<LoginSignup />} />
            
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />

            <Route path="/busca" element={<Busca />} />
          </Routes>

          <Footer />
        </div>

        {/* Toasts globais */}
        <ToastContainer position="bottom-right" autoClose={2500} />
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
