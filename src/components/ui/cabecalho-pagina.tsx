// Traducao do .page-head: a faixa verde no topo das paginas internas.
interface CabecalhoPaginaProps {
  titulo: string;
  descricao: string;
}

export function CabecalhoPagina({ titulo, descricao }: CabecalhoPaginaProps) {
  return (
    <header className="bg-gradient-to-br from-soul-900 to-soul-700 py-16 text-white">
      <div className="mx-auto w-full max-w-[1140px] px-4 sm:px-6">
        <h1 className="font-display text-4xl leading-[1.15] font-bold text-white md:text-5xl">
          {titulo}
        </h1>
        <p className="mt-3 max-w-[60ch] text-soul-100">{descricao}</p>
      </div>
    </header>
  );
}
