import type { FaixaCupom } from "../../types/faixa-cupom";
import { Badge } from "../ui/badge";
import { fmtPontos, fmtReais } from "../../utils/formato";

interface FaixaCardProps {
  faixa: FaixaCupom;
  selecionada: boolean;
  desabilitada: boolean;
  onSelecionar: (faixa: FaixaCupom) => void;
}

export function FaixaCard({
  faixa,
  selecionada,
  desabilitada,
  onSelecionar,
}: FaixaCardProps) {
  const borda = selecionada
    ? "border-soul-600 bg-soul-100"
    : "border-linha bg-white hover:border-soul-300";

  return (
    <button
      type="button"
      aria-pressed={selecionada}
      disabled={desabilitada}
      onClick={() => onSelecionar(faixa)}
      className={
        "w-full cursor-pointer rounded-card border-2 px-4 py-6 text-center transition duration-150 hover:-translate-y-0.5 motion-reduce:transition-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-transito-500 disabled:cursor-not-allowed disabled:opacity-[0.55] disabled:hover:translate-y-0 " +
        borda
      }
    >
      <span className="font-display block text-4xl font-extrabold text-soul-900">
        {fmtReais(faixa.valor_centavos)}
      </span>
      <span className="mt-1 block text-sm font-bold text-ecoa-700">
        {fmtPontos(faixa.pontos_necessarios)} pts
      </span>
      {desabilitada && (
        <Badge tom="expirado" className="mt-2">
          Saldo insuficiente
        </Badge>
      )}
    </button>
  );
}
