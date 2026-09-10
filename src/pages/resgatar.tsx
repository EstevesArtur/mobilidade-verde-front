import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Secao } from "../components/ui/secao";
import { Botao } from "../components/ui/botao";
import { Carregando } from "../components/ui/carregando";
import { OperadoraCard } from "../components/mobilidade/operadora-card";
import { FaixaCard } from "../components/mobilidade/faixa-card";
import { buscarUsuarioAtual, listarFaixas, listarOperadoras } from "../services/mobilidade-service";
import { gerarVoucher } from "../services/voucher-service";
import { fmtPontos, fmtReais } from "../utils/formato";
import type { Usuario } from "../types/usuario";
import type { Operadora } from "../types/operadora";
import type { FaixaCupom } from "../types/faixa-cupom";

export function Resgatar() {
  const navegar = useNavigate();

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [operadoras, setOperadoras] = useState<Operadora[]>([]);
  const [faixas, setFaixas] = useState<FaixaCupom[]>([]);
  const [carregando, setCarregando] = useState(true);

  // useState 3 de 4: a selecao do usuario nos passos 4 e 5 do fluxo.
  const [operadoraSelecionada, setOperadoraSelecionada] = useState<Operadora | null>(null);
  const [faixaSelecionada, setFaixaSelecionada] = useState<FaixaCupom | null>(null);
  const [gerando, setGerando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      const [dadosUsuario, dadosOperadoras, dadosFaixas] = await Promise.all([
        buscarUsuarioAtual(),
        listarOperadoras(),
        listarFaixas(),
      ]);

      if (!ativo) {
        return;
      }

      setUsuario(dadosUsuario);
      setOperadoras(dadosOperadoras);
      setFaixas(dadosFaixas);
      setCarregando(false);
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, []);

  function escolherOperadora(operadora: Operadora) {
    setOperadoraSelecionada(operadora);
    setFaixaSelecionada(null);
    setErro("");
  }

  async function confirmar() {
    if (!operadoraSelecionada || !faixaSelecionada) {
      return;
    }

    setGerando(true);
    setErro("");

    try {
      const voucher = await gerarVoucher(operadoraSelecionada.id_operadora, faixaSelecionada.id_faixa);
      // useNavigate leva para a rota dinamica levando o voucher no state,
      // no mesmo padrao do <Link ... state={{ workout }}> da Aula 6.
      navegar("/cupom/" + voucher.codigo, { state: { voucher } });
    } catch (problema) {
      setErro(problema instanceof Error ? problema.message : "Não foi possível gerar o cupom.");
      setGerando(false);
    }
  }

  if (carregando || !usuario) {
    return (
      <Secao>
        <Carregando mensagem="Carregando operadoras e faixas..." />
      </Secao>
    );
  }

  return (
    <Secao>
      <div className="mx-auto max-w-[880px]">
        <p className="font-display text-xs font-extrabold tracking-[0.14em] text-soul-600 uppercase">Passo 3 a 5 do resgate</p>
        <h1 className="font-display mt-2 mb-6 text-3xl leading-[1.15] font-bold text-soul-900 md:text-4xl">Trocar pontos por cupom</h1>
        <p className="max-w-[62ch] text-lg text-grafite-700">
          Saldo disponível: <strong>{fmtPontos(usuario.saldo_pontos)} Pontos ECOA</strong>. Escolha a operadora e a faixa de valor.
        </p>

        <section>
          <h2 className="font-display mt-8 mb-4 text-lg font-bold text-soul-900">1. Escolha a operadora</h2>
          <ul className="grid gap-6 md:grid-cols-2">
            {operadoras.map((operadora) => (
              <li key={operadora.id_operadora}>
                <OperadoraCard operadora={operadora} selecionada={operadoraSelecionada?.id_operadora === operadora.id_operadora} onSelecionar={escolherOperadora} />
              </li>
            ))}
          </ul>
        </section>

        {operadoraSelecionada && (
          <section>
            <h2 className="font-display mt-12 mb-4 text-lg font-bold text-soul-900">2. Escolha a faixa de valor</h2>
            <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {faixas.map((faixa) => (
                <li key={faixa.id_faixa}>
                  <FaixaCard faixa={faixa} selecionada={faixaSelecionada?.id_faixa === faixa.id_faixa} desabilitada={faixa.pontos_necessarios > usuario.saldo_pontos} onSelecionar={setFaixaSelecionada} />
                </li>
              ))}
            </ul>

            {faixaSelecionada && (
              <div className="mt-8 rounded-grande bg-soul-100 p-6 shadow-suave sm:p-8">
                <p>
                  Gerar cupom <strong>{fmtReais(faixaSelecionada.valor_centavos)}</strong> da <strong>{operadoraSelecionada.nome}</strong> por{" "}
                  <strong>{fmtPontos(faixaSelecionada.pontos_necessarios)} Pontos ECOA</strong>. Saldo após resgate:{" "}
                  <strong>{fmtPontos(usuario.saldo_pontos - faixaSelecionada.pontos_necessarios)}</strong> pts.
                </p>
                {erro && (
                  <p role="alert" className="mt-4 font-semibold text-erro">{erro}</p>
                )}
                <Botao variante="primario" tamanho="lg" className="mt-6" disabled={gerando} onClick={confirmar}>
                  {gerando ? "Gerando cupom..." : "Gerar cupom"}
                </Botao>
              </div>
            )}
          </section>
        )}
      </div>
    </Secao>
  );
}
