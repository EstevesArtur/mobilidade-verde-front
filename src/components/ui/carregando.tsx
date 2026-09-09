interface CarregandoProps {
  mensagem?: string;
}

export function Carregando({ mensagem = "Carregando..." }: CarregandoProps) {
  return (
    <p role="status" aria-live="polite" className="py-12 text-center text-grafite-500">
      {mensagem}
    </p>
  );
}
