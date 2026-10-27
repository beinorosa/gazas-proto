/* Shared chrome (header, menu, footer) and render helpers for the Gazas prototype. */
(function () {
  const G = window.GAZAS;
  const arrowRed = '<img src="assets/arrow-right-red.svg" alt="">';

  const NAV = [
    ["naujienos", "improved.html", "Naujienos"],
    ["kalendorius", "calendar.html", "Kalendorius"],
    ["reitingai", "ratings.html", "Reitingai"],
    ["trackday", "trackdays.html", "Trackday"],
  ];
  const SERIES_LINKS = [
    ["Visi", ""],
    ["Lietuva", "lt"],
    ["Formulė 1", "f1"],
    ["WRC", "wrc"],
    ["Dakaras", "dakar"],
    ["MotoGP", "motogp"],
    ["WEC", "wec"],
    ["BaTCC", "batcc"],
    ["LARČ", "larc"],
    ["Drift", "drift"],
    ["Kartingas", "karting"],
    ["Motokrosas", "mx"],
    ["Enduro", "enduro"],
  ];

  function header(active, seriesHref, currentSeries) {
    const nav = NAV.map(([k, href, label]) => `<a href="${href}"${k === active ? ' aria-current="page"' : ""}>${label}</a>`).join("");
    const series = SERIES_LINKS.map(([label, key]) => {
      const on = currentSeries === key || (currentSeries === "" && key === "");
      return `<li><a href="${seriesHref(key)}"${on ? ' aria-current="page"' : ""}>${key === "lt" ? '<span class="flag" aria-hidden="true"></span>' : ""}${label}</a></li>`;
    }).join("");
    return `
<div class="masthead">
  <header class="header">
    <div class="wrap">
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="drawer"><img src="assets/bars.svg" alt=""><span>Meniu</span></button>
      <a class="logo" href="improved.html" aria-label="Gazas — pradžia"><img src="assets/logo.svg" alt="" width="74" height="24"></a>
      <nav class="nav" aria-label="Pagrindinis">${nav}</nav>
      <div class="header-end">
        <span class="partner">su <img src="assets/15min.svg" alt="15min" width="20" height="20"></span>
        <a class="icon-link" href="#"><img src="assets/search.svg" alt=""><span class="label">Paieška</span><span class="sr-only">Paieška</span></a>
        <a class="btn btn-primary" href="improved.html#naujienlaiskis">Prenumeruoti</a>
      </div>
    </div>
  </header>
  <nav class="series-bar" aria-label="Serijos">
    <ul class="wrap">${series}</ul>
  </nav>
</div>
<div class="drawer-scrim" id="drawer-scrim" hidden></div>
<aside class="drawer" id="drawer" aria-hidden="true" aria-label="Meniu">
  <div class="drawer-head">
    <a class="logo" href="improved.html" aria-label="Gazas — pradžia"><img src="assets/logo.svg" alt="" width="74" height="24"></a>
    <button class="drawer-close" type="button" aria-label="Uždaryti meniu"><span aria-hidden="true">×</span></button>
  </div>
  <nav class="drawer-nav" aria-label="Pagrindinis">
    ${NAV.map(([k, href, label]) => `<a href="${href}"${k === active ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
  </nav>
  <div class="drawer-body">
    <section>
      <h3>Lietuva</h3>
      <a href="improved.html?s=lt">Lietuvos naujienos</a>
      <a href="calendar.html?r=lt">Renginiai Lietuvoje</a>
      <a href="ratings.html?s=larc">LARČ</a>
      <a href="ratings.html?s=top">Gazas TOP 10</a>
      <a href="trackdays.html">Trackday Lietuvoje</a>
    </section>
    <section>
      <h3>Automobiliai</h3>
      <a href="improved.html?s=f1">Formulė 1</a>
      <a href="improved.html?s=wrc">WRC</a>
      <a href="improved.html?s=dakar">Dakaras</a>
      <a href="improved.html?s=wec">WEC</a>
      <a href="improved.html?s=batcc">BaTCC</a>
      <a href="improved.html?s=drift">Drift</a>
      <a href="improved.html?s=karting">Kartingas</a>
    </section>
    <section>
      <h3>Motociklai</h3>
      <a href="improved.html?s=motogp">MotoGP</a>
      <a href="improved.html?s=mx">Motokrosas</a>
      <a href="improved.html?s=enduro">Enduro</a>
    </section>
    <section>
      <h3>Gazas</h3>
      <a href="calendar.html">Kalendorius</a>
      <a href="ratings.html">Reitingai</a>
      <a href="trackdays.html">Trackday</a>
      <a href="improved.html#naujienlaiskis">Prenumerata</a>
    </section>
  </div>
</aside>`;
  }

  const live = () => `
<div class="live" role="region" aria-label="Tiesiogiai">
  <div class="wrap">
    <span class="live-badge"><span class="dot" aria-hidden="true"></span>Tiesiogiai</span>
    <span><strong>LARČ</strong> Elektrėnų ralis, kvalifikacija</span>
    <span class="sep" aria-hidden="true">|</span>
    <span class="leader">Lyderis: V. Žala, +2,4 s</span>
    <a class="more-link" href="article.html?id=zala-elektrenai">Sekti tiesiogiai ${arrowRed}</a>
  </div>
</div>`;

  const footer = () => `
<footer class="footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="about">
        <img src="assets/logo.svg" alt="Gazas" width="92" height="30">
        <p>Auto ir moto sporto naujienos, kalendorius ir rezultatai – lietuviškai.</p>
      </div>
      <div><h3>Sportas</h3><ul><li><a href="ratings.html?s=f1">Formulė 1</a></li><li><a href="ratings.html?s=wrc">WRC</a></li><li><a href="calendar.html?s=dakar">Dakaras</a></li><li><a href="ratings.html?s=motogp">MotoGP</a></li><li><a href="ratings.html?s=larc">Lietuva</a></li></ul></div>
      <div><h3>Gazas</h3><ul><li><a href="calendar.html">Kalendorius</a></li><li><a href="ratings.html">Reitingai</a></li><li><a href="trackdays.html">Trackday</a></li><li><a href="improved.html#naujienlaiskis">Prenumerata</a></li></ul></div>
      <div><h3>Apie</h3><ul><li><a href="#">Apie mus</a></li><li><a href="#">Redakcija</a></li><li><a href="#">Reklama</a></li><li><a href="#">Kontaktai</a></li></ul></div>
      <div><h3>Sekite</h3><ul><li><a href="#">Facebook</a></li><li><a href="#">Instagram</a></li><li><a href="#">YouTube</a></li><li><a href="#">TikTok</a></li></ul></div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Gazas</span>
      <a href="#">Privatumo politika</a>
      <a href="#">Slapukų nustatymai</a>
      <span class="partner">Partneris <img src="assets/15min.svg" alt="15min" width="20" height="20"></span>
    </div>
  </div>
</footer>`;

  /* ---------- Formatting ---------- */
  const MONTHS = ["sausio", "vasario", "kovo", "balandžio", "gegužės", "birželio", "liepos", "rugpjūčio", "rugsėjo", "spalio", "lapkričio", "gruodžio"];
  const MONTHS_NOM = ["Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis", "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis"];
  const MON_SHORT = ["Sau", "Vas", "Kov", "Bal", "Geg", "Bir", "Lie", "Rgp", "Rgs", "Spa", "Lap", "Grd"];
  const DAYS = ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"];
  const DAYS_SHORT = ["Sk", "Pr", "An", "Tr", "Kt", "Pn", "Št"];
  const d = (s) => new Date(s.length === 10 ? s + "T00:00" : s);
  const pad = (n) => String(n).padStart(2, "0");
  const time = (s) => { const x = d(s); return `${pad(x.getHours())}:${pad(x.getMinutes())}`; };
  const md = (s) => { const x = d(s); return `${pad(x.getMonth() + 1)}-${pad(x.getDate())}`; };
  const day = (s) => { const x = d(s); return `${MONTHS[x.getMonth()]} ${x.getDate()} d.`; };
  const range = (a, b) => {
    const x = d(a), y = d(b);
    if (a === b) return day(a);
    return x.getMonth() === y.getMonth() ? `${MONTHS[x.getMonth()]} ${x.getDate()}–${y.getDate()} d.` : `${MONTHS[x.getMonth()]} ${x.getDate()} – ${MONTHS[y.getMonth()]} ${y.getDate()} d.`;
  };

  const seriesTag = (key, label) => `<span class="kicker">${label || G.SERIES[key]?.name || key}</span>`;
  const href = (a) => `article.html?id=${encodeURIComponent(a.id)}`;

  function card(a, opts = {}) {
    return `
    <a class="card hover-title" href="${href(a)}" data-tag="${G.SERIES[a.series]?.name || ""}">
      <div class="img-frame${a.contain ? " contain" : ""}"><img src="assets/${a.img}" alt="" loading="lazy"></div>
      <div class="card-body">
        <p class="meta">${seriesTag(a.series, a.label)}<span>${a.time}</span></p>
        <h3 class="card-title clamp-3 t">${a.title}</h3>
        ${opts.dek ? `<p class="dek clamp-2">${a.dek}</p>` : ""}
      </div>
    </a>`;
  }
  function row(a, ranked, metaOverride) {
    return `
    <a class="row hover-title${ranked ? " rank" : ""}" href="${href(a)}">
      ${ranked ? "" : `<div class="img-frame${a.contain ? " contain" : ""}"><img src="assets/${a.img}" alt="" loading="lazy"></div>`}
      <div class="card-body">
        <p class="meta">${seriesTag(a.series, a.label)}<span>${metaOverride || a.time}</span></p>
        <h3 class="card-title clamp-3 t">${a.title}</h3>
      </div>
    </a>`;
  }

  /* ---------- Behaviour ---------- */
  function wireTabs(list, onSelect) {
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    const select = (tab) => {
      tabs.forEach((t) => { const on = t === tab; t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1; });
      onSelect(tab);
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (e) => {
        const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!step) return;
        const next = tabs[(i + step + tabs.length) % tabs.length];
        next.focus(); select(next);
      });
    });
    return select;
  }

  function mountChrome() {
    const h = document.querySelector("[data-site-header]");
    if (h) {
      const kind = h.dataset.seriesLinks || "home";
      const params = new URLSearchParams(location.search);
      const page = location.pathname.split("/").pop() || "improved.html";
      const onHome = page === "improved.html" || page === "" || page === "index.html";
      const currentSeries = kind === "calendar"
        ? (params.get("r") === "lt" ? "lt" : params.get("s") || "")
        : kind === "ratings"
          ? (params.get("s") && G.STANDINGS[params.get("s")] ? params.get("s") : params.get("s") === "top" ? "top" : "")
          : (onHome || kind === "home")
            ? (params.get("s") === "lt" || params.get("s") && G.SERIES[params.get("s")] ? params.get("s") : "")
            : "";
      const seriesHref = (key) => {
        if (kind === "ratings") {
          if (key === "lt") return "ratings.html?s=larc";
          if (key === "top") return "ratings.html?s=top";
          return key && G.STANDINGS[key] ? `ratings.html?s=${key}` : "ratings.html";
        }
        if (kind === "calendar") {
          if (key === "lt") return "calendar.html?r=lt";
          return key ? `calendar.html?s=${key}` : "calendar.html";
        }
        /* Default: category homepage */
        if (key === "lt") return "improved.html?s=lt";
        return key ? `improved.html?s=${key}` : "improved.html";
      };
      h.outerHTML = header(h.dataset.active, seriesHref, currentSeries) + (h.hasAttribute("data-live") ? live() : "");
    }
    const f = document.querySelector("[data-site-footer]");
    if (f) f.outerHTML = footer();

    const menuBtn = document.querySelector(".menu-btn");
    const drawer = document.getElementById("drawer");
    const scrim = document.getElementById("drawer-scrim");
    if (!menuBtn || !drawer || !scrim) return;
    const setMenu = (open) => {
      drawer.classList.toggle("open", open);
      scrim.classList.toggle("open", open);
      scrim.hidden = false;
      drawer.setAttribute("aria-hidden", !open);
      menuBtn.setAttribute("aria-expanded", open);
      document.body.classList.toggle("drawer-open", open);
      if (open) drawer.querySelector(".drawer-close").focus();
      else menuBtn.focus();
    };
    menuBtn.addEventListener("click", () => setMenu(!drawer.classList.contains("open")));
    document.querySelector(".drawer-close").addEventListener("click", () => setMenu(false));
    scrim.addEventListener("click", () => setMenu(false));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && drawer.classList.contains("open")) setMenu(false); });
    if (location.hash === "#meniu") setMenu(true);
  }

  function setExpanded(btn, open) {
    if (!btn) return;
    const id = btn.getAttribute("aria-controls");
    const panel = id && document.getElementById(id);
    btn.setAttribute("aria-expanded", open);
    if (!panel) return;
    panel.classList.toggle("is-open", open);
    panel.setAttribute("aria-hidden", !open);
  }

  mountChrome();
  Object.assign(G, { card, row, href, wireTabs, setExpanded, fmt: { d, time, md, day, range, pad, MONTHS, MONTHS_NOM, MON_SHORT, DAYS, DAYS_SHORT }, arrowRed });
})();
