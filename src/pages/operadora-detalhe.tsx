import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Secao } from "../components/ui/secao";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { BotaoLink } from "../components/ui/botao-link";
import { Carregando } from "../components/ui/carregando";
import { OperadoraLogo } from "../components/mobilidade/operadora-logo";
import { ImpactoCo2 } from "../components/mobilidade/impacto-co2";
import { buscarOperadora, listarFaixas } from "../services/mobilidade-service";
import { calcularImpacto } from "../utils/co2";
import { fmtPontos, fmtReais } from "../utils/formato";
import type { Operadora } from "../types/operadora";
import type { FaixaCupom } from "../types/faixa-cupom";

export function OperadoraDetalhe() {
  // useParams le o :idOperadora da URL /operadoras/:idOperadora
  const { idOperadora } = useParams();

  const [operadora, setOperadora] = useState<Operadora | null>(null);
  const [faixas, setFaixas] = useState<FaixaCupom[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      const [dadosOperadora, dadosFaixas] = await Promise.all([
        buscarOperadora(Number(idOperadora)),
        listarFaixas(),
      ]);

      if (!ativo) {
        return;
      }

      setOperadora(dadosOperadora ?? null);
      setFaixas(dadosFaixas);
      setCarregando(false);
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, [idOperadora]);

  if (carregando) {
    return (
      <Secao>
        <Carregando mensagem="Carregando operadora..." />
      </Secao>
    );
  }

  if (!operadora) {
    return (
      <Secao>
        <Card centralizado>
          <h1 className="font-display text-2xl font-bold text-soul-900">Operadora não encontrada</h1>
          <p className="mt-3 text-grafite-700">Nenhuma operadora com o identificador {idOperadora}.</p>
          <BotaoLink para="/resgatar" variante="primario" className="mt-6">Ver operadoras disponíveis</BotaoLink>
        </Card>
      </Secao>
    );
  }

  return (
    <Secao>
      <div className="mx-auto max-w-[880px]">
        <div className="flex flex-wrap items-center gap-6">
          <OperadoraLogo nome={operadora.nome} tamanho="lg" />
          <div>
            <h1 className="font-display flex flex-wrap items-center gap-3 text-3xl leading-[1.15] font-bold text-soul-900 md:text-4xl">
              {operadora.nome}
              {operadora.featured && <Badge tom="soul">Destaque</Badge>}
            </h1>
            <p className="mt-2 text-grafite-500">{operadora.cidade} · modal {operadora.modal.toLowerCase()}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card>
            <p className="text-sm text-grafite-500">Valor da passagem</p>
            <p className="font-display mt-1 text-2xl font-extrabold text-soul-900">{fmtReais(operadora.valor_passagem_centavos)}</p>
          </Card>
          <Card>
            <p className="text-sm text-grafite-500">Fator de CO₂ (ANTP)</p>
            <p className="font-display mt-1 text-2xl font-extrabold text-soul-900">{operadora.fator_co2_kg_km} kg/km</p>
          </Card>
          <Card>
            <p className="text-sm text-grafite-500">Formato do código</p>
            <p className="font-display mt-1 text-2xl font-extrabold text-soul-900">{operadora.formato_codigo}</p>
          </Card>
        </div>

        <Card className="mt-8">
          <h2 className="font-display mb-4 text-2xl font-bold text-soul-900">Faixas disponíveis</h2>
          <ul>
            {faixas.map((faixa) => (
              <li key={faixa.id_faixa} className="flex items-center justify-between gap-4 border-b border-linha py-3 last:border-0">
                <span className="font-display font-bold text-soul-900">{fmtReais(faixa.valor_centavos)}</span>
                <span className="text-sm font-bold text-ecoa-700">{fmtPontos(faixa.pontos_necessarios)} pts</span>
                <span className="text-sm text-grafite-500">
                  ~{calcularImpacto(operadora, faixa).passagens} passagem(ns)
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="mt-8">
          <ImpactoCo2 impacto={calcularImpacto(operadora, faixas[2] ?? faixas[0])} />
        </div>

        <p className="mt-8">
          <BotaoLink para="/resgatar" variante="transito" tamanho="lg">Resgatar nesta operadora</BotaoLink>
        </p>
      </div>
    </Secao>
  );
}
