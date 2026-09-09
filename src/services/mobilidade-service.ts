import type { Usuario } from "../types/usuario";
import type { Operadora } from "../types/operadora";
import type { FaixaCupom } from "../types/faixa-cupom";
import type { TransacaoPontos } from "../types/transacao";
import { USUARIO_ATUAL } from "../data/usuarios";
import { OPERADORAS } from "../data/operadoras";
import { FAIXAS } from "../data/faixas";
import { TRANSACOES } from "../data/transacoes";

// Todas as funcoes devolvem Promise, igual ao getProducts() da Aula 3.
// Na Sprint 4 o corpo troca de "dado local" para fetch() na API Java,
// e nenhuma tela precisa ser reescrita.
const ATRASO_SIMULADO_MS = 250;

function simularRede<T>(dado: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(dado), ATRASO_SIMULADO_MS);
  });
}

export function buscarUsuarioAtual(): Promise<Usuario> {
  return simularRede(USUARIO_ATUAL);
}

export function listarOperadoras(): Promise<Operadora[]> {
  return simularRede(OPERADORAS.filter((operadora) => operadora.ativo === "S"));
}

export function buscarOperadora(
  idOperadora: number
): Promise<Operadora | undefined> {
  return simularRede(
    OPERADORAS.find((operadora) => operadora.id_operadora === idOperadora)
  );
}

export function listarFaixas(): Promise<FaixaCupom[]> {
  return simularRede(FAIXAS.filter((faixa) => faixa.ativo === "S"));
}

export function listarTransacoes(
  idUsuario: number
): Promise<TransacaoPontos[]> {
  const doUsuario = TRANSACOES.filter(
    (transacao) => transacao.id_usuario === idUsuario
  ).sort(
    (a, b) =>
      new Date(b.data_transacao).getTime() -
      new Date(a.data_transacao).getTime()
  );

  return simularRede(doUsuario);
}
