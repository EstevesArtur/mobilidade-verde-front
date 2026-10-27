import type { Operadora } from "./operadora";

// Espelha T_USUARIO_OPERADORA_FAVORITA (a associativa N:N do MER).
export interface OperadoraFavorita {
  id_favorita: number;
  id_usuario: number;
  operadora: Operadora;
  ordem_preferencia: number;
  favoritado_em: string;
}
