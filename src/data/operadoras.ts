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
  },
];
