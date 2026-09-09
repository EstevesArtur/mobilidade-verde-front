import { useState } from "react";
import { Secao } from "../components/ui/secao";
import { CabecalhoPagina } from "../components/ui/cabecalho-pagina";
import { FaqItem } from "../components/mobilidade/faq-item";
import { PERGUNTAS_FAQ } from "../data/perguntas-faq";

export function Faq() {
  // useState 2 de 4: guarda qual pergunta esta aberta (0 = nenhuma).
  const [aberta, setAberta] = useState(0);

  function alternar(id: number) {
    setAberta(aberta === id ? 0 : id);
  }

  return (
    <>
      <CabecalhoPagina titulo="Perguntas frequentes" descricao="Tudo sobre o caminho de resgate: pontos, operadoras, cupom e segurança." />

      <Secao>
        <div className="mx-auto max-w-[780px]">
          {PERGUNTAS_FAQ.map((item) => (
            <FaqItem key={item.id} id={item.id} pergunta={item.pergunta} resposta={item.resposta} aberto={aberta === item.id} onAlternar={alternar} />
          ))}
        </div>
      </Secao>
    </>
  );
}
