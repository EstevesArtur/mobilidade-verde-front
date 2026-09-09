import type { ReactNode } from "react";

// Traducao do .card / .card--flat do components.css.
interface CardProps {
  children: ReactNode;
  plano?: boolean;
  centralizado?: boolean;
  className?: string;
}

export function Card({
  children,
  plano = false,
  centralizado = false,
  className = "",
}: CardProps) {
  return (
    <div
      className={
        "rounded-grande border border-linha bg-white p-8 " +
        (plano ? "shadow-suave " : "shadow-card ") +
        (centralizado ? "text-center " : "") +
        className
      }
    >
      {children}
    </div>
  );
}
