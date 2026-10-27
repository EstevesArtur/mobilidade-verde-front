import type { Impacto } from "../../types/impacto";

// Traducao do .impact-panel. O numero vem de utils/co2.ts, onde o
// CO2 evitado e (carro 0,180 - onibus 0,082) x km.
interface ImpactoCo2Props {
  impacto: Impacto;
  // Na tela do cupom e "desta viagem"; na carteira e o acumulado do usuario
  titulo?: string;
}

export function ImpactoCo2({ impacto, titulo = "Impacto ambiental desta viagem" }: ImpactoCo2Props) {
  return (
    <section
      aria-label={titulo}
      className="grid grid-cols-2 gap-6 rounded-grande bg-soul-100 p-6 text-center sm:p-8"
    >
      <h2 className="font-display col-span-full text-left text-lg font-bold text-soul-900">{titulo}</h2>
      <div>
        <p className="font-display text-3xl font-extrabold text-soul-700 sm:text-4xl">
          {impacto.co2EvitadoKg.toLocaleString("pt-BR")} kg
        </p>
        <p className="text-sm text-grafite-700">CO₂ evitado</p>
      </div>
      <div>
        <p className="font-display text-3xl font-extrabold text-soul-700 sm:text-4xl">
          🌳 {impacto.arvoresDia}
        </p>
        <p className="text-sm text-grafite-700">
          equivalente a {impacto.arvoresDia} árvore(s) absorvendo CO₂ por 1 dia
        </p>
      </div>
      <p className="col-span-full border-t border-soul-300 pt-4 text-xs text-grafite-500">
        Base: {impacto.passagens} viagem(ns) · {impacto.kmEstimado} km
        estimados · emissão do carro (MMA) menos a do transporte público (ANTP)
      </p>
    </section>
  );
}
