# 🛒 19 Grocery Store

> **Plataforma e-commerce de supermercado online** — SPA React 19 + Vite com autenticação Supabase, estado global via Redux Toolkit e design system próprio com TailwindCSS.

## 📋 Demonstração

![19 Grocery Store Preview](public/demo-preview.gif)

> _Funcionalidades: catálogo de produtos, carrinho de compras, autenticação com email/social, sistema de cupons, checkout e fórum de avaliações._

## 🏗️ Arquitetura

```
src/
├── App.jsx              # Entry point com providers (Redux, Theme, Router)
├── main.jsx             # ReactDOM.createRoot
├── supabaseClient.js    # Cliente Supabase (env vars)
├── components/          # Componentes reutilizáveis
│   ├── Navbar.jsx
│   └── Footer.jsx
├── context/
│   └── ThemeContext.jsx # Dark/Light mode
├── data/
│   ├── Produtos.json    # Mock de 60+ produtos
│   └── Promocao.json    # Promoções relâmpago
├── features/
│   ├── Carrinho.jsx     # Carrinho de compras (Redux)
│   ├── Pagamento.jsx    # Formulário de checkout
│   └── auth/RequireAuth.jsx # Guard de rotas protegidas
├── store/
│   ├── store.js         # Redux Toolkit store
│   └── slice/
│       ├── cartSlice.js # Estado do carrinho
│       └── userSlice.js # Estado do usuário
└── pages/
    ├── Home.jsx         # Landing page
    ├── Produtos.jsx     # Catálogo por categorias
    ├── LoginSignup.jsx  # Auth com Supabase
    ├── Busca.jsx        # Busca de produtos
    └── Forum.jsx        # Sistema de avaliações
```

### Stack

| Categoria        | Tecnologia               | Versão         |
| ---------------- | ------------------------ | -------------- |
| **Frontend**     | React (Vite)             | 19.2.0 / 7.2.4 |
| **Estado**       | Redux Toolkit            | 2.11.0         |
| **Auth**         | Supabase JS              | 2.84.0         |
| **CSS**          | Tailwind CSS             | 4.1.18         |
| **UI**           | React Bootstrap          | 2.10.10        |
| **Icons**        | React Icons              | 5.5.0          |
| **Carrossel**    | Swiper                   | 12.0.3         |
| **Notificações** | React Toastify           | 11.0.5         |
| **Testes**       | Vitest + Testing Library | 5.0.1          |
| **Linting**      | ESLint (flat config)     | 9.39.1         |
| **Format**       | Prettier                 | 3.9.7          |
| **Git Hooks**    | Husky                    | 9.1.7          |

## 🚀 Começando

### Pré-requisitos

- Node.js 20+
- npm 10+
- Conta no Supabase ([criar conta](https://app.supabase.com))

### Instalação

```bash
git clone https://github.com/seu-usuario/19-grocery-store.git
cd 19-grocery-store

# Instala dependências
npm install

# Configura variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais do Supabase
# VITE_SUPABASE_URL=...
# VITE_SUPABASE_ANON_KEY=...

# Inicia em desenvolvimento
npm run dev
```

### Scripts disponíveis

| Comando                 | Descrição                              |
| ----------------------- | -------------------------------------- |
| `npm run dev`           | Inicia servidor de desenvolvimento     |
| `npm run build`         | Build para produção                    |
| `npm run preview`       | Preview do build local                 |
| `npm run lint`          | Executa ESLint                         |
| `npm run lint:fix`      | Corrige automaticamente issues de lint |
| `npm run test`          | Inicia Vitest no modo watch            |
| `npm run test:run`      | Executa testes uma vez                 |
| `npm run test:coverage` | Executa testes com cobertura           |

## 🔒 Segurança

Este projeto implementa práticas de segurança baseadas em:

- **OWASP Top 10 (2021)**
- **OWASP ASVS v4.0 Level 2**
- **CIS Controls v8**

### Medidas implementadas

| Controle                    | Implementação                                                  |
| --------------------------- | -------------------------------------------------------------- |
| **Secret Management**       | Variáveis de ambiente via `.env.local`, `.gitignore` protegido |
| **Content Security Policy** | Meta tag CSP configurada no Vite                               |
| **XSS Prevention**          | DOMPurify sanitização em input do fórum                        |
| **Clickjacking Protection** | `X-Frame-Options: DENY`                                        |
| **MIME Sniffing**           | `X-Content-Type-Options: nosniff`                              |
| **Referrer Policy**         | `strict-origin-when-cross-origin`                              |
| **Dependency Scanning**     | `npm audit` no pipeline CI                                     |
| **Static Analysis**         | CodeQL (SAST) no pipeline CI                                   |

### ⚠️ Ação necessária: Rotacionar credenciais

Se você acabou de clonar este repositório, **gere novas credenciais** no painel do Supabase, pois credenciais podem ter vazado no histórico Git.

## 🧪 Testes

```bash
# Executar todos os testes
npm run test:run

# Executar com cobertura
npm run test:coverage

# Modo watch (desenvolvimento)
npm run test
```

### Cobertura atual

| Módulo               | Testes   | Cobertura          |
| -------------------- | -------- | ------------------ |
| 🛒 `cartSlice.js`    | 7 testes | 100%               |
| 📄 `LoginSignup.jsx` | 5 testes | Validação          |
| 💬 `Forum.jsx`       | 4 testes | Sanitização        |
| 💰 `Carrinho.jsx`    | 4 testes | Lógica de carrinho |

## 🔄 CI/CD

Pipeline automatizado no GitHub Actions:

1. **Lint** — ESLint
2. **Build** — Vite production build
3. **Security Audit** — npm audit (nível high+)
4. **Tests** — Vitest
5. **SAST** — CodeQL Analysis

## 📖 Documentação

- [Arquitetura](#arquitetura)
- [Guia de Segurança](docs/SECURITY.md)
- [Decisões Arquiteturais](docs/adr/)
- [Política de Privacidade](docs/PRIVACIDADE.md)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m "feat: descrição"`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

> Pre-commit hooks garantem que lint e formatação sejam validados antes de cada commit.

## 📄 Licença

MIT © 2025 19 Market
