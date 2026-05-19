/* ============================================================
   RESGATAR · Mobilidade Verde
   Passo 3-5 do caminho: escolher operadora → faixa →
   validar saldo (regra de negócio) → gerar cupom
   ============================================================ */

(function resgatar() {
  const opWrap = document.querySelector("#op-list");
  const faixaWrap = document.querySelector("#faixa-list");
  const faixaSection = document.querySelector("#faixa-section");
  const saldoEl = document.querySelector("#saldo-atual");
  const confirmBox = document.querySelector("#confirm-box");
  const confirmTxt = document.querySelector("#confirm-text");
  const gerarBtn = document.querySelector("#gerar-btn");
  if (!opWrap) return;

  let opSel = null;
  let faixaSel = null;

  if (saldoEl) saldoEl.textContent = fmtPontos(USUARIO_ATUAL.saldo_pontos);

  // ---- Operadoras ----
  opWrap.innerHTML = OPERADORAS.filter(o => o.ativo === "S").map((o) => `
    <button class="op-card ${o.featured ? "featured" : ""}" aria-pressed="false" data-op="${o.id_operadora}">
      <span class="op-logo op-logo--${o.nome.toLowerCase()}">${o.nome.slice(0, 2).toUpperCase()}</span>
      <h3>${o.nome} ${o.featured ? '<span class="badge badge--soul">Destaque</span>' : ""}</h3>
      <p class="op-meta">${o.cidade} · ${o.modal.toLowerCase()} · passagem ${fmtReais(o.valor_passagem_centavos)}</p>
    </button>`).join("");

  opWrap.querySelectorAll(".op-card").forEach((card) => {
    card.addEventListener("click", () => {
      opWrap.querySelectorAll(".op-card").forEach(c => c.setAttribute("aria-pressed", "false"));
      card.setAttribute("aria-pressed", "true");
      opSel = getOperadora(Number(card.dataset.op));
      faixaSel = null;
      renderFaixas();
      faixaSection.hidden = false;
      faixaSection.scrollIntoView({ behavior: "smooth", block: "start" });
      updateConfirm();
    });
  });

  // ---- Faixas ----
  function renderFaixas() {
    const saldo = USUARIO_ATUAL.saldo_pontos;
    faixaWrap.innerHTML = FAIXAS.filter(f => f.ativo === "S").map((f) => {
      const insuf = f.pontos_necessarios > saldo;
      return `
        <button class="faixa-card" aria-pressed="false"
                data-faixa="${f.id_faixa}" ${insuf ? "disabled" : ""}>
          <div class="valor">${fmtReais(f.valor_centavos)}</div>
          <div class="pontos">${fmtPontos(f.pontos_necessarios)} pts</div>
          ${insuf ? '<div class="badge badge--exp" style="margin-top:8px">Saldo insuficiente</div>' : ""}
        </button>`;
    }).join("");

    faixaWrap.querySelectorAll(".faixa-card:not([disabled])").forEach((card) => {
      card.addEventListener("click", () => {
        faixaWrap.querySelectorAll(".faixa-card").forEach(c => c.setAttribute("aria-pressed", "false"));
        card.setAttribute("aria-pressed", "true");
        faixaSel = getFaixa(Number(card.dataset.faixa));
        updateConfirm();
      });
    });
  }

  // ---- Confirmação ----
  function updateConfirm() {
    if (opSel && faixaSel) {
      confirmBox.hidden = false;
      confirmTxt.innerHTML =
        `Gerar cupom <b>${fmtReais(faixaSel.valor_centavos)}</b> da <b>${opSel.nome}</b> ` +
        `por <b>${fmtPontos(faixaSel.pontos_necessarios)} Pontos ECOA</b>. ` +
        `Saldo após resgate: <b>${fmtPontos(USUARIO_ATUAL.saldo_pontos - faixaSel.pontos_necessarios)}</b> pts.`;
      gerarBtn.disabled = false;
    } else if (confirmBox) {
      confirmBox.hidden = true;
      gerarBtn.disabled = true;
    }
  }

  // ---- Gerar cupom → passa dados via querystring p/ cupom.html ----
  if (gerarBtn) {
    gerarBtn.addEventListener("click", () => {
      if (!opSel || !faixaSel) return;
      // Regra de negócio: bloqueia se saldo < pontos necessários
      if (faixaSel.pontos_necessarios > USUARIO_ATUAL.saldo_pontos) {
        alert("Saldo insuficiente de Pontos ECOA para esta faixa.");
        return;
      }
      const params = new URLSearchParams({
        op: opSel.id_operadora,
        faixa: faixaSel.id_faixa,
      });
      window.location.href = "cupom.html?" + params.toString();
    });
  }
})();
