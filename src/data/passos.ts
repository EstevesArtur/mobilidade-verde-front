export interface Passo {
  numero: number;
  titulo: string;
  descricao: string;
}

export const PASSOS: Passo[] = [
  { numero: 1, titulo: "Veja seu saldo", descricao: "Seus Pontos ECOA vêm das interações na SoulUp: campanhas, anúncios e compras com o cartão parceiro. Abra a carteira e confira quanto já acumulou." },
  { numero: 2, titulo: "Escolha operadora e faixa", descricao: "TOP ou SPTrans, e uma das quatro faixas: R$2, R$5, R$10 ou R$20. A faixa acima do seu saldo aparece bloqueada, então não tem como resgatar o que você não tem." },
  { numero: 3, titulo: "Use o cupom", descricao: "Você recebe o código e o QR na hora. O cupom vale 24 horas, com contagem regressiva na tela, e é aplicado direto no app da operadora." },
];
