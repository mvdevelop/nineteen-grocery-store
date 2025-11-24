
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeContext } from "./context/ThemeContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Produtos from "./pages/Produtos";

import Busca from "./pages/Busca";
import LoginSignup from "./pages/LoginSignup";
import Carrinho from "./features/Carrinho";

import RequireAuth from "./features/auth/RequireAuth";

import ProdutosJSON from "./data/Produtos.json";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import store from "./store/store";

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
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <BrowserRouter>
          <Navbar produtos={ProdutosJSON} />

          <div className={theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}>
            <Routes>
              <Route path="/login" element={<LoginSignup />} />

              <Route path="/" element={<Home />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/busca" element={<Busca />} />

              {/* 🔒 Rota protegida pelo RequireAuth */}
              <Route
                path="/carrinho"
                element={
                  <RequireAuth>
                    <Carrinho />
                  </RequireAuth>
                }
              />
            </Routes>

            <Footer />
          </div>

          <ToastContainer position="bottom-right" autoClose={2500} />
        </BrowserRouter>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
