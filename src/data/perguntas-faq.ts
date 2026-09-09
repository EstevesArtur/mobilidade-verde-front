import type { PerguntaFaq } from "../types/pergunta-faq";

export const PERGUNTAS_FAQ: PerguntaFaq[] = [
  {
    id: 1,
    pergunta: "O que é a Mobilidade Verde?",
    resposta:
      "É a feature da SoulUp que permite trocar seus Pontos ECOA por cupom real de transporte público, aceito pela TOP e pela SPTrans.",
  },
  {
    id: 2,
    pergunta: "Como eu troco meus pontos por cupom?",
    resposta:
      'Acesse a Carteira, toque em "Trocar por cupom de transporte", escolha a operadora e a faixa de valor. O cupom é gerado na hora.',
  },
  {
    id: 3,
    pergunta: "Em quais operadoras posso usar?",
    resposta:
      "No MVP, TOP (destaque) e SPTrans. A modelagem já está pronta para novas operadoras nas próximas sprints.",
  },
  {
    id: 4,
    pergunta: "Quanto vale 1 Ponto ECOA?",
    resposta:
      "A conversão é por faixa fixa: R$2 = 200 pts, R$5 = 500 pts, R$10 = 1.000 pts, R$20 = 2.000 pts.",
  },
  {
    id: 5,
    pergunta: "Como uso o cupom no app da TOP ou SPTrans?",
    resposta:
      "Abra o app da operadora, vá em Recarga/Cupom, digite o código gerado e use seu cartão normalmente.",
  },
  {
    id: 6,
    pergunta: "Quanto tempo o cupom dura?",
    resposta:
      "O cupom expira em 24 horas após a geração. A validade aparece em contagem regressiva na tela do cupom.",
  },
  {
    id: 7,
    pergunta: "E se eu não usar o cupom?",
    resposta:
      "Cupom expirado muda de status e não debita novamente — o controle de status protege o usuário e o sistema.",
  },
  {
    id: 8,
    pergunta: "E a fraude?",
    resposta:
      "Cada cupom tem código único e hash de validação, vínculo a um único usuário, status controlado e log imutável de transações.",
  },
];
