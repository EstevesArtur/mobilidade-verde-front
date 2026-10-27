export type TamanhoLogo = "sm" | "md" | "lg";

const TAMANHOS: Record<TamanhoLogo, string> = {
  sm: "h-10 w-10 rounded-[10px] text-sm",
  md: "h-14 w-14 rounded-[14px] text-base",
  lg: "h-16 w-16 rounded-[16px] text-lg",
};

// Uma cor por operadora (as 5 que a API devolve hoje). Operadora nova
// que vier do banco cai no gradiente padrao verde Soul.
const GRADIENTES: Record<string, string> = {
  top: "bg-gradient-to-br from-transito-700 to-transito-500",
  sptrans: "bg-gradient-to-br from-[#C0392B] to-[#E0573F]",
  "metrô sp": "bg-gradient-to-br from-[#1B4F9C] to-[#3B7DD8]",
  cptm: "bg-gradient-to-br from-[#5B2C83] to-[#8E5BBE]",
  emtu: "bg-gradient-to-br from-[#B7791F] to-[#E0A43A]",
};

function gradiente(nome: string): string {
  return GRADIENTES[nome.toLowerCase()] ?? "bg-gradient-to-br from-soul-700 to-soul-500";
}

interface OperadoraLogoProps {
  nome: string;
  tamanho?: TamanhoLogo;
  className?: string;
}

export function OperadoraLogo({
  nome,
  tamanho = "md",
  className = "",
}: OperadoraLogoProps) {
  return (
    <span
      aria-hidden="true"
      className={
        "font-display grid place-items-center font-extrabold text-white " +
        TAMANHOS[tamanho] +
        " " +
        gradiente(nome) +
        " " +
        className
      }
    >
      {nome.slice(0, 2).toUpperCase()}
    </span>
  );
}
