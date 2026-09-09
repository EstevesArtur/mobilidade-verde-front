import type { Usuario } from "../types/usuario";

export const USUARIOS: Usuario[] = [
  { id_usuario: 1, nome: "Marina Soares", cidade: "São Paulo", saldo_pontos: 5000 },
  { id_usuario: 2, nome: "Rafael Lima", cidade: "Rio de Janeiro", saldo_pontos: 1500 },
  { id_usuario: 3, nome: "Bruna Teixeira", cidade: "São Paulo", saldo_pontos: 180 },
];

// Usuario "logado" no prototipo. Na Sprint 4 vem da autenticacao.
export const USUARIO_ATUAL: Usuario = USUARIOS[0];
