import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import { Home } from "./pages/home";
import { Sobre } from "./pages/sobre";
import { Integrantes } from "./pages/integrantes";
import { Faq } from "./pages/faq";
import { Contato } from "./pages/contato";
import { Carteira } from "./pages/carteira";
import { Resgatar } from "./pages/resgatar";
import { Cupom } from "./pages/cupom";
import { OperadoraDetalhe } from "./pages/operadora-detalhe";
import { NaoEncontrada } from "./pages/nao-encontrada";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout comum: Header + Outlet + Footer em todas as paginas */}
        <Route path="/" element={<Layout />}>
          {/* --- Rotas estaticas --- */}
          <Route index element={<Home />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="integrantes" element={<Integrantes />} />
          <Route path="faq" element={<Faq />} />
          <Route path="contato" element={<Contato />} />
          <Route path="carteira" element={<Carteira />} />
          <Route path="resgatar" element={<Resgatar />} />

          {/* --- Rotas dinamicas (parametro na URL, lido com useParams) --- */}
          <Route path="cupom/:codigo" element={<Cupom />} />
          <Route path="operadoras/:idOperadora" element={<OperadoraDetalhe />} />

          {/* --- Fallback --- */}
          <Route path="*" element={<NaoEncontrada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
