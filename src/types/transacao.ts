// CK_TRANSACAO_TIPO: tipo IN ('CREDITO','DEBITO')
export type TipoTransacao = "CREDITO" | "DEBITO";

// CK_TRANSACAO_ORIGEM
export type OrigemTransacao =
  | "VOUCHER_GERACAO"
  | "ESTORNO"
  | "AJUSTE_MANUAL"
  | "OUTROS";

// Espelha T_TRANSACAO_PONTOS do DDL.
// ip_origem NAO entra no front: dado de auditoria, fica no servidor.
export interface TransacaoPontos {
  id_transacao: number;
  id_usuario: number;
  tipo: TipoTransacao;
  pontos: number;
  origem: OrigemTransacao;
  id_voucher: number | null;
  descricao: string;
  data_transacao: string;
}
