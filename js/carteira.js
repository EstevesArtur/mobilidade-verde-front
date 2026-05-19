/* ============================================================
   CARTEIRA · Mobilidade Verde
   Renderiza saldo de Pontos ECOA + histórico (T_TRANSACAO_PONTOS)
   ============================================================ */

(function carteira() {
  const balanceEl = document.querySelector("#wallet-balance");
  const nameEl = document.querySelector("#wallet-name");
  const listEl = document.querySelector("#tx-list");
  if (!balanceEl) return;

  // Saldo (T_CARTEIRA.saldo_pontos do usuário atual)
  balanceEl.textContent = fmtPontos(USUARIO_ATUAL.saldo_pontos);
  if (nameEl) nameEl.textContent = USUARIO_ATUAL.nome.split(" ")[0];

  // Histórico ordenado por data desc (espelha IDX_TRANS_USR_DATA)
  const txs = TRANSACOES
    .filter((t) => t.id_usuario === USUARIO_ATUAL.id_usuario)
    .sort((a, b) => new Date(b.data_transacao) - new Date(a.data_transacao));

  listEl.innerHTML = txs.map((t) => {
    const isIn = t.tipo === "CREDITO";
    const d = new Date(t.data_transacao).toLocaleDateString("pt-BR", {
      day: "2-digit", month: "short",
    });
    return `
      <li class="tx-row">
        <span class="tx-ico ${isIn ? "tx-ico--in" : "tx-ico--out"}">${isIn ? "🌱" : "🎟️"}</span>
        <span class="tx-main">
          <span class="tx-desc">${t.descricao}</span><br>
          <span class="tx-date">${d} · ${t.origem.replace(/_/g, " ").toLowerCase()}</span>
        </span>
        <span class="tx-val ${isIn ? "tx-val--in" : "tx-val--out"}">
          ${isIn ? "+" : "−"}${fmtPontos(t.pontos)}
        </span>
      </li>`;
  }).join("");
})();
