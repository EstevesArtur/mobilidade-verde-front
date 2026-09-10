import { BotaoLink } from "../ui/botao-link";
import { fmtPontos } from "../../utils/formato";

// Traducao do .wallet-hero do components.css.
interface SaldoCardProps {
  nome: string;
  saldo: number;
}

export function SaldoCard({ nome, saldo }: SaldoCardProps) {
  return (
    <article className="rounded-grande bg-gradient-to-br from-soul-900 to-soul-600 px-6 py-10 text-white shadow-alta sm:px-12 sm:py-16">
      <p className="text-sm tracking-[0.06em] uppercase opacity-[0.78]">
        Olá, {nome.split(" ")[0]} · saldo Pontos ECOA
      </p>
      <p className="font-display mt-2 mb-1 text-5xl sm:text-[4rem] leading-[1.05] font-extrabold">
        {fmtPontos(saldo)} <span className="text-lg opacity-80">pts</span>
      </p>
      <p className="text-sm opacity-80">
        Lastreado em créditos de carbono e energia limpa · SoulUp
      </p>
      <BotaoLink para="/resgatar" variante="transito" tamanho="lg" className="mt-8">
        Trocar por cupom de transporte &rarr;
      </BotaoLink>
    </article>
  );
}
