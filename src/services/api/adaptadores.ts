import type { Operadora } from "../../types/operadora";
import type { FaixaCupom } from "../../types/faixa-cupom";
import type { Usuario } from "../../types/usuario";
import type { TransacaoPontos } from "../../types/transacao";
import type { Voucher, VoucherDetalhado } from "../../types/voucher";
import type { Impacto } from "../../types/impacto";
import type {
  OperadoraApi,
  FaixaApi,
  UsuarioApi,
  TransacaoApi,
  VoucherApi,
  ImpactoApi,
} from "../../types/api";

// ============================================================
// Adaptadores: traduzem o JSON da API (camelCase) para os tipos
// do front (snake_case, espelho do DDL da Sprint 1).
// Com isso nenhuma tela ou componente precisou mudar na Sprint 4.
// ============================================================

// A API grava datas em UTC sem indicador de fuso ("2026-10-27T22:54:45").
// Sem o "Z" o navegador leria como horario local e a validade ganharia 3h.
function utcParaIso(data: string): string {
  return data.endsWith("Z") || /[+-]\d\d:\d\d$/.test(data) ? data : data + "Z";
}

// A API nao tem o conceito de "destaque": TOP continua sendo a
// operadora em evidencia no MVP (decisao de produto da Sprint 1).
const OPERADORA_DESTAQUE = "TOP";

export function paraOperadora(api: OperadoraApi): Operadora {
  return {
    id_operadora: api.id,
    nome: api.nome,
    cidade: api.cidade,
    modal: api.modal,
    valor_passagem_centavos: api.valorPassagemCentavos,
    fator_co2_kg_km: api.fatorCo2KgKm,
    formato_codigo: api.formatoCodigo,
    ativo: api.ativo ? "S" : "N",
    featured: api.nome === OPERADORA_DESTAQUE,
  };
}

export function paraFaixa(api: FaixaApi): FaixaCupom {
  return {
    id_faixa: api.id,
    valor_centavos: api.valorCentavos,
    pontos_necessarios: api.pontosNecessarios,
    ativo: api.ativo ? "S" : "N",
  };
}

export function paraUsuario(api: UsuarioApi): Usuario {
  return {
    id_usuario: api.id,
    nome: api.nome,
    cidade: api.cidade,
    saldo_pontos: api.saldoPontos,
  };
}

export function paraTransacao(api: TransacaoApi): TransacaoPontos {
  return {
    id_transacao: api.id,
    id_usuario: api.usuario.id,
    tipo: api.tipo,
    pontos: api.pontos,
    origem: api.origem,
    id_voucher: api.voucher?.id ?? null,
    descricao: api.descricao,
    data_transacao: utcParaIso(api.dataTransacao),
  };
}

export function paraVoucher(api: VoucherApi): Voucher {
  return {
    id_voucher: api.id,
    id_usuario: api.usuario.id,
    id_operadora: api.operadora.id,
    id_faixa: api.faixa.id,
    codigo: api.codigo,
    status: api.status,
    gerado_em: utcParaIso(api.geradoEm),
    expira_em: utcParaIso(api.expiraEm),
    utilizado_em: api.utilizadoEm ? utcParaIso(api.utilizadoEm) : null,
  };
}

// A API ja devolve operadora e faixa aninhadas no voucher:
// o VoucherDetalhado sai pronto, sem join no front.
export function paraVoucherDetalhado(api: VoucherApi): VoucherDetalhado {
  return {
    ...paraVoucher(api),
    operadora: paraOperadora(api.operadora),
    faixa: paraFaixa(api.faixa),
  };
}

export function paraImpacto(api: ImpactoApi): Impacto {
  return {
    passagens: api.qtdViagens,
    kmEstimado: Number(api.kmEstimado.toFixed(1)),
    co2EvitadoKg: Number(api.co2EvitadoKg.toFixed(2)),
    arvoresDia: Math.max(1, Math.round(api.arvoresDia)),
  };
}
