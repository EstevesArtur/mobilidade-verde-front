import type { ReactNode } from "react";

export type TomBadge =
  | "soul"
  | "ecoa"
  | "transito"
  | "representante"
  | "ok"
  | "expirado";

// Traducao das variantes .badge--* do components.css.
const TONS: Record<TomBadge, string> = {
  soul: "bg-soul-100 text-soul-700",
  ecoa: "bg-ecoa-100 text-ecoa-700",
  transito: "bg-transito-100 text-transito-700",
  representante: "bg-ecoa-500 text-soul-900",
  ok: "bg-soul-100 text-soul-700",
  expirado: "bg-[#FBE3E3] text-erro",
};

interface BadgeProps {
  children: ReactNode;
  tom?: TomBadge;
  className?: string;
}

export function Badge({ children, tom = "soul", className = "" }: BadgeProps) {
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-pilula px-3 py-1 text-xs font-bold tracking-[0.02em] " +
        TONS[tom] +
        " " +
        className
      }
    >
      {children}
    </span>
  );
}
