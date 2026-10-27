/* Gazas prototype data. All results, standings and schedules are demo data. */
(function () {
  // The prototype is frozen on the race weekend shown on the homepage.
  const DEMO_NOW = new Date("2026-10-24T12:30:00");
  const loadedAt = Date.now();
  const now = () => new Date(DEMO_NOW.getTime() + (Date.now() - loadedAt));

  const SERIES = {
    f1: { name: "Formulė 1", short: "F1", color: "#c8102e", logo: "series/f1.svg", blurb: "Bolidai, strategija ir čempionato kova – viskas, kas vyksta Formulėje 1." },
    wrc: { name: "WRC", short: "WRC", color: "#1f5fbf", logo: "series/wrc.svg", blurb: "Pasaulio ralio čempionatas: etapai, ekipažai ir greičiausi ruožai." },
    motogp: { name: "MotoGP", short: "MotoGP", color: "#5b21b6", logo: "series/motogp.svg", blurb: "Motociklų karalių klasė – kvalifikacijos, lenktynės ir sezonų istorijos." },
    larc: { name: "LARČ", short: "LARČ", color: "#b45309", lt: true, logo: "series/larc.svg", blurb: "Lietuvos automobilių ralio čempionatas – vietiniai ruožai ir vietiniai herojai." },
    wec: { name: "WEC", short: "WEC", color: "#0e7c66", logo: "series/wec.svg", blurb: "Pasaulio ištvermės čempionatas: hiperautomobiliai, Le Manas ir ilgosios lenktynės." },
    batcc: { name: "BaTCC", short: "BaTCC", color: "#0f766e", lt: true, logo: "series/batcc.svg", blurb: "Baltijos turistinių automobilių čempionatas ir žiedinės lenktynės regione." },
    dakar: { name: "Dakaras", short: "Dakaras", color: "#92400e", logo: "series/dakar.svg", blurb: "Sunkiausias ralio reidas planetoje – etapai, technika ir lietuvių startai." },
    drift: { name: "Drift", short: "Drift", color: "#be185d", lt: true, logo: "series/drift.svg", blurb: "Lietuvos ir regiono drifto varžybos, finalai ir naujienos iš trasos." },
    karting: { name: "Kartingas", short: "Kartingas", color: "#3f6212", lt: true, logo: "series/karting.svg", blurb: "Kartingo taurės, jaunieji pilotai ir vietiniai startai." },
    mx: { name: "Motokrosas", short: "MX", color: "#4d7c0f", lt: true, logo: "series/mx.svg", blurb: "Lietuvos motokroso čempionatas – klasės, etapai ir sezono finalai." },
    enduro: { name: "Enduro", short: "Enduro", color: "#57534e", logo: "series/enduro.svg", blurb: "Enduro ir ralio reidai motociklais – nuo Lietuvos iki Dakaro." },
    auto: { name: "Auto", short: "Auto", color: "#374151", logo: "series/auto.svg", blurb: "Bendrosios auto sporto ir pramonės naujienos." },
  };
  const LT_HOME = {
    name: "Lietuva", short: "LT", color: "#006a44", logo: null,
    blurb: "Lietuvos motorsportas vienoje vietoje – ralis, žiedas, moto ir mūsų pilotai pasaulyje.",
  };

  /* ---------------- Articles ---------------- */
  const AUTHORS = {
    tr: { name: "Tomas Ramanauskas", role: "Sporto redaktorius", initials: "TR" },
    ev: { name: "Eglė Vaitkutė", role: "Ralio ir bekelės apžvalgininkė", initials: "EV" },
    jp: { name: "Justas Petrauskas", role: "Moto sporto apžvalgininkas", initials: "JP" },
  };

  const ARTICLES = [
    { id: "toyota-barselona", series: "wec", img: "lead-wec.png", time: "prieš 4 val.", author: "tr", read: 6, event: null,
      title: "Barselonoje „Toyota“ iškovojo dvigubą pergalę ir priartėjo prie titulo",
      dek: "Japonų gamintojas laimėjo jau ketvirtas lenktynes iš septynių ir vėl tapo čempionato etalonu.",
      body: [
        ["p", "Barselonos trasoje „Toyota“ ekipažai finišavo pirmoje ir antroje vietose, o konkurentai nuo pat starto turėjo vytis. Tai ketvirtoji japonų gamintojo pergalė šį sezoną ir pirmoji dviguba nuo vasaros."],
        ["p", "Lemiamas buvo trečiasis lenktynių ketvirtis, kai temperatūra trasoje nukrito ir komanda pirmoji perėjo prie kietesnio mišinio. Per du sustojimus „Toyota“ susikrovė beveik pusės minutės pranašumą."],
        ["h2", "Strategija, kuri suveikė"],
        ["p", "Inžinieriai lenktynes planavo trijų dalių scenarijumi: agresyvus startas, ilgas vidurinis etapas ir saugus finišas. Kai konkurentai rinkosi trumpesnius etapus, „Toyota“ laimėjo laiko boksuose."],
        ["quote", "Mes ne greičiausi kiekviename rate, bet esame greičiausi per šešias valandas. Tai ir yra ištvermės lenktynės.", "Komandos vadovas"],
        ["p", "Prieš paskutinį etapą „Toyota“ gamintojų įskaitoje pirmauja 29 taškais. Titului užtikrinti užteks finišuoti antroje vietoje."],
      ] },
    { id: "ferrari-atnaujinimas", series: "f1", img: "ferrari-drawing.png", contain: true, time: "prieš 4 val.", author: "tr", read: 5, event: "f1-mex",
      title: "Ką „Ferrari“ keičia didžiausiu 2026 m. bolido atnaujinimu",
      dek: "Naujos grindys, perdaryti šoniniai pontonai ir kitokia aušinimo logika – ko tikėtis Meksikoje." },
    { id: "jos-verstappen", series: "f1", img: "jos-verstappen.png", time: "prieš 5 val.", author: "tr", read: 8, event: "f1-mex",
      title: "Josas Verstappenas buvo garbinamas kaip Maxas, kol viskas sugriuvo",
      dek: "Istorija apie pilotą, kurio karjerą užgožė lūkesčiai – ir apie tai, kaip ji suformavo sūnų." },
    { id: "zala-elektrenai", series: "larc", img: "hero-zala.png", time: "prieš 12 min.", author: "ev", read: 4, event: "larc-ele",
      title: "Žala po pirmos dienos Elektrėnuose pirmauja 2,4 s",
      dek: "Sezono finale sprendžiasi čempiono titulas: lyderiui užtenka finišuoti, persekiotojams reikia stebuklo.",
      body: [
        ["p", "Pirmąją Elektrėnų ralio dieną Vaidotas Žala laimėjo tris greičio ruožus iš penkių ir į nakties parką įvažiavo turėdamas 2,4 sekundės pranašumą."],
        ["p", "Sunkiausias buvo ketvirtasis ruožas, kuriame po ryto lietaus žvyras virto purvu. Keli ekipažai prarado po kelias dešimtis sekundžių, o vienas pasitraukė dėl sugadintos pakabos."],
        ["h2", "Titulo matematika"],
        ["p", "Prieš finalinį etapą Žala čempionate pirmauja 21 tašku. Antroje vietoje esantis persekiotojas dar gali laimėti titulą, tačiau tik tuo atveju, jei lyderis nesurinks taškų."],
        ["quote", "Ruožai čia greiti ir klastingi. Rytoj važiuosime protingai – titulas svarbiau už etapo pergalę.", "Vaidotas Žala"],
        ["p", "Antroji ralio diena prasidės 09:00, o paskutinis, galios ruožas, numatytas 15:30. Gazas visą dieną transliuos tiesiogiai."],
      ] },
    { id: "meksika-red-bull", series: "f1", img: "thumb-track.png", time: "prieš 40 min.", author: "tr", read: 4, event: "f1-mex",
      title: "Meksikos GP: kodėl „Red Bull“ čia vėl favoritai",
      dek: "Retas oras, ilgas startinis tiesusis ir aukštas prispaudimas – trasa, kuri tinka „Red Bull“ filosofijai." },
    { id: "toyota-wec-titulas", series: "wec", img: "thumb-wec.png", time: "prieš 1 val.", author: "tr", read: 3, event: null,
      title: "„Toyota“ užsitikrino pasaulio ištvermės čempionato gamintojų titulą",
      dek: "Po Barselonos pergalės konkurentai matematiškai nebegali pasivyti japonų gamintojo." },
    { id: "vanagas-komanda", series: "dakar", img: "hero-vanagas.png", time: "prieš 2 val.", author: "ev", read: 5, event: "dakar-27",
      title: "Vanagas pristatė komandą ir naują bolidą 2027 m. sezonui",
      dek: "Naujas šturmanas, kitokia pakaba ir tikslas – geriausias lietuvio rezultatas Dakare." },
    { id: "phillip-island", series: "motogp", img: "card-wec.png", time: "prieš 3 val.", author: "jp", read: 4, event: "motogp-aus",
      title: "Phillip Island prognozė: vėjas gali sujaukti kvalifikaciją",
      dek: "Vandenyno gūsiai ir vėsus asfaltas – Australijos GP dažnai laimi ne greičiausias, o drąsiausias." },
    { id: "drift-palanga", series: "drift", img: "hero-baciuska.png", time: "prieš 4 val.", author: "jp", read: 3, event: "drift-final",
      title: "Lietuvos drifto čempionato finalas persikelia į Palangą",
      dek: "Organizatoriai žada didesnę trasą, daugiau žiūrovų vietų ir tarptautinius svečius." },
    { id: "baciuska-kaina", series: "dakar", img: "hero-baciuska.png", time: "prieš 5 val.", author: "ev", read: 7, event: "dakar-27",
      title: "Baciuška atskleidė, kiek kainuoja Dakaro sezonas",
      dek: "Nuo padangų iki logistikos: atviras pokalbis apie biudžetą, rėmėjus ir tai, ko nemato žiūrovai." },
    { id: "elektrenai-ruozai", series: "larc", img: "thumb-track.png", time: "vakar", author: "ev", read: 3, event: "larc-ele",
      title: "Elektrėnų ralio greičio ruožai: kur geriausia žiūrėti",
      dek: "Žiūrovų zonos, eismo ribojimai ir laikai – viskas, ką reikia žinoti prieš važiuojant." },
    { id: "centrines-europos-ralis", series: "wrc", img: "thumb-track.png", time: "prieš 3 val.", author: "ev", read: 4, event: "wrc-cen",
      title: "Centrinės Europos ralis: trys valstybės, vienas savaitgalis",
      dek: "Vokietija, Čekija ir Austrija – asfaltas, kuris keičiasi kiekviename ruože." },
    { id: "marquezo-grizimas", series: "motogp", img: "thumb-wec.png", time: "vakar", author: "jp", read: 6, event: "motogp-aus",
      title: "Kodėl Marquezo grįžimas keičia čempionato logiką",
      dek: "Daugkartinis čempionas vėl diktuoja tempą – ir tai keičia, kaip važiuoja visi kiti." },
    { id: "ziemines-padangos", series: "auto", img: "card-wec.png", time: "vakar", author: "tr", read: 5, event: null,
      title: "Žieminės padangos: ką rinktis šį sezoną Lietuvoje",
      dek: "Dygliuotos, frikcinės ar universalios – ką rodo testai ir ką sako ekspertai." },
    { id: "mclaren-treniruotes", series: "f1", img: "thumb-track.png", time: "prieš 6 val.", author: "tr", read: 3, event: "f1-mex",
      title: "Treniruočių rezultatai: „McLaren“ greitesni ilgose atkarpose",
      dek: "Penktadienio duomenys rodo, kad lenktynių tempu oranžiniai bolidai pirmauja." },
    { id: "padangu-misiniai", series: "f1", img: "card-wec.png", time: "prieš 9 val.", author: "tr", read: 2, event: "f1-mex",
      title: "Padangų tiekėjas atskleidė mišinius Meksikai",
      dek: "Pasirinkti minkštesni mišiniai – tikimasi vieno sustojimo lenktynių." },
    { id: "transliaciju-gidas", series: "f1", img: "jos-verstappen.png", time: "vakar", author: "tr", read: 2, event: "f1-mex",
      title: "Transliacijų gidas: kur ir kada žiūrėti Meksikos GP",
      dek: "Visi savaitgalio laikai Lietuvos laiku ir kur rasti transliacijas." },
    { id: "meksika-oras", series: "f1", img: "jos-verstappen.png", time: "prieš 2 val.", author: "tr", read: 7, event: "f1-mex", label: "Analizė",
      title: "Meksika – trasa, kurioje oras plonas, o klaidų kaina didžiausia",
      dek: "Aukštis virš jūros lygio keičia viską: nuo stabdžių aušinimo iki strategijos. Ką tai reiškia lyderiams." },
    { id: "gelazninkas-marokas", series: "enduro", img: "hero-gelaznikas.png", time: "prieš 7 val.", author: "jp", read: 5, event: "dakar-27",
      title: "Gelažninkas: „Maroke išbandėme viską, ko reikės Dakare“",
      dek: "Paskutinis didelis testas prieš sausį – navigacija, karštis ir 400 km per dieną." },
    { id: "norkunas-sezonas", series: "mx", img: "hero-norkunas.png", time: "vakar", author: "jp", read: 6, event: "mx-final",
      title: "Norkūnas apie sezoną: traumos, pergalės ir kitų metų planai",
      dek: "Atviras pokalbis apie sezoną, kurį teko pradėti du kartus." },

    { id: "zala-titulo-matematika", series: "larc", img: "thumb-track.png", time: "prieš 1 val.", author: "ev", read: 4, event: "larc-ele", label: "Analizė",
      title: "Ką Žalai reikia padaryti sekmadienį, kad taptų čempionu",
      dek: "Trys scenarijai, du persekiotojai ir vienas galios ruožas – skaičiuojame visus variantus." },
    { id: "zala-interviu", series: "larc", img: "hero-zala.png", time: "vakar", author: "ev", read: 9, event: "larc-ele", label: "Interviu",
      title: "Žala: „Ralis man vis dar įdomesnis už Dakarą“",
      dek: "Pokalbis apie sezono finalą, motyvaciją po dvidešimties metų lenktynėse ir tai, kodėl jis grįžo į Lietuvos čempionatą." },
    { id: "zala-rokiskis", series: "larc", img: "thumb-track.png", time: "spalio 11 d.", author: "ev", read: 3, event: "larc-rok", label: "Rezultatai",
      title: "Rokiškio ralis: Žala laimėjo ir padidino atotrūkį iki 18 taškų",
      dek: "Ketvirtoji pergalė per sezoną ir beveik užtikrintas titulas prieš paskutinį etapą." },
    { id: "zala-dakaras-2027", series: "dakar", img: "hero-zala.png", time: "spalio 6 d.", author: "ev", read: 5, event: "dakar-27",
      title: "Žala patvirtino: sausį vėl startuos Dakare",
      dek: "Ta pati komanda, atnaujintas bolidas ir tikslas pagerinti asmeninį rekordą." },
    { id: "baciuska-testai", series: "dakar", img: "hero-baciuska.png", time: "prieš 2 d.", author: "ev", read: 4, event: "dakar-27",
      title: "Baciuška baigė testus Ispanijoje: „Bolidas pagaliau toks, kokio norėjau“",
      dek: "Penkios dienos, 1800 km ir nauji pakabos nustatymai prieš Dakarą." },
    { id: "baciuska-marokas", series: "dakar", img: "thumb-track.png", time: "spalio 12 d.", author: "ev", read: 3, event: null, label: "Rezultatai",
      title: "Baciuška pasaulio taurėje: antra vieta Maroke",
      dek: "Geriausias sezono rezultatas ir patvirtinimas, kad greitis yra." },
    { id: "vanagas-sturmanas", series: "dakar", img: "hero-vanagas.png", time: "vakar", author: "ev", read: 7, event: "dakar-27", label: "Interviu",
      title: "Vanagas apie naują šturmaną: „Pasitikėjimas gimsta dykumoje“",
      dek: "Kodėl po kelerių metų teko keisti partnerį ir kaip vyksta pasiruošimas kartu." },
    { id: "vanagas-patirtis", series: "dakar", img: "thumb-wec.png", time: "spalio 9 d.", author: "ev", read: 6, event: "dakar-27", label: "Analizė",
      title: "Ką Vanagas išmoko per penkiolika Dakarų",
      dek: "Nuo pirmojo finišo iki geriausio rezultato: penkios pamokos, kurias jis kartoja jauniems pilotams." },
    { id: "gelazninkas-tikslas", series: "enduro", img: "hero-gelaznikas.png", time: "prieš 3 d.", author: "jp", read: 4, event: "dakar-27", label: "Interviu",
      title: "Gelažninkas: „Tikslas – finišuoti tarp penkiolikos geriausių“",
      dek: "Motociklininkas apie pasiruošimą, navigaciją ir kodėl Dakaras be pagalbos yra kita sporto šaka." },
    { id: "karklys-aurum", series: "batcc", img: "hero-karklys.png", time: "rugpjūčio 3 d.", author: "tr", read: 4, event: null, label: "Rezultatai",
      title: "Karklys antras Aurum 1006 km: „Pritrūko vieno sustojimo“",
      dek: "Ekipažas iki paskutinės valandos kovojo dėl pergalės, bet strategija lėmė antrą vietą." },
    { id: "karklys-planai", series: "batcc", img: "thumb-track.png", time: "prieš 4 d.", author: "tr", read: 5, event: "batcc-pal",
      title: "Karklys kitąmet taikosi į Europos ištvermės lenktynes",
      dek: "Pirmieji bandymai jau suplanuoti žiemą, o biudžetas – beveik surinktas." },
    { id: "norkunas-finalas", series: "mx", img: "hero-norkunas.png", time: "prieš 5 val.", author: "jp", read: 3, event: "mx-final",
      title: "Norkūnas kovos dėl medalio Lietuvos motokroso finale",
      dek: "Prieš paskutinį etapą jį nuo antros vietos skiria vos 6 taškai." },
    { id: "norkunas-grizimas", series: "mx", img: "thumb-track.png", time: "rugsėjo 20 d.", author: "jp", read: 6, event: null, label: "Analizė",
      title: "Kaip Norkūnas grįžo į trasą per dešimt savaičių po traumos",
      dek: "Reabilitacija, kantrybė ir pirmoji pergalė po pertraukos." },
  ];
  const byId = Object.fromEntries(ARTICLES.map((a) => [a.id, a]));

  const PARAGRAPHS = {
    f1: [
      "Komandos į savaitgalį atvyko su skirtingais tikslais: lyderiams svarbu išlaikyti ritmą, o vidurio grupei – surinkti kiekvieną tašką konstruktorių įskaitoje.",
      "Penktadienio treniruotėse dauguma komandų važiavo ilgas atkarpas su pilnais bakais. Būtent šie duomenys dažniausiai parodo tikrąjį lenktynių tempą.",
      "Inžinieriai atkreipia dėmesį į padangų degradaciją: jei temperatūra trasoje kils, vieno sustojimo strategija gali tapti per rizikinga.",
      "Kvalifikacija vyks šeštadienį vakare Lietuvos laiku, o lenktynės – sekmadienį. Visus laikus rasite Gazas kalendoriuje.",
    ],
    rally: [
      "Ekipažai ruožus apžiūrėjo dar ketvirtadienį, tačiau oro sąlygos per naktį pasikeitė, todėl stenogramas teko koreguoti paskutinę minutę.",
      "Šurmulingiausia vieta – žiūrovų zona prie šuolio, kur susirenka daugiausiai sirgalių. Organizatoriai primena laikytis saugos juostų.",
      "Techninėje zonoje mechanikams skiriama vos 30 minučių, todėl kiekviena smulkmena gali nulemti, ar ekipažas grįš į trasą.",
      "Galutiniai rezultatai ir taškų lentelė bus atnaujinti iškart po paskutinio ruožo.",
    ],
    moto: [
      "Pirmosios treniruotės parodė, kad padangų pasirinkimas šį savaitgalį bus svarbesnis nei įprastai – asfaltas vėsus, o sukibimas kinta kiekvieną valandą.",
      "Gamyklinės komandos atvežė smulkių aerodinamikos atnaujinimų, tačiau dauguma pilotų sako, kad svarbiausia – rasti ritmą.",
      "Sprinto lenktynės vyks šeštadienį, pagrindinės – sekmadienį ryte Lietuvos laiku.",
      "Čempionato lyderis į savaitgalį atvyksta turėdamas solidų pranašumą, tačiau persekiotojai neketina pasiduoti.",
    ],
    general: [
      "Redakcija kalbėjosi su keliais ekspertais, kurie pateikė skirtingus požiūrius į situaciją.",
      "Daugiausiai diskusijų kelia ne techniniai sprendimai, o tai, kaip jie atsilieps sezono rezultatams.",
      "Gazas toliau seks naujienas ir atnaujins straipsnį, kai paaiškės daugiau detalių.",
    ],
  };
  const family = (s) => (s === "f1" || s === "wec" ? "f1" : s === "wrc" || s === "larc" || s === "dakar" ? "rally" : s === "motogp" || s === "mx" || s === "enduro" ? "moto" : "general");
  function articleBody(a) {
    if (a.body) return a.body;
    const bank = PARAGRAPHS[family(a.series)];
    return [["p", a.dek], ["p", bank[0]], ["p", bank[1]], ["h2", "Ką tai reiškia"], ["p", bank[2]], ["p", bank[3] || PARAGRAPHS.general[2]]];
  }

  /* ---------------- Events ---------------- */
  // Times are Lithuanian local time.
  /* Simplified track outlines (viewBox 0 0 100 60) — stylized, not official maps */
  const TRACKS = {
    rokiskis: { name: "Rokiškio greičio ruožai", path: "M8 42 C18 38 22 28 32 26 C42 24 48 34 58 32 C68 30 72 18 82 16 C88 15 92 22 94 28" },
    cota: { name: "Circuit of the Americas", path: "M18 48 L28 42 L32 28 L48 18 L62 22 L72 14 L88 20 L84 32 L70 38 L62 48 L48 44 L38 50 L22 52 Z" },
    motegi: { name: "Mobility Resort Motegi", path: "M14 40 C20 22 38 12 52 16 C66 20 78 14 88 22 C92 34 84 46 70 48 C52 50 40 42 28 46 C20 48 16 46 14 40 Z" },
    passau: { name: "Centrinės Europos ruožai", path: "M6 44 C16 40 20 30 30 28 C40 26 46 36 56 34 C66 32 70 20 80 18 C86 17 90 24 94 30 M20 50 C30 48 40 52 50 48" },
    phillip: { name: "Phillip Island", path: "M10 36 C18 18 40 10 58 14 C78 18 92 28 90 40 C88 50 70 54 52 50 C34 46 22 48 14 44 C10 42 8 40 10 36 Z" },
    mexico: { name: "Autódromo Hermanos Rodríguez", path: "M12 44 L22 30 L38 24 L52 18 L68 22 L82 20 L88 32 L78 42 L62 46 L48 40 L34 48 L18 50 Z" },
    elektrenai: { name: "Elektrėnų greičio ruožai", path: "M8 38 C18 34 24 22 36 20 C48 18 54 30 66 28 C76 26 82 16 92 18 C94 28 88 38 78 42 C64 48 50 40 36 44 C24 48 14 46 8 38" },
    palanga: { name: "Palangos žiedas", path: "M20 44 C24 24 40 14 56 16 C74 18 86 28 84 42 C82 52 64 54 48 50 C34 46 24 50 20 44 Z" },
    sepang: { name: "Sepang International Circuit", path: "M16 46 L24 28 L40 18 L58 22 L72 14 L86 24 L82 38 L68 44 L54 36 L40 46 L26 50 Z" },
    vilniuskart: { name: "Vilniaus kartodromas", path: "M22 42 C26 26 40 18 54 20 C70 22 80 32 78 44 C76 52 60 54 46 50 C34 46 26 48 22 42 Z" },
    interlagos: { name: "Interlagos", path: "M18 46 C22 28 36 16 52 18 C68 20 82 28 80 42 C78 52 60 54 46 48 C34 44 26 50 18 46 Z" },
    palangadrift: { name: "Palangos drifto arena", path: "M28 46 C20 34 28 18 46 16 C66 14 82 26 78 40 C74 52 52 54 40 48 C34 46 30 48 28 46 Z" },
    vilkaviskis: { name: "Vilkaviškio motokroso trasa", path: "M10 40 C18 28 28 36 38 24 C48 14 58 30 68 22 C78 14 88 28 92 38 C84 48 70 44 58 50 C46 54 34 46 22 50 C16 52 12 46 10 40" },
    aichi: { name: "Aičio greičio ruožai", path: "M8 46 C18 42 22 30 34 28 C46 26 50 38 62 36 C74 34 78 20 90 22 C94 32 88 42 78 46 C62 52 48 42 34 48 C22 52 12 50 8 46" },
    tormo: { name: "Circuit Ricardo Tormo", path: "M14 44 C18 26 34 14 52 16 C72 18 88 28 86 42 C84 52 66 54 50 48 C36 44 26 50 16 48 C12 47 12 46 14 44 Z" },
    vegas: { name: "Las Vegas Strip Circuit", path: "M18 48 L22 20 L38 18 L42 36 L58 34 L62 16 L78 14 L84 42 L70 48 L54 44 L40 50 L24 52 Z" },
    jeddah: { name: "Džidos greičio ruožai", path: "M6 42 C16 36 22 24 34 22 C48 20 54 34 68 30 C78 28 84 16 94 20 C92 34 82 44 68 46 C50 48 40 38 26 44 C16 48 10 48 6 42" },
    lusail: { name: "Lusail International Circuit", path: "M16 48 L20 28 L36 16 L58 18 L74 12 L88 24 L84 40 L70 48 L52 42 L38 50 L22 52 Z" },
    yas: { name: "Yas Marina Circuit", path: "M12 42 C18 24 36 14 54 16 C70 18 86 26 88 40 C86 50 70 54 54 50 C40 46 30 52 18 48 C14 46 12 44 12 42 Z" },
    dakar: { name: "Saudo Arabijos maršrutas", path: "M8 48 C18 44 24 30 36 26 C46 22 52 34 64 28 C74 24 80 14 90 12 M14 52 C28 50 40 54 54 48 C66 44 78 50 92 46" },
  };

  const EVENTS = [
    { id: "larc-rok", series: "larc", track: "rokiskis", name: "Rokiškio ralis", place: "Rokiškis", country: "LT", round: [5, 6], start: "2026-10-10", end: "2026-10-11", watch: "Gazas tiesiogiai", athletes: ["zala"],
      sessions: [["Kvalifikacija", "2026-10-10T10:00"], ["1 diena", "2026-10-10T13:00"], ["2 diena", "2026-10-11T09:00"], ["Galios ruožas", "2026-10-11T15:30"]] },
    { id: "f1-usa", series: "f1", track: "cota", name: "JAV GP", place: "Ostinas", country: "US", round: [19, 24], start: "2026-10-16", end: "2026-10-18", watch: "Go3",
      sessions: [["1 treniruotė", "2026-10-16T20:30"], ["Kvalifikacija", "2026-10-18T00:00"], ["Lenktynės", "2026-10-18T22:00"]] },
    { id: "motogp-jpn", series: "motogp", track: "motegi", name: "Japonijos GP", place: "Motegi", country: "JP", round: [17, 21], start: "2026-10-16", end: "2026-10-18", watch: "TV3 Sport",
      sessions: [["Kvalifikacija", "2026-10-17T03:50"], ["Sprintas", "2026-10-17T08:00"], ["Lenktynės", "2026-10-18T08:00"]] },
    { id: "wrc-cen", series: "wrc", track: "passau", name: "Centrinės Europos ralis", place: "Passau", country: "DE", round: [12, 14], start: "2026-10-22", end: "2026-10-25", watch: "WRC+",
      sessions: [["Shakedown", "2026-10-22T09:00"], ["1 diena", "2026-10-23T08:00"], ["2 diena", "2026-10-24T09:10"], ["Galios ruožas", "2026-10-25T14:15"]] },
    { id: "motogp-aus", series: "motogp", track: "phillip", name: "Australijos GP", place: "Phillip Island", country: "AU", round: [18, 21], start: "2026-10-23", end: "2026-10-25", watch: "TV3 Sport",
      sessions: [["Kvalifikacija", "2026-10-24T02:50"], ["Sprintas", "2026-10-24T07:00"], ["Lenktynės", "2026-10-25T05:00"]] },
    { id: "f1-mex", series: "f1", track: "mexico", name: "Meksikos GP", place: "Meksikas", country: "MX", round: [20, 24], start: "2026-10-23", end: "2026-10-25", watch: "Go3",
      sessions: [["1 treniruotė", "2026-10-23T21:30"], ["3 treniruotė", "2026-10-24T20:30"], ["Kvalifikacija", "2026-10-25T00:00"], ["Lenktynės", "2026-10-25T23:00"]] },
    { id: "larc-ele", series: "larc", track: "elektrenai", name: "Elektrėnų ralis", place: "Elektrėnai", country: "LT", round: [6, 6], start: "2026-10-24", end: "2026-10-25", watch: "Gazas tiesiogiai", athletes: ["zala"],
      sessions: [["Kvalifikacija", "2026-10-24T10:00"], ["1 diena", "2026-10-24T13:00"], ["2 diena", "2026-10-25T09:00"], ["Galios ruožas", "2026-10-25T15:30"]] },
    { id: "batcc-pal", series: "batcc", track: "palanga", name: "Palangos etapas", place: "Palanga", country: "LT", round: [6, 6], start: "2026-10-24", end: "2026-10-25", watch: "LRT Plius", athletes: ["karklys"],
      sessions: [["Kvalifikacija", "2026-10-24T15:00"], ["1 lenktynės", "2026-10-25T11:00"], ["2 lenktynės", "2026-10-25T14:00"]] },
    { id: "motogp-mal", series: "motogp", track: "sepang", name: "Malaizijos GP", place: "Sepangas", country: "MY", round: [19, 21], start: "2026-10-30", end: "2026-11-01", watch: "TV3 Sport",
      sessions: [["Kvalifikacija", "2026-10-31T04:50"], ["Sprintas", "2026-10-31T09:00"], ["Lenktynės", "2026-11-01T09:00"]] },
    { id: "karting-cup", series: "karting", track: "vilniuskart", name: "Lietuvos kartingo taurė", place: "Vilnius", country: "LT", round: [1, 1], start: "2026-11-01", end: "2026-11-01", watch: "Gazas tiesiogiai",
      sessions: [["Kvalifikacija", "2026-11-01T10:00"], ["Finalai", "2026-11-01T14:00"]] },
    { id: "f1-bra", series: "f1", track: "interlagos", name: "Brazilijos GP", place: "San Paulas", country: "BR", round: [21, 24], start: "2026-11-06", end: "2026-11-08", watch: "Go3",
      sessions: [["Sprintas", "2026-11-07T16:00"], ["Kvalifikacija", "2026-11-07T20:00"], ["Lenktynės", "2026-11-08T19:00"]] },
    { id: "drift-final", series: "drift", track: "palangadrift", name: "Lietuvos drifto čempionato finalas", place: "Palanga", country: "LT", round: [5, 5], start: "2026-11-07", end: "2026-11-07", watch: "Gazas tiesiogiai",
      sessions: [["Kvalifikacija", "2026-11-07T11:00"], ["TOP 16", "2026-11-07T16:00"]] },
    { id: "mx-final", series: "mx", track: "vilkaviskis", name: "Lietuvos motokroso čempionato finalas", place: "Vilkaviškis", country: "LT", round: [8, 8], start: "2026-11-08", end: "2026-11-08", watch: "Gazas tiesiogiai", athletes: ["norkunas"],
      sessions: [["Kvalifikacija", "2026-11-08T10:00"], ["Finaliniai važiavimai", "2026-11-08T13:00"]] },
    { id: "wrc-jpn", series: "wrc", track: "aichi", name: "Japonijos ralis", place: "Toyota", country: "JP", round: [13, 14], start: "2026-11-12", end: "2026-11-15", watch: "WRC+",
      sessions: [["Shakedown", "2026-11-12T02:00"], ["1 diena", "2026-11-13T01:00"], ["Galios ruožas", "2026-11-15T06:15"]] },
    { id: "motogp-val", series: "motogp", track: "tormo", name: "Valensijos GP", place: "Valensija", country: "ES", round: [21, 21], start: "2026-11-13", end: "2026-11-15", watch: "TV3 Sport",
      sessions: [["Kvalifikacija", "2026-11-14T11:50"], ["Sprintas", "2026-11-14T16:00"], ["Lenktynės", "2026-11-15T15:00"]] },
    { id: "f1-lvg", series: "f1", track: "vegas", name: "Las Vegaso GP", place: "Las Vegasas", country: "US", round: [22, 24], start: "2026-11-19", end: "2026-11-21", watch: "Go3",
      sessions: [["Kvalifikacija", "2026-11-21T08:00"], ["Lenktynės", "2026-11-22T08:00"]] },
    { id: "wrc-sau", series: "wrc", track: "jeddah", name: "Saudo Arabijos ralis", place: "Džida", country: "SA", round: [14, 14], start: "2026-11-26", end: "2026-11-29", watch: "WRC+",
      sessions: [["Shakedown", "2026-11-26T08:00"], ["Galios ruožas", "2026-11-29T12:15"]] },
    { id: "f1-qat", series: "f1", track: "lusail", name: "Kataro GP", place: "Lusailis", country: "QA", round: [23, 24], start: "2026-11-27", end: "2026-11-29", watch: "Go3",
      sessions: [["Sprintas", "2026-11-28T15:00"], ["Kvalifikacija", "2026-11-28T19:00"], ["Lenktynės", "2026-11-29T18:00"]] },
    { id: "f1-abu", series: "f1", track: "yas", name: "Abu Dabio GP", place: "Abu Dabis", country: "AE", round: [24, 24], start: "2026-12-04", end: "2026-12-06", watch: "Go3",
      sessions: [["Kvalifikacija", "2026-12-05T16:00"], ["Lenktynės", "2026-12-06T15:00"]] },
    { id: "dakar-27", series: "dakar", track: "dakar", name: "Dakaras 2027", place: "Saudo Arabija", country: "SA", round: [1, 1], start: "2027-01-02", end: "2027-01-16", watch: "Go3", athletes: ["zala", "baciuska", "vanagas", "gelazninkas"],
      sessions: [["Prologas", "2027-01-02T08:00"], ["1 etapas", "2027-01-03T07:00"], ["Poilsio diena", "2027-01-09T00:00"], ["Finišas", "2027-01-16T12:00"]] },
  ];
  const eventById = Object.fromEntries(EVENTS.map((e) => [e.id, e]));

  /* ---------------- Championships (simulated) ---------------- */
  function rng(seed) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  const CHAMPS = {
    f1: {
      label: "Formulė 1", unit: "Pilotas", seed: 11, dnf: 0.05,
      points: [25, 18, 15, 12, 10, 8, 6, 4, 2, 1],
      rounds: ["AUS", "CHN", "JPN", "BHR", "SAU", "MIA", "CAN", "MON", "ESP", "AUT", "GBR", "BEL", "HUN", "NED", "ITA", "MAD", "AZE", "SIN", "USA", "MEX", "BRA", "LVG", "QAT", "ABU"],
      done: 19, next: "f1-mex",
      teams: { McLaren: "#ff8000", "Red Bull": "#1e41ff", Mercedes: "#00a19c", Ferrari: "#dc0000", "Aston Martin": "#006f62", Williams: "#005aff", Alpine: "#0090ff", Haas: "#8a8d8f", Audi: "#bb0a30", "Racing Bulls": "#6692ff", Cadillac: "#a8a29e" },
      field: [
        ["O. Piastri", "McLaren", 9.4], ["L. Norrisas", "McLaren", 9.5], ["M. Verstappenas", "Red Bull", 9.3], ["G. Russellas", "Mercedes", 8.8],
        ["C. Leclercas", "Ferrari", 8.6], ["K. Antonelli", "Mercedes", 8.2], ["L. Hamiltonas", "Ferrari", 8.3], ["I. Hadjaras", "Red Bull", 7.6],
        ["F. Alonso", "Aston Martin", 7.4], ["C. Sainzas", "Williams", 7.5], ["A. Albonas", "Williams", 7.3], ["P. Gasly", "Alpine", 7.0],
        ["O. Bearmanas", "Haas", 6.9], ["N. Hülkenbergas", "Audi", 6.9], ["L. Lawsonas", "Racing Bulls", 6.8], ["E. Oconas", "Haas", 6.7],
        ["G. Bortoleto", "Audi", 6.6], ["L. Strollas", "Aston Martin", 6.4], ["F. Colapinto", "Alpine", 6.2], ["A. Lindbladas", "Racing Bulls", 6.3],
        ["S. Pérezas", "Cadillac", 6.0], ["V. Bottas", "Cadillac", 5.9],
      ],
    },
    wrc: {
      label: "WRC", unit: "Pilotas", seed: 23, dnf: 0.08,
      points: [25, 17, 15, 12, 10, 8, 6, 4, 2, 1],
      rounds: ["MON", "SWE", "KEN", "CRO", "CAN", "POR", "GRE", "EST", "FIN", "PAR", "CHL", "CEN", "JPN", "SAU"],
      done: 11, next: "wrc-cen",
      teams: { Toyota: "#d4001a", Hyundai: "#00287a", "M-Sport Ford": "#1a5fb4" },
      field: [
        ["E. Evansas", "Toyota", 9.3], ["O. Solbergas", "Toyota", 9.0], ["S. Ogier", "Toyota", 9.4], ["T. Katsuta", "Toyota", 8.1],
        ["T. Neuville", "Hyundai", 8.9], ["A. Fourmaux", "Hyundai", 8.4], ["S. Pajari", "Toyota", 7.9], ["E. Lappi", "Hyundai", 8.0],
        ["J. McErleanas", "M-Sport Ford", 7.4], ["M. Sesksas", "M-Sport Ford", 7.5], ["G. Munsteris", "M-Sport Ford", 7.0],
      ],
    },
    motogp: {
      label: "MotoGP", unit: "Pilotas", seed: 37, dnf: 0.09,
      points: [25, 20, 16, 13, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      rounds: ["THA", "BRA", "USA", "QAT", "ESP", "FRA", "CAT", "ITA", "HUN", "CZE", "NED", "GER", "GBR", "ARA", "RSM", "AUT", "JPN", "AUS", "MAL", "POR", "VAL"],
      done: 17, next: "motogp-aus",
      teams: { Ducati: "#c8102e", Gresini: "#79a6d2", Aprilia: "#41245e", KTM: "#ff6600", VR46: "#c6d200", Yamaha: "#0033a0", Honda: "#e60012", LCR: "#6b7280", Trackhouse: "#1d4ed8" },
      field: [
        ["M. Marquezas", "Ducati", 9.8], ["A. Marquezas", "Gresini", 8.9], ["F. Bagnaia", "Ducati", 8.6], ["M. Bezzecchi", "Aprilia", 8.7],
        ["P. Acosta", "KTM", 8.5], ["F. Di Giannantonio", "VR46", 8.1], ["F. Morbidelli", "VR46", 7.9], ["F. Quartararo", "Yamaha", 7.8],
        ["B. Binderis", "KTM", 7.7], ["J. Martinas", "Aprilia", 7.6], ["J. Zarco", "LCR", 7.4], ["J. Miras", "Honda", 7.3],
        ["R. Fernandezas", "Trackhouse", 7.1], ["A. Ogura", "Trackhouse", 7.0],
      ],
    },
    larc: {
      label: "LARČ", unit: "Ekipažas", seed: 5, dnf: 0.1, lt: true,
      points: [25, 18, 15, 12, 10, 8, 6, 4, 2, 1],
      rounds: ["ZIE", "ZEM", "RAD", "UTE", "ROK", "ELE"],
      done: 5, next: "larc-ele",
      teams: { "Žala Racing": "#b45309", "Samsonas Motorsport": "#1f2937", "Neste Rally Team": "#0e7490", "Baltic Rally Team": "#7c2d12", "Privatus": "#9ca3af" },
      field: [
        ["V. Žala", "Žala Racing", 9.6], ["J. Pečiulis", "Samsonas Motorsport", 9.0], ["D. Butvilas", "Neste Rally Team", 8.8], ["K. Kazlauskas", "Baltic Rally Team", 8.2],
        ["M. Jankauskas", "Samsonas Motorsport", 8.0], ["R. Vaitkus", "Privatus", 7.6], ["T. Žiogas", "Neste Rally Team", 7.5], ["A. Rimkus", "Baltic Rally Team", 7.2],
        ["L. Stankevičius", "Privatus", 7.0], ["E. Mockus", "Privatus", 6.8],
      ],
    },
  };

  function simulate(key) {
    const c = CHAMPS[key];
    const rand = rng(c.seed);
    const results = c.field.map(() => []);
    for (let r = 0; r < c.done; r++) {
      const runs = c.field.map((d, i) => ({ i, score: d[2] + rand() * 2.4, dnf: rand() < c.dnf }));
      const finished = runs.filter((x) => !x.dnf).sort((a, b) => b.score - a.score);
      finished.forEach((x, pos) => (results[x.i][r] = pos + 1));
      runs.filter((x) => x.dnf).forEach((x) => (results[x.i][r] = "NF"));
    }
    const pts = (pos) => (typeof pos === "number" ? c.points[pos - 1] || 0 : 0);
    const totalAfter = (i, n) => results[i].slice(0, n).reduce((s, p) => s + pts(p), 0);
    const rankAfter = (n) => c.field.map((_, i) => i).sort((a, b) => totalAfter(b, n) - totalAfter(a, n));
    const prevRank = rankAfter(c.done - 1);
    const order = rankAfter(c.done);
    const drivers = order.map((i, idx) => {
      const res = results[i];
      return {
        name: c.field[i][0], team: c.field[i][1], color: c.teams[c.field[i][1]], lt: !!c.lt,
        points: totalAfter(i, c.done), wins: res.filter((p) => p === 1).length, podiums: res.filter((p) => typeof p === "number" && p <= 3).length,
        results: res, form: res.slice(-5), pos: idx + 1, change: prevRank.indexOf(i) - idx,
      };
    });
    const leader = drivers[0].points;
    drivers.forEach((d) => (d.gap = leader - d.points));
    const teamMap = {};
    drivers.forEach((d) => { (teamMap[d.team] ||= { name: d.team, color: d.color, points: 0, wins: 0, drivers: [] }); teamMap[d.team].points += d.points; teamMap[d.team].wins += d.wins; teamMap[d.team].drivers.push(d.name); });
    const teams = Object.values(teamMap).sort((a, b) => b.points - a.points);
    const remaining = (c.rounds.length - c.done) * c.points[0];
    const contenders = drivers.filter((d) => d.points + remaining >= leader).length;
    const last = c.done - 1;
    const lastResult = drivers.map((d) => ({ ...d, lastPos: d.results[last] })).sort((a, b) => (a.lastPos === "NF") - (b.lastPos === "NF") || a.lastPos - b.lastPos);
    return { key, ...c, drivers, teams, remaining, contenders, lastRound: c.rounds[last], lastResult, pts };
  }

  const STANDINGS = Object.fromEntries(Object.keys(CHAMPS).map((k) => [k, simulate(k)]));

  // Editorial power ranking of Lithuanian athletes (Gazas TOP 10).
  const LT_TOP = [
    { id: "zala", name: "Vaidotas Žala", disc: "Ralis ir Dakaras", img: "hero-zala.png", move: 1, note: "Lyderiauja Elektrėnuose ir vienas žingsnis nuo LARČ titulo." },
    { id: "baciuska", name: "Rokas Baciuška", disc: "Dakaras", img: "hero-baciuska.png", move: 0, note: "Stiprus sezonas Rally Raid pasaulio taurėje, ruošiasi Dakarui." },
    { id: "vanagas", name: "Benediktas Vanagas", disc: "Dakaras", img: "hero-vanagas.png", move: 2, note: "Pristatė naują komandą – tikslai aukščiausi per karjerą." },
    { id: "gelazninkas", name: "Arūnas Gelažninkas", disc: "Dakaras, motociklai", img: "hero-gelaznikas.png", move: -1, note: "Finišavo Maroko ralyje, testuoja navigaciją." },
    { id: "karklys", name: "Jonas Karklys", disc: "Žiedinės lenktynės", img: "hero-karklys.png", move: -2, note: "2 vieta Aurum 1006 km, solidus sezonas." },
    { id: "norkunas", name: "Tauras Norkūnas", disc: "Motokrosas", img: "hero-norkunas.png", move: 1, note: "Grįžo po traumos ir kovoja dėl medalio finale." },
    { name: "Justas Pečiulis", disc: "Ralis", move: 0, note: "Antras LARČ, dar turi teorinių šansų." },
    { name: "Deividas Butvilas", disc: "Ralis", move: 3, note: "Trys podiumai iš eilės." },
    { name: "Kasparas Kazlauskas", disc: "Ralis", move: -1, note: "Pastovus taškų rinkėjas." },
    { name: "Rytis Vaitkus", disc: "Ralis", move: "new", note: "Naujokas sąraše po geriausio karjeros rezultato." },
  ];

  /* ---------------- Athletes (demo profiles) ----------------
     seasons: [year, series, team, position, starts, wins, podiums]
     raid: Dakar finishes, [year, position | "NF", class] */
  const ATHLETES = [
    {
      id: "zala", first: "Vaidotas", last: "Žala", gen: "Vaidoto Žalos", acc: "Vaidotą Žalą", img: "hero-zala.png",
      disc: "Ralis ir Dakaras", series: ["larc", "dakar"], standing: { series: "larc", name: "V. Žala" }, next: "larc-ele",
      lede: "Lietuvos ralio ir ralio reidų pilotas, daugkartinis Lietuvos ralio čempionas ir vienas sėkmingiausių lietuvių Dakaro dalyvių.",
      facts: [["Gimė", "1982 m., Vilnius"], ["Disciplina", "Ralis, ralio reidai"], ["Komanda", "Žala Racing"], ["Technika", "Škoda Fabia RS Rally2"], ["Debiutas", "2002 m."], ["Startų numeris", "1"]],
      stats: { starts: 214, wins: 46, podiums: 98, titles: 7 },
      best: "9 vieta Dakare (2023 m.)",
      titles: [["2025", "Lietuvos ralio čempionas"], ["2024", "Lietuvos ralio čempionas"], ["2019", "Lietuvos ralio čempionas"], ["2017", "Lietuvos ralio čempionas"], ["2016", "Baltijos ralio taurė"], ["2012", "Lietuvos ralio čempionas"], ["2009", "Lietuvos ralio čempionas"]],
      seasons: [[2026, "LARČ", "Žala Racing", null, null, null, null], [2025, "LARČ", "Žala Racing", 1, 6, 4, 6], [2024, "LARČ", "Žala Racing", 1, 6, 3, 5], [2023, "Dakaras", "Žala Racing", 9, 1, 0, 0], [2023, "LARČ", "Žala Racing", 3, 4, 1, 3], [2022, "LARČ", "Žala Racing", 2, 6, 2, 5]],
      raid: [[2019, 23, "T1"], [2020, "NF", "T1"], [2021, 14, "T1"], [2022, 12, "T1"], [2023, 9, "T1"], [2024, 11, "T1"], [2025, 13, "T1"], [2026, 10, "T1"]],
      timeline: [["2002", "Pirmasis startas Lietuvos ralio čempionate."], ["2009", "Pirmasis Lietuvos ralio čempiono titulas."], ["2019", "Debiutas Dakare automobilių klasėje."], ["2023", "Geriausias karjeros rezultatas Dakare – 9 vieta."], ["2025", "Septintasis Lietuvos čempiono titulas."]],
      bio: [
        ["h2", "Karjeros pradžia"],
        ["p", "Žala pradėjo lenktyniauti Lietuvos ralio čempionate dar studijų metais. Pirmuosius sezonus jis važiavo su privačiu automobiliu ir mažu biudžetu, tačiau greitai išsiskyrė tolygiu greičiu žvyro ruožuose."],
        ["h2", "Ralio reidai"],
        ["p", "Nuo 2019 m. didžiąją sezono dalį Žala skiria ralio reidams. Dakare jis startuoja aukščiausioje automobilių klasėje, o geriausią rezultatą – 9 vietą – pasiekė 2023 m."],
        ["h2", "Grįžimas į Lietuvos čempionatą"],
        ["p", "Pastaruosius sezonus Žala vėl reguliariai startuoja LARČ. 2026 m. jis į finalinį Elektrėnų etapą atvyko čempionato lyderio teisėmis."],
      ],
      trivia: ["Žala vienas pirmųjų Lietuvoje įkūrė profesionalią ralio komandą su savo inžinierių grupe.", "Per karjerą jis startavo daugiau nei dvidešimtyje šalių.", "Ralio ruožų stenogramas jis rašo lietuviškai, o Dakare – portugališkai."],
    },
    {
      id: "baciuska", first: "Rokas", last: "Baciuška", gen: "Roko Baciuškos", acc: "Roką Baciušką", img: "hero-baciuska.png",
      disc: "Dakaras", series: ["dakar"], next: "dakar-27",
      lede: "Jaunosios kartos lietuvių ralio reidų pilotas, startuojantis pasaulio ralio reidų taurėje ir Dakare.",
      facts: [["Gimė", "1999 m., Vilnius"], ["Disciplina", "Ralio reidai"], ["Komanda", "Baciuška Racing"], ["Technika", "Prototipas T1+"], ["Debiutas", "2019 m."], ["Startų numeris", "232"]],
      stats: { starts: 38, wins: 3, podiums: 9, titles: 1 },
      best: "18 vieta Dakare (2026 m.)",
      titles: [["2021", "Baltijos bekelės taurė"]],
      seasons: [[2026, "Pasaulio ralio reidų taurė", "Baciuška Racing", 6, 5, 0, 2], [2025, "Pasaulio ralio reidų taurė", "Baciuška Racing", 9, 5, 0, 1], [2024, "Pasaulio ralio reidų taurė", "Baciuška Racing", 14, 4, 0, 0]],
      raid: [[2023, 31, "T3"], [2024, 24, "T1"], [2025, "NF", "T1"], [2026, 18, "T1"]],
      timeline: [["2019", "Pirmieji startai Baltijos bekelės varžybose."], ["2021", "Baltijos bekelės taurės laimėtojas."], ["2023", "Debiutas Dakare."], ["2026", "Antra vieta pasaulio taurės etape Maroke."]],
      bio: [["h2", "Kelias į Dakarą"], ["p", "Baciuška į ralio reidus atėjo iš bekelės varžybų. Per kelerius metus jis nuo lengvųjų klasių perėjo į aukščiausią automobilių klasę."], ["h2", "2026 m. sezonas"], ["p", "Šis sezonas – stipriausias jo karjeroje: du podiumai pasaulio taurėje ir nuoseklus progresas kiekviename etape."]],
      trivia: ["Prieš ralio reidus Baciuška lenktyniavo kartingu.", "Komandoje dirba vos aštuoni žmonės."],
    },
    {
      id: "vanagas", first: "Benediktas", last: "Vanagas", gen: "Benedikto Vanago", acc: "Benediktą Vanagą", img: "hero-vanagas.png",
      disc: "Dakaras", series: ["dakar"], next: "dakar-27",
      lede: "Lietuvos ralio ir ralio reidų pilotas, daugiausiai kartų Dakare startavęs lietuvis.",
      facts: [["Gimė", "1977 m., Vilnius"], ["Disciplina", "Ralio reidai"], ["Komanda", "Toyota Gazoo Racing Baltics"], ["Technika", "Toyota Hilux"], ["Debiutas Dakare", "2010 m."], ["Startų numeris", "212"]],
      stats: { starts: 151, wins: 12, podiums: 34, titles: 4 },
      best: "7 vieta Dakare (2024 m.)",
      titles: [["2015", "Lietuvos ralio čempionas"], ["2014", "Lietuvos ralio čempionas"], ["2006", "Lietuvos ralio čempionas"], ["2005", "Lietuvos ralio čempionas"]],
      seasons: [[2026, "Pasaulio ralio reidų taurė", "Toyota Gazoo Racing Baltics", 8, 5, 0, 1], [2025, "Pasaulio ralio reidų taurė", "Toyota Gazoo Racing Baltics", 7, 5, 0, 1], [2024, "Dakaras", "Toyota Gazoo Racing Baltics", 7, 1, 0, 0]],
      raid: [[2018, 27, "T1"], [2019, 20, "T1"], [2020, 16, "T1"], [2021, 12, "T1"], [2022, 11, "T1"], [2023, "NF", "T1"], [2024, 7, "T1"], [2025, 10, "T1"], [2026, 9, "T1"]],
      timeline: [["2005", "Pirmasis Lietuvos ralio čempiono titulas."], ["2010", "Debiutas Dakare."], ["2018", "Pradėjo bendradarbiauti su „Toyota“."], ["2024", "Geriausias lietuvio rezultatas Dakare automobilių klasėje."]],
      bio: [["h2", "Nuo ralio iki dykumos"], ["p", "Vanagas išgarsėjo Lietuvos ralio čempionate, o 2010 m. pirmą kartą išvyko į Dakarą. Nuo tada jis startavo beveik kiekvienais metais."], ["h2", "Komanda"], ["p", "Pastaruosius sezonus jis važiuoja su „Toyota“ technika ir nuolat gerina rezultatus. 2027 m. jis startuos su nauju šturmanu."]],
      trivia: ["Vanagas yra ir aktyvus visuomenininkas, vedantis labdaros projektus.", "Jis yra apvažiavęs Lietuvos sieną per vieną parą."],
    },
    {
      id: "gelazninkas", first: "Arūnas", last: "Gelažninkas", gen: "Arūno Gelažninko", acc: "Arūną Gelažninką", img: "hero-gelaznikas.png",
      disc: "Dakaras, motociklai", series: ["enduro", "dakar"], next: "dakar-27",
      lede: "Lietuvos motociklininkas, ralio reidų ir enduro lenktynininkas, daugkartinis Dakaro finišuotojas motociklų klasėje.",
      facts: [["Gimė", "1977 m., Kaunas"], ["Disciplina", "Ralio reidai, enduro"], ["Komanda", "Privati"], ["Technika", "KTM 450 Rally"], ["Debiutas Dakare", "2013 m."], ["Startų numeris", "54"]],
      stats: { starts: 120, wins: 9, podiums: 27, titles: 5 },
      best: "23 vieta Dakare (2022 m.)",
      titles: [["2019", "Lietuvos enduro čempionas"], ["2017", "Lietuvos enduro čempionas"], ["2015", "Lietuvos enduro čempionas"], ["2012", "Lietuvos enduro čempionas"], ["2010", "Lietuvos enduro čempionas"]],
      seasons: [[2026, "Pasaulio ralio reidų taurė", "Privati", 21, 4, 0, 0], [2025, "Pasaulio ralio reidų taurė", "Privati", 24, 4, 0, 0]],
      raid: [[2019, 41, "Moto"], [2020, 33, "Moto"], [2021, "NF", "Moto"], [2022, 23, "Moto"], [2023, 28, "Moto"], [2024, 26, "Moto"], [2025, 30, "Moto"], [2026, 25, "Moto"]],
      timeline: [["2010", "Pirmasis Lietuvos enduro čempiono titulas."], ["2013", "Debiutas Dakare."], ["2022", "Geriausias rezultatas Dakare."]],
      bio: [["h2", "Enduro šaknys"], ["p", "Gelažninkas daugiau nei dešimtmetį dominavo Lietuvos enduro varžybose, kol nusprendė išbandyti ralio reidus."], ["h2", "Dakaras"], ["p", "Motociklų klasėje jis daugiausiai važiuoja be gamyklinės pagalbos, todėl kiekvienas finišas jam yra ir techninis išbandymas."]],
      trivia: ["Gelažninkas pats prižiūri savo motociklą tarp etapų.", "Per vieną Dakarą jis nuvažiuoja daugiau nei 8000 km."],
    },
    {
      id: "karklys", first: "Jonas", last: "Karklys", gen: "Jono Karklio", acc: "Joną Karklį", img: "hero-karklys.png",
      disc: "Žiedinės lenktynės", series: ["batcc"], next: "batcc-pal",
      lede: "Lietuvos žiedinių lenktynių pilotas, Aurum 1006 km prizininkas ir Baltijos turistinių automobilių čempionato dalyvis.",
      facts: [["Gimė", "1996 m., Kaunas"], ["Disciplina", "Žiedinės lenktynės"], ["Komanda", "Karklys Motorsport"], ["Technika", "BMW M2 CS Racing"], ["Debiutas", "2014 m."], ["Startų numeris", "17"]],
      stats: { starts: 96, wins: 14, podiums: 37, titles: 2 },
      best: "2 vieta Aurum 1006 km (2026 m.)",
      titles: [["2023", "Lietuvos žiedinių lenktynių čempionas"], ["2021", "BaTCC klasės čempionas"]],
      seasons: [[2026, "BaTCC", "Karklys Motorsport", 3, 10, 2, 5], [2025, "BaTCC", "Karklys Motorsport", 2, 10, 3, 6], [2024, "BaTCC", "Karklys Motorsport", 4, 10, 1, 3]],
      raid: [],
      timeline: [["2014", "Debiutas žiedinėse lenktynėse."], ["2021", "BaTCC klasės čempionas."], ["2026", "2 vieta Aurum 1006 km."]],
      bio: [["h2", "Kartingas ir žiedas"], ["p", "Karklys karjerą pradėjo kartinge, o 2014 m. persėdo į turistinius automobilius."], ["h2", "Ištvermės lenktynės"], ["p", "Pastaraisiais metais didžiausias jo dėmesys – ištvermės lenktynės. Kitąmet jis planuoja startus Europoje."]],
      trivia: ["Karklys Aurum 1006 km varžybose startavo aštuonis kartus.", "Laisvalaikiu jis treniruoja jaunuosius kartingo pilotus."],
    },
    {
      id: "norkunas", first: "Tauras", last: "Norkūnas", gen: "Tauro Norkūno", acc: "Taurą Norkūną", img: "hero-norkunas.png",
      disc: "Motokrosas", series: ["mx"], next: "mx-final",
      lede: "Lietuvos motokroso lenktynininkas, MX1 klasės prizininkas, šį sezoną grįžęs po sunkios traumos.",
      facts: [["Gimė", "2001 m., Šiauliai"], ["Disciplina", "Motokrosas"], ["Komanda", "Norkūnas MX"], ["Technika", "Husqvarna FC 450"], ["Debiutas", "2015 m."], ["Startų numeris", "77"]],
      stats: { starts: 142, wins: 21, podiums: 55, titles: 2 },
      best: "Lietuvos čempionas MX1 (2024 m.)",
      titles: [["2024", "Lietuvos motokroso čempionas, MX1"], ["2019", "Lietuvos motokroso čempionas, MX2"]],
      seasons: [[2026, "Lietuvos motokroso čempionatas", "Norkūnas MX", 3, 12, 3, 6], [2025, "Lietuvos motokroso čempionatas", "Norkūnas MX", 2, 14, 4, 9], [2024, "Lietuvos motokroso čempionatas", "Norkūnas MX", 1, 14, 7, 11]],
      raid: [],
      timeline: [["2015", "Pirmieji startai jaunių klasėje."], ["2019", "Lietuvos čempionas MX2 klasėje."], ["2024", "Lietuvos čempionas MX1 klasėje."], ["2026", "Grįžimas po traumos."]],
      bio: [["h2", "Jaunystė"], ["p", "Norkūnas motokrosu pradėjo važinėti būdamas aštuonerių. Jaunių klasėse jis kelis kartus tapo Lietuvos prizininku."], ["h2", "Trauma ir grįžimas"], ["p", "2026 m. pavasarį jis patyrė rankos traumą, tačiau į trasą grįžo per dešimt savaičių ir vėl kovoja dėl medalių."]],
      trivia: ["Norkūnas treniruojasi ir Belgijos smėlio trasose.", "Jo startų numeris 77 – tėvo numeris."],
    },
  ];
  const ATHLETE_ARTICLES = {
    zala: ["zala-elektrenai", "zala-titulo-matematika", "zala-interviu", "elektrenai-ruozai", "zala-rokiskis", "zala-dakaras-2027"],
    baciuska: ["baciuska-kaina", "baciuska-testai", "baciuska-marokas"],
    vanagas: ["vanagas-komanda", "vanagas-sturmanas", "vanagas-patirtis"],
    gelazninkas: ["gelazninkas-marokas", "gelazninkas-tikslas"],
    karklys: ["karklys-aurum", "karklys-planai"],
    norkunas: ["norkunas-finalas", "norkunas-sezonas", "norkunas-grizimas"],
  };
  ATHLETES.forEach((p) => {
    p.name = `${p.first} ${p.last}`;
    p.articles = ATHLETE_ARTICLES[p.id].map((id) => byId[id]);
    p.articles.forEach((a) => (a.athlete ||= p.id));
    p.top = LT_TOP.findIndex((t) => t.id === p.id) + 1 || null;
    if (p.standing) {
      const st = STANDINGS[p.standing.series];
      const d = st.drivers.find((x) => x.name === p.standing.name);
      p.current = { st, d };
      const row = p.seasons.find((s) => s[0] === 2026);
      Object.assign(row, { 3: d.pos, 4: st.done, 5: d.wins, 6: d.podiums });
    }
  });
  const athleteById = Object.fromEntries(ATHLETES.map((p) => [p.id, p]));

  /* Open trackdays / participatory events — anyone can join */
  const TRACKDAY_TYPES = {
    trackday: { name: "Trackday", color: "#111111" },
    karting: { name: "Kartingas", color: "#15803d" },
    drift: { name: "Driftas", color: "#be123c" },
    rally: { name: "Ralio mokykla", color: "#b45309" },
    moto: { name: "Moto", color: "#6d28d9" },
    experience: { name: "Patirtis", color: "#0369a1" },
  };
  const TRACKDAYS = [
    { id: "td-nemunas-nov", type: "trackday", name: "Nemuno žiedo trackday", place: "Kačerginė", region: "Kaunas",
      start: "2026-11-08", end: "2026-11-08", time: "09:00–17:00", price: "nuo 149 €", level: "Pradedantiesiems",
      spots: 18, vehicle: "Gatvės automobilis", org: "Nemuno žiedas",
      blurb: "Atvira diena gatvės ir track automobiliais. Instruktažas, sesijos pagal greitį, pradedantieji laukiami." },
    { id: "td-vilnius-kart", type: "karting", name: "Vilniaus kartodromo atvira sesija", place: "Vilnius", region: "Vilnius",
      start: "2026-11-01", end: "2026-11-01", time: "10:00–14:00", price: "nuo 29 €", level: "Visiems",
      spots: 40, vehicle: "Nuomojami kartai", org: "Vilniaus kartodromas",
      blurb: "Be patirties – užtenka vairuotojo pažymėjimo ar amžiaus limito. Nuoma, šalmas ir instruktažas įskaičiuoti." },
    { id: "td-palanga-drift", type: "drift", name: "Palangos drift intro diena", place: "Palanga", region: "Klaipėda",
      start: "2026-11-07", end: "2026-11-07", time: "11:00–16:00", price: "nuo 89 €", level: "Pradedantiesiems",
      spots: 12, vehicle: "Nuomojamas drift auto", org: "Lithuanian Drift",
      blurb: "Pirmosios slidės: teorija, instruktorius šalia ir saugūs pratimai tuščioje aikštelėje." },
    { id: "td-elektrenai-rally", type: "rally", name: "LARČ ralio mokykla: greičio ruožas", place: "Elektrėnai", region: "Vilnius",
      start: "2026-11-15", end: "2026-11-15", time: "08:30–15:00", price: "nuo 199 €", level: "Pradedantiesiems",
      spots: 8, vehicle: "Savo auto arba nuoma", org: "LARČ akademija",
      blurb: "Vienos dienos įvadas į ralį: navigacija, stabdymas žvyre ir važiavimas su instruktoriumi." },
    { id: "td-siauliai-moto", type: "moto", name: "Šiaulių aero uosto moto diena", place: "Šiauliai", region: "Šiauliai",
      start: "2026-11-14", end: "2026-11-14", time: "10:00–16:00", price: "nuo 69 €", level: "Visiems",
      spots: 24, vehicle: "Motociklas A/A2", org: "Moto Lietuva",
      blurb: "Uždaras perimetras, grupės pagal greitį. Tinka tiek pirmam kartui, tiek rytmui palaikyti." },
    { id: "td-baga-experience", type: "experience", name: "Bolido patirtis: Porsche GT3 RS", place: "Kačerginė", region: "Kaunas",
      start: "2026-11-22", end: "2026-11-22", time: "12:00–15:00", price: "nuo 249 €", level: "Visiems",
      spots: 6, vehicle: "Su instruktoriumi", org: "Drive Experience",
      blurb: "Keleivio arba vairuotojo vietos – jūs pasirenkate. Jokios varžybų licencijos nereikia." },
    { id: "td-panevezys-kart", type: "karting", name: "Panevėžio naktinis kartingas", place: "Panevėžys", region: "Panevėžys",
      start: "2026-11-21", end: "2026-11-21", time: "18:00–22:00", price: "nuo 35 €", level: "Visiems",
      spots: 30, vehicle: "Nuomojami kartai", org: "PK Karting",
      blurb: "Apšviesta trasa, komandiniai važiavimai ir individualūs ratai. Amžius nuo 14 m." },
    { id: "td-autocross-open", type: "trackday", name: "Atviras autocross: Šiaulių etapas", place: "Šiauliai", region: "Šiauliai",
      start: "2026-11-29", end: "2026-11-29", time: "09:00–18:00", price: "nuo 59 €", level: "Pradedantiesiems",
      spots: 22, vehicle: "Gatvės ar sportinis auto", org: "LASF klubas",
      blurb: "Trumpi greičio ruožai, vienas automobilis trasoje. Galima startuoti su įprastu techniniu." },
    { id: "td-winter-prep", type: "experience", name: "Žiemos vairavimo mokykla", place: "Radviliškis", region: "Šiauliai",
      start: "2026-12-05", end: "2026-12-06", time: "10:00–16:00", price: "nuo 179 €", level: "Visiems",
      spots: 16, vehicle: "Savo auto", org: "Saugus vairavimas LT",
      blurb: "Dvi dienos ant ledo ir sniego: stabdymas, išsisukimas, elektronikos ribos. Šeimos ir pradedantieji." },
    { id: "td-klaipeda-drift", type: "drift", name: "Klaipėdos uosto drift sesija", place: "Klaipėda", region: "Klaipėda",
      start: "2026-12-12", end: "2026-12-12", time: "12:00–17:00", price: "nuo 99 €", level: "Vidutinis",
      spots: 10, vehicle: "Savo ar nuoma", org: "West Drift",
      blurb: "Tiems, kurie jau bandė intro – ilgesnės sesijos ir greitesnė aikštelė su teisėjais." },
  ];

  /* Lithuanian motorsport podcasts / creators */
  const PODCASTS = [
    { id: "greicio-ruozas", show: "Greičio ruožas", host: "Tomas Rėksnys", img: "hero-zala.png",
      topic: "Ralis ir Dakaras", ep: "Elektrėnai: kaip Žala laimės titulą", dur: "42 min.", platform: "Spotify" },
    { id: "bolidas-kava", show: "Bolidas ir kava", host: "Justina Petraitytė", img: "jos-verstappen.png",
      topic: "Formulė 1", ep: "Meksika: kodėl aukštis viską keičia", dur: "38 min.", platform: "YouTube" },
    { id: "zvyro-podcast", show: "Žvyro podcastas", host: "Evaldas Vaitkus", img: "hero-baciuska.png",
      topic: "WRC ir LARČ", ep: "Centrinė Europa: asfaltas, kuris meluoja", dur: "51 min.", platform: "Apple" },
    { id: "moto-garazas", show: "Moto garažas", host: "Karolis Juška", img: "hero-gelaznikas.png",
      topic: "MotoGP ir enduro", ep: "Phillip Island: vėjas prieš greitį", dur: "35 min.", platform: "Spotify" },
    { id: "po-finišo", show: "Po finišo", host: "Greta Kazlauskaitė", img: "hero-vanagas.png",
      topic: "Lietuvos motorsportas", ep: "Vanagas: nauja komanda, seni tikslai", dur: "47 min.", platform: "YouTube" },
    { id: "startas-lt", show: "Startas LT", host: "Mantas Dambrauskas", img: "hero-karklys.png",
      topic: "Žiedas ir trackday", ep: "Kaip pirmą kartą išvažiuoti į žiedą", dur: "29 min.", platform: "Spotify" },
  ];

  window.GAZAS = { DEMO_NOW, now, SERIES, LT_HOME, AUTHORS, ARTICLES, byId, articleBody, TRACKS, EVENTS, eventById, STANDINGS, LT_TOP, ATHLETES, athleteById, TRACKDAY_TYPES, TRACKDAYS, PODCASTS };
})();
