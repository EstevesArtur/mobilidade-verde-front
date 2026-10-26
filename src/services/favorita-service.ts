import type { OperadoraFavorita } from "../types/favorita";
import type { FavoritaApi } from "../types/api";
import { requisitar } from "./api/cliente-http";
import { paraOperadora } from "./api/adaptadores";
import { ID_USUARIO_ATUAL } from "./mobilidade-service";

// ------------------------------------------------------------
// Operadoras favoritas (tabela associativa N:N do MER).
// Novo na Sprint 4: cobre as operacoes de escrita POST e DELETE.
// ------------------------------------------------------------

function paraFavorita(api: FavoritaApi): OperadoraFavorita {
  return {
    id_favorita: api.id,
    id_usuario: api.usuario.id,
    operadora: paraOperadora(api.operadora),
    ordem_preferencia: api.ordemPreferencia,
    favoritado_em: api.favoritadoEm,
  };
}

// GET /api/usuarios/{id}/favoritas
export async function listarFavoritas(): Promise<OperadoraFavorita[]> {
  const api = await requisitar<FavoritaApi[]>("/api/usuarios/" + ID_USUARIO_ATUAL + "/favoritas");
  return api.map(paraFavorita).sort((a, b) => a.ordem_preferencia - b.ordem_preferencia);
}

// POST /api/usuarios/{id}/favoritas → 201
export async function favoritarOperadora(idOperadora: number): Promise<OperadoraFavorita> {
  const api = await requisitar<FavoritaApi>("/api/usuarios/" + ID_USUARIO_ATUAL + "/favoritas", {
    method: "POST",
    body: JSON.stringify({ idOperadora }),
  });
  return paraFavorita(api);
}

// DELETE /api/usuarios/{id}/favoritas/{idFavorita} → 204
export async function desfavoritarOperadora(idFavorita: number): Promise<void> {
  await requisitar<void>("/api/usuarios/" + ID_USUARIO_ATUAL + "/favoritas/" + idFavorita, {
    method: "DELETE",
  });
}
