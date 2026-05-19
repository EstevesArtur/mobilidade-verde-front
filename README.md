# 🌱 Mobilidade Verde

> **Seus Pontos ECOA viraram passagem.**
> Feature de **resgate** dentro do ecossistema SoulUp / Prospera: troca de Pontos ECOA por cupom real de transporte público (TOP e SPTrans).

Projeto acadêmico desenvolvido para o **Challenge SoulUp 2026** — FIAP, 1º ano de Análise e Desenvolvimento de Sistemas.

---

## 👥 Integrantes — Turma 1TDSPX-2026

| Nome | RM | Papel |
|---|---|---|
| Diego Barbosa | RM568829 | Integrante |
| **Artur Esteves** | **RM569450** | **Representante** |
| João Fontenele | RM570783 | Integrante |
| Vinicius Pacheco | RM571109 | Integrante |
| Yan Almeida | RM568814 | Integrante |

---

## 🎯 Tese central

A geração de Pontos ECOA já existe na SoulUp e **não é nosso escopo**. A Mobilidade Verde
adiciona um **novo caminho de resgate**: o usuário converte seus pontos em cupom real de
transporte público. A Prospera financia o cupom como custo de aquisição (CAC) para a
Energia Verde; a operadora recebe o valor cheio. O impacto de CO₂ evitado é mensurável
e auditável por viagem.

Caminho desenhado pelo front:

```
carteira.html  →  resgatar.html  →  cupom.html
(ver saldo)       (operadora+faixa)  (código + QR + impacto)
```

---

## 🗂️ Estrutura de pastas

```
mobilidade-verde-front/
├── index.html            # Hero + 3 passos + credibilidade
├── sobre.html            # Contexto SoulUp/Prospera + tese + valor
├── integrantes.html      # 5 cards (nome, RM, turma, representante)
├── faq.html              # 8 perguntas (acordeão vanilla)
├── contato.html          # Formulário validado + espaço do chatbot
├── carteira.html         # Saldo ECOA + histórico (Passo 1-2)
├── resgatar.html         # Operadora + faixa + confirmação (Passo 3-5)
├── cupom.html            # Código + QR + validade + impacto (Passo 6-7)
├── css/
│   ├── reset.css         # Normalização
│   ├── tokens.css        # Design tokens (paleta SoulUp)
│   ├── layout.css        # Grid, header, footer, responsivo
│   └── components.css    # Botões, cards, cupom, carteira
├── js/
│   ├── mock-data.js      # Dados espelhando o DDL do banco
│   ├── main.js           # Nav mobile, FAQ, validação, reveal
│   ├── carteira.js       # Renderiza saldo + histórico
│   ├── resgatar.js       # Fluxo operadora → faixa → cupom
│   └── cupom.js          # Código, QR, contagem regressiva, CO₂
├── img/
│   ├── top.svg           # Logo mockado TOP
│   └── sptrans.svg       # Logo mockado SPTrans
└── README.md
```

---

## ▶️ Como rodar

Não há build nem dependências. Basta:

```bash
# clonar e abrir
git clone <url-do-repositorio>
cd mobilidade-verde-front
# abrir index.html no navegador (duplo clique) — pronto.
```

> Dica: para testar a navegação por querystring (`cupom.html`), sirva localmente:
> `python3 -m http.server 8080` e acesse `http://localhost:8080`.

---

## 🛠️ Tecnologias

- **HTML5** puro
- **CSS** puro (Flexbox, Grid, variáveis CSS, media queries)
- **JavaScript** vanilla (fetch/DOM/`URLSearchParams`)
- **Google Fonts** via `<link>` (Sora + Manrope)
- **API externa de QR Code** via `<img>` (`api.qrserver.com`)

### ⚠️ ZERO framework usado

Não há React, Vue, Angular, Bootstrap, Tailwind, jQuery, Sass ou qualquer
biblioteca de terceiros. Todo o CSS e JS é autoral e pode ser auditado
arquivo por arquivo.

---

## 🎨 Identidade visual

Paleta ancorada na marca real **SoulUp / Prospera**:

- **Verde Soul** — núcleo da marca sustentável (CTAs, marca)
- **Âmbar ECOA** — moeda Pontos ECOA / Selo Verde (saldo, valores)
- **Azul-trânsito** — única cor de inovação, escopo restrito à camada de
  transporte (operadoras, trilha de resgate, cupom)

Tipografia: **Sora** (display) + **Manrope** (corpo).

---

## 🔗 Integração com o restante do produto

`mock-data.js` espelha os nomes de campo do DDL
(`mobilidade_verde_ddl.sql`) — `id_usuario`, `saldo_pontos`, `id_operadora`,
`valor_centavos`, `pontos_necessarios`, `codigo`, `status`, `expira_em` etc.
Isso prepara o front para consumir a API real (Java) nas Sprints 3-4 sem
reescrever a camada de dados.

---

## 🚀 Roadmap (Sprints 3-4)

- Consumo de API real (Java) substituindo `mock-data.js`
- Autenticação de usuário e sessão
- Novas operadoras (modelagem já extensível)
- Histórico de viagens e dashboard de impacto acumulado
- Tema escuro (tokens já preparados em `tokens.css`)

---

© 2026 Mobilidade Verde — Turma 1TDSPX-2026 · FIAP · projeto acadêmico.
