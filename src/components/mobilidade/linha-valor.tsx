import type { ReactNode } from "react";

// Traducao do .value-row: aparece 14 vezes na pagina Sobre.
interface LinhaValorProps {
  icone: string;
  titulo: string;
  descricao: ReactNode;
}

export function LinhaValor({ icone, titulo, descricao }: LinhaValorProps) {
  return (
    <div className="flex items-start gap-4 border-b border-linha py-4 last:border-0">
      <span aria-hidden="true" className="flex-none text-2xl">
        {icone}
      </span>
      <div>
        <h3 className="font-display font-bold text-soul-900">{titulo}</h3>
        <p className="text-sm text-grafite-700">{descricao}</p>
      </div>
    </div>
  );
}
