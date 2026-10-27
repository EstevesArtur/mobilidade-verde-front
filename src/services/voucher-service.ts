import type { VoucherDetalhado } from "../types/voucher";
import type { VoucherApi, NovoVoucherRequest, CupomCriadoApi, EstornoApi } from "../types/api";
import { ErroHttp, requisitar } from "./api/cliente-http";
import { paraVoucherDetalhado } from "./api/adaptadores";
import { ID_USUARIO_ATUAL } from "./mobilidade-service";

// ------------------------------------------------------------
// Sprint 4: o cupom agora e gerado pela API Java e gravado no
// Oracle (T_VOUCHER + T_TRANSACAO_PONTOS). As regras de negocio
// (saldo, antifraude RN07, validade de 24h) vivem no servidor;
// o front apenas apresenta a resposta ou a mensagem de erro.
// ------------------------------------------------------------

// POST /api/vouchers → 201 com CupomDTO; 409 se saldo insuficiente ou antifraude
export async function gerarVoucher(idOperadora: number, idFaixa: number): Promise<VoucherDetalhado> {
  const corpo: NovoVoucherRequest = { idUsuario: ID_USUARIO_ATUAL, idOperadora, idFaixa };

  const criado = await requisitar<CupomCriadoApi>("/api/vouchers", {
    method: "POST",
    body: JSON.stringify(corpo),
  });

  // O POST devolve so o resumo (CupomDTO). Busca o voucher completo
  // para a tela de cupom ter operadora e faixa aninhadas.
  const completo = await buscarVoucherPorCodigo(criado.codigo);
  if (!completo) {
    throw new Error("Cupom gerado, mas nao foi possivel carregar os detalhes.");
  }
  return completo;
}

// GET /api/vouchers/{codigo} → 200 ou 404
export async function buscarVoucherPorCodigo(codigo: string): Promise<VoucherDetalhado | undefined> {
  try {
    const api = await requisitar<VoucherApi>("/api/vouchers/" + encodeURIComponent(codigo));
    return paraVoucherDetalhado(api);
  } catch (problema) {
    // 404 = cupom nao existe (undefined). Outros erros sobem para a tela.
    if (problema instanceof ErroHttp && problema.status === 404) return undefined;
    throw problema;
  }
}

// GET /api/usuarios/{id}/vouchers
export async function listarVouchersDoUsuario(idUsuario: number): Promise<VoucherDetalhado[]> {
  const api = await requisitar<VoucherApi[]>("/api/usuarios/" + idUsuario + "/vouchers");
  return api
    .map(paraVoucherDetalhado)
    .sort((a, b) => new Date(b.gerado_em).getTime() - new Date(a.gerado_em).getTime());
}

// POST /api/vouchers/{codigo}/estornar → devolve os pontos a carteira (novo na Sprint 4)
export async function estornarVoucher(codigo: string): Promise<EstornoApi> {
  return requisitar<EstornoApi>("/api/vouchers/" + encodeURIComponent(codigo) + "/estornar", {
    method: "POST",
  });
}
