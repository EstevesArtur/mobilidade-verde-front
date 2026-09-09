// Traducao do .step, que usava counter() no CSS. Aqui o numero e prop.
interface PassoItemProps {
  numero: number;
  titulo: string;
  descricao: string;
}

export function PassoItem({ numero, titulo, descricao }: PassoItemProps) {
  return (
    <li className="relative pl-16">
      <span
        aria-hidden="true"
        className="font-display absolute top-0 left-0 grid h-11 w-11 place-items-center rounded-full bg-soul-700 font-extrabold text-white"
      >
        {numero}
      </span>
      <h3 className="font-display mb-1 text-lg font-bold text-soul-900">
        {titulo}
      </h3>
      <p className="text-sm text-grafite-500">{descricao}</p>
    </li>
  );
}
