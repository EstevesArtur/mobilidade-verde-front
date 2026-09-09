// Espelha T_USUARIO + T_CARTEIRA (relacao 1:1) do DDL.
// email, hash_senha e cpf_hash NAO entram no front: dado sensivel.
export interface Usuario {
  id_usuario: number;
  nome: string;
  cidade: string;
  saldo_pontos: number;
}
