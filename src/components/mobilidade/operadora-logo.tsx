export type TamanhoLogo = "sm" | "md" | "lg";

const TAMANHOS: Record<TamanhoLogo, string> = {
  sm: "h-10 w-10 rounded-[10px] text-sm",
  md: "h-14 w-14 rounded-[14px] text-base",
  lg: "h-16 w-16 rounded-[16px] text-lg",
};

// Gradientes exatos do .op-logo--top e .op-logo--sptrans do components.css.
function gradiente(nome: string): string {
  return nome.toLowerCase() === "top"
    ? "bg-gradient-to-br from-transito-700 to-transito-500"
    : "bg-gradient-to-br from-[#C0392B] to-[#E0573F]";
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
