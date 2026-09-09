export default function App() {
  return (
    <div className="min-h-screen bg-areia font-body text-grafite-700">
      <header className="bg-soul-900 px-6 py-12 text-white">
        <div className="mx-auto max-w-[1140px]">
          <p className="text-xs font-bold tracking-[0.14em] text-soul-300 uppercase">
            Checagem de ambiente
          </p>
          <h1 className="font-display mt-2 text-3xl font-extrabold md:text-4xl lg:text-5xl">
            Mobilidade Verde
          </h1>
          <p className="mt-3 text-soul-100">
            React + Vite + TypeScript + TailwindCSS v4
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[1140px] px-6 py-12">
        <section className="rounded-card bg-white p-6 shadow-card">
          <h2 className="font-display text-xl font-bold text-soul-900">
            Se este bloco esta com fundo branco, cantos arredondados e sombra, o
            Tailwind esta funcionando.
          </h2>

          <p className="mt-6 text-sm font-bold text-grafite-500 uppercase">
            Paleta carregada do @theme
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <span className="rounded-pilula bg-soul-700 px-4 py-2 text-sm font-bold text-white">
              Verde Soul
            </span>
            <span className="rounded-pilula bg-ecoa-500 px-4 py-2 text-sm font-bold text-soul-900">
              Ambar ECOA
            </span>
            <span className="rounded-pilula bg-transito-700 px-4 py-2 text-sm font-bold text-white">
              Azul-transito
            </span>
          </div>

          <p className="mt-8 text-sm font-bold text-grafite-500 uppercase">
            Breakpoint atual (estreite a janela para testar)
          </p>
          <p className="rounded-suave mt-3 border border-linha bg-areia p-4 font-bold text-soul-700">
            <span className="sm:hidden">Mobile - abaixo de 480px</span>
            <span className="hidden sm:inline md:hidden">
              Faixa intermediaria - 480px a 767px
            </span>
            <span className="hidden md:inline lg:hidden">
              Tablet - 768px a 991px
            </span>
            <span className="hidden lg:inline">Desktop - 992px ou mais</span>
          </p>
        </section>
      </main>
    </div>
  );
}
