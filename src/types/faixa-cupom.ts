import type { FlagAtivo } from "./flag-ativo";

// Espelha T_FAIXA_CUPOM do DDL.
export interface FaixaCupom {
  id_faixa: number;
  valor_centavos: number;
  pontos_necessarios: number;
  ativo: FlagAtivo;
}
