import { useState } from "react";
import { useParams } from "react-router-dom";
import { Secao } from "../components/ui/secao";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Botao } from "../components/ui/botao";
import { BotaoLink } from "../components/ui/botao-link";
import { Carregando } from "../components/ui/carregando";
import { ErroApi } from "../components/ui/erro-api";
import { OperadoraLogo } from "../components/mobilidade/operadora-logo";
import { ImpactoCo2 } from "../components/mobilidade/impacto-co2";
import { useRequisicao } from "../hooks/use-requisicao";
import { buscarOperadora, listarFaixas } from "../services/mobilidade-service";
import { desfavoritarOperadora, favoritarOperadora, listarFavoritas } from "../services/favorita-service";
import { calcularImpacto } from "../utils/co2";
import { fmtPontos, fmtReais } from "../utils/formato";
import type { Operadora } from "../types/operadora";
import type { FaixaCupom } from "../types/faixa-cupom";
import type { OperadoraFavorita } from "../types/favorita";

interface DadosOperadora {
  operadora: Operadora | undefined;
  faixas: FaixaCupom[];
  favoritas: OperadoraFavorita[];
}

export function OperadoraDetalhe() {
  // useParams le o :idOperadora da URL /operadoras/:idOperadora
  const { idOperadora } = useParams();

  // Rota dinamica: o hook refaz a busca sempre que o :idOperadora mudar
  const { dados, carregando, erro, recarregar } = useRequisicao<DadosOperadora>(async () => {
    const [operadora, faixas, favoritas] = await Promise.all([
      buscarOperadora(Number(idOperadora)),
      listarFaixas(),
      listarFavoritas(),
    ]);
    return { operadora, faixas, favoritas };
  }, [idOperadora]);

  // Favoritar / desfavoritar: escrita na tabela associativa N:N (POST e DELETE)
  const [salvandoFavorita, setSalvandoFavorita] = useState(false);
  const [erroFavorita, setErroFavorita] = useState("");

  async function alternarFavorita(favoritaAtual: OperadoraFavorita | undefined, operadora: Operadora) {
    setSalvandoFavorita(true);
    setErroFavorita("");
    try {
      if (favoritaAtual) {
        await desfavoritarOperadora(favoritaAtual.id_favorita);
      } else {
        await favoritarOperadora(operadora.id_operadora);
      }
      recarregar();
    } catch (problema) {
      setErroFavorita(problema instanceof Error ? problema.message : "Não foi possível atualizar a favorita.");
    } finally {
      setSalvandoFavorita(false);
    }
  }

  if (erro) {
    return (
      <Secao>
        <ErroApi mensagem={erro} onTentarNovamente={recarregar} />
      </Secao>
    );
  }

  if (carregando || !dados) {
    return (
      <Secao>
        <Carregando mensagem="Carregando operadora..." />
      </Secao>
    );
  }

  const { operadora, faixas, favoritas } = dados;

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

  const favoritaAtual = favoritas.find((item) => item.operadora.id_operadora === operadora.id_operadora);

  return (
    <Secao>
      <div className="mx-auto max-w-[880px]">
        <div className="flex flex-wrap items-center gap-6">
          <OperadoraLogo nome={operadora.nome} tamanho="lg" />
          <div className="flex-1">
            <h1 className="font-display flex flex-wrap items-center gap-3 text-3xl leading-[1.15] font-bold text-soul-900 md:text-4xl">
              {operadora.nome}
              {operadora.featured && <Badge tom="soul">Destaque</Badge>}
              {favoritaAtual && <Badge tom="ok">♥ Favorita</Badge>}
            </h1>
            <p className="mt-2 text-grafite-500">{operadora.cidade} · modal {operadora.modal.toLowerCase()}</p>
            {operadora.descricao && <p className="mt-3 max-w-[60ch] text-grafite-700">{operadora.descricao}</p>}
          </div>
          <div className="text-right">
            <Botao
              variante={favoritaAtual ? "fantasma" : "primario"}
              disabled={salvandoFavorita}
              onClick={() => alternarFavorita(favoritaAtual, operadora)}
            >
              {salvandoFavorita ? "Salvando..." : favoritaAtual ? "Remover das favoritas" : "♥ Favoritar operadora"}
            </Botao>
            {erroFavorita && (
              <p role="alert" className="mt-2 text-sm font-semibold text-erro">{erroFavorita}</p>
            )}
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

        {faixas.length > 0 && (
          <div className="mt-8">
            <ImpactoCo2 impacto={calcularImpacto(operadora, faixas[2] ?? faixas[0])} titulo="Impacto estimado por cupom de R$ 10" />
          </div>
        )}

        <p className="mt-8">
          <BotaoLink para="/resgatar" variante="transito" tamanho="lg">Resgatar nesta operadora</BotaoLink>
        </p>
      </div>
    </Secao>
  );
}
