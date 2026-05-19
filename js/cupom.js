/* ============================================================

   CUPOM · Mobilidade Verde — tela-estrela

   Código + QR (API externa via <img>) + validade regressiva +

   painel de impacto. Markup gerado é semântico:
<article>, <output>, <ol>, <dl>, <time>.

   ============================================================ */
 
(function cupom() {

  const root = document.querySelector("#coupon-root");

  if (!root) return;
 
  const qs = new URLSearchParams(location.search);

  const op = getOperadora(Number(qs.get("op"))) || OPERADORAS[0];

  const faixa = getFaixa(Number(qs.get("faixa"))) || FAIXAS[1];
 
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

  const kmEstimado = passagens * 8.5;

  const co2Kg = +(kmEstimado * op.fator_co2_kg_km).toFixed(2);

  const arvores = Math.max(1, Math.round(co2Kg / 0.06));
 
  const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +

                encodeURIComponent(codigo);
 
  // expira_em = agora + 24h (T_VOUCHER.expira_em)

  const expira = new Date(Date.now() + 24 * 60 * 60 * 1000);
 
  root.innerHTML = `
<article class="coupon" aria-label="Cupom ${op.nome} ${fmtReais(faixa.valor_centavos)}">
<header class="coupon-top">
<div>
<p class="badge badge--ok">CUPOM GERADO</p>
<h2 style="color:#fff;margin-top:8px">${op.nome} · ${fmtReais(faixa.valor_centavos)}</h2>
</div>
<span class="op-logo op-logo--${op.nome.toLowerCase()}" aria-hidden="true">${op.nome.slice(0,2).toUpperCase()}</span>
</header>
<div class="coupon-body">
<p class="eyebrow"><label for="cod">Seu código de cupom</label></p>
<output class="coupon-code" id="cod">${codigo}</output>
<p class="coupon-expiry" id="exp">⏳ calculando validade…
<time datetime="${expira.toISOString()}" class="visually-hidden">expira ${expira.toLocaleString("pt-BR")}</time>
</p>
<figure class="coupon-qr">
<img src="${qrUrl}" alt="QR Code do cupom ${codigo}" width="200" height="200">
<figcaption class="visually-hidden">QR Code do cupom ${codigo}</figcaption>
</figure>
<button class="btn btn--transito" type="button" id="copy-btn">📋 Copiar código</button>
 
        <h3 class="visually-hidden">Como usar o cupom</h3>
<ol class="coupon-steps">
<li><b>1.</b> Abra o app da ${op.nome}</li>
<li><b>2.</b> Vá em Recarga / Cupom</li>
<li><b>3.</b> Digite o código <b>${codigo}</b></li>
<li><b>4.</b> Use seu cartão de transporte normalmente</li>
</ol>
</div>
</article>
 
    <section class="impact-panel mt-6" aria-label="Impacto ambiental desta viagem">
<h3 class="visually-hidden">Impacto ambiental</h3>
<dl style="display:contents">
<div>
<dt class="num">${co2Kg} kg</dt>
<dd class="cap">CO₂ evitado nesta viagem</dd>
</div>
<div>
<dt class="num">🌳 ${arvores}</dt>
<dd class="cap">equivalente a ${arvores} muda(s) absorvendo CO₂ por 1 dia</dd>
</div>
</dl>
</section>`;
 
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
 
  // Contagem regressiva de 24h

  const expEl = document.querySelector("#exp");

  function tick() {

    const diff = expira.getTime() - Date.now();

    if (diff <= 0) { expEl.textContent = "❌ Cupom expirado"; return; }

    const h = Math.floor(diff / 3.6e6);

    const m = Math.floor((diff % 3.6e6) / 6e4);

    const s = Math.floor((diff % 6e4) / 1000);

    expEl.textContent = `⏳ Expira em ${h}h ${String(m).padStart(2,"0")}min ${String(s).padStart(2,"0")}s`;

    setTimeout(tick, 1000);

  }

  tick();

})();

 