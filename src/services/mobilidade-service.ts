import type { Usuario } from "../types/usuario";
import type { Operadora } from "../types/operadora";
import type { FaixaCupom } from "../types/faixa-cupom";
import type { TransacaoPontos } from "../types/transacao";
import type { Impacto } from "../types/impacto";
import type { OperadoraApi, FaixaApi, UsuarioApi, TransacaoApi, ImpactoApi } from "../types/api";
import { ErroHttp, requisitar } from "./api/cliente-http";
import { paraOperadora, paraFaixa, paraUsuario, paraTransacao, paraImpacto } from "./api/adaptadores";

// Usuario "logado" no MVP. A autenticacao fica para a evolucao do produto;
// hoje a demo usa a Mariana (id 1), que tem saldo para todas as faixas.
export const ID_USUARIO_ATUAL = 1;

// ------------------------------------------------------------
// Sprint 4: todas as funcoes abaixo deixaram de ler src/data/*
// e passaram a consumir a API Java no Render via fetch().
// As assinaturas sao as mesmas da Sprint 3, entao as telas
// continuam funcionando sem alteracao.
// ------------------------------------------------------------

export async function buscarUsuarioAtual(): Promise<Usuario> {
  const api = await requisitar<UsuarioApi>("/api/usuarios/" + ID_USUARIO_ATUAL);
  return paraUsuario(api);
}

export async function listarOperadoras(): Promise<Operadora[]> {
  const api = await requisitar<OperadoraApi[]>("/api/operadoras");
  // Ordena para a operadora em destaque (TOP) aparecer primeiro
  return api.map(paraOperadora).sort((a, b) => Number(b.featured) - Number(a.featured));
}

export async function buscarOperadora(idOperadora: number): Promise<Operadora | undefined> {
  try {
    const api = await requisitar<OperadoraApi>("/api/operadoras/" + idOperadora);
    return paraOperadora(api);
  } catch (problema) {
    // 404 da API vira undefined: a tela trata como "nao encontrada"
    if (problema instanceof ErroHttp && problema.status === 404) return undefined;
    throw problema;
  }
}

export async function listarFaixas(): Promise<FaixaCupom[]> {
  const api = await requisitar<FaixaApi[]>("/api/faixas");
  return api.map(paraFaixa);
}

export async function listarTransacoes(idUsuario: number): Promise<TransacaoPontos[]> {
  const api = await requisitar<TransacaoApi[]>("/api/usuarios/" + idUsuario + "/transacoes");
  return api
    .map(paraTransacao)
    .sort((a, b) => new Date(b.data_transacao).getTime() - new Date(a.data_transacao).getTime());
}

// Impacto acumulado calculado pela API a partir de T_VIAGEM (novo na Sprint 4)
export async function buscarImpactoUsuario(idUsuario: number): Promise<Impacto> {
  const api = await requisitar<ImpactoApi>("/api/usuarios/" + idUsuario + "/impacto");
  return paraImpacto(api);
}
