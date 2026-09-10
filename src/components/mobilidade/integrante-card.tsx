import type { Integrante } from "../../types/integrante";
import { Badge } from "../ui/badge";

const ICONE_LINKEDIN =
  "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.46c.98 0 1.77-.78 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z";

const ICONE_GITHUB =
  "M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 .3";

const CLASSES_SOCIAL =
  "grid h-9 w-9 place-items-center rounded-full bg-soul-100 text-soul-700 transition duration-200 hover:-translate-y-0.5 hover:bg-soul-700 hover:text-white motion-reduce:transition-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-transito-500";

interface LinkSocialProps {
  href: string;
  rotulo: string;
  icone: string;
}

function LinkSocial({ href, rotulo, icone }: LinkSocialProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={rotulo} className={CLASSES_SOCIAL}>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-current">
        <path d={icone} />
      </svg>
    </a>
  );
}

interface IntegranteCardProps {
  integrante: Integrante;
}

export function IntegranteCard({ integrante }: IntegranteCardProps) {
  const tomBadge = integrante.representante ? "representante" : "soul";
  const rotuloBadge = integrante.representante ? "★ Representante" : "Integrante";

  return (
    <article className="rounded-grande border border-linha bg-white px-6 py-8 text-center shadow-card transition duration-200 hover:-translate-y-1.5 motion-reduce:transition-none">
      <div className="mx-auto mb-4 h-[78px] w-[78px] overflow-hidden rounded-full bg-gradient-to-br from-soul-700 to-soul-500">
        <img src={integrante.foto} alt={"Foto de " + integrante.nome} width={78} height={78} loading="lazy" className="h-full w-full object-cover" />
      </div>

      <h3 className="font-display text-lg font-bold text-soul-900">{integrante.nome}</h3>
      <p className="mt-0.5 text-sm text-grafite-500">{integrante.rm}</p>
      <p className="mt-2 text-xs font-bold text-soul-600">Turma {integrante.turma}</p>
      {integrante.funcao && <p className="mt-1 text-xs text-grafite-500">{integrante.funcao}</p>}

      <Badge tom={tomBadge} className="mt-3">{rotuloBadge}</Badge>

      <div className="mt-4 flex justify-center gap-3">
        <LinkSocial href={integrante.linkedin} rotulo={"LinkedIn de " + integrante.nome} icone={ICONE_LINKEDIN} />
        <LinkSocial href={integrante.github} rotulo={"GitHub de " + integrante.nome} icone={ICONE_GITHUB} />
      </div>
    </article>
  );
}
