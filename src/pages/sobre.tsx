import { Secao } from "../components/ui/secao";
import { Card } from "../components/ui/card";
import { CabecalhoPagina } from "../components/ui/cabecalho-pagina";
import { TituloSecao } from "../components/ui/titulo-secao";
import { LinhaValor } from "../components/mobilidade/linha-valor";
import { OperadoraLogo } from "../components/mobilidade/operadora-logo";
import { COMO_AGREGAMOS_VALOR, ROADMAP, STACK } from "../data/conteudo-sobre";

export function Sobre() {
  return (
    <>
      <CabecalhoPagina titulo="Sobre o projeto" descricao="Mobilidade Verde é a ponte entre os Pontos ECOA da SoulUp e o transporte público real." />

      <Secao>
        <div className="mx-auto max-w-[820px]">
          <TituloSecao sobretitulo="O ecossistema" titulo="SoulUp + Prospera" />
          <p className="text-grafite-700">
            A Prospera é uma loyaltytech verde brasileira. Em 2025 adquiriu a SoulPrime e lançou a SoulUp: uma rede social onde interações geram Pontos ECOA, moeda digital verde lastreada em créditos de carbono e energia limpa. Hoje os pontos viram desconto na conta de luz, experiências e compensação de carbono.
          </p>

          <TituloSecao sobretitulo="Nossa tese" titulo="Resgate em transporte público" className="mt-12" />
          <p className="text-grafite-700">
            A geração de pontos já existe e não é nosso escopo. Mobilidade Verde adiciona um novo caminho de resgate: trocar Pontos ECOA por cupom real de transporte (TOP e SPTrans). A Prospera financia o cupom como custo de aquisição (CAC) para a Energia Verde; a operadora recebe o valor cheio.
          </p>

          <p className="font-display mt-12 text-xs font-extrabold tracking-[0.14em] text-soul-600 uppercase">Operadoras parceiras</p>
          <ul className="mt-6 grid max-w-[560px] gap-6 sm:grid-cols-2">
            <li>
              <Card centralizado>
                <OperadoraLogo nome="TOP" tamanho="lg" className="mx-auto" />
                <h3 className="font-display mt-3 text-lg font-bold text-soul-900">TOP</h3>
                <p className="mt-1 text-sm text-grafite-500">Bilhetagem integrada · destaque do MVP</p>
              </Card>
            </li>
            <li>
              <Card centralizado>
                <OperadoraLogo nome="SPTrans" tamanho="lg" className="mx-auto" />
                <h3 className="font-display mt-3 text-lg font-bold text-soul-900">SPTrans</h3>
                <p className="mt-1 text-sm text-grafite-500">Ônibus · São Paulo</p>
              </Card>
            </li>
          </ul>

          <TituloSecao sobretitulo="Como agregamos valor" titulo="Impacto para o ecossistema" className="mt-12" />
          <Card>
            {COMO_AGREGAMOS_VALOR.map((item) => (
              <LinhaValor key={item.titulo} icone={item.icone} titulo={item.titulo} descricao={item.descricao} />
            ))}
          </Card>

          <TituloSecao sobretitulo="Tecnologias utilizadas" titulo="Stack do projeto" className="mt-12" />
          <Card>
            {STACK.map((item) => (
              <LinhaValor key={item.titulo} icone={item.icone} titulo={item.titulo} descricao={item.descricao} />
            ))}
          </Card>

          <TituloSecao sobretitulo="Roadmap" titulo="Evolução na Sprint 4" className="mt-12" />
          <Card>
            {ROADMAP.map((item) => (
              <LinhaValor key={item.titulo} icone={item.icone} titulo={item.titulo} descricao={item.descricao} />
            ))}
          </Card>
        </div>
      </Secao>
    </>
  );
}
