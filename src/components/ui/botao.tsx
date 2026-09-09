import type { ButtonHTMLAttributes, ReactNode } from "react";

export type VarianteBotao = "primario" | "transito" | "fantasma";
export type TamanhoBotao = "md" | "lg";

// Traducao literal do .btn do components.css da Sprint 1+2.
// cursor-pointer e obrigatorio: o Preflight do Tailwind v4 usa cursor default.
const BASE =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-pilula font-display font-bold transition duration-150 hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-transito-500 disabled:cursor-not-allowed disabled:opacity-[0.45] disabled:shadow-none disabled:hover:translate-y-0 disabled:hover:shadow-none";

const VARIANTES: Record<VarianteBotao, string> = {
  primario:
    "bg-soul-700 text-white shadow-card hover:bg-soul-600 hover:shadow-alta",
  transito: "bg-transito-700 text-white shadow-card hover:bg-transito-500",
  fantasma:
    "border-[1.5px] border-soul-300 bg-white text-soul-700 hover:border-soul-500 hover:bg-soul-100",
};

const TAMANHOS: Record<TamanhoBotao, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-12 py-4 text-base",
};

// Exportada para o BotaoLink reaproveitar exatamente o mesmo visual.
export function classesBotao(
  variante: VarianteBotao = "primario",
  tamanho: TamanhoBotao = "md",
  bloco = false
): string {
  return [BASE, VARIANTES[variante], TAMANHOS[tamanho], bloco ? "w-full" : ""]
    .join(" ")
    .trim();
}

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variante?: VarianteBotao;
  tamanho?: TamanhoBotao;
  bloco?: boolean;
}

export function Botao({
  children,
  variante = "primario",
  tamanho = "md",
  bloco = false,
  className = "",
  type = "button",
  ...resto
}: BotaoProps) {
  return (
    <button
      type={type}
      className={classesBotao(variante, tamanho, bloco) + " " + className}
      {...resto}
    >
      {children}
    </button>
  );
}
