/* ============================================================
   MAIN · Mobilidade Verde
   Nav mobile · FAQ acordeão acessível · validação · reveal
   ============================================================ */

// ---------- Menu mobile ----------
(function navToggle() {
  const btn = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!btn || !links) return;
  btn.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
})();

// ---------- Acordeão FAQ (aria-expanded + aria-controls) ----------
(function faqAccordion() {
  const qs = document.querySelectorAll(".accordion-q");
  qs.forEach((q) => {
    const panel = document.getElementById(q.getAttribute("aria-controls"));
    if (panel) panel.style.maxHeight = null;
    q.addEventListener("click", () => {
      const open = q.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".accordion-q").forEach((other) => {
        other.setAttribute("aria-expanded", "false");
        const op = document.getElementById(other.getAttribute("aria-controls"));
        if (op) op.style.maxHeight = null;
      });
      if (!open) {
        q.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
})();

// ---------- Validação do formulário de contato ----------
(function contactForm() {
  const form = document.querySelector("#contato-form");
  if (!form) return;

  const setError = (name, on) => {
    const field = form.querySelector(`[data-field="${name}"]`);
    const input = form.elements[name];
    if (field) field.classList.toggle("invalid", on);
    if (input) input.setAttribute("aria-invalid", on ? "true" : "false");
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const msg = form.mensagem.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

    let valid = true;
    if (nome.length < 3) { setError("nome", true); valid = false; } else setError("nome", false);
    if (!emailOk)        { setError("email", true); valid = false; } else setError("email", false);
    if (msg.length < 10) { setError("mensagem", true); valid = false; } else setError("mensagem", false);

    const note = form.querySelector(".form-note");
    if (valid) {
      form.reset();
      if (note) {
        note.classList.add("show");
        note.textContent = "Mensagem enviada! Nossa equipe Mobilidade Verde responde em até 48h.";
      }
    } else if (note) {
      note.classList.remove("show");
    }
  });
})();

// ---------- Reveal on scroll ----------
(function reveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !els.length) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    }),
    { threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));
})();