import { useCallback, useEffect, useRef, useState } from "react";

// Hook generico de leitura da API: concentra os quatro estados de tela
// (carregando, erro, vazio e sucesso) em um unico lugar.
// Cada pagina passa a funcao que busca os dados e recebe tudo pronto.
interface Requisicao<T> {
  dados: T | null;
  carregando: boolean;
  erro: string | null;
  recarregar: () => void;
}

export function useRequisicao<T>(buscar: () => Promise<T>, dependencias: unknown[] = []): Requisicao<T> {
  const [dados, setDados] = useState<T | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [tentativa, setTentativa] = useState(0);

  // Guarda sempre a versao mais recente de "buscar" sem precisar
  // coloca-la nas dependencias do useEffect (evitaria loop de renders).
  const buscarRef = useRef(buscar);
  buscarRef.current = buscar;

  // recarregar() so incrementa o contador: o useEffect abaixo reage e busca de novo
  const recarregar = useCallback(() => setTentativa((n) => n + 1), []);

  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    setErro(null);

    buscarRef
      .current()
      .then((resultado) => ativo && setDados(resultado))
      .catch((problema: unknown) => {
        if (!ativo) return;
        setErro(problema instanceof Error ? problema.message : "Erro inesperado.");
      })
      .finally(() => ativo && setCarregando(false));

    // Cleanup: ignora a resposta se a pagina desmontar antes dela chegar
    return () => {
      ativo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tentativa, ...dependencias]);

  return { dados, carregando, erro, recarregar };
}
