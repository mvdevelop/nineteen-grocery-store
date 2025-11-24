
import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");  // <-- NOVO CAMPO
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setMessage({ type: "error", text: error.message });
    else setMessage({ type: "success", text: "Login realizado com sucesso!" });

    setLoading(false);
  }

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name, // <-- ENVIA O NOME PARA user_metadata
        },
      },
    });

    if (error) setMessage({ type: "error", text: error.message });
    else
      setMessage({
        type: "success",
        text: "Cadastro realizado! Verifique seu email para confirmação.",
      });

    setLoading(false);
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>{isLogin ? "Login" : "Cadastrar"}</h2>

      <form onSubmit={isLogin ? handleLogin : handleSignup}>
        
        {/* Campo NOME aparece apenas no SIGNUP */}
        {!isLogin && (
          <>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
            />
          </>
        )}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "0.75rem" }}
        >
          {loading ? "Carregando..." : isLogin ? "Entrar" : "Cadastrar"}
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "1rem",
            color: message.type === "error" ? "red" : "green",
          }}
        >
          {message.text}
        </p>
      )}

      <p style={{ marginTop: "1rem" }}>
        {isLogin ? "Não tem conta? " : "Já tem conta? "}
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage(null);
          }}
          style={{
            color: "blue",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            textDecoration: "underline",
          }}
        >
          {isLogin ? "Cadastre-se" : "Faça login"}
        </button>
      </p>
    </div>
  );
}
