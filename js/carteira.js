/* ============================================================
   CARTEIRA · Mobilidade Verde
   Renderiza saldo de Pontos ECOA + histórico (T_TRANSACAO_PONTOS)
   Markup gerado é semântico (<li>, <article>, <time>).
   ============================================================ */

(function carteira() {
  const balanceEl = document.querySelector("#wallet-balance");
  const nameEl = document.querySelector("#wallet-name");
  const listEl = document.querySelector("#tx-list");
  if (!balanceEl) return;

  balanceEl.textContent = fmtPontos(USUARIO_ATUAL.saldo_pontos);
  if (nameEl) nameEl.textContent = USUARIO_ATUAL.nome.split(" ")[0];

  // Ordena do mais recente ao mais antigo (espelha IDX_TRANS_USR_DATA)
  const txs = TRANSACOES
    .filter((t) => t.id_usuario === USUARIO_ATUAL.id_usuario)
    .sort((a, b) => new Date(b.data_transacao) - new Date(a.data_transacao));

  listEl.innerHTML = txs.map((t) => {
    const isIn = t.tipo === "CREDITO";
    const dObj = new Date(t.data_transacao);
    const dLabel = dObj.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
    const iso = dObj.toISOString();
    return `
      <li>
        <article class="tx-row" aria-label="${t.descricao}">
          <span class="tx-ico ${isIn ? "tx-ico--in" : "tx-ico--out"}" aria-hidden="true">${isIn ? "🌱" : "🎟️"}</span>
          <span class="tx-main">
            <span class="tx-desc">${t.descricao}</span>
            <time class="tx-date" datetime="${iso}">${dLabel} · ${t.origem.replace(/_/g, " ").toLowerCase()}</time>
          </span>
          <span class="tx-val ${isIn ? "tx-val--in" : "tx-val--out"}">
            ${isIn ? "+" : "−"}${fmtPontos(t.pontos)}
            <span class="visually-hidden">${isIn ? "pontos creditados" : "pontos debitados"}</span>
          </span>
        </article>
      </li>`;
  }).join("");
})();