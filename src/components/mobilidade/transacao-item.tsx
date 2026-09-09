import type { TransacaoPontos } from "../../types/transacao";
import { fmtDataCurta, fmtPontos } from "../../utils/formato";

interface TransacaoItemProps {
  transacao: TransacaoPontos;
}

export function TransacaoItem({ transacao }: TransacaoItemProps) {
  const entrada = transacao.tipo === "CREDITO";

  return (
    <li>
      <article className="flex items-center justify-between gap-4 border-b border-linha py-4 last:border-0">
        <span
          aria-hidden="true"
          className={
            "grid h-10 w-10 flex-none place-items-center rounded-xl text-[1.1rem] " +
            (entrada ? "bg-soul-100" : "bg-transito-100")
          }
        >
          {entrada ? "🌱" : "🎟️"}
        </span>

        <span className="flex-1">
          <span className="block text-sm font-semibold">
            {transacao.descricao}
          </span>
          <time
            dateTime={transacao.data_transacao}
            className="block text-xs text-grafite-500"
          >
            {fmtDataCurta(transacao.data_transacao)} ·{" "}
            {transacao.origem.replace(/_/g, " ").toLowerCase()}
          </time>
        </span>

        <span
          className={
            "font-display font-extrabold " +
            (entrada ? "text-soul-600" : "text-transito-700")
          }
        >
          {entrada ? "+" : "−"}
          {fmtPontos(transacao.pontos)}
        </span>
      </article>
    </li>
  );
}
