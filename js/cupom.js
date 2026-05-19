/* ============================================================
   CUPOM · Mobilidade Verde — tela-estrela
   Gera código, QR (API externa via <img>), validade regressiva,
   painel de impacto (CO2 evitado via fator da operadora)
   ============================================================ */

(function cupom() {
  const root = document.querySelector("#coupon-root");
  if (!root) return;

  const qs = new URLSearchParams(location.search);
  const op = getOperadora(Number(qs.get("op"))) || OPERADORAS[0];
  const faixa = getFaixa(Number(qs.get("faixa"))) || FAIXAS[1];

  // Código no formato_codigo da operadora (ex.: TOP-A7B3-X9K2)
  function bloco() {
    const c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let s = "";
    for (let i = 0; i < 4; i++) s += c[Math.floor(Math.random() * c.length)];
    return s;
  }
  const prefixo = op.nome === "TOP" ? "TOP" : "SPT";
  const codigo = `${prefixo}-${bloco()}-${bloco()}`;

  // Estimativa de viagem + CO2 evitado (espelha T_VIAGEM)
  const passagens = Math.max(1, Math.round(faixa.valor_centavos / op.valor_passagem_centavos));
  const kmEstimado = passagens * 8.5; // ~8,5 km por trajeto médio urbano
  const co2Kg = +(kmEstimado * op.fator_co2_kg_km).toFixed(2);
  const arvores = Math.max(1, Math.round(co2Kg / 0.06)); // ~60g CO2/dia por muda jovem

  // QR via API externa (sem lib JS — decisão do grupo)
  const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
                encodeURIComponent(codigo);

  root.innerHTML = `
    <div class="coupon">
      <div class="coupon-top">
        <div>
          <div class="badge badge--ok">CUPOM GERADO</div>
          <h3 style="color:#fff;margin-top:8px">${op.nome} · ${fmtReais(faixa.valor_centavos)}</h3>
        </div>
        <span class="op-logo op-logo--${op.nome.toLowerCase()}">${op.nome.slice(0,2).toUpperCase()}</span>
      </div>
      <div class="coupon-body">
        <p class="eyebrow">Seu código de cupom</p>
        <div class="coupon-code" id="cod">${codigo}</div>
        <div class="coupon-expiry" id="exp">⏳ calculando validade…</div>
        <div class="coupon-qr"><img src="${qrUrl}" alt="QR Code do cupom ${codigo}"></div>
        <button class="btn btn--transito" id="copy-btn">📋 Copiar código</button>

        <ol class="coupon-steps">
          <li><b>1.</b> Abra o app da ${op.nome}</li>
          <li><b>2.</b> Vá em Recarga / Cupom</li>
          <li><b>3.</b> Digite o código <b>${codigo}</b></li>
          <li><b>4.</b> Use seu cartão de transporte normalmente</li>
        </ol>
      </div>
    </div>

    <div class="impact-panel mt-6">
      <div>
        <div class="num">${co2Kg} kg</div>
        <div class="cap">CO₂ evitado nesta viagem</div>
      </div>
      <div>
        <div class="num">🌳 ${arvores}</div>
        <div class="cap">equivalente a ${arvores} muda(s) absorvendo CO₂ por 1 dia</div>
      </div>
    </div>`;

  // Copiar código
  document.querySelector("#copy-btn").addEventListener("click", async (e) => {
    try {
      await navigator.clipboard.writeText(codigo);
      e.target.textContent = "✅ Código copiado!";
      setTimeout(() => (e.target.textContent = "📋 Copiar código"), 2000);
    } catch {
      e.target.textContent = "Copie manualmente: " + codigo;
    }
  });

  // Contagem regressiva de 24h (T_VOUCHER.expira_em)
  const expira = Date.now() + 24 * 60 * 60 * 1000;
  const expEl = document.querySelector("#exp");
  function tick() {
    const diff = expira - Date.now();
    if (diff <= 0) { expEl.textContent = "❌ Cupom expirado"; return; }
    const h = Math.floor(diff / 3.6e6);
    const m = Math.floor((diff % 3.6e6) / 6e4);
    const s = Math.floor((diff % 6e4) / 1000);
    expEl.textContent = `⏳ Expira em ${h}h ${String(m).padStart(2,"0")}min ${String(s).padStart(2,"0")}s`;
    requestAnimationFrame(() => setTimeout(tick, 1000));
  }
  tick();
})();
