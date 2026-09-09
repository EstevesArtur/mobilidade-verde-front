import type { Voucher } from "../types/voucher";

// Cupom ativo: expira sempre daqui a 20h, para a contagem regressiva
// da tela de cupom funcionar em qualquer dia da correcao.
const EXPIRA_EM_20H = new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString();

// Os tres status possiveis aparecem aqui de proposito: e a CK_VOUCHER_STATUS
// do DDL demonstrada na tela.
export const VOUCHERS_INICIAIS: Voucher[] = [
  {
    id_voucher: 1,
    id_usuario: 1,
    id_operadora: 1,
    id_faixa: 2,
    codigo: "TOP-A7B3-X9K2",
    status: "UTILIZADO",
    gerado_em: "2026-05-16T20:10:00",
    expira_em: "2026-05-17T20:10:00",
    utilizado_em: "2026-05-16T21:42:00",
  },
  {
    id_voucher: 2,
    id_usuario: 1,
    id_operadora: 2,
    id_faixa: 1,
    codigo: "SP-4F1C-Q8M0",
    status: "EXPIRADO",
    gerado_em: "2026-05-02T09:00:00",
    expira_em: "2026-05-03T09:00:00",
    utilizado_em: null,
  },
  {
    id_voucher: 3,
    id_usuario: 1,
    id_operadora: 1,
    id_faixa: 3,
    codigo: "TOP-K4M9-2QD7",
    status: "GERADO",
    gerado_em: new Date().toISOString(),
    expira_em: EXPIRA_EM_20H,
    utilizado_em: null,
  },
];
