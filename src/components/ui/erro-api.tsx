import { Botao } from "./botao";

// Estado de ERRO das telas que consomem a API (Sprint 4).
// Mostra a mensagem que a API devolveu e oferece tentar de novo.
interface ErroApiProps {
  mensagem: string;
  onTentarNovamente?: () => void;
}

export function ErroApi({ mensagem, onTentarNovamente }: ErroApiProps) {
  return (
    <div role="alert" className="rounded-grande border border-alerta/40 bg-alerta/10 p-6 text-center">
      <p className="font-display text-lg font-bold text-soul-900">Não foi possível carregar os dados</p>
      <p className="mt-2 text-sm text-grafite-700">{mensagem}</p>
      <p className="mt-1 text-xs text-grafite-500">
        A API no Render pode estar iniciando (até 1 minuto). Tente novamente em instantes.
      </p>
      {onTentarNovamente && (
        <Botao variante="primario" className="mt-5" onClick={onTentarNovamente}>
          Tentar novamente
        </Botao>
      )}
    </div>
  );
}
