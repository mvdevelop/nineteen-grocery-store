# 🔒 Guia de Segurança — 19 Grocery Store

## Visão Geral

Este documento descreve as medidas de segurança implementadas no projeto 19 Grocery Store, alinhadas com:

- **OWASP Top 10 (2021)**
- **OWASP ASVS v4.0 Level 2**
- **OWASP API Security Top 10**
- **CIS Controls v8**
- **NIST Cybersecurity Framework**
- **LGPD (Lei Geral de Proteção de Dados)**

## 1. Gestão de Segredos

### .env (nunca commitado)

```bash
# .env.local — adicionado ao .gitignore
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

### Rotação de credenciais

- **Sempre** rotacione a Anon Key no painel do Supabase após exposição
- **Nunca** commite `.env` — está no `.gitignore`

## 2. Content Security Policy (CSP)

CSP configurada via Vite:

| Diretiva      | Valor                                         |
| ------------- | --------------------------------------------- |
| `default-src` | `'self'`                                      |
| `script-src`  | `'self' 'unsafe-inline' 'unsafe-eval'` + CDNs |
| `style-src`   | `'self' 'unsafe-inline'` + Google Fonts       |
| `connect-src` | `https://*.supabase.co` (WebSocket incluído)  |
| `frame-src`   | `accounts.google.com`, `*.supabase.co`        |
| `object-src`  | `'none'`                                      |

## 3. Sanitização de Input

- **Forum:** Texto de comentários sanitizado com `DOMPurify` — remove todas as tags HTML
- **Formulários:** Validação de senha (mínimo 6 caracteres), confirmação de senha

## 4. Headers de Segurança

| Header                    | Valor                             | Propósito                 |
| ------------------------- | --------------------------------- | ------------------------- |
| `Content-Security-Policy` | Meta tag no HTML                  | Prevenir XSS              |
| `X-Content-Type-Options`  | `nosniff`                         | Prevenir MIME sniffing    |
| `X-Frame-Options`         | `DENY`                            | Prevenir clickjacking     |
| `Referrer-Policy`         | `strict-origin-when-cross-origin` | Limitar dados de referrer |
| `theme-color`             | `#10b981`                         | Experiência PWA           |

## 5. Autenticação

- **Supabase Auth** — gerenciamento seguro de sessões
- **OAuth2** — Login com Google e Facebook
- **Session persistence** — `localStorage` com `autoRefreshToken`
- **Rate limiting** — ⚠️ **A implementar** via edge function

## 6. Tratamento de Erros

- Mensagens de erro genéricas para o usuário
- Nunca expõe stack traces ou detalhes de implementação
- Exemplo: `"Erro de configuração. Contate o administrador do sistema."`

## 7. Conformidade LGPD

| Princípio                   | Implementação                              |
| --------------------------- | ------------------------------------------ |
| **Base legal**              | Execução de contrato (art. 7º, II)         |
| **Consentimento**           | Checkbox no cadastro (a implementar)       |
| **Minimização**             | Coleta apenas nome, email, senha           |
| **Direito ao esquecimento** | ⚠️ **A implementar** — endpoint de deleção |
| **Retenção**                | Política de 24 meses após última atividade |

## 8. SAST/DAST no Pipeline

GitHub Actions:

1. **npm audit** — Verifica vulnerabilidades de dependências (nível high+)
2. **CodeQL** — Análise estática de código completa

## 9. Checklist de Segurança

- [x] `.env` no `.gitignore`
- [x] Segredos via variáveis de ambiente
- [x] CSP configurada
- [x] Sanitização XSS (DOMPurify)
- [x] Headers de segurança
- [x] Mensagens de erro genéricas
- [x] npm audit no CI
- [x] CodeQL (SAST) no CI
- [ ] Rate limiting no login
- [ ] Cookie Secure flag (Supabase managed)
- [ ] Política de Privacidade (LGPD)
- [ ] Direito ao esquecimento
- [ ] Testes de penetração

## 10. Incident Response

1. **Detecção:** `npm audit`, CodeQL, revisão manual
2. **Contenção:** Revert commit, bloquear acesso
3. **Erratação:** Rotacionar credenciais, corrigir código
4. **Lições aprendidas:** Atualizar este documento

---

_Última atualização: 2025-01-15_
