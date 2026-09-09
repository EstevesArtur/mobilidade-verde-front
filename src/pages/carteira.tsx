import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Secao } from "../components/ui/secao";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Carregando } from "../components/ui/carregando";
import { SaldoCard } from "../components/mobilidade/saldo-card";
import { TransacaoItem } from "../components/mobilidade/transacao-item";
import { OperadoraLogo } from "../components/mobilidade/operadora-logo";
import { buscarUsuarioAtual, listarTransacoes } from "../services/mobilidade-service";
import { listarVouchersDoUsuario } from "../services/voucher-service";
import { fmtDataCurta, fmtReais } from "../utils/formato";
import type { Usuario } from "../types/usuario";
import type { TransacaoPontos } from "../types/transacao";
import type { VoucherDetalhado, StatusVoucher } from "../types/voucher";
import type { TomBadge } from "../components/ui/badge";

const TOM_POR_STATUS: Record<StatusVoucher, TomBadge> = {
  GERADO: "ok",
  UTILIZADO: "soul",
  EXPIRADO: "expirado",
  CANCELADO: "expirado",
};

export function Carteira() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [transacoes, setTransacoes] = useState<TransacaoPontos[]>([]);
  const [vouchers, setVouchers] = useState<VoucherDetalhado[]>([]);
  const [carregando, setCarregando] = useState(true);

  // useEffect 3 de 3: busca os dados quando a pagina monta.
  // A flag "ativo" evita atualizar estado se o usuario sair antes da resposta.
  useEffect(() => {
    let ativo = true;

    async function carregar() {
      const dadosUsuario = await buscarUsuarioAtual();
      const [dadosTransacoes, dadosVouchers] = await Promise.all([
        listarTransacoes(dadosUsuario.id_usuario),
        listarVouchersDoUsuario(dadosUsuario.id_usuario),
      ]);

      if (!ativo) {
        return;
      }

      setUsuario(dadosUsuario);
      setTransacoes(dadosTransacoes);
      setVouchers(dadosVouchers);
      setCarregando(false);
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, []);

  return (
    <Secao>
      <h1 className="sr-only">Sua carteira de Pontos ECOA</h1>

      {carregando || !usuario ? (
        <Carregando mensagem="Carregando sua carteira..." />
      ) : (
        <>
          <SaldoCard nome={usuario.nome} saldo={usuario.saldo_pontos} />

          <Card className="mt-8">
            <h2 className="font-display mb-2 text-2xl font-bold text-soul-900">Meus cupons</h2>
            <p className="mb-4 text-sm text-grafite-500">Clique em um cupom para ver o código e o QR (T_VOUCHER)</p>
            <ul>
              {vouchers.map((voucher) => (
                <li key={voucher.codigo}>
                  <Link to={"/cupom/" + voucher.codigo} state={{ voucher }} className="flex items-center justify-between gap-4 border-b border-linha py-4 transition last:border-0 hover:bg-areia focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-transito-500">
                    <OperadoraLogo nome={voucher.operadora.nome} tamanho="sm" />
                    <span className="flex-1">
                      <span className="font-display block font-bold tracking-[0.08em] text-soul-900">{voucher.codigo}</span>
                      <span className="block text-xs text-grafite-500">
                        {voucher.operadora.nome} · {fmtReais(voucher.faixa.valor_centavos)} · {fmtDataCurta(voucher.gerado_em)}
                      </span>
                    </span>
                    <Badge tom={TOM_POR_STATUS[voucher.status]}>{voucher.status}</Badge>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="mt-8">
            <h2 className="font-display mb-2 text-2xl font-bold text-soul-900">Histórico recente</h2>
            <p className="mb-4 text-sm text-grafite-500">Movimentações de Pontos ECOA (T_TRANSACAO_PONTOS)</p>
            <ul>
              {transacoes.map((transacao) => (
                <TransacaoItem key={transacao.id_transacao} transacao={transacao} />
              ))}
            </ul>
          </Card>
        </>
      )}
    </Secao>
  );
}
