import type { Impacto } from "../types/impacto";
import type { Operadora } from "../types/operadora";
import type { FaixaCupom } from "../types/faixa-cupom";

// Fator de emissao do carro particular (MMA), em kg de CO2 por km.
export const FATOR_CO2_CARRO_KG_KM = 0.18;

// Distancia media de um trajeto urbano em Sao Paulo, em km.
export const KM_MEDIO_POR_PASSAGEM = 7;

// Absorcao media de uma arvore, em kg de CO2 por ano.
export const ABSORCAO_ARVORE_KG_ANO = 21.77;

// CO2 EVITADO = o que o carro emitiria MENOS o que o onibus emite.
// Usar so o fator da operadora seria a EMISSAO do onibus, nao a economia.
export function calcularImpacto(
  operadora: Operadora,
  faixa: FaixaCupom
): Impacto {
  const passagens = Math.max(
    1,
    Math.round(faixa.valor_centavos / operadora.valor_passagem_centavos)
  );
  const kmEstimado = passagens * KM_MEDIO_POR_PASSAGEM;
  const co2EvitadoKg = Number(
    (kmEstimado * (FATOR_CO2_CARRO_KG_KM - operadora.fator_co2_kg_km)).toFixed(2)
  );
  const absorcaoPorDia = ABSORCAO_ARVORE_KG_ANO / 365;
  const arvoresDia = Math.max(1, Math.round(co2EvitadoKg / absorcaoPorDia));

  return { passagens, kmEstimado, co2EvitadoKg, arvoresDia };
}
