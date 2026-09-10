import type { Operadora } from "../types/operadora";

// valor_passagem_centavos: 440 e fator_co2_kg_km: 0.082 (ANTP) sao os
// numeros oficiais do projeto, usados tambem em Java, Python e Banco.
export const OPERADORAS: Operadora[] = [
  {
    id_operadora: 1,
    nome: "TOP",
    cidade: "Rio de Janeiro",
    modal: "MISTO",
    valor_passagem_centavos: 440,
    fator_co2_kg_km: 0.082,
    formato_codigo: "TOP-XXXX-XXXX",
    ativo: "S",
    featured: true,
     descricao: "Operadora de bilhetagem integrada do Rio de Janeiro, com modal misto (ônibus, BRT e barcas). É a parceira de destaque do MVP e a primeira com integração de cupom validada.",
  },
  {
    id_operadora: 2,
    nome: "SPTrans",
    cidade: "São Paulo",
    modal: "ONIBUS",
    valor_passagem_centavos: 440,
    fator_co2_kg_km: 0.082,
    formato_codigo: "SP-XXXX-XXXX",
    ativo: "S",
    featured: false,
    descricao: "Responsável pelo transporte por ônibus da cidade de São Paulo, o maior sistema do país em número de passageiros por dia. Entra no MVP como prova de escala do modelo.",
  },
];
