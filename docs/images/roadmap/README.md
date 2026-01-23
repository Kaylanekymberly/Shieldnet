# Roadmap do ShieldNet 🛡️

![Status](https://img.shields.io/badge/Status-Sprint%202%20Concluída-success)
![Version](https://img.shields.io/badge/Version-0.2.1-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![LGPD](https://img.shields.io/badge/LGPD-Compliant-brightgreen)
![COPPA](https://img.shields.io/badge/COPPA-Compliant-brightgreen)

**Proteção Digital Inteligente para Crianças e Adolescentes**

[🌐 Landing Page](#) • [📖 Documentação](#) • [🐛 Reportar Bug](#) • [💬 Discord Community](#)

---

##  Destaque de Segurança e Compliance

**PRIORIDADE MÁXIMA**: Como trabalhamos com dados de menores de idade, a conformidade legal é não-negociável.

| Legislação | Status | Documentação |
|-----------|--------|--------------|
| 🇧🇷 LGPD (Lei Geral de Proteção de Dados) |  Compliant | [Política de Privacidade](#) |
| 🇺🇸 COPPA (Children's Online Privacy Protection Act) |  Compliant | [COPPA Compliance](#) |
| 🇪🇺 GDPR (General Data Protection Regulation) |  Em andamento | [Roadmap GDPR](#) |

### Princípios de Privacy-by-Design
-  **Minimização de Dados**: Coletamos apenas o essencial (palavras-chave bloqueadas, timestamps)
-  **Processamento Local**: Análise de conteúdo ocorre no navegador (zero envio para servidores)
-  **Consentimento Parental**: Termo de aceite obrigatório antes da instalação
-  **Direito ao Esquecimento**: Remoção completa de dados em até 48h mediante solicitação
-  **Criptografia**: Dados sensíveis criptografados com AES-256
-  **Auditoria**: Logs imutáveis de acesso a dados pessoais (em desenvolvimento)

[ Termos de Uso](#) | [ Política de Cookies](#)

---

##  Visão Geral do Projeto

**ShieldNet** é uma extensão Chrome que oferece controle parental inteligente através de:

-  Bloqueio de conteúdo inadequado em tempo real
-  Monitoramento de atividades online (com transparência total)
-  Relatórios detalhados para responsáveis
-  Detecção assistida por IA (planejado)

**Diferencial Competitivo**: Combinação de tecnologia de ponta com respeito absoluto à privacidade das famílias.


##  Progresso do Roadmap

### 🟢 Curto Prazo (Sprint 1-2) - **100% CONCLUÍDO** ✅

#### Entregas Realizadas

- [x] **Infraestrutura Base**
  -  Estrutura de pastas profissional (`background/`, `content-scripts/`, `popup/`, `assets/`)
  -  Manifest V3 configurado corretamente
  -  TypeScript + Vite configurados
  -  ESLint + Prettier implementados

- [x] **Sistema de Keywords**
  -  Base de dados inicial com 3 níveis de proteção (level1, level2, level3)
  -  Arquivo `keywords.json` estruturado e validado
  -  Categorização por severidade implementada

- [x] **Integração Git/GitHub**
  -  Repositório remoto configurado
  -  Fluxo de trabalho com branches (`main`, `develop`)
  -  Boas práticas de commit (`feat:`, `fix:`, `docs:`)
  -  Merge bem-sucedido de 12 arquivos principais

- [x] **Documentação Técnica**
  -  README.md profissional com badges
  -  Documentação de arquitetura
  -  Guia de contribuição

- [x] **Landing Page**
  -  Design responsivo implementado
  -  Lighthouse Score: 95/100
  -  Formulário de captura de emails funcional

---

### 🟡 Médio Prazo (Sprint 3-5) - **EM ANDAMENTO** (50% Completo)

**Data de Início**: 24/01/2026  
**Previsão de Conclusão**: 21/02/2026

####  Tasks Ativas

- [x] **Painel de Configurações** - 50% concluído
  -  Estrutura base do `popup/` criada
  -  Manifest.json com permissões configuradas
  -  Interface de usuário (UI) em desenvolvimento
  -  Integração com chrome.storage pendente

- [ ] **Lógica de Bloqueio Ativo** - 30% concluído
  -  Content scripts estruturados
  -  Função de escuta de digitação em desenvolvimento
  -  Comparação com keywords.json pendente
  -  Sistema de alertas visuais pendente

- [ ] **Monitoramento de Navegação** - 20% concluído
  -  Background script base criado
  -  Interceptação de webRequest em desenvolvimento
  -  Análise de URLs em tempo real pendente
  -  Log de atividades pendente

- [ ] **Relatórios para Responsáveis** - 10% concluído
  -  Estrutura de dados planejada
  -  Dashboard de visualização pendente
  -  Exportação de relatórios (PDF/CSV) pendente

####  Próximas Metas Técnicas (Semana 25/01 - 31/01)

1. **Implementar Listener de Input** (`content-scripts/content.ts`)
   ```typescript
   // Escutar todos os inputs de texto do usuário
   document.addEventListener('input', (e) => {
     const text = (e.target as HTMLInputElement).value;
     checkAgainstKeywords(text);
   });
   ```

2. **Criar Função de Comparação** (`content-scripts/keyword-matcher.ts`)
   - Carregar keywords.json via chrome.storage
   - Implementar algoritmo de matching eficiente
   - Detectar variações (l33t speak, espaços extras)
   - ** Usar `fast-levenshtein`** para distância de edição (detecta "drooga", "dr0ga", erros de digitação)
   - ** Implementar debounce (300ms)** para não travar digitação em PCs lentos

3. **Sistema de Bloqueio Visual**
   - Modal de aviso quando keyword detectada
   - Opção de override para falsos positivos
   - Notificação para o responsável

---

###  Longo Prazo (Sprint 6-10) - **PLANEJADO**

**Data Prevista**: Março - Dezembro 2026

#### Funcionalidades Avançadas

- [ ] **Detecção por IA**
  - ** PRIORIDADE: Gemini Nano (Chrome Built-in AI)** - Roda no navegador, custo $0, reforça "Processamento Local"
  - Fallback: Anthropic Claude API (apenas quando Gemini Nano indisponível)
  - OpenAI GPT-4 (último recurso)
  - Análise semântica de contexto
  - Detecção de cyberbullying
  - Cache inteligente (Redis) - apenas para APIs externas

- [ ] **Dashboard Web**
  - Portal para responsáveis (Next.js)
  - Visualização de relatórios em tempo real
  - Configurações remotas
  - Multi-dispositivo

- [ ] **Versão Premium**
  - Relatórios avançados
  - IA sem limites
  - Suporte prioritário
  - Whitelist/Blacklist customizável

- [ ] **Expansão de Plataformas**
  - Firefox Extension
  - Edge Extension
  - Safari Extension (WebKit)

---

##  Métricas de Sucesso (KPIs)

### Curto Prazo (✅ Completado)

| Métrica | Meta | Alcançado | Status |
|---------|------|-----------|--------|
| Emails coletados | 50 | **127** | 🟢 +154% |
| Visitas landing page | 100 | **342** | 🟢 +242% |
| Bugs críticos | 0 | **0** | 🟢 100% |
| Lighthouse Score | 90+ | **95** | 🟢 ✓ |
| **Arquivos no repositório** | **10** | **12** | 🟢 **+20%** |

### Médio Prazo ( Em Progresso)

| Métrica | Meta | Atual | Prazo | Status |
|---------|------|-------|-------|--------|
| Usuários beta ativos | 50 | 12 | 21/02/26 | 🟡 24% |
| Taxa de retenção (30d) | 80% | - | 01/03/26 |  Pendente |
| Avaliação média | 4.0★ | - | 28/02/26 |  Pendente |
| Feedbacks coletados | 50 | 8 | 28/02/26 | 🟡 16% |
| Acurácia detecção | 85% | 73% | 15/02/26 | 🟡 86% |
| **Funcionalidades core** | **4** | **2** | **21/02/26** | 🟡 **50%** |

### Longo Prazo

| Métrica | Meta | Prazo |
|---------|------|-------|
| Instalações Chrome Store | 10.000 | Dez/2026 |
| Usuários pagantes | 1.000 (10% conversão) | Dez/2026 |
| MRR (Monthly Recurring Revenue) | R$ 28.000 | Dez/2026 |
| Parcerias ativas | 5+ instituições | Ago/2026 |
| NPS (Net Promoter Score) | 50+ | Dez/2026 |

---

##  Stack Tecnológica Completa

### Frontend

**Linguagens:**
- TypeScript 5.3+
- HTML5, CSS3

**Frameworks/Libraries:**
- React 18.2 (interface da extensão)
- Tailwind CSS 3.4 (estilização)
- Framer Motion (animações)
- Chart.js (gráficos de relatórios)
- Lucide React (ícones)
- ** fast-levenshtein** (matching fuzzy de keywords)

**Build Tools:**
- Vite 5.0 (bundler)
- ESLint + Prettier (linting)
- TypeScript Compiler

### Backend & APIs

**Runtime:**
- Node.js 20 LTS (futuro backend)

**APIs Externas:**
- ** Gemini Nano (Chrome Built-in AI)** - IA local, custo $0, disponível no Chrome 121+
- Anthropic Claude API (fallback para análise de IA)
- OpenAI GPT-4 (último recurso)
- Chrome Extension APIs (Manifest V3):
  - `chrome.storage` (dados locais)
  - `chrome.webRequest` (interceptação)
  - `chrome.tabs` (gerenciamento)
  - `chrome.alarms` (tarefas agendadas)
  - ** `chrome.aiOriginTrial`** (acesso ao Gemini Nano)

**Database (futuro):**
- PostgreSQL 16 (dados de usuários premium)
- Redis 7 (cache de análises IA)

### DevOps & Infra

**Hospedagem:**
- Vercel (landing page) - Gratuito
- Railway (backend futuro) - $5-20/mês
- Cloudflare (CDN + DDoS protection) - Gratuito

**CI/CD:**
- GitHub Actions:
  - Testes automatizados (Jest)
  - Build da extensão
  - Deploy da landing page
  - Análise de código (SonarCloud)

**Monitoramento:**
- Sentry (erros em produção) - Gratuito até 5k eventos/mês
- Google Analytics 4 (métricas de uso)
- Hotjar (heatmaps) - Trial 15 dias

**Segurança:**
- Snyk (scan de vulnerabilidades)
- OWASP ZAP (testes de penetração)
- Let's Encrypt (SSL/TLS)

### Ferramentas de Desenvolvimento

**Design:**
- Figma (protótipos de UI)
- Excalidraw (diagramas)

**Comunicação:**
- Discord (comunidade beta)
- Notion (documentação interna)
- Linear (issue tracking)

**Testes:**
- Jest (testes unitários)
- Playwright (E2E)
- Lighthouse CI (performance)

---

##  Gestão de Riscos

| # | Risco | Probabilidade | Impacto | Mitigação | Responsável | Status |
|---|-------|---------------|---------|-----------|-------------|--------|
| 1 | Falsos positivos frequentes irritam usuários | 🟡 Média | 🔴 Alto | Testes A/B com 3 níveis de sensibilidade + whitelist automática + **algoritmo fuzzy (Levenshtein)** | Dev Lead |  Ativo |
| 2 | Custo elevado de APIs IA ($800+/mês) | 🟢 Baixa | 🟡 Médio | **Priorizar Gemini Nano (custo $0)** + cache agressivo (7d TTL) + modelos locais TensorFlow.js | CTO | ✅ Mitigado |
| 3 | Rejeição na Chrome Web Store | 🟡 Média | 🔴 Alto | Seguir guidelines ao pé da letra + pre-review com expert | Product Manager |  Monitorando |
| 4 | Baixa adoção inicial (< 500 usuários) | 🟡 Média | 🟡 Médio | Freemium generoso + marketing em comunidades de pais | Growth Hacker |  Ativo |
| 5 | Processo legal por violação de privacidade | 🟢 Baixa | 🔴 Crítico | Compliance rigoroso (LGPD/COPPA) + auditoria externa | Legal Advisor | ✅ Mitigado |
| 6 | Concorrência de players grandes (Google Family Link) | 🔴 Alta | 🟡 Médio | Foco em nicho (adolescentes) + features exclusivas (IA contextual) | CEO |  Estratégia definida |
| 7 | ** Performance do navegador degradada** | 🟡 Média | 🔴 Alto | **Debounce 300ms** no listener de input + Web Workers para processamento pesado + lazy loading de keywords | Tech Lead |  Ativo |

---

##  Próximos Passos Imediatos (Esta Semana)

### Prioridade ALTA 🔴

1. **Implementar Listener de Input com Debounce**
   - Arquivo: `content-scripts/content.ts`
   - **🔧 Técnica**: Debounce de 300ms para evitar travar digitação
   - Tempo estimado: 5h (inclui testes de performance)
   - Blocker: Necessário para funcionalidade core

2. **Criar Keyword Matcher com Fuzzy Matching**
   - Arquivo: `content-scripts/keyword-matcher.ts`
   - **🔧 Biblioteca**: Instalar `fast-levenshtein` via npm
   - **🔧 Algoritmo**: Distância de edição ≤ 2 (detecta "drooga", "dr0ga")
   - Tempo estimado: 8h (inclui lógica fuzzy + testes)
   - Dependência: #1 acima

3. **Testar em Ambiente Real**
   - Carregar extensão no Chrome (modo desenvolvedor)
   - Testar em 10 sites diferentes (YouTube, Twitter, Discord, etc.)
   - **🔧 Monitorar**: Performance (CPU/RAM) usando Chrome DevTools
   - Coletar logs de erro

### Prioridade MÉDIA 🟡

4. **Melhorar UI do Popup**
   - Design no Figma
   - Implementar em React
   - Tempo estimado: 8h

5. **Adicionar Testes Unitários**
   - Cobertura mínima: 60%
   - Usar Jest + Testing Library

---

##  Contato e Suporte

- **Email**: suporte@shieldnet.com
- **Discord**: [Comunidade Beta](#)
- **GitHub Issues**: [Reportar Bug](#)
- **Documentação**: [Wiki Completa](#)

---

##  Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Última Atualização**: 23/01/2026 - v0.2.1  
**Responsável**: Kaylane Kimberly 
**Status**: Sprint 2 Concluída | Sprint 3 em Andamento
