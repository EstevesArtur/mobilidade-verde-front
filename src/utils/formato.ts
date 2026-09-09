export function fmtPontos(valor: number): string {
  return valor.toLocaleString("pt-BR");
}

export function fmtReais(centavos: number): string {
  return (centavos / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function fmtDataCurta(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

export function fmtDataHora(iso: string): string {
  return new Date(iso).toLocaleString("pt-BR");
}
