// ===== Kumpulan ikon SVG yang dipakai di seluruh aplikasi =====

(function () {
  var F = function (t, s) {
    return (
      '<path d="M6 3.5a1 1 0 0 1 1-1h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z"/><path d="M14 2.5v5h5"/><text class="t" x="12.5" y="18"' +
      (s ? ' style="font-size:' + s + 'px"' : "") +
      ">" +
      t +
      "</text>"
    );
  };
  var D = function (x, y) {
    return '<circle class="f" cx="' + x + '" cy="' + y + '" r="1"/>';
  };
  var G = {
    bolt: '<path class="a" d="M13 2 4 14h6l-1 8 9-12h-6z"/>',
    cup: '<path class="a" d="M5 9h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 3c-1 1 1 2 0 3M12 3c-1 1 1 2 0 3"/>',
    stopwatch:
      '<circle class="a" cx="12" cy="14" r="7.5"/><path d="M12 14v-4M9.5 2.5h5M12 2.5v4M18.5 7l1.5-1.5"/>',
    heart:
      '<path class="f" d="M12 21C4 15 2.5 11.5 2.5 8.5A5 5 0 0 1 12 6a5 5 0 0 1 9.5 2.5C21.5 11.5 20 15 12 21z"/>',
    books:
      '<rect class="a" x="2.5" y="4" width="5" height="16" rx="1.5"/><rect x="9" y="4" width="5" height="16" rx="1.5"/><path d="m15.5 6.5 4-1 3 13-4 1z"/>',
    people:
      '<circle class="a" cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6z"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c2.7 0 4.5 1.8 4.5 4.5"/>',
    trophy:
      '<path class="a" d="M7 3h10v6a5 5 0 0 1-10 0z"/><path d="M7 5H3.5c0 3 1.5 4.5 3.6 4.8M17 5h3.5c0 3-1.5 4.5-3.6 4.8M12 14v4M8 21h8M9 18h6"/>',
    gamepad:
      '<rect class="a" x="2.5" y="7" width="19" height="11" rx="5.5"/><path d="M7.5 10.5v4M5.5 12.5h4"/>' +
      D(15.5, 11.5) +
      D(18, 13.5),
    key: '<circle class="a" cx="8" cy="15" r="4.5"/><path d="m11.5 11.5 9-9M17 6l3 3M14.5 8.5l2 2"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    chevron: '<path d="m9 5 7 7-7 7"/>',
    upload:
      '<path class="a" d="M7 17a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 9.5a4 4 0 0 1-.5 7.5z"/><path d="M12 20v-9m-3 3 3-3 3 3"/>',
    clipboard:
      '<rect class="a" x="5" y="4.5" width="14" height="17" rx="2.5"/><rect class="f" x="8.5" y="2.5" width="7" height="4" rx="1.5"/><path d="M9 12h6M9 16h4"/>',
    sparkles:
      '<path class="a" d="m10 3 1.8 5.2L17 10l-5.2 1.8L10 17l-1.8-5.2L3 10l5.2-1.8z"/><path d="m18 14 .9 2.600 2.600.9-2.600.9L18 21l-.9-2.600-2.600-.9 2.600-.9z"/>',
    download:
      '<path d="M12 3v12m-4-4 4 4 4-4"/><rect class="a" x="4" y="17" width="16" height="4" rx="1.5"/>',
    fW: F("W"),
    fP: F("P"),
    fX: F("X"),
    fPDF: F("PDF", 4.6),
    fCSV: F("CSV", 5),
    fJSON: F("{}"),
    link: '<path d="M10 14a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1 1M14 10a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1-1"/>',
    tag: '<path class="a" d="M3.5 3.5H12l8.500 8.500-8.500 8.500L3.5 12z"/><circle class="f" cx="8" cy="8" r="1.5"/>',
    plus: '<circle class="a" cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11"/>' + D(4.5, 6) + D(4.5, 12) + D(4.5, 18),
    trash:
      '<path class="a" d="M6 8h12l-1 12.500a1.500 1.500 0 0 1-1.500 1.400h-7A1.500 1.500 0 0 1 7 20.500z"/><path d="M4 8h16M9 8V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/>',
    image:
      '<rect class="a" x="3" y="4" width="18" height="16" rx="3"/><circle class="f" cx="9" cy="10" r="1.600"/><path d="m4 18 5-5 4 4 3-3 4 4"/>',
    pencil:
      '<path class="a" d="m4 20 1-4.500L16.500 4a2 2 0 0 1 3 0l.5.5a2 2 0 0 1 0 3L8.500 19z"/><path d="m14.500 6 3.500 3.500"/>',
    x: '<path d="m6 6 12 12M18 6 6 18"/>',
    play: '<path class="a" d="M7 4.500v15a1 1 0 0 0 1.500.9l12-7.500a1 1 0 0 0 0-1.700l-12-7.500A1 1 0 0 0 7 4.500z"/>',
    shuffle:
      '<path d="M3 7h3.500c5 0 6 10 11 10H21M3 17h3.500c1.500 0 2.700-.8 3.700-2M13.800 9c1-1.300 2.300-2 3.700-2H21M18.500 4 21 7l-2.500 3M18.500 14l2.500 3-2.500 3"/>',
    grid: '<rect class="a" x="3.500" y="3.500" width="7" height="7" rx="2"/><rect x="13.500" y="3.500" width="7" height="7" rx="2"/><rect x="3.500" y="13.500" width="7" height="7" rx="2"/><rect x="13.500" y="13.500" width="7" height="7" rx="2"/>',
    flower:
      '<circle class="a" cx="12" cy="6.500" r="3.200"/><circle class="a" cx="17.200" cy="10.300" r="3.200"/><circle class="a" cx="15.200" cy="16.500" r="3.200"/><circle class="a" cx="8.800" cy="16.500" r="3.200"/><circle class="a" cx="6.800" cy="10.300" r="3.200"/><circle class="f" cx="12" cy="12" r="2.200"/>',
    flame:
      '<path class="a" d="M12 22c-4 0-7-2.800-7-6.800 0-3 2-5 3.500-7 .5 2 1.500 2.800 2.500 3 0-3.500 1.500-6 3.500-8.200C15.500 6 19 9.500 19 15.200 19 19.200 16 22 12 22z"/><path d="M12 22c-1.800 0-3-1.200-3-3 0-1.500 1.500-2.500 3-4 1.500 1.500 3 2.500 3 4 0 1.800-1.200 3-3 3z"/>',
    gem: '<path class="a" d="M6.500 4h11l4 5-9.500 11.500L2.500 9z"/><path d="M2.500 9h19M9.500 4 8 9l4 11.500M14.500 4 16 9l-4 11.500"/>',
    star: '<path class="a" d="m12 2.800 2.800 5.800 6.300.9-4.600 4.400 1.100 6.300L12 17.200l-5.600 3 1.100-6.300L2.900 9.500l6.300-.9z"/>',
    check: '<circle class="a" cx="12" cy="12" r="9.500"/><path d="m7.500 12.200 3 3 6-6.200"/>',
    chat: '<path class="a" d="M4 5.500A2.500 2.500 0 0 1 6.500 3h11A2.500 2.500 0 0 1 20 5.500v8a2.500 2.500 0 0 1-2.500 2.500H11l-5 4.500V16h-.5A1.500 1.500 0 0 1 4 14.500z"/><path d="M8.500 8.500h7M8.500 11.500h4"/>',
    send: '<path class="a" d="M21 3 3 10.500l7 2.500 2.500 7z"/><path d="m10 13 11-10"/>',
    bulb: '<path class="a" d="M12 2.500a6.500 6.500 0 0 0-3.500 12V17h7v-2.500A6.500 6.500 0 0 0 12 2.500z"/><path d="M9.500 20h5M10.500 22.500h3"/>',
    hourglass:
      '<path class="a" d="M6.500 3h11v3.500L13 12l4.500 5.500V21h-11v-3.500L11 12 6.500 6.500z"/><path d="M5 3h14M5 21h14"/>',
    scissors:
      '<circle class="a" cx="6" cy="6.500" r="3"/><circle class="a" cx="6" cy="17.500" r="3"/><path d="m8.500 8 12 9.500M8.500 16l12-9.500"/>',
    skip: '<path class="a" d="M4 5.500v13l9-6.500z"/><path d="M17.500 5v14"/>',
    bookmark: '<path d="M6.500 3.500h11V21L12 16.500 6.500 21z"/>',
    bookmarkF: '<path class="a" d="M6.500 3.500h11V21L12 16.500 6.500 21z"/>',
    arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    repeat: '<path d="M20 12a8 8 0 0 1-14 5.300M4 12A8 8 0 0 1 18 6.700M18 3v4h-4M6 21v-4h4"/>',
    printer:
      '<rect x="7" y="3" width="10" height="6" rx="1"/><rect class="a" x="3" y="9" width="18" height="8" rx="2.500"/><rect x="7" y="14" width="10" height="7" rx="1"/>',
    undo: '<path d="M4 12a8 8 0 1 1 2.300 5.700M4 5v6h6"/>',
    cap: '<path class="a" d="m12 4 10 5-10 5L2 9z"/><path d="M6 11.500V16c0 1.500 2.700 3 6 3s6-1.500 6-3v-4.500M22 9v6"/>',
    speaker:
      '<path class="a" d="M4 9.500h3.500L12 5.500v13l-4.500-4H4z"/><path d="M15.500 9a4 4 0 0 1 0 6M18 6.500a8 8 0 0 1 0 11"/>',
    mute: '<path class="a" d="M4 9.500h3.500L12 5.500v13l-4.500-4H4z"/><path d="m16 9.500 5 5M21 9.500l-5 5"/>',
    flag: '<path d="M5 22V3"/><path class="a" d="M5 4h12l-2.500 4.500L17 13H5z"/>',
    shield:
      '<path class="a" d="M12 2.500 4 5.500V12c0 5 3.500 8.500 8 9.500 4.500-1 8-4.500 8-9.500V5.500z"/><path d="m8.500 12 2.500 2.500 4.500-5"/>',
    warning: '<path class="a" d="M12 3 22 20.500H2z"/><path d="M12 10v4.500M12 17.500v.1"/>',
    calculator:
      '<rect class="a" x="4.500" y="2.500" width="15" height="19" rx="3"/><rect x="7.500" y="5.500" width="9" height="4" rx="1"/>' +
      D(8.5, 14) +
      D(12, 14) +
      D(15.5, 14) +
      D(8.5, 18) +
      D(12, 18) +
      D(15.5, 18),
    atom: '<circle class="a" cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
    flask:
      '<path class="a" d="M9.500 3h5M10 3v6.500L4.500 19a2 2 0 0 0 1.800 3h11.400a2 2 0 0 0 1.800-3L14 9.500V3"/><path d="M7.500 15h9"/>',
    dna: '<path d="M7 3c0 7 10 7 10 18M17 3c0 7-10 7-10 18"/><path class="sa" d="M8.500 7.500h7M8.500 16.500h7M10 12h4"/>',
    coin: '<circle class="a" cx="12" cy="12" r="9.500"/><path d="M14.500 8.800c-.6-.8-1.500-1.200-2.600-1.200-1.500 0-2.500.8-2.500 2s1 1.700 2.600 2.100 2.600.9 2.600 2.100-1 2-2.600 2c-1.200 0-2.100-.5-2.700-1.300M12 6v1.600M12 16.400V18"/>',
    book: '<path class="a" d="M12 6.500C10 4.800 6.500 4 3 4.500v14c3.500-.5 7 .3 9 2 2-1.700 5.500-2.500 9-2v-14c-3.500-.5-7 .3-9 2z"/><path d="M12 6.500v14"/>',
    translate:
      '<path d="M3 5h10M8 3v2M5 5c.5 4 3 7 6.500 8.500M11 5c-.5 3.500-3 7-7 9M12.500 21l4.500-10.500 4.500 10.500"/><path class="sa" d="M14.200 17h5.600"/>',
    chip: '<rect class="a" x="6" y="6" width="12" height="12" rx="2.500"/><rect x="9.500" y="9.500" width="5" height="5" rx="1"/><path d="M9 2.500V6M15 2.500V6M9 18v3.500M15 18v3.500M2.500 9H6M2.500 15H6M18 9h3.500M18 15h3.500"/>',
    globe:
      '<circle class="a" cx="12" cy="12" r="9.500"/><path d="M2.500 12h19M12 2.500c3 3 3 16.500 0 19M12 2.500c-3 3-3 16.500 0 19"/>',
    puzzle:
      '<path class="a" d="M4 9h3.500a2.500 2.500 0 1 1 5 0H16v3.500a2.500 2.500 0 1 1 0 5V21H4z"/><path d="M16 9h4v12h-4"/>',
    journal:
      '<rect class="a" x="5" y="3" width="14" height="18" rx="2.500"/><path d="M9 3v18M12 8h4"/>',
    temple:
      '<path class="a" d="m3 9.500 9-5.500 9 5.500z"/><path d="M5.500 12v6.500M10 12v6.500M14 12v6.500M18.500 12v6.500M3 21h18M4 18.500h16"/>',
    dot: '<circle class="a" cx="12" cy="12" r="5"/>',
  };
  var AL = {
    "lightning-charge-fill": "bolt",
    "cup-hot": "cup",
    "cup-hot-fill": "cup",
    "stopwatch-fill": "stopwatch",
    "heart-fill": "heart",
    collection: "books",
    "collection-fill": "books",
    "people-fill": "people",
    "trophy-fill": "trophy",
    trophy: "trophy",
    controller: "gamepad",
    list: "menu",
    "chevron-right": "chevron",
    "file-earmark-arrow-up": "upload",
    "cloud-arrow-up": "upload",
    "box-arrow-up": "upload",
    stars: "sparkles",
    magic: "sparkles",
    "box-arrow-in-down": "download",
    "file-earmark-word": "fW",
    "file-earmark-slides": "fP",
    "file-earmark-pdf": "fPDF",
    "file-earmark-excel": "fX",
    "filetype-csv": "fCSV",
    "filetype-json": "fJSON",
    "box-arrow-up-right": "link",
    tags: "tag",
    "plus-circle": "plus",
    "plus-lg": "plus",
    "list-ul": "list",
    "x-lg": "x",
    "play-fill": "play",
    flower1: "flower",
    fire: "flame",
    "star-fill": "star",
    "check2-circle": "check",
    "check-circle": "check",
    whatsapp: "chat",
    lightbulb: "bulb",
    "hourglass-split": "hourglass",
    "skip-forward-fill": "skip",
    "bookmark-fill": "bookmarkF",
    "arrow-right": "arrow",
    "arrow-repeat": "repeat",
    "arrow-counterclockwise": "undo",
    "mortarboard-fill": "cap",
    "volume-up-fill": "speaker",
    "volume-mute-fill": "mute",
    "flag-fill": "flag",
    "shield-fill-check": "shield",
    "exclamation-triangle": "warning",
    "calculator-fill": "calculator",
    "cash-coin": "coin",
    "book-fill": "book",
    "cpu-fill": "chip",
    "globe-asia-australia": "globe",
    "puzzle-fill": "puzzle",
    "journal-bookmark-fill": "journal",
  };
  var MP = {
    "rocket-takeoff-fill": "atom",
    "droplet-half": "flask",
    flower2: "dna",
    "hourglass-split": "temple",
  };
  function svg(k) {
    return (
      '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      G[k] +
      "</svg>"
    );
  }
  function conv(el) {
    if (el.dataset.ic) return;
    var c = [].slice.call(el.classList).filter(function (x) {
      return x.indexOf("bi-") === 0;
    })[0];
    if (!c) return;
    var n = c.slice(3);
    if (el.closest("#mapelChips,#mpManage") && MP[n]) n = MP[n];
    var k = AL[n] || (G[n] ? n : "dot");
    el.dataset.ic = 1;
    el.innerHTML = svg(k);
  }
  function scan(r) {
    if (r.matches && r.matches("i.bi")) conv(r);
    if (r.querySelectorAll) r.querySelectorAll("i.bi").forEach(conv);
  }
  scan(document);
  new MutationObserver(function (ms) {
    ms.forEach(function (m) {
      m.addedNodes.forEach(function (n) {
        if (n.nodeType === 1) scan(n);
      });
    });
  }).observe(document.body, { childList: true, subtree: true });
})();