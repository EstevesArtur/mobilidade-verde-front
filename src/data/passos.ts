export interface Passo {
  numero: number;
  titulo: string;
  descricao: string;
}

export const PASSOS: Passo[] = [
  { numero: 1, titulo: "Veja seu saldo", descricao: "Abra a carteira e confira seus Pontos ECOA acumulados na SoulUp." },
  { numero: 2, titulo: "Escolha operadora e faixa", descricao: "TOP ou SPTrans, e o valor do cupom: R$2, R$5, R$10 ou R$20." },
  { numero: 3, titulo: "Use o cupom", descricao: "Receba o código + QR e aplique direto no app da operadora." },
];
