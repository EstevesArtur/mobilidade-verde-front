import { useLocation } from "react-router-dom";
import { Secao } from "../components/ui/secao";
import { Card } from "../components/ui/card";
import { BotaoLink } from "../components/ui/botao-link";

export function NaoEncontrada() {
  const { pathname } = useLocation();

  return (
    <Secao>
      <div className="mx-auto max-w-[620px]">
        <Card centralizado>
          <p className="font-display text-6xl font-extrabold text-soul-300">404</p>
          <h1 className="font-display mt-4 text-2xl font-bold text-soul-900">Página não encontrada</h1>
          <p className="mt-3 text-grafite-700">
            O endereço <strong>{pathname}</strong> não existe na Mobilidade Verde.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <BotaoLink para="/" variante="primario">Voltar para o início</BotaoLink>
            <BotaoLink para="/carteira" variante="fantasma">Ir para a carteira</BotaoLink>
          </div>
        </Card>
      </div>
    </Secao>
  );
}
