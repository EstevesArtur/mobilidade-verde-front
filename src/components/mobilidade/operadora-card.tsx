import { Link } from "react-router-dom";
import type { Operadora } from "../../types/operadora";
import { OperadoraLogo } from "./operadora-logo";
import { Badge } from "../ui/badge";
import { fmtReais } from "../../utils/formato";

// Sem onSelecionar o card vira link para a rota dinamica /operadoras/:id.
// Com onSelecionar ele vira botao de escolha, usado na pagina Resgatar.
interface OperadoraCardProps {
  operadora: Operadora;
  selecionada?: boolean;
  onSelecionar?: (operadora: Operadora) => void;
}

export function OperadoraCard({
  operadora,
  selecionada = false,
  onSelecionar,
}: OperadoraCardProps) {
  const borda = selecionada
    ? "border-transito-700 shadow-alta"
    : operadora.featured
      ? "border-soul-300 shadow-card"
      : "border-linha shadow-card";

  const classes =
    "block w-full cursor-pointer rounded-grande border-2 bg-white p-8 text-left transition duration-200 hover:-translate-y-1 motion-reduce:transition-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-transito-500 " +
    borda;

  const conteudo = (
    <>
      <OperadoraLogo nome={operadora.nome} tamanho="md" className="mb-4" />
      <h3 className="font-display flex flex-wrap items-center gap-2 text-lg font-bold text-soul-900">
        {operadora.nome}
        {operadora.featured && <Badge tom="soul">Destaque</Badge>}
      </h3>
      <p className="mt-1 text-sm text-grafite-500">
        {operadora.cidade} · {operadora.modal.toLowerCase()} · passagem{" "}
        {fmtReais(operadora.valor_passagem_centavos)}
      </p>
    </>
  );

  if (!onSelecionar) {
    return (
      <Link to={"/operadoras/" + operadora.id_operadora} className={classes}>
        {conteudo}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={selecionada}
      onClick={() => onSelecionar(operadora)}
      className={classes}
    >
      {conteudo}
    </button>
  );
}
