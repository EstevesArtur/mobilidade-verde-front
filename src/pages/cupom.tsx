import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Secao } from "../components/ui/secao";
import { Card } from "../components/ui/card";
import { Botao } from "../components/ui/botao";
import { Carregando } from "../components/ui/carregando";
import { ErroApi } from "../components/ui/erro-api";
import { CupomCard } from "../components/mobilidade/cupom-card";
import { ImpactoCo2 } from "../components/mobilidade/impacto-co2";
import { buscarVoucherPorCodigo } from "../services/voucher-service";
import { ErroHttp } from "../services/api/cliente-http";
import { calcularImpacto } from "../utils/co2";
import type { VoucherDetalhado } from "../types/voucher";

export function Cupom() {
  // useParams le o :codigo da URL /cupom/:codigo
  const { codigo } = useParams();
  const navegar = useNavigate();
  const localizacao = useLocation();

  // useLocation traz o voucher enviado pelo state do Link/navigate,
  // evitando uma busca desnecessaria quando ja temos o objeto.
  const voucherDoState = (localizacao.state as { voucher?: VoucherDetalhado } | null)?.voucher;

  const [voucher, setVoucher] = useState<VoucherDetalhado | null>(null);
  const [carregando, setCarregando] = useState(true);
  // Erro de rede/API e diferente de "cupom nao existe" (404): sao duas telas
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      if (voucherDoState) {
        setVoucher(voucherDoState);
        setCarregando(false);
        return;
      }

      if (!codigo) {
        setVoucher(null);
        setCarregando(false);
        return;
      }

      try {
        const encontrado = await buscarVoucherPorCodigo(codigo);
        if (!ativo) return;
        setVoucher(encontrado ?? null);
      } catch (problema) {
        if (!ativo) return;
        // 404 cai no "nao encontrado"; qualquer outro erro mostra a tela de erro
        if (!(problema instanceof ErroHttp && problema.status === 404)) {
          setErro(problema instanceof Error ? problema.message : "Erro ao buscar o cupom.");
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, [codigo, voucherDoState]);

  if (carregando) {
    return (
      <Secao>
        <Carregando mensagem="Buscando seu cupom..." />
      </Secao>
    );
  }

  if (erro) {
    return (
      <Secao>
        <ErroApi mensagem={erro} />
      </Secao>
    );
  }

  if (!voucher) {
    return (
      <Secao>
        <div className="mx-auto max-w-[620px]">
          <Card centralizado>
            <h1 className="font-display text-2xl font-bold text-soul-900">Cupom não encontrado</h1>
            <p className="mt-3 text-grafite-700">
              Não localizamos nenhum cupom com o código <strong>{codigo}</strong>. Confira o código ou gere um novo na carteira.
            </p>
            <Botao variante="primario" className="mt-6" onClick={() => navegar("/carteira")}>
              Voltar para a carteira
            </Botao>
          </Card>
        </div>
      </Secao>
    );
  }

  const impacto = calcularImpacto(voucher.operadora, voucher.faixa);

  return (
    <Secao>
      <div className="mx-auto max-w-[620px]">
        <p className="font-display text-center text-xs font-extrabold tracking-[0.14em] text-soul-600 uppercase">Passo 6 a 7 do resgate</p>
        <h1 className="font-display mt-2 mb-8 text-center text-3xl leading-[1.15] font-bold text-soul-900 md:text-4xl">Seu cupom está pronto</h1>

        <CupomCard voucher={voucher} />

        <div className="mt-8">
          <ImpactoCo2 impacto={impacto} />
        </div>

        <p className="mt-8 text-center">
          <Botao variante="fantasma" onClick={() => navegar("/carteira")}>
            &larr; Voltar para a carteira
          </Botao>
        </p>
      </div>
    </Secao>
  );
}
