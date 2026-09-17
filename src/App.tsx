import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeProvider";
import { useTheme } from "./context/ThemeContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Produtos from "./pages/Produtos";

import Busca from "./pages/Busca";
import LoginSignup from "./pages/LoginSignup";
import Carrinho from "./features/Carrinho";
import Pagamento from "./features/Pagamento";

import RequireAuth from "./features/auth/RequireAuth";

import ProdutosJSON from "./data/Produtos.json";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <Navbar />
          <MainContent />
          <Footer />
          <ToastContainer position="bottom-right" autoClose={2500} />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

function MainContent() {
  const { theme } = useTheme();

  return (
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

        <Route path="/pagamento" element={<Pagamento />} />
      </Routes>
    </div>
  );
}

export default App;
