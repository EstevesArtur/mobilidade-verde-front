import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";

export function Layout() {
  const { pathname } = useLocation();

  // useEffect 1 de 3: em uma SPA a pagina nao recarrega, entao o scroll fica
  // onde estava ao trocar de rota. Este efeito leva o usuario para o topo.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-areia font-body leading-relaxed text-grafite-900">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
