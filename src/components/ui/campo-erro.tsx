// Mensagem de erro dos campos do formulario (React Hook Form).
// role="alert" faz o leitor de tela anunciar o erro assim que ele aparece.
interface CampoErroProps {
  mensagem?: string;
}

export function CampoErro({ mensagem }: CampoErroProps) {
  if (!mensagem) {
    return null;
  }

  return (
    <span role="alert" className="mt-1 block text-sm font-semibold text-erro">
      {mensagem}
    </span>
  );
}
