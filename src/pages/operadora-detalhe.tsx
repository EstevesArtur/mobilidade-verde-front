import { useParams } from "react-router-dom";

export function OperadoraDetalhe() {
  const { idOperadora } = useParams();

  return (
    <h1 className="p-6 text-2xl font-bold">Operadora — id: {idOperadora}</h1>
  );
}
