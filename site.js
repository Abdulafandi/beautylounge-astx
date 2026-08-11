/* Beauty Lounge ASTX — Goldener Blick */
(() => {
  "use strict";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- topbar ---------- */
  const topbar = document.querySelector(".topbar");
  const onScroll = () => topbar.classList.toggle("scrolled", scrollY > 24);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* anchor offset under fixed bar */
  document.querySelectorAll("main [id], footer[id]").forEach(el => {
    el.style.scrollMarginTop = "72px";
  });

  /* ---------- credential band: duplicate for seamless loop ---------- */
  const band = document.getElementById("bandTrack");
  if (band) band.innerHTML += band.innerHTML;

  /* ---------- chapter fans ---------- */
  document.querySelectorAll(".fan-strokes").forEach(g => {
    const cx = 14, cy = 40, n = 9;
    let html = "";
    for (let i = 0; i < n; i++) {
      const a = (-88 + i * (86 / (n - 1))) * Math.PI / 180;
      const len = 24 + 12 * Math.sin((i / (n - 1)) * Math.PI);
      const x2 = cx + Math.cos(a + Math.PI / 2) * len;
      const y2 = cy - Math.sin(a + Math.PI / 2) * len;
      html += `<line x1="${cx}" y1="${cy}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
    }
    g.innerHTML = html;
  });

  /* ---------- hero halo lashes ---------- */
  const halo = document.getElementById("haloLashes");
  if (halo) {
    const cx = 260, cy = 260, r = 228;
    let html = "";
    let i = 0;
    for (let deg = -78; deg <= 42; deg += 5, i++) {
      const a = deg * Math.PI / 180;
      const len = 11 + 9 * Math.abs(Math.sin(i * 1.7));
      const x1 = cx + Math.cos(a) * r, y1 = cy + Math.sin(a) * r;
      const x2 = cx + Math.cos(a) * (r + len), y2 = cy + Math.sin(a) * (r + len);
      const delay = (1.15 + i * 0.045).toFixed(2);
      html += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" style="--ox:${x1.toFixed(1)}px;--oy:${y1.toFixed(1)}px;animation-delay:${delay}s"/>`;
    }
    halo.innerHTML = html;
  }

  /* ---------- reveal on scroll (staggered per section) ---------- */
  document.querySelectorAll("section, footer").forEach(sec => {
    sec.querySelectorAll(":scope .rv").forEach((el, i) => {
      el.style.setProperty("--d", Math.min(i * 0.12, 0.36) + "s");
    });
  });
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
  document.querySelectorAll(".rv").forEach(el => io.observe(el));

  /* ---------- das Wimpern-Mapping (signature) ---------- */
  const mapping = document.getElementById("mapping");
  if (!mapping) return;

  const STYLES = {
    natur: {
      lengths: [8, 10, 10, 12, 12, 14, 12, 10],
      desc: "Leichtes, ausgewogenes Volumen — ein subtiler, natürlicher Rahmen für den Alltag."
    },
    katze: {
      lengths: [8, 8, 10, 10, 12, 14, 16, 14],
      desc: "Längere, auslaufende Wimpern zum äußeren Augenwinkel — für eine mandelförmige Betonung."
    },
    rund: {
      lengths: [8, 10, 12, 14, 16, 14, 12, 10],
      desc: "Ein gleichmäßiger Verlauf mit Länge in der Mitte — öffnet die Augen optisch, weich und rund."
    },
    halb: {
      lengths: [8, 8, 9, 10, 11, 12, 13, 14],
      desc: "Längenaufbau ab der Augenmitte — betont den äußeren Augenwinkel für einen offenen, sanften Blick."
    }
  };

  const lashGroup = document.getElementById("lashGroup");
  const numGroup = document.getElementById("numGroup");
  const desc = document.getElementById("mapDesc");

  /* quadratic bezier of #lidPath: M 42 196 Q 320 88 598 196 */
  const P0 = { x: 42, y: 196 }, C = { x: 320, y: 88 }, P1 = { x: 598, y: 196 };
  const bez = t => ({
    x: (1 - t) ** 2 * P0.x + 2 * (1 - t) * t * C.x + t * t * P1.x,
    y: (1 - t) ** 2 * P0.y + 2 * (1 - t) * t * C.y + t * t * P1.y
  });
  const tan = t => ({
    x: 2 * (1 - t) * (C.x - P0.x) + 2 * t * (P1.x - C.x),
    y: 2 * (1 - t) * (C.y - P0.y) + 2 * t * (P1.y - C.y)
  });

  const N_LASH = 15, SCALE = 6.4;

  function lerpLengths(lengths, t) {
    const pos = t * (lengths.length - 1);
    const i = Math.min(Math.floor(pos), lengths.length - 2);
    const f = pos - i;
    return lengths[i] * (1 - f) + lengths[i + 1] * f;
  }

  function build(styleKey) {
    const st = STYLES[styleKey];
    let lashes = "", nums = "";
    for (let i = 0; i < N_LASH; i++) {
      const t = 0.03 + (i / (N_LASH - 1)) * 0.94;
      const p = bez(t);
      const tv = tan(t);
      const tl = Math.hypot(tv.x, tv.y);
      /* normal pointing up, tilted outward toward the outer corner */
      let nx = tv.y / tl, ny = -tv.x / tl;
      const tilt = t * 0.55 - 0.12;
      const rx = nx * Math.cos(tilt) - ny * Math.sin(tilt);
      const ry = nx * Math.sin(tilt) + ny * Math.cos(tilt);
      const len = lerpLengths(st.lengths, t) * SCALE;
      const x2 = p.x + rx * len, y2 = p.y + ry * len;
      const d = (i * 0.035).toFixed(3);
      lashes += `<line x1="${p.x.toFixed(1)}" y1="${p.y.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" style="--ox:${p.x.toFixed(1)}px;--oy:${p.y.toFixed(1)}px;--d:${d}s"/>`;
    }
    st.lengths.forEach((len, i) => {
      const t = 0.055 + (i / (st.lengths.length - 1)) * 0.89;
      const p = bez(t);
      const d = (0.15 + i * 0.05).toFixed(2);
      nums += `<text x="${p.x.toFixed(1)}" y="${(p.y + 34).toFixed(1)}" style="--d:${d}s">${len}</text>`;
    });
    lashGroup.innerHTML = lashes;
    numGroup.innerHTML = nums;
    desc.textContent = st.desc;
  }

  function arm() {
    if (reduced) { mapping.classList.add("armed"); return; }
    requestAnimationFrame(() => requestAnimationFrame(() => mapping.classList.add("armed")));
  }

  build("natur");

  /* arm when scrolled into view */
  const mapIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { arm(); mapIO.disconnect(); }
    });
  }, { threshold: 0.35 });
  mapIO.observe(mapping);

  /* tabs */
  const tabs = mapping.querySelectorAll(".mapping-tabs button");
  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.getAttribute("aria-selected") === "true") return;
      tabs.forEach(b => b.setAttribute("aria-selected", b === btn ? "true" : "false"));
      const key = btn.dataset.style;
      if (reduced) { build(key); mapping.classList.add("armed"); return; }
      mapping.classList.remove("armed");
      setTimeout(() => { build(key); arm(); }, 380);
    });
  });
})();
