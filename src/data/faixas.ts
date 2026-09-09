import type { FaixaCupom } from "../types/faixa-cupom";

// Cotacao oficial: 100 Pontos ECOA = R$ 1,00.
export const FAIXAS: FaixaCupom[] = [
  { id_faixa: 1, valor_centavos: 200, pontos_necessarios: 200, ativo: "S" },
  { id_faixa: 2, valor_centavos: 500, pontos_necessarios: 500, ativo: "S" },
  { id_faixa: 3, valor_centavos: 1000, pontos_necessarios: 1000, ativo: "S" },
  { id_faixa: 4, valor_centavos: 2000, pontos_necessarios: 2000, ativo: "S" },
];
