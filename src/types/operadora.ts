import type { FlagAtivo } from "./flag-ativo";

// CK_OPERADORA_MODAL: modal IN ('ONIBUS','METRO','TREM','MISTO','BRT')
export type Modal = "ONIBUS" | "METRO" | "TREM" | "MISTO" | "BRT";

// Espelha T_OPERADORA_TRANSPORTE do DDL.
export interface Operadora {
  id_operadora: number;
  nome: string;
  cidade: string;
  modal: Modal;
  valor_passagem_centavos: number;
  fator_co2_kg_km: number;
  formato_codigo: string;
  ativo: FlagAtivo;
  featured: boolean;
  descricao?: string;
}
