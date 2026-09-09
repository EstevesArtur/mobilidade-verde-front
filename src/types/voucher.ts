import type { Operadora } from "./operadora";
import type { FaixaCupom } from "./faixa-cupom";

// CK_VOUCHER_STATUS: status IN ('GERADO','UTILIZADO','EXPIRADO','CANCELADO')
export type StatusVoucher = "GERADO" | "UTILIZADO" | "EXPIRADO" | "CANCELADO";

// Espelha T_VOUCHER do DDL.
// hash_validacao NAO entra no front: e gerado no servidor (Sprint 4).
export interface Voucher {
  id_voucher: number;
  id_usuario: number;
  id_operadora: number;
  id_faixa: number;
  codigo: string;
  status: StatusVoucher;
  gerado_em: string;
  expira_em: string;
  utilizado_em: string | null;
}

// Intersection type: o voucher da tabela + os dados relacionados
// que a tela precisa exibir sem fazer join na mao em cada componente.
export type VoucherDetalhado = Voucher & {
  operadora: Operadora;
  faixa: FaixaCupom;
};
