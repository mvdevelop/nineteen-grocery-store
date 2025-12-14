
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaSignInAlt, FaUserPlus, FaEye, FaEyeSlash, FaGoogle, FaFacebook } from "react-icons/fa";
import { HiShieldCheck, HiOutlineMail } from "react-icons/hi";
import { MdAlternateEmail, MdPassword } from "react-icons/md";

export default function LoginSignup() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ 
        type: "success", 
        text: "Login realizado com sucesso! Redirecionando..." 
      });

      setTimeout(() => navigate("/"), 800);
    }

    setLoading(false);
  }

  async function handleSignup(e) {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
          avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        },
        emailRedirectTo: `${window.location.origin}/confirmacao`,
      },
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({
        type: "success",
        text: "🎉 Cadastro realizado! Verifique seu email para confirmar sua conta.",
      });
      // Limpar formulário após sucesso
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }

    setLoading(false);
  }

  function validateForm() {
    if (!isLogin && password !== confirmPassword) {
      setMessage({ type: "error", text: "As senhas não coincidem!" });
      return false;
    }
    
    if (!isLogin && password.length < 6) {
      setMessage({ type: "error", text: "A senha deve ter pelo menos 6 caracteres" });
      return false;
    }
    
    return true;
  }

  async function handleSocialLogin(provider) {
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        
        {/* Header animado */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4 shadow-lg">
            {isLogin ? (
              <FaSignInAlt className="text-3xl text-white" />
            ) : (
              <FaUserPlus className="text-3xl text-white" />
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {isLogin ? "Bem-vindo de volta!" : "Crie sua conta"}
          </h1>
          <p className="text-gray-600">
            {isLogin 
              ? "Entre na sua conta para continuar suas compras" 
              : "Junte-se a nós e aproveite ofertas exclusivas"}
          </p>
        </div>

        {/* Card do formulário */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Indicador de aba */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => {
                setIsLogin(true);
                setMessage(null);
              }}
              className={`flex-1 py-4 text-center font-semibold transition-all ${
                isLogin 
                  ? 'text-blue-600 border-b-2 border-blue-500 bg-blue-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaSignInAlt className="inline-block mr-2" />
              Entrar
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setMessage(null);
              }}
              className={`flex-1 py-4 text-center font-semibold transition-all ${
                !isLogin 
                  ? 'text-green-600 border-b-2 border-green-500 bg-green-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaUserPlus className="inline-block mr-2" />
              Cadastrar
            </button>
          </div>

          <div className="p-8">
            {/* Mensagem de status */}
            {message && (
              <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 animate-fade-in ${
                message.type === 'error' 
                  ? 'bg-red-50 text-red-700 border border-red-200' 
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}>
                {message.type === 'error' ? (
                  <HiShieldCheck className="text-xl flex-shrink-0 mt-0.5" />
                ) : (
                  <HiOutlineMail className="text-xl flex-shrink-0 mt-0.5" />
                )}
                <span className="text-sm">{message.text}</span>
              </div>
            )}

            <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-5">
              {/* Campo Nome (apenas para cadastro) */}
              {!isLogin && (
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    <FaUser className="inline-block mr-2" />
                    Nome completo
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Digite seu nome"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      required
                    />
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              )}

              {/* Campo Email */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  <MdAlternateEmail className="inline-block mr-2" />
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  />
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Campo Senha */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  <MdPassword className="inline-block mr-2" />
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isLogin ? "Digite sua senha" : "Crie uma senha segura"}
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  />
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {!isLogin && (
                  <p className="text-xs text-gray-500">
                    Use pelo menos 6 caracteres com letras e números
                  </p>
                )}
              </div>

              {/* Confirmar Senha (apenas cadastro) */}
              {!isLogin && (
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    <MdPassword className="inline-block mr-2" />
                    Confirmar senha
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Digite a senha novamente"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      required
                    />
                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              )}

              {/* Lembrar de mim e Esqueci a senha (apenas login) */}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Lembrar de mim</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate("/recuperar-senha")}
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
              )}

              {/* Botão principal */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processando...</span>
                  </>
                ) : isLogin ? (
                  <>
                    <FaSignInAlt />
                    <span>Entrar na conta</span>
                  </>
                ) : (
                  <>
                    <FaUserPlus />
                    <span>Criar minha conta</span>
                  </>
                )}
              </button>
            </form>

            {/* Divisor para login social */}
            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">Ou continue com</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Botões de login social */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSocialLogin('google')}
                disabled={loading}
                className="flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-50"
              >
                <FaGoogle className="text-red-500 text-xl" />
                <span className="font-medium">Google</span>
              </button>
              <button
                onClick={() => handleSocialLogin('facebook')}
                disabled={loading}
                className="flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-50"
              >
                <FaFacebook className="text-blue-600 text-xl" />
                <span className="font-medium">Facebook</span>
              </button>
            </div>

            {/* Link para alternar entre login/cadastro */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {isLogin ? "Não tem uma conta ainda?" : "Já tem uma conta?"}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setMessage(null);
                  }}
                  className="ml-2 font-bold text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
                >
                  {isLogin ? "Cadastre-se gratuitamente" : "Faça login aqui"}
                </button>
              </p>
            </div>

            {/* Termos e condições (apenas cadastro) */}
            {!isLogin && (
              <p className="mt-6 text-xs text-gray-500 text-center">
                Ao criar uma conta, você concorda com nossos{' '}
                <a href="/termos" className="text-blue-600 hover:underline">Termos de Serviço</a>{' '}
                e{' '}
                <a href="/privacidade" className="text-blue-600 hover:underline">Política de Privacidade</a>
              </p>
            )}
          </div>
        </div>

        {/* Voltar para home */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-gray-800 hover:underline flex items-center justify-center gap-2 mx-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para a loja
          </button>
        </div>
      </div>
    </div>
  );
}
