import type { ReactNode } from "react";

export interface ItemValor {
  icone: string;
  titulo: string;
  descricao: ReactNode;
}

export const COMO_AGREGAMOS_VALOR: ItemValor[] = [
  { icone: "📈", titulo: "Volume", descricao: "Novo motivo de uso recorrente do app — transporte é diário." },
  { icone: "🔄", titulo: "Retenção", descricao: "Pontos viram benefício tangível e frequente, não esporádico." },
  { icone: "🌍", titulo: "ESG", descricao: "Impacto de CO₂ evitado mensurável e auditável por viagem." },
  { icone: "⚡", titulo: "Zero CAC extra", descricao: "O cupom é o próprio custo de aquisição já previsto pela Prospera." },
];

export const STACK: ItemValor[] = [
  { icone: "⚛️", titulo: "React + Vite + TypeScript", descricao: "SPA componentizada, com tipagem estática em componentes, props e dados." },
  { icone: "🎨", titulo: "TailwindCSS v4", descricao: "Estilização por classes utilitárias, com a paleta SoulUp e as fontes no @theme. Zero CSS externo." },
  { icone: "🧭", titulo: "React Router DOM", descricao: "Navegação sem recarregar a página, com layout compartilhado, rotas estáticas e rotas dinâmicas." },
  { icone: "📝", titulo: "React Hook Form", descricao: "Formulário de contato com validação e mensagens de erro tipadas." },
  { icone: "🔤", titulo: "Tipografia e ícones", descricao: "Google Fonts (Sora + Manrope) e ícones em SVG inline para LinkedIn e GitHub." },
  { icone: "📍", titulo: "API externa de QR Code", descricao: "Geração visual do cupom via api.qrserver.com usando tag img, sem instalar bibliotecas." },
];

export const ROADMAP: ItemValor[] = [
  { icone: "🔗", titulo: "Integração com a API Java", descricao: "A camada de serviços já devolve Promise: basta trocar o dado local por fetch nos endpoints da disciplina de DDD." },
  { icone: "🔒", titulo: "Autenticação e sessão", descricao: "Login real de usuário e proteção das rotas sensíveis (saldo e resgate)." },
  { icone: "☁️", titulo: "Deploy na Vercel", descricao: "Publicação da aplicação consumindo remotamente a API, exigida na Sprint 4." },
  { icone: "🚌", titulo: "Novas operadoras", descricao: "Inclusão de outras bilhetagens (MetrôRio, EMTU) — a modelagem já é extensível." },
  { icone: "📊", titulo: "Dashboard de impacto", descricao: "Histórico acumulado de CO₂ evitado por usuário e meta semanal." },
];
