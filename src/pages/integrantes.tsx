import { Secao } from "../components/ui/secao";
import { CabecalhoPagina } from "../components/ui/cabecalho-pagina";
import { IntegranteCard } from "../components/mobilidade/integrante-card";
import { INTEGRANTES } from "../data/integrantes";

export function Integrantes() {
  return (
    <>
      <CabecalhoPagina titulo="Integrantes" descricao="Grupo do Challenge SoulUp 2026 · 1º ano de Análise e Desenvolvimento de Sistemas · FIAP." />

      <Secao>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INTEGRANTES.map((integrante) => (
            <li key={integrante.rm}>
              <IntegranteCard integrante={integrante} />
            </li>
          ))}
        </ul>
      </Secao>
    </>
  );
}
