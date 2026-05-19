/* ============================================================
   MOCK DATA · Mobilidade Verde
   Espelha o DDL (mobilidade_verde_ddl.sql) — nomes de campo
   batem com o banco/Java para integração nas Sprints 3-4.
   ============================================================ */

// T_USUARIO + T_CARTEIRA (1:1)
const USUARIOS = [
  { id_usuario: 1, nome: "Marina Soares",  cidade: "São Paulo",      saldo_pontos: 5000 },
  { id_usuario: 2, nome: "Rafael Lima",    cidade: "Rio de Janeiro", saldo_pontos: 1500 },
  { id_usuario: 3, nome: "Bruna Teixeira", cidade: "São Paulo",      saldo_pontos: 180  }, // saldo insuficiente até p/ R$2 (180 < 200)
];

// T_OPERADORA_TRANSPORTE
const OPERADORAS = [
  {
    id_operadora: 1, nome: "TOP", cidade: "Rio de Janeiro",
    modal: "MISTO", valor_passagem_centavos: 470,
    fator_co2_kg_km: 0.09200, formato_codigo: "TOP-XXXX-XXXX",
    ativo: "S", featured: true,
  },
  {
    id_operadora: 2, nome: "SPTrans", cidade: "São Paulo",
    modal: "ONIBUS", valor_passagem_centavos: 500,
    fator_co2_kg_km: 0.10100, formato_codigo: "SPT-XXXX-XXXX",
    ativo: "S", featured: false,
  },
];

// T_FAIXA_CUPOM
const FAIXAS = [
  { id_faixa: 1, valor_centavos: 200,  pontos_necessarios: 200,  ativo: "S" },
  { id_faixa: 2, valor_centavos: 500,  pontos_necessarios: 500,  ativo: "S" },
  { id_faixa: 3, valor_centavos: 1000, pontos_necessarios: 1000, ativo: "S" },
  { id_faixa: 4, valor_centavos: 2000, pontos_necessarios: 2000, ativo: "S" },
];

// T_VOUCHER (exemplos)
const VOUCHERS = [
  {
    id_voucher: 1, id_usuario: 1, id_operadora: 1, id_faixa: 2,
    codigo: "TOP-A7B3-X9K2", status: "GERADO",
    gerado_em: "2026-05-16T20:10:00", expira_em: "2026-05-17T20:10:00",
  },
  {
    id_voucher: 2, id_usuario: 1, id_operadora: 2, id_faixa: 1,
    codigo: "SPT-4F1C-Q8M0", status: "EXPIRADO",
    gerado_em: "2026-05-02T09:00:00", expira_em: "2026-05-03T09:00:00",
  },
];

// T_TRANSACAO_PONTOS (histórico da carteira)
const TRANSACOES = [
  { id_transacao: 1, id_usuario: 1, tipo: "CREDITO", pontos: 800, origem: "OUTROS",           descricao: "Campanha parceiro · vídeo", data_transacao: "2026-05-15T11:20:00" },
  { id_transacao: 2, id_usuario: 1, tipo: "DEBITO",  pontos: 500, origem: "VOUCHER_GERACAO",  descricao: "Cupom TOP R$5,00",          data_transacao: "2026-05-16T20:10:00" },
  { id_transacao: 3, id_usuario: 1, tipo: "CREDITO", pontos: 1200,origem: "OUTROS",           descricao: "Compra cartão parceiro",     data_transacao: "2026-05-14T16:05:00" },
  { id_transacao: 4, id_usuario: 1, tipo: "DEBITO",  pontos: 200, origem: "VOUCHER_GERACAO",  descricao: "Cupom SPTrans R$2,00",       data_transacao: "2026-05-02T09:00:00" },
  { id_transacao: 5, id_usuario: 1, tipo: "CREDITO", pontos: 450, origem: "OUTROS",           descricao: "Check-in evento sustentável",data_transacao: "2026-04-29T18:40:00" },
];

// Usuário "logado" no protótipo
const USUARIO_ATUAL = USUARIOS[0];

// Helpers de formatação (sem libs)
function fmtPontos(n) { return n.toLocaleString("pt-BR"); }
function fmtReais(centavos) {
  return (centavos / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function getOperadora(id) { return OPERADORAS.find(o => o.id_operadora === id); }
function getFaixa(id) { return FAIXAS.find(f => f.id_faixa === id); }
