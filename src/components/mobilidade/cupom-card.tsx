import { useEffect, useState } from "react";
import type { VoucherDetalhado } from "../../types/voucher";
import { OperadoraLogo } from "./operadora-logo";
import { Badge } from "../ui/badge";
import { Botao } from "../ui/botao";
import { fmtDataHora, fmtReais } from "../../utils/formato";

function calcularRestante(expiraEm: string): string {
  const diferenca = new Date(expiraEm).getTime() - Date.now();

  if (diferenca <= 0) {
    return "Cupom expirado";
  }

  const horas = Math.floor(diferenca / 3600000);
  const minutos = Math.floor((diferenca % 3600000) / 60000);
  const segundos = Math.floor((diferenca % 60000) / 1000);

  return (
    "Expira em " +
    horas +
    "h " +
    String(minutos).padStart(2, "0") +
    "min " +
    String(segundos).padStart(2, "0") +
    "s"
  );
}

interface CupomCardProps {
  voucher: VoucherDetalhado;
}

export function CupomCard({ voucher }: CupomCardProps) {
  const ativo = voucher.status === "GERADO";

  // useState 4 de 4: contagem regressiva, aviso de copia e falha do QR.
  const [restante, setRestante] = useState(() =>
    ativo ? calcularRestante(voucher.expira_em) : ""
  );
  const [copiado, setCopiado] = useState(false);
  const [qrFalhou, setQrFalhou] = useState(false);

  // useEffect 2 de 3: relogio de 1 em 1 segundo ate o cupom expirar.
  // O return e o cleanup: sem ele o intervalo continuaria rodando depois
  // que o usuario sai da tela, vazando memoria.
  useEffect(() => {
    if (voucher.status !== "GERADO") {
      return;
    }

    setRestante(calcularRestante(voucher.expira_em));

    const intervalo = setInterval(() => {
      setRestante(calcularRestante(voucher.expira_em));
    }, 1000);

    return () => clearInterval(intervalo);
  }, [voucher.status, voucher.expira_em]);

  async function copiarCodigo() {
    try {
      await navigator.clipboard.writeText(voucher.codigo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      setCopiado(false);
    }
  }

  const qrUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
    encodeURIComponent(voucher.codigo);

  return (
    <article
      className="overflow-hidden rounded-grande border border-linha bg-white shadow-alta"
      aria-label={"Cupom " + voucher.operadora.nome}
    >
      <header className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-br from-transito-700 to-transito-500 p-6 text-white sm:p-8">
        <div>
          {voucher.status === "GERADO" && <Badge tom="ok">CUPOM GERADO</Badge>}
          {voucher.status === "UTILIZADO" && (
            <Badge tom="soul">CUPOM UTILIZADO</Badge>
          )}
          {(voucher.status === "EXPIRADO" ||
            voucher.status === "CANCELADO") && (
            <Badge tom="expirado">CUPOM {voucher.status}</Badge>
          )}
          <h2 className="font-display mt-3 text-2xl font-bold text-white">
            {voucher.operadora.nome} · {fmtReais(voucher.faixa.valor_centavos)}
          </h2>
        </div>
        <OperadoraLogo nome={voucher.operadora.nome} tamanho="md" />
      </header>

      <div className="px-4 py-10 text-center sm:px-8 sm:py-12">
        <p className="font-display text-xs font-extrabold tracking-[0.14em] text-soul-600 uppercase">
          Seu código de cupom
        </p>
        <p className="font-display mt-3 rounded-card border-2 border-dashed border-soul-300 bg-areia p-6 text-[clamp(1.4rem,5vw,2.4rem)] leading-tight font-extrabold tracking-[0.18em] break-all text-soul-900">
          {voucher.codigo}
        </p>

        {ativo ? (
          <p className="mt-4 inline-flex items-center gap-2 rounded-pilula bg-ecoa-100 px-4 py-2 text-sm font-bold text-ecoa-700">
            ⏳ {restante}
            <time dateTime={voucher.expira_em} className="sr-only">
              expira {fmtDataHora(voucher.expira_em)}
            </time>
          </p>
        ) : (
          <p className="mt-4 inline-flex items-center gap-2 rounded-pilula bg-linha px-4 py-2 text-sm font-bold text-grafite-500">
            Gerado em {fmtDataHora(voucher.gerado_em)}
          </p>
        )}

        <figure className="mx-auto my-8 h-[200px] w-[200px]">
          {qrFalhou ? (
            <div className="font-display grid h-full w-full place-items-center rounded-suave border-2 border-dashed border-soul-300 p-2 text-sm font-bold break-all text-soul-900">
              {voucher.codigo}
            </div>
          ) : (
            <img
              src={qrUrl}
              alt={"QR Code do cupom " + voucher.codigo}
              width={200}
              height={200}
              onError={() => setQrFalhou(true)}
              className="h-full w-full rounded-suave"
            />
          )}
        </figure>

        <Botao variante="transito" onClick={copiarCodigo}>
          {copiado ? "✅ Código copiado!" : "📋 Copiar código"}
        </Botao>

        <ol className="mx-auto mt-8 max-w-[420px] text-left">
          <li className="flex gap-3 border-b border-linha py-3 text-sm last:border-0">
            <b className="text-transito-700">1.</b> Abra o app da{" "}
            {voucher.operadora.nome}
          </li>
          <li className="flex gap-3 border-b border-linha py-3 text-sm last:border-0">
            <b className="text-transito-700">2.</b> Vá em Recarga / Cupom
          </li>
          <li className="flex gap-3 border-b border-linha py-3 text-sm last:border-0">
            <b className="text-transito-700">3.</b> Digite o código{" "}
            <b className="text-transito-700">{voucher.codigo}</b>
          </li>
          <li className="flex gap-3 border-b border-linha py-3 text-sm last:border-0">
            <b className="text-transito-700">4.</b> Use seu cartão de transporte
            normalmente
          </li>
        </ol>
      </div>
    </article>
  );
}
