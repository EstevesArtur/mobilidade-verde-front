import type { ErroApi } from "../../types/api";

// URL base da API Java. Em producao vem da variavel VITE_API_URL
// configurada na Vercel; em desenvolvimento, do arquivo .env.
export const API_URL: string =
  import.meta.env.VITE_API_URL ?? "https://mobilidade-verde-java-sprint4.onrender.com";

// Erro com o status HTTP e a mensagem que a API devolveu.
// As telas usam .mensagem para mostrar ao usuario (ex.: "Saldo insuficiente").
export class ErroHttp extends Error {
  readonly status: number;
  readonly mensagem: string;

  constructor(status: number, mensagem: string) {
    super(mensagem);
    this.name = "ErroHttp";
    this.status = status;
    this.mensagem = mensagem;
  }
}

// Unico ponto do projeto que chama fetch(). Todas as funcoes de service
// passam por aqui — assim loading, erro e tipagem ficam padronizados.
export async function requisitar<T>(caminho: string, opcoes?: RequestInit): Promise<T> {
  const resposta = await fetch(API_URL + caminho, {
    ...opcoes,
    headers: { "Content-Type": "application/json", ...opcoes?.headers },
  });

  // 204 No Content (DELETE) nao tem corpo para ler
  if (resposta.status === 204) {
    return undefined as T;
  }

  if (!resposta.ok) {
    let mensagem = "Falha ao comunicar com a API (" + resposta.status + ").";
    try {
      const erro = (await resposta.json()) as ErroApi;
      if (erro.mensagem) mensagem = erro.mensagem;
    } catch {
      // corpo nao era JSON: mantem a mensagem generica
    }
    throw new ErroHttp(resposta.status, mensagem);
  }

  return resposta.json() as Promise<T>;
}
