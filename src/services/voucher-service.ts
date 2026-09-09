import type { Voucher, VoucherDetalhado } from "../types/voucher";
import { OPERADORAS } from "../data/operadoras";
import { FAIXAS } from "../data/faixas";
import { VOUCHERS_INICIAIS } from "../data/vouchers";
import { USUARIO_ATUAL } from "../data/usuarios";

const HORAS_VALIDADE = 24;
const ALFABETO = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const ATRASO_SIMULADO_MS = 250;

// Lista viva da sessao: comeca com os vouchers do mock e recebe os gerados.
// Na Sprint 4 isso vira a tabela T_VOUCHER via API.
const vouchers: Voucher[] = [...VOUCHERS_INICIAIS];

function simularRede<T>(dado: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(dado), ATRASO_SIMULADO_MS);
  });
}

// Alfabeto sem 0, O, 1 e I para o usuario nao errar ao digitar no app.
function blocoAleatorio(): string {
  let saida = "";
  for (let i = 0; i < 4; i++) {
    saida += ALFABETO[Math.floor(Math.random() * ALFABETO.length)];
  }
  return saida;
}

// Junta o voucher com operadora e faixa: monta o VoucherDetalhado.
function detalhar(voucher: Voucher): VoucherDetalhado | undefined {
  const operadora = OPERADORAS.find(
    (item) => item.id_operadora === voucher.id_operadora
  );
  const faixa = FAIXAS.find((item) => item.id_faixa === voucher.id_faixa);

  if (!operadora || !faixa) {
    return undefined;
  }

  return { ...voucher, operadora, faixa };
}

export function gerarVoucher(
  idOperadora: number,
  idFaixa: number
): Promise<VoucherDetalhado> {
  const operadora = OPERADORAS.find(
    (item) => item.id_operadora === idOperadora
  );
  const faixa = FAIXAS.find((item) => item.id_faixa === idFaixa);

  if (!operadora || !faixa) {
    return Promise.reject(new Error("Operadora ou faixa inválida."));
  }

  // Regra de negocio: nunca gerar cupom acima do saldo (CK_CARTEIRA_SALDO).
  if (faixa.pontos_necessarios > USUARIO_ATUAL.saldo_pontos) {
    return Promise.reject(
      new Error("Saldo insuficiente de Pontos ECOA para esta faixa.")
    );
  }

  // O prefixo sai do proprio formato_codigo da operadora: TOP-XXXX-XXXX -> TOP
  const prefixo = operadora.formato_codigo.split("-")[0];
  const agora = new Date();
  const expira = new Date(agora.getTime() + HORAS_VALIDADE * 60 * 60 * 1000);
  const proximoId =
    Math.max(0, ...vouchers.map((item) => item.id_voucher)) + 1;

  const novo: Voucher = {
    id_voucher: proximoId,
    id_usuario: USUARIO_ATUAL.id_usuario,
    id_operadora: operadora.id_operadora,
    id_faixa: faixa.id_faixa,
    codigo: prefixo + "-" + blocoAleatorio() + "-" + blocoAleatorio(),
    status: "GERADO",
    gerado_em: agora.toISOString(),
    expira_em: expira.toISOString(),
    utilizado_em: null,
  };

  vouchers.push(novo);

  return simularRede({ ...novo, operadora, faixa });
}

export function buscarVoucherPorCodigo(
  codigo: string
): Promise<VoucherDetalhado | undefined> {
  const encontrado = vouchers.find((item) => item.codigo === codigo);

  if (!encontrado) {
    return simularRede(undefined);
  }

  return simularRede(detalhar(encontrado));
}

export function listarVouchersDoUsuario(
  idUsuario: number
): Promise<VoucherDetalhado[]> {
  const doUsuario = vouchers
    .filter((item) => item.id_usuario === idUsuario)
    .map(detalhar)
    .filter((item): item is VoucherDetalhado => item !== undefined)
    .sort(
      (a, b) =>
        new Date(b.gerado_em).getTime() - new Date(a.gerado_em).getTime()
    );

  return simularRede(doUsuario);
}
