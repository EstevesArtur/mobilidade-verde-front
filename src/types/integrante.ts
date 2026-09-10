// Dados do grupo exibidos na pagina Integrantes e no README (rubrica).
export interface Integrante {
  nome: string;
  rm: string;
  turma: string;
  representante: boolean;
  foto: string;
  linkedin: string;
  github: string;
  funcao?: string;
}
