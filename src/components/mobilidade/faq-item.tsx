// Acordeao acessivel. A animacao usa grid-rows 0fr -> 1fr, que anima
// altura sem precisar medir scrollHeight na mao como no JS antigo.
interface FaqItemProps {
  id: number;
  pergunta: string;
  resposta: string;
  aberto: boolean;
  onAlternar: (id: number) => void;
}

export function FaqItem({
  id,
  pergunta,
  resposta,
  aberto,
  onAlternar,
}: FaqItemProps) {
  return (
    <article className="border-b border-linha">
      <h3>
        <button
          type="button"
          aria-expanded={aberto}
          aria-controls={"faq-resposta-" + id}
          onClick={() => onAlternar(id)}
          className="font-display flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left text-lg font-bold text-soul-900 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-transito-500"
        >
          {pergunta}
          <span
            aria-hidden="true"
            className={
              "flex-none text-soul-600 transition-transform duration-250 motion-reduce:transition-none " +
              (aberto ? "rotate-45" : "rotate-0")
            }
          >
            &#65291;
          </span>
        </button>
      </h3>

      <div
        id={"faq-resposta-" + id}
        role="region"
        className={
          "grid overflow-hidden transition-all duration-300 motion-reduce:transition-none " +
          (aberto ? "grid-rows-[1fr]" : "grid-rows-[0fr]")
        }
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-grafite-700">{resposta}</p>
        </div>
      </div>
    </article>
  );
}
