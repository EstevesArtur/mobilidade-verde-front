import { Secao } from "../components/ui/secao";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { BotaoLink } from "../components/ui/botao-link";
import { TituloSecao } from "../components/ui/titulo-secao";
import { PassoItem } from "../components/mobilidade/passo-item";
import { OperadoraLogo } from "../components/mobilidade/operadora-logo";
import { OPERADORAS } from "../data/operadoras";
import { PASSOS } from "../data/passos";

export function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-areia to-[#EAF4ED] py-12 md:py-24">
        <div className="mx-auto grid w-full max-w-[1140px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Badge tom="soul">Feature SoulUp · Pontos ECOA</Badge>
            <h1 className="font-display mt-4 text-4xl leading-[1.15] font-extrabold tracking-[-0.02em] text-soul-900 md:text-5xl lg:text-[3.2rem]">
              Seus Pontos ECOA
              <br />
              <span className="text-soul-600">viraram passagem.</span>
            </h1>
            <p className="mt-4 mb-8 max-w-[52ch] text-lg text-grafite-700">
              Trocamos seus pontos por cupom real de transporte público, aceito direto pela <strong>TOP</strong> e <strong>SPTrans</strong>. Sem burocracia, com impacto ambiental medido.
            </p>
            <div className="flex flex-wrap gap-3">
              <BotaoLink para="/carteira" variante="primario" tamanho="lg">Ver minha carteira</BotaoLink>
              <BotaoLink para="/sobre" variante="fantasma" tamanho="lg">Como funciona</BotaoLink>
            </div>
          </div>

          <aside aria-label="Pré-visualização do app" className="rotate-2 rounded-[30px] bg-gradient-to-br from-soul-900 to-soul-700 p-8 text-white shadow-alta">
            <p className="text-xs tracking-[0.1em] uppercase opacity-70">Saldo Pontos ECOA</p>
            <p className="font-display text-5xl font-extrabold">
              5.000 <span className="text-base font-semibold opacity-80">pts</span>
            </p>
            <div className="mt-6 rounded-card border border-dashed border-white/40 bg-white/10 p-4 text-center">
              <p className="text-xs tracking-[0.1em] uppercase opacity-70">Cupom TOP gerado</p>
              <p className="font-display mt-1 text-lg font-bold tracking-[0.14em]">TOP-A7B3-X9K2</p>
            </div>
          </aside>
        </div>
      </section>

      <Secao>
        <TituloSecao sobretitulo="Em 3 passos" titulo="Do saldo ao embarque" centralizado />
        <ol className="grid gap-8 md:grid-cols-3">
          {PASSOS.map((passo) => (
            <PassoItem key={passo.numero} numero={passo.numero} titulo={passo.titulo} descricao={passo.descricao} />
          ))}
        </ol>
      </Secao>

      <Secao estreita>
        <Card centralizado>
          <p className="font-display text-xs font-extrabold tracking-[0.14em] text-soul-600 uppercase">Operadoras parceiras no MVP</p>
          <h2 className="font-display mt-2 mb-8 text-3xl font-bold text-soul-900 md:text-4xl">Aceito onde você anda</h2>
          <ul className="mx-auto grid max-w-[560px] grid-cols-2 gap-6">
            {OPERADORAS.map((operadora) => (
              <li key={operadora.id_operadora}>
                <OperadoraLogo nome={operadora.nome} tamanho="lg" className="mx-auto" />
                <p className="mt-2 font-bold">{operadora.nome}</p>
              </li>
            ))}
          </ul>
          <BotaoLink para="/carteira" variante="transito" className="mt-8">Começar resgate</BotaoLink>
        </Card>
      </Secao>
    </>
  );
}
