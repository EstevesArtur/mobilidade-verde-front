import { Botao } from "../components/ui/botao";
import { BotaoLink } from "../components/ui/botao-link";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Secao } from "../components/ui/secao";
import { TituloSecao } from "../components/ui/titulo-secao";
import { CabecalhoPagina } from "../components/ui/cabecalho-pagina";
import { CampoErro } from "../components/ui/campo-erro";

export function Home() {
  return (
    <>
      <CabecalhoPagina
        titulo="Vitrine de componentes"
        descricao="Tela temporária para validar os 8 componentes de UI antes de migrar as páginas reais."
      />

      <Secao>
        <TituloSecao sobretitulo="Componente 1 e 2" titulo="Botões e links" />
        <div className="flex flex-wrap items-center gap-3">
          <Botao variante="primario">Primário</Botao>
          <Botao variante="transito">Trânsito</Botao>
          <Botao variante="fantasma">Fantasma</Botao>
          <Botao variante="primario" tamanho="lg">
            Primário grande
          </Botao>
          <Botao disabled>Desabilitado</Botao>
          <BotaoLink para="/faq" variante="transito">
            Isto é um Link
          </BotaoLink>
        </div>

        <TituloSecao
          sobretitulo="Componente 3 e 4"
          titulo="Cards e badges"
          className="mt-16"
        />
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <div className="flex flex-wrap gap-2">
              <Badge tom="soul">Soul</Badge>
              <Badge tom="ecoa">ECOA</Badge>
              <Badge tom="transito">Trânsito</Badge>
            </div>
            <p className="mt-6">Card padrão, com sombra alta.</p>
          </Card>
          <Card plano centralizado>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge tom="representante">★ Representante</Badge>
              <Badge tom="ok">Cupom gerado</Badge>
              <Badge tom="expirado">Expirado</Badge>
            </div>
            <p className="mt-6">Card plano e centralizado.</p>
          </Card>
        </div>

        <TituloSecao
          sobretitulo="Componente 8"
          titulo="Mensagem de erro"
          className="mt-16"
        />
        <Card>
          <label
            htmlFor="teste"
            className="font-display font-bold text-soul-900"
          >
            Campo de exemplo
          </label>
          <input
            id="teste"
            className="mt-2 block w-full rounded-suave border border-linha px-4 py-3 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-transito-500"
            placeholder="Digite algo"
          />
          <CampoErro mensagem="Informe ao menos 3 caracteres." />
        </Card>
      </Secao>
    </>
  );
}
