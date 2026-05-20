/* ============================================================
   RESGATAR · Mobilidade Verde
   Passo 3-5 do caminho: escolher operadora → faixa →
   validar saldo (regra de negócio) → gerar cupom.
   Renderiza listas como <li><button> (semântico + acessível).
   ============================================================ */

(function resgatar() {
  // Captura dos elementos
  const opWrap       = document.querySelector("#op-list");
  const faixaWrap    = document.querySelector("#faixa-list");
  const faixaSection = document.querySelector("#faixa-section");
  const saldoEl      = document.querySelector("#saldo-atual");
  const confirmBox   = document.querySelector("#confirm-box");
  const confirmTxt   = document.querySelector("#confirm-text");
  const gerarBtn     = document.querySelector("#gerar-btn");
  if (!opWrap) return;

  // Estado da seleção
  let opSel = null;
  let faixaSel = null;

  if (saldoEl) saldoEl.textContent = fmtPontos(USUARIO_ATUAL.saldo_pontos);

  // ---- Lista de operadoras ----
  opWrap.innerHTML = OPERADORAS.filter(o => o.ativo === "S").map((o) => `
    <li>
      <button class="op-card ${o.featured ? "featured" : ""}" type="button" aria-pressed="false" data-op="${o.id_operadora}">
        <span class="op-logo op-logo--${o.nome.toLowerCase()}" aria-hidden="true">${o.nome.slice(0, 2).toUpperCase()}</span>
        <h3>${o.nome} ${o.featured ? '<span class="badge badge--soul">Destaque</span>' : ""}</h3>
        <p class="op-meta">${o.cidade} · ${o.modal.toLowerCase()} · passagem ${fmtReais(o.valor_passagem_centavos)}</p>
      </button>
    </li>`).join("");

  // Quando o usuário escolhe operadora
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

  // ---- Lista de faixas (regra de negócio: bloqueia acima do saldo) ----
  function renderFaixas() {
    const saldo = USUARIO_ATUAL.saldo_pontos;
    faixaWrap.innerHTML = FAIXAS.filter(f => f.ativo === "S").map((f) => {
      const insuf = f.pontos_necessarios > saldo;
      return `
        <li>
          <button class="faixa-card" type="button" aria-pressed="false"
                  data-faixa="${f.id_faixa}" ${insuf ? "disabled aria-disabled='true'" : ""}>
            <span class="valor">${fmtReais(f.valor_centavos)}</span>
            <span class="pontos">${fmtPontos(f.pontos_necessarios)} pts</span>
            ${insuf ? '<span class="badge badge--exp faixa-badge">Saldo insuficiente</span>' : ""}
          </button>
        </li>`;
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

  // ---- Bloco de confirmação ----
  function updateConfirm() {
    if (opSel && faixaSel) {
      confirmBox.hidden = false;
      confirmTxt.innerHTML =
        `Gerar cupom <strong>${fmtReais(faixaSel.valor_centavos)}</strong> da <strong>${opSel.nome}</strong> ` +
        `por <strong>${fmtPontos(faixaSel.pontos_necessarios)} Pontos ECOA</strong>. ` +
        `Saldo após resgate: <strong>${fmtPontos(USUARIO_ATUAL.saldo_pontos - faixaSel.pontos_necessarios)}</strong> pts.`;
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
