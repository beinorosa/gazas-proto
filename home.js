(function () {
  const G = window.GAZAS;
  const { fmt } = G;
  const params = new URLSearchParams(location.search);
  const catKey = params.get("s");
  const isLt = catKey === "lt";
  const isCat = isLt || !!(catKey && G.SERIES[catKey]);

  const A = (ids) => ids.map((id) => G.byId[id]).filter(Boolean);
  const LIVE_MS = 3 * 3600e3;
  const now = G.now();

  const matchArticle = (a) => {
    if (isLt) return !!(G.SERIES[a.series]?.lt || a.athlete);
    return a.series === catKey;
  };
  const matchEvent = (e) => {
    if (isLt) return e.country === "LT" || (e.athletes && e.athletes.length);
    return e.series === catKey;
  };
  const matchAthlete = (p) => {
    if (isLt) return true;
    return (p.series || []).includes(catKey);
  };

  /* ---------- Category homepage ---------- */
  if (isCat) {
    const meta = isLt ? G.LT_HOME : G.SERIES[catKey];
    const articles = G.ARTICLES.filter(matchArticle);
    const events = G.EVENTS.filter(matchEvent);
    const upcoming = events.filter((e) => fmt.d(e.end) >= now).sort((a, b) => fmt.d(a.start) - fmt.d(b.start));
    const athletes = G.ATHLETES.filter(matchAthlete);
    const st = !isLt && G.STANDINGS[catKey];
    const lead = articles[0];
    const stack = articles.slice(1, 3);
    const rest = articles.slice(lead ? 1 + stack.length : 0);
    const calHref = isLt ? "calendar.html?r=lt" : `calendar.html?s=${catKey}`;
    const ratHref = isLt ? "ratings.html?s=top" : (st ? `ratings.html?s=${catKey}` : "ratings.html");
    const newsLabel = isLt ? "Lietuvos naujienos" : `${meta.name} naujienos`;

    document.title = `${meta.name} — Gazas`;
    document.documentElement.style.setProperty("--cat", meta.color || "#111");

    const weekend = upcoming.filter((e) => fmt.d(e.start) <= fmt.d("2026-11-08")).slice(0, 8);
    const weekendHTML = weekend.length ? weekend.map((e) => {
      const sessions = e.sessions.map(([name, at]) => ({ name, at: fmt.d(at) }));
      const live = [...sessions].reverse().find((s) => s.at <= now && now - s.at < LIVE_MS);
      const next = sessions.find((s) => s.at > now);
      const show = live || next || sessions[sessions.length - 1];
      return `<a class="event" href="calendar.html#${e.id}">
        ${live ? '<span class="live-now"><span class="dot" aria-hidden="true"></span>Vyksta</span>' : `<time datetime="${show.at.toISOString()}">${fmt.pad(show.at.getHours())}:${fmt.pad(show.at.getMinutes())}</time>`}
        <div><p class="kicker">${G.SERIES[e.series].name}</p><p class="name">${e.name}</p><p class="place">${fmt.range(e.start, e.end)} · ${e.place}</p></div>
      </a>`;
    }).join("") : `<p class="muted-empty">Artimiausiu metu startų nėra.</p>`;

    const leadHTML = lead ? `
      <a class="lead hover-title" href="${G.href(lead)}" style="--c:${meta.color}">
        <img src="assets/${lead.img}" alt="">
        <div class="lead-text">
          <span class="kicker">${lead.label || meta.name}</span>
          <h1 class="t">${lead.title}</h1>
          <p class="dek">${lead.dek}</p>
          <p class="meta"><span>${lead.time}</span><span>${lead.read} min. skaitymo</span></p>
        </div>
      </a>` : `
      <div class="lead cat-empty-lead" style="--c:${meta.color}">
        <div class="lead-text">
          <span class="kicker">${meta.name}</span>
          <h1 class="t">Naujienos netrukus</h1>
          <p class="dek">${meta.blurb}</p>
        </div>
      </div>`;

    const fillers = [
      `<a class="cat-link-card hover-title" href="${calHref}"><span class="kicker">Kalendorius</span><p class="t">Artėjantys startai</p><p class="dek">Datos, sesijos ir startų laikai Lietuvos laiku.</p><span class="go">Atidaryti ${G.arrowRed}</span></a>`,
      `<a class="cat-link-card hover-title" href="${ratHref}"><span class="kicker">Reitingai</span><p class="t">${st ? "Čempionato lentelė" : (isLt ? "Gazas TOP 10" : "Reitingai")}</p><p class="dek">${st ? "Taškų lentelė ir paskutinio etapo rezultatai." : (isLt ? "Lietuvos sportininkų sezono reitingas." : "Reitingai ir sezonų rezultatai.")}</p><span class="go">Atidaryti ${G.arrowRed}</span></a>`,
    ];
    const stackItems = stack.map((a) => G.card(a));
    for (const f of fillers) {
      if (stackItems.length >= 2) break;
      stackItems.push(f);
    }
    const stackHTML = `<div class="stack">${stackItems.join("")}</div>`;

    const newsPool = rest.slice(0, 8);
    const newsBlock = newsPool.length
      ? newsPool.map((a) => G.card(a)).join("")
      : `<p class="muted-empty">${articles.length ? "Daugiau naujienų šioje kategorijoje netrukus." : "Šioje kategorijoje dar nėra straipsnių."}</p>`;

    const standingsHTML = st ? `
      <section class="section wrap" aria-labelledby="cat-res">
        <div class="section-head">
          <div><h2 id="cat-res">${meta.name} lentelė</h2><p class="sub">${st.done} etapas iš ${st.rounds.length} · ${st.lastRound}</p></div>
          <a class="more-link" href="${ratHref}">Visa lentelė ${G.arrowRed}</a>
        </div>
        <div class="results cat-results">
          <div class="results-cards">
            <h3>Paskutinis etapas</h3>
            <a class="result hover-title" href="${ratHref}&v=last">
              <p class="meta"><span class="kicker">${meta.name}</span><span>${st.lastRound}</span></p>
              <p class="event-title t">${G.eventById[st.next] ? "Artėja kitas etapas" : "Sezono eiga"}</p>
              <ol class="podium">${st.lastResult.slice(0, 3).map((d) => `<li><span>${d.name}${d.lt ? '<span class="lt">LT</span>' : ""}</span><span class="gap">+${st.pts(d.lastPos)} tšk.</span></li>`).join("")}</ol>
            </a>
          </div>
          <div class="standings">
            <table><thead><tr><th scope="col">Poz.</th><th scope="col">${st.unit || "Pilotas"}</th><th scope="col">Taškai</th></tr></thead>
            <tbody>${st.drivers.slice(0, 8).map((d) => `<tr><td>${d.pos}</td><td>${d.name}<span class="team">${d.team}</span></td><td>${d.points}</td></tr>`).join("")}</tbody></table>
            <a class="more-link" href="${ratHref}">Visa lentelė ${G.arrowRed}</a>
          </div>
        </div>
      </section>` : isLt ? `
      <section class="section wrap" aria-labelledby="cat-res">
        <div class="section-head">
          <div><h2 id="cat-res">Gazas TOP 10</h2><p class="sub">Lietuvos sportininkų reitingas pagal sezono formą</p></div>
          <a class="more-link" href="ratings.html?s=top">Visas reitingas ${G.arrowRed}</a>
        </div>
        <ol class="top-list">${G.LT_TOP.map((p, i) => {
          const mv = p.move === "new"
            ? '<span class="mv new">NAUJAS</span>'
            : `<span class="mv">${p.move > 0 ? `<span class="up" aria-label="Pakilo ${p.move}">▲${p.move}</span>` : p.move < 0 ? `<span class="down" aria-label="Nukrito ${-p.move}">▼${-p.move}</span>` : `<span class="same" aria-label="Be pokyčių">–</span>`}</span>`;
          return `<li class="top-item">
            <span class="rk">${i + 1}</span>
            <span class="ph">${p.img ? `<img src="assets/${p.img}" alt="">` : p.name.split(" ").map((x) => x[0]).join("")}</span>
            <span><span class="disc">${p.disc}</span><p class="nm">${p.id ? `<a href="athlete.html?id=${p.id}">${p.name}</a>` : p.name}</p><p class="note">${p.note}</p></span>
            ${mv}
          </li>`;
        }).join("")}</ol>
      </section>` : "";

    const heroBlurb = (p) => {
      const top = G.LT_TOP.find((t) => t.id === p.id);
      if (top?.note) return top.note.replace(/\.$/, "");
      return (p.lede || p.disc || "").split(/[.!?]/)[0];
    };
    const heroesHTML = athletes.length ? `
      <section class="heroes" aria-labelledby="cat-athletes">
        <div class="heroes-bg" aria-hidden="true"><img src="assets/heroes-bg.png" alt=""></div>
        <div class="wrap">
          <div class="section-head">
            <div><h2 id="cat-athletes">${isLt ? "Mūsų herojai" : `${meta.name} sportininkai`}</h2><p class="sub">${isLt ? "Lietuvos pilotai Gazas puslapiuose" : "Susiję sportininkai"}</p></div>
            <a class="more-link" href="ratings.html?s=top">Visi sportininkai <img src="assets/arrow-right-white.svg" alt=""></a>
            ${athletes.length > 4 ? `<div class="carousel-ctrl">
              <button class="round-btn prev" type="button" aria-label="Ankstesni sportininkai" disabled><img src="assets/chevron-right.svg" alt=""></button>
              <button class="round-btn next" type="button" aria-label="Kiti sportininkai"><img src="assets/chevron-right.svg" alt=""></button>
            </div>` : ""}
          </div>
          <ul class="hero-track" aria-label="Sportininkai">${athletes.map((p) => `
            <li><a class="hero" href="athlete.html?id=${p.id}">
              <img src="assets/${p.img}" alt="" loading="lazy">
              <span class="hero-tag">${p.disc}</span>
              <span class="hero-text">
                <span class="hero-name"><span>${p.first}</span><span>${p.last}</span></span>
                <span class="hero-last">${heroBlurb(p)}</span>
              </span>
            </a></li>`).join("")}</ul>
        </div>
      </section>` : "";

    const nextHTML = upcoming.slice(0, 5).length ? `
      <section class="section wrap" aria-labelledby="cat-cal">
        <div class="section-head">
          <div><h2 id="cat-cal">Artėjantys startai</h2><p class="sub">Lietuvos laiku</p></div>
          <a class="more-link" href="${calHref}">Visas kalendorius ${G.arrowRed}</a>
        </div>
        <div class="cat-events">${upcoming.slice(0, 5).map((e) => `
          <a class="cat-ev hover-title" href="calendar.html#${e.id}" style="--c:${G.SERIES[e.series].color}">
            ${meta.logo || G.SERIES[e.series].logo ? `<img class="series-logo" src="assets/${G.SERIES[e.series].logo}" alt="" width="72" height="24">` : ""}
            <span class="when">${fmt.range(e.start, e.end)}</span>
            <span class="name t">${e.name}</span>
            <span class="place">${e.place}${G.TRACKS[e.track] ? ` · ${G.TRACKS[e.track].name}` : ""} · ${e.watch}</span>
          </a>`).join("")}</div>
      </section>` : "";

    document.getElementById("main").innerHTML = `
      <div class="wrap cat-head">
        <nav aria-label="Naršymo kelias"><ol class="crumbs"><li><a href="improved.html">Pradžia</a></li><li><span aria-current="page">${meta.name}</span></li></ol></nav>
        <div class="cat-title">
          ${meta.logo ? `<img class="cat-logo" src="assets/${meta.logo}" alt="" width="96" height="36">` : (isLt ? '<span class="cat-flag" aria-hidden="true"></span>' : "")}
          <div>
            <h1>${meta.name}</h1>
            <p class="sub">${meta.blurb}</p>
          </div>
          <div class="cat-actions">
            <a class="btn btn-ghost" href="${calHref}">Kalendorius</a>
            <a class="btn btn-ghost" href="${ratHref}">${st || isLt ? "Reitingai" : "Reitingai"}</a>
          </div>
        </div>
      </div>
      <div class="wrap top cat-top">
        <div class="top-news">${leadHTML}${stackHTML}</div>
        <aside class="rail" aria-labelledby="cat-rail-title">
          <div class="rail-head">
            <h2 id="cat-rail-title">Tvarkaraštis</h2>
            <a class="more-link" href="${calHref}">Kalendorius</a>
          </div>
          <div class="events">${weekendHTML}</div>
        </aside>
      </div>
      <section class="section wrap" aria-label="Naujienos">
        <div class="section-head">
          <div><h2 class="cat-news-title" id="cat-news">${newsLabel}</h2></div>
          <a class="more-link" href="improved.html">Visos naujienos ${G.arrowRed}</a>
        </div>
        <div class="grid4">${newsBlock}</div>
      </section>
      ${standingsHTML}
      ${nextHTML}
      ${heroesHTML}
      <section class="section wrap" id="naujienlaiskis" aria-labelledby="nl-title">
        <div class="newsletter">
          <div>
            <h2 id="nl-title">${isLt ? "Lietuvos" : meta.name} savaitės gidas</h2>
            <p>Gaukite ${isLt ? "Lietuvos motorsporto" : meta.name} tvarkaraštį ir svarbiausias naujienas el. paštu.</p>
          </div>
          <form onsubmit="event.preventDefault()">
            <label class="sr-only" for="nl-email">El. paštas</label>
            <input id="nl-email" type="email" placeholder="jusu@pastas.lt" autocomplete="email">
            <button class="btn btn-primary" type="submit">Užsiprenumeruoti</button>
          </form>
        </div>
      </section>`;
    wireHeroCarousel();
    return;
  }

  function wireHeroCarousel() {
    const track = document.querySelector(".hero-track");
    const prev = document.querySelector(".heroes .round-btn.prev");
    const next = document.querySelector(".heroes .round-btn.next");
    if (!track || !prev || !next) return;
    const step = () => (track.querySelector("li")?.offsetWidth || 0) + 16;
    prev.addEventListener("click", () => track.scrollBy({ left: -step() }));
    next.addEventListener("click", () => track.scrollBy({ left: step() }));
    const sync = () => {
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    };
    track.addEventListener("scroll", sync, { passive: true });
    sync();
  }

  /* ---------- Default homepage ---------- */
  const podTrack = document.getElementById("pod-track");
  if (podTrack) {
    podTrack.innerHTML = G.PODCASTS.map((p) => `
      <li>
        <a class="pod hover-title" href="#podcastai" aria-label="${p.show}, ${p.host}, ${p.platform}">
          <img src="assets/${p.img}" alt="" loading="lazy">
          <span class="pod-plat">${p.platform}</span>
          <span class="pod-text">
            <span class="pod-show t">${p.show}</span>
            <span class="pod-host">${p.host}</span>
          </span>
        </a>
      </li>`).join("");
  }

  document.getElementById("panel-new").innerHTML = A(["zala-elektrenai", "meksika-red-bull", "toyota-wec-titulas", "vanagas-komanda", "phillip-island", "drift-palanga"]).map((a) => G.row(a)).join("");
  const reads = ["12,4", "9,8", "7,1", "6,3", "5,5", "4,9"];
  document.getElementById("panel-top").innerHTML = A(["jos-verstappen", "baciuska-kaina", "elektrenai-ruozai", "centrines-europos-ralis", "marquezo-grizimas", "ziemines-padangos"]).map((a, i) => G.row(a, true, `${reads[i]} tūkst. skaitė`)).join("");
  document.getElementById("f1-side").innerHTML = A(["ferrari-atnaujinimas", "mclaren-treniruotes", "padangu-misiniai", "transliaciju-gidas"]).map((a) => G.card(a)).join("");
  document.getElementById("rally-grid").innerHTML = A(["zala-elektrenai", "centrines-europos-ralis", "baciuska-kaina", "vanagas-komanda"]).map((a) => G.card(a)).join("");
  document.getElementById("moto-grid").innerHTML = A(["phillip-island", "gelazninkas-marokas", "norkunas-sezonas", "marquezo-grizimas"]).map((a) => G.card(a)).join("");

  const videos = [
    { tag: "Onboard", time: "4:12", img: "hero-zala.png", title: "Žalos onboard: greičiausias Elektrėnų ruožas", id: "zala-elektrenai" },
    { tag: "Formulė 1", time: "8:40", img: "thumb-track.png", title: "Meksikos GP trasos apžvalga per 8 minutes", id: "meksika-oras" },
    { tag: "WEC", time: "2:55", img: "lead-wec.png", title: "Barselonos finišas: „Toyota“ dviguba pergalė", id: "toyota-barselona" },
    { tag: "Dakaras", time: "12:03", img: "hero-baciuska.png", title: "Baciuška garaže: kaip ruošiamas Dakaro bolidas", id: "baciuska-kaina" },
  ];
  document.getElementById("video-grid").innerHTML = videos.map((v) => `
    <a class="card video hover-title" href="article.html?id=${v.id}">
      <div class="img-frame"><img src="assets/${v.img}" alt="" loading="lazy"><span class="play"><span class="sr-only">Video, trukmė</span>${v.time}</span></div>
      <div class="card-body">
        <p class="meta"><span class="kicker">${v.tag}</span></p>
        <h3 class="card-title clamp-2 t" style="min-height:48px">${v.title}</h3>
      </div>
    </a>`).join("");

  const weekend = G.EVENTS.filter((e) => fmt.d(e.start) <= fmt.d("2026-10-25") && fmt.d(e.end) >= fmt.d("2026-10-24")).map((e) => {
    const sessions = e.sessions.map(([name, at]) => ({ name, at: fmt.d(at) }));
    const live = [...sessions].reverse().find((s) => s.at <= now && now - s.at < LIVE_MS);
    const next = sessions.find((s) => s.at > now);
    const show = live || next || sessions[sessions.length - 1];
    return { e, show, live: !!live };
  }).sort((a, b) => b.live - a.live || a.show.at - b.show.at);
  const days = {};
  weekend.forEach((w) => { const k = w.show.at.toDateString(); (days[k] ||= []).push(w); });
  document.getElementById("weekend").innerHTML = Object.values(days).map((list) => {
    const day = list[0].show.at;
    const key = day.getDay();
    return `<p class="day" data-day="${key}">${fmt.DAYS[key]}, ${fmt.pad(day.getMonth() + 1)}-${fmt.pad(day.getDate())}</p>` + list.map((w) => `
      <a class="event" href="calendar.html#${w.e.id}" data-region="${w.e.country === "LT" ? "lt" : "world"}" data-day="${key}">
        ${w.live ? '<span class="live-now"><span class="dot" aria-hidden="true"></span>Vyksta</span>' : `<time>${fmt.pad(w.show.at.getHours())}:${fmt.pad(w.show.at.getMinutes())}</time>`}
        <div><p class="kicker">${G.SERIES[w.e.series].name}</p><p class="name">${w.e.name}, ${w.show.name.toLowerCase()}</p><p class="place">${w.e.place}</p></div>
      </a>`).join("");
  }).join("");

  document.querySelectorAll(".segmented button").forEach((b) => b.addEventListener("click", () => {
    document.querySelectorAll(".segmented button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    const r = b.dataset.region;
    document.querySelectorAll(".rail .event").forEach((e) => {
      const hide = r !== "all" && e.dataset.region !== r;
      if (hide) {
        e.classList.add("is-filtered");
        const end = () => { if (e.classList.contains("is-filtered")) e.hidden = true; e.removeEventListener("transitionend", end); };
        e.addEventListener("transitionend", end);
        setTimeout(end, 320);
      } else {
        e.hidden = false;
        requestAnimationFrame(() => e.classList.remove("is-filtered"));
      }
    });
    document.querySelectorAll(".rail .day").forEach((d) => {
      d.hidden = ![...document.querySelectorAll(`.rail .event[data-day="${d.dataset.day}"]`)].some((e) => !e.hidden && !e.classList.contains("is-filtered"));
    });
  }));

  const lastEvent = { larc: "larc-rok", f1: "f1-usa", motogp: "motogp-jpn" };
  document.getElementById("latest-results").innerHTML = Object.entries(lastEvent).map(([key, id]) => {
    const st = G.STANDINGS[key];
    const ev = G.eventById[id];
    const podium = st.lastResult.slice(0, 3).map((d) => `<li><span>${d.name}${d.lt ? '<span class="lt">LT</span>' : ""}</span><span class="gap">+${st.pts(d.lastPos)} tšk.</span></li>`).join("");
    return `<a class="result hover-title" href="ratings.html?s=${key}&v=last">
      <p class="meta"><span class="kicker">${G.SERIES[key].name}</span><span>${fmt.day(ev.end)}</span></p>
      <p class="event-title t">${ev.name}, ${ev.place}</p>
      <ol class="podium">${podium}</ol>
    </a>`;
  }).join("");

  const body = document.getElementById("standings-body");
  const more = document.getElementById("standings-more");
  const renderStandings = (key) => {
    body.innerHTML = G.STANDINGS[key].drivers.slice(0, 5).map((d) => `<tr><td>${d.pos}</td><td>${d.name}<span class="team">${d.team}</span></td><td>${d.points}</td></tr>`).join("");
    more.href = `ratings.html?s=${key}`;
  };
  G.wireTabs(document.querySelector("[data-standings]"), (tab) => renderStandings(tab.dataset.key));
  renderStandings("f1");

  G.wireTabs(document.querySelector(".news-head .tabs"), (tab) => {
    document.querySelectorAll(".news-head ~ [role=tabpanel]").forEach((p) => {
      const on = p.id === tab.getAttribute("aria-controls");
      if (on) {
        p.hidden = false;
        p.classList.add("fade-swap");
        requestAnimationFrame(() => p.classList.remove("is-exit"));
      } else if (!p.hidden) {
        p.classList.add("fade-swap", "is-exit");
        const end = () => { p.hidden = true; p.classList.remove("is-exit"); p.removeEventListener("transitionend", end); };
        p.addEventListener("transitionend", end);
        setTimeout(end, 320);
      }
    });
  });

  document.querySelectorAll("[data-filter]").forEach((set) => {
    const grid = set.closest("section").querySelector(".grid4");
    set.querySelectorAll(".chip").forEach((chip) => chip.addEventListener("click", () => {
      set.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", c === chip));
      grid.querySelectorAll(".card").forEach((c) => {
        const hide = chip.dataset.tag !== "all" && c.dataset.tag !== chip.dataset.tag;
        if (hide) {
          c.classList.add("is-filtered");
          const end = () => { if (c.classList.contains("is-filtered")) c.hidden = true; c.removeEventListener("transitionend", end); };
          c.addEventListener("transitionend", end);
          setTimeout(end, 320);
        } else {
          c.hidden = false;
          requestAnimationFrame(() => c.classList.remove("is-filtered"));
        }
      });
    }));
  });

  wireHeroCarousel();

  const only = params.get("only");
  if (only) document.querySelectorAll("main > *").forEach((el) => { if (el.id !== only) el.hidden = true; });
})();
