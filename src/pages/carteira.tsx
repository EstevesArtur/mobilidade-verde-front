import { useState } from "react";
import { Link } from "react-router-dom";
import { Secao } from "../components/ui/secao";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Botao } from "../components/ui/botao";
import { Carregando } from "../components/ui/carregando";
import { ErroApi } from "../components/ui/erro-api";
import { ListaVazia } from "../components/ui/lista-vazia";
import { SaldoCard } from "../components/mobilidade/saldo-card";
import { TransacaoItem } from "../components/mobilidade/transacao-item";
import { OperadoraLogo } from "../components/mobilidade/operadora-logo";
import { ImpactoCo2 } from "../components/mobilidade/impacto-co2";
import { useRequisicao } from "../hooks/use-requisicao";
import { buscarImpactoUsuario, buscarUsuarioAtual, listarTransacoes } from "../services/mobilidade-service";
import { estornarVoucher, listarVouchersDoUsuario } from "../services/voucher-service";
import { fmtDataCurta, fmtReais } from "../utils/formato";
import type { Usuario } from "../types/usuario";
import type { TransacaoPontos } from "../types/transacao";
import type { VoucherDetalhado, StatusVoucher } from "../types/voucher";
import type { Impacto } from "../types/impacto";
import type { TomBadge } from "../components/ui/badge";

const TOM_POR_STATUS: Record<StatusVoucher, TomBadge> = {
  GERADO: "ok",
  UTILIZADO: "soul",
  EXPIRADO: "expirado",
  CANCELADO: "expirado",
};

// Tudo que a carteira precisa, buscado em paralelo na API Java
interface DadosCarteira {
  usuario: Usuario;
  transacoes: TransacaoPontos[];
  vouchers: VoucherDetalhado[];
  impacto: Impacto;
}

async function carregarCarteira(): Promise<DadosCarteira> {
  const usuario = await buscarUsuarioAtual();
  const [transacoes, vouchers, impacto] = await Promise.all([
    listarTransacoes(usuario.id_usuario),
    listarVouchersDoUsuario(usuario.id_usuario),
    buscarImpactoUsuario(usuario.id_usuario),
  ]);
  return { usuario, transacoes, vouchers, impacto };
}

export function Carteira() {
  // Quatro estados de tela (carregando / erro / vazio / sucesso) vem do hook
  const { dados, carregando, erro, recarregar } = useRequisicao(carregarCarteira);

  // Estorno: operacao de escrita (POST) que devolve pontos a carteira
  const [estornando, setEstornando] = useState<string | null>(null);
  const [erroEstorno, setErroEstorno] = useState("");

  async function estornar(codigo: string) {
    setEstornando(codigo);
    setErroEstorno("");
    try {
      await estornarVoucher(codigo);
      recarregar(); // saldo, cupons e historico mudaram no banco: busca tudo de novo
    } catch (problema) {
      setErroEstorno(problema instanceof Error ? problema.message : "Não foi possível cancelar o cupom.");
    } finally {
      setEstornando(null);
    }
  }

  return (
    <Secao>
      <h1 className="sr-only">Sua carteira de Pontos ECOA</h1>

      {erro ? (
        <ErroApi mensagem={erro} onTentarNovamente={recarregar} />
      ) : carregando || !dados ? (
        <Carregando mensagem="Carregando sua carteira..." />
      ) : (
        <>
          <SaldoCard nome={dados.usuario.nome} saldo={dados.usuario.saldo_pontos} />

          <div className="mt-8">
            <ImpactoCo2 impacto={dados.impacto} titulo="Seu impacto acumulado" />
          </div>

          <Card className="mt-8">
            <h2 className="font-display mb-2 text-2xl font-bold text-soul-900">Meus cupons</h2>
            <p className="mb-4 text-sm text-grafite-500">Clique em um cupom para ver o código e o QR (T_VOUCHER)</p>
            {erroEstorno && (
              <p role="alert" className="mb-4 text-sm font-semibold text-erro">{erroEstorno}</p>
            )}
            {dados.vouchers.length === 0 ? (
              <ListaVazia mensagem="Você ainda não gerou nenhum cupom. Que tal trocar seus pontos agora?" />
            ) : (
              <ul>
                {dados.vouchers.map((voucher) => (
                  <li key={voucher.codigo} className="flex items-center gap-3 border-b border-linha py-4 last:border-0">
                    <Link to={"/cupom/" + voucher.codigo} state={{ voucher }} className="flex flex-1 items-center gap-4 rounded transition hover:bg-areia focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-transito-500">
                      <OperadoraLogo nome={voucher.operadora.nome} tamanho="sm" />
                      <span className="flex-1">
                        <span className="font-display block font-bold tracking-[0.08em] text-soul-900">{voucher.codigo}</span>
                        <span className="block text-xs text-grafite-500">
                          {voucher.operadora.nome} · {fmtReais(voucher.faixa.valor_centavos)} · {fmtDataCurta(voucher.gerado_em)}
                        </span>
                      </span>
                      <Badge tom={TOM_POR_STATUS[voucher.status]}>{voucher.status}</Badge>
                    </Link>
                    {voucher.status === "GERADO" && (
                      <Botao variante="fantasma" tamanho="sm" disabled={estornando === voucher.codigo} onClick={() => estornar(voucher.codigo)}>
                        {estornando === voucher.codigo ? "Cancelando..." : "Cancelar"}
                      </Botao>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card className="mt-8">
            <h2 className="font-display mb-2 text-2xl font-bold text-soul-900">Histórico recente</h2>
            <p className="mb-4 text-sm text-grafite-500">Movimentações de Pontos ECOA (T_TRANSACAO_PONTOS)</p>
            {dados.transacoes.length === 0 ? (
              <ListaVazia mensagem="Nenhuma movimentação registrada ainda." />
            ) : (
              <ul>
                {dados.transacoes.map((transacao) => (
                  <TransacaoItem key={transacao.id_transacao} transacao={transacao} />
                ))}
              </ul>
            )}
          </Card>
        </>
      )}
    </Secao>
  );
}
