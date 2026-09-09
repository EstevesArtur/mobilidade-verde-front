import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

// Lista unica de links: o menu desktop e o mobile leem daqui.
const LINKS = [
  { para: "/", rotulo: "Início" },
  { para: "/sobre", rotulo: "Sobre" },
  { para: "/carteira", rotulo: "Carteira" },
  { para: "/faq", rotulo: "FAQ" },
  { para: "/integrantes", rotulo: "Integrantes" },
  { para: "/contato", rotulo: "Contato" },
];

export function Header() {
  // useState 1 de 4 do projeto: controla o menu hamburguer no mobile.
  const [menuAberto, setMenuAberto] = useState(false);

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-linha bg-areia/90 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1140px] items-center justify-between px-6">
        <Link
          to="/"
          onClick={fecharMenu}
          className="font-display flex items-center gap-2 text-lg font-extrabold text-soul-900"
        >
          <span
            aria-hidden="true"
            className="grid h-[34px] w-[34px] place-items-center rounded-[10px] bg-gradient-to-br from-soul-700 to-soul-500 font-extrabold text-white"
          >
            M
          </span>
          Mobilidade Verde
        </Link>

        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto(!menuAberto)}
          className="h-[42px] w-[42px] rounded-[10px] border border-linha bg-white text-xl md:hidden"
        >
          &#9776;
        </button>

        <nav
          aria-label="Navegação principal"
          className={
            (menuAberto ? "flex" : "hidden") +
            " absolute top-[72px] right-0 left-0 flex-col border-b border-linha bg-white px-6 py-3 md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0"
          }
        >
          {LINKS.map((link) => (
            <NavLink
              key={link.para}
              to={link.para}
              end={link.para === "/"}
              onClick={fecharMenu}
              className={({ isActive }) =>
                "border-b border-linha py-3 text-sm font-semibold last:border-0 md:border-0 md:py-2 " +
                (isActive
                  ? "text-soul-700"
                  : "text-grafite-700 hover:text-soul-700")
              }
            >
              {link.rotulo}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
