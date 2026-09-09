import { useState } from "react";
import { Secao } from "../components/ui/secao";
import { TituloSecao } from "../components/ui/titulo-secao";
import { CabecalhoPagina } from "../components/ui/cabecalho-pagina";
import { Card } from "../components/ui/card";
import { OperadoraCard } from "../components/mobilidade/operadora-card";
import { FaixaCard } from "../components/mobilidade/faixa-card";
import { SaldoCard } from "../components/mobilidade/saldo-card";
import { TransacaoItem } from "../components/mobilidade/transacao-item";
import { CupomCard } from "../components/mobilidade/cupom-card";
import { ImpactoCo2 } from "../components/mobilidade/impacto-co2";
import { IntegranteCard } from "../components/mobilidade/integrante-card";
import { FaqItem } from "../components/mobilidade/faq-item";
import { PassoItem } from "../components/mobilidade/passo-item";
import { LinhaValor } from "../components/mobilidade/linha-valor";
import { OPERADORAS } from "../data/operadoras";
import { FAIXAS } from "../data/faixas";
import { TRANSACOES } from "../data/transacoes";
import { INTEGRANTES } from "../data/integrantes";
import { PERGUNTAS_FAQ } from "../data/perguntas-faq";
import { VOUCHERS_INICIAIS } from "../data/vouchers";
import { USUARIO_ATUAL } from "../data/usuarios";
import { calcularImpacto } from "../utils/co2";
import type { VoucherDetalhado } from "../types/voucher";

const CUPOM_DEMO: VoucherDetalhado = {
  ...VOUCHERS_INICIAIS[2],
  operadora: OPERADORAS[0],
  faixa: FAIXAS[2],
};

export function Home() {
  const [idOperadora, setIdOperadora] = useState(1);
  const [idFaixa, setIdFaixa] = useState(2);
  const [faqAberto, setFaqAberto] = useState(0);

  return (
    <>
      <CabecalhoPagina
        titulo="Vitrine de domínio"
        descricao="Tela temporária para validar os 11 componentes de domínio."
      />

      <Secao>
        <TituloSecao sobretitulo="Home" titulo="Passos" />
        <ol className="grid gap-6 md:grid-cols-3">
          <PassoItem numero={1} titulo="Veja seu saldo" descricao="Abra a carteira e confira seus Pontos ECOA." />
          <PassoItem numero={2} titulo="Escolha operadora e faixa" descricao="TOP ou SPTrans, de R$2 a R$20." />
          <PassoItem numero={3} titulo="Use o cupom" descricao="Receba o código e o QR e aplique no app." />
        </ol>

        <TituloSecao sobretitulo="Resgatar" titulo="Operadora e faixa" className="mt-16" />
        <ul className="grid gap-6 md:grid-cols-2">
          {OPERADORAS.map((operadora) => (
            <li key={operadora.id_operadora}>
              <OperadoraCard
                operadora={operadora}
                selecionada={operadora.id_operadora === idOperadora}
                onSelecionar={(item) => setIdOperadora(item.id_operadora)}
              />
            </li>
          ))}
        </ul>
        <ul className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {FAIXAS.map((faixa) => (
            <li key={faixa.id_faixa}>
              <FaixaCard
                faixa={faixa}
                selecionada={faixa.id_faixa === idFaixa}
                desabilitada={faixa.pontos_necessarios > USUARIO_ATUAL.saldo_pontos}
                onSelecionar={(item) => setIdFaixa(item.id_faixa)}
              />
            </li>
          ))}
        </ul>

        <TituloSecao sobretitulo="Carteira" titulo="Saldo e histórico" className="mt-16" />
        <SaldoCard nome={USUARIO_ATUAL.nome} saldo={USUARIO_ATUAL.saldo_pontos} />
        <Card className="mt-6">
          <ul>
            {TRANSACOES.slice(0, 3).map((transacao) => (
              <TransacaoItem key={transacao.id_transacao} transacao={transacao} />
            ))}
          </ul>
        </Card>

        <TituloSecao sobretitulo="Cupom" titulo="Tela-estrela" className="mt-16" />
        <div className="mx-auto max-w-[620px]">
          <CupomCard voucher={CUPOM_DEMO} />
          <div className="mt-6">
            <ImpactoCo2 impacto={calcularImpacto(OPERADORAS[0], FAIXAS[2])} />
          </div>
        </div>

        <TituloSecao sobretitulo="Integrantes" titulo="Equipe FOG" className="mt-16" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INTEGRANTES.slice(0, 3).map((integrante) => (
            <li key={integrante.rm}>
              <IntegranteCard integrante={integrante} />
            </li>
          ))}
        </ul>

        <TituloSecao sobretitulo="FAQ e Sobre" titulo="Acordeão e linhas" className="mt-16" />
        <Card>
          {PERGUNTAS_FAQ.slice(0, 3).map((item) => (
            <FaqItem
              key={item.id}
              id={item.id}
              pergunta={item.pergunta}
              resposta={item.resposta}
              aberto={faqAberto === item.id}
              onAlternar={(id) => setFaqAberto(faqAberto === id ? 0 : id)}
            />
          ))}
        </Card>
        <Card className="mt-6">
          <LinhaValor icone="📈" titulo="Volume" descricao="Novo motivo de uso recorrente do app." />
          <LinhaValor icone="🌍" titulo="ESG" descricao="Impacto de CO₂ evitado mensurável por viagem." />
        </Card>
      </Secao>
    </>
  );
}
