import type { ReactNode } from "react";

// Junta o .eyebrow e o .section-title, que sempre apareciam colados.
// O h2 traz font-display/font-bold/text-soul-900 explicitos porque o
// Preflight do Tailwind nao estiliza titulos.
interface TituloSecaoProps {
  titulo: ReactNode;
  sobretitulo?: string;
  centralizado?: boolean;
  className?: string;
}

export function TituloSecao({
  titulo,
  sobretitulo,
  centralizado = false,
  className = "",
}: TituloSecaoProps) {
  return (
    <div className={(centralizado ? "text-center " : "") + className}>
      {sobretitulo && (
        <p className="font-display text-xs font-extrabold tracking-[0.14em] text-soul-600 uppercase">
          {sobretitulo}
        </p>
      )}
      <h2 className="font-display mt-2 mb-8 text-3xl leading-[1.15] font-bold text-soul-900 md:text-4xl">
        {titulo}
      </h2>
    </div>
  );
}
