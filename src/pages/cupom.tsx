import { useParams } from "react-router-dom";

export function Cupom() {
  const { codigo } = useParams();

  return (
    <h1 className="p-6 text-2xl font-bold">Cupom — codigo: {codigo}</h1>
  );
}
