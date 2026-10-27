// ============================================================
// Contratos da API Java (Spring Boot) publicada no Render.
// Os nomes aqui sao EXATAMENTE os que a API devolve (camelCase).
// A traducao para o formato do front (snake_case, espelho do DDL)
// acontece nos services — as telas nunca veem estes tipos.
// ============================================================

export interface OperadoraApi {
  id: number;
  nome: string;
  cidade: string;
  modal: "ONIBUS" | "METRO" | "TREM" | "MISTO" | "BRT";
  valorPassagemCentavos: number;
  fatorCo2KgKm: number;
  formatoCodigo: string;
  ativo: boolean;
}

export interface FaixaApi {
  id: number;
  valorCentavos: number;
  pontosNecessarios: number;
  ativo: boolean;
}

// UsuarioResponse: a API nunca devolve hashSenha nem cpfHash aqui.
export interface UsuarioApi {
  id: number;
  nome: string;
  email: string;
  cidade: string;
  saldoPontos: number;
}

export interface VoucherApi {
  id: number;
  usuario: { id: number };
  operadora: OperadoraApi;
  faixa: FaixaApi;
  codigo: string;
  status: "GERADO" | "UTILIZADO" | "EXPIRADO" | "CANCELADO";
  geradoEm: string;
  expiraEm: string;
  utilizadoEm: string | null;
}

export interface TransacaoApi {
  id: number;
  usuario: { id: number };
  tipo: "CREDITO" | "DEBITO";
  pontos: number;
  origem: "VOUCHER_GERACAO" | "ESTORNO" | "AJUSTE_MANUAL" | "OUTROS";
  voucher: { id: number; codigo: string } | null;
  descricao: string;
  dataTransacao: string;
}

export interface FavoritaApi {
  id: number;
  usuario: { id: number };
  operadora: OperadoraApi;
  ordemPreferencia: number;
  favoritadoEm: string;
}

export interface ImpactoApi {
  qtdViagens: number;
  kmEstimado: number;
  co2EvitadoKg: number;
  arvoresAno: number;
  arvoresDia: number;
  kmCarroEvitado: number;
}

// Corpo do POST /api/vouchers
export interface NovoVoucherRequest {
  idUsuario: number;
  idOperadora: number;
  idFaixa: number;
}

// Resposta do POST /api/vouchers (CupomDTO)
export interface CupomCriadoApi {
  codigo: string;
  nomeOperadora: string;
  valorCentavos: number;
  pontosDebitados: number;
  expiraEm: string;
}

// Resposta do POST /api/vouchers/{codigo}/estornar
export interface EstornoApi {
  mensagem: string;
  pontosDevolvidos: number;
  codigo: string;
}

// Formato padrao de erro do TratadorDeErros da API
export interface ErroApi {
  status: number;
  erro: string;
  mensagem: string;
  momento: string;
}
