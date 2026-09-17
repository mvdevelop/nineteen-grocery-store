import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Mensagem genérica para evitar vazamento de informações sobre a arquitetura
  throw new Error("Erro de configuração. Contate o administrador do sistema.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInCookie: true,
  },
  // Cabeçalhos de segurança
  // Referência: https://supabase.com/docs/guides/auth/auth-storage
  global: {
    headers: {
      "x-client-info": "19-grocery-store@1.0.0",
    },
  },
});
