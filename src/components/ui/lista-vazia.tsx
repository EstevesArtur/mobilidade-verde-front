// Estado VAZIO: a API respondeu, mas nao ha registros para mostrar.
interface ListaVaziaProps {
  mensagem: string;
}

export function ListaVazia({ mensagem }: ListaVaziaProps) {
  return (
    <p className="py-8 text-center text-sm text-grafite-500">{mensagem}</p>
  );
}
