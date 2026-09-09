import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-soul-900 py-16 pb-6 text-soul-100">
      <div className="mx-auto max-w-[1140px] px-6">
        <div className="mb-12 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display flex items-center gap-2 text-lg font-extrabold text-white">
              <span
                aria-hidden="true"
                className="grid h-[34px] w-[34px] place-items-center rounded-[10px] bg-gradient-to-br from-soul-700 to-soul-500 font-extrabold text-white"
              >
                M
              </span>
              Mobilidade Verde
            </p>
            <p className="mt-3 text-sm opacity-80">
              Feature de resgate dentro do ecossistema SoulUp / Prospera.
              Projeto acadêmico FIAP — Challenge SoulUp 2026.
            </p>
          </div>

          <nav aria-label="Rodapé — navegação">
            <h4 className="mb-4 text-sm font-bold tracking-[0.04em] text-white uppercase">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="opacity-80 hover:opacity-100">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="opacity-80 hover:opacity-100">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/faq" className="opacity-80 hover:opacity-100">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contato" className="opacity-80 hover:opacity-100">
                  Contato
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Rodapé — projeto">
            <h4 className="mb-4 text-sm font-bold tracking-[0.04em] text-white uppercase">
              Projeto
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/integrantes" className="opacity-80 hover:opacity-100">
                  Integrantes
                </Link>
              </li>
              <li>
                <Link to="/carteira" className="opacity-80 hover:opacity-100">
                  Carteira
                </Link>
              </li>
              <li>
                <Link to="/resgatar" className="opacity-80 hover:opacity-100">
                  Resgatar
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-wrap justify-between gap-2 border-t border-white/10 pt-4 text-xs opacity-70">
          <span>Turma 1TDSPX-2026 · FIAP</span>
          <span>&copy; 2026 Mobilidade Verde — projeto acadêmico</span>
        </div>
      </div>
    </footer>
  );
}
