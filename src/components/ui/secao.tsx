import type { ReactNode } from "react";

// Substitui o par .section + .container que se repetia nas 8 paginas HTML.
// Espacamento vertical menor no mobile, igual ao media query original.
interface SecaoProps {
  children: ReactNode;
  estreita?: boolean;
  className?: string;
}

export function Secao({
  children,
  estreita = false,
  className = "",
}: SecaoProps) {
  return (
    <section className={(estreita ? "py-12" : "py-12 md:py-24") + " " + className}>
      <div className="mx-auto w-full max-w-[1140px] px-4 sm:px-6">
        {children}
      </div>
    </section>
  );
}
