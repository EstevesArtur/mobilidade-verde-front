import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { classesBotao } from "./botao";
import type { VarianteBotao, TamanhoBotao } from "./botao";

// Mesmo visual do Botao, mas navega pelo React Router em vez de disparar acao.
interface BotaoLinkProps {
  para: string;
  children: ReactNode;
  variante?: VarianteBotao;
  tamanho?: TamanhoBotao;
  bloco?: boolean;
  className?: string;
}

export function BotaoLink({
  para,
  children,
  variante = "primario",
  tamanho = "md",
  bloco = false,
  className = "",
}: BotaoLinkProps) {
  return (
    <Link
      to={para}
      className={classesBotao(variante, tamanho, bloco) + " " + className}
    >
      {children}
    </Link>
  );
}
