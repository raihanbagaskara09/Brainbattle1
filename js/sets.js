// ===== Set soal buatan guru: simpan di localStorage, impor teks/HTML, editor, dan kode bagikan =====

(function () {
  var $ = function (i) {
    return document.getElementById(i);
  };
  // Mengamankan karakter khusus HTML
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  // Menampilkan pesan singkat
  function toast(t) {
    if (window.bbToast) window.bbToast(t);
  }
  // Berpindah tampilan
  function view(v) {
    window.bbView(v);
  }
  var KEY = "bb_sets_v1",
    sets = [],
    mem = null;
  // Memuat set soal dari localStorage
  function load() {
    try {
      sets = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (!Array.isArray(sets)) sets = [];
    } catch (e) {
      sets = mem || [];
    }
  }
  // Menyimpan set soal ke localStorage
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(sets));
    } catch (e) {
      mem = sets;
    }
  }
  // Membuat ID unik untuk set
  function uid() {
    return "s" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }
  load();
  window.bbSets = function () {
    return sets;
  };
  var SUPM = {
    0: "⁰",
    1: "¹",
    2: "²",
    3: "³",
    4: "⁴",
    5: "⁵",
    6: "⁶",
    7: "⁷",
    8: "⁸",
    9: "⁹",
    "+": "⁺",
    "-": "⁻",
    "−": "⁻",
    "=": "⁼",
    "(": "⁽",
    ")": "⁾",
    n: "ⁿ",
    i: "ⁱ",
  };
  var SUBM = {
    0: "₀",
    1: "₁",
    2: "₂",
    3: "₃",
    4: "₄",
    5: "₅",
    6: "₆",
    7: "₇",
    8: "₈",
    9: "₉",
    "+": "₊",
    "-": "₋",
    "−": "₋",
    "=": "₌",
    "(": "₍",
    ")": "₎",
  };
  function mapAll(s, m, fb) {
    var o = "";
    for (var i = 0; i < s.length; i++) {
      var c = s.charAt(i);
      if (m[c]) o += m[c];
      else return fb(s);
    }
    return o;
  }
  function htmlToLines(html) {
    var doc = new DOMParser().parseFromString("<!doctype html><body>" + html, "text/html"),
      out = [],
      gid = 0,
      gm = new Map(),
      imgs = 0;
    function lineSet(el) {
      var L = [{ t: "", b: 0, n: 0 }];
      function cur() {
        return L[L.length - 1];
      }
      function nl() {
        if (cur().t.trim() !== "") L.push({ t: "", b: 0, n: 0 });
      }
      function add(s, bold) {
        cur().t += s;
        var k = s.replace(/\s/g, "").length;
        cur().n += k;
        if (bold) cur().b += k;
      }
      function rec(node, bold) {
        [].forEach.call(node.childNodes, function (c) {
          if (c.nodeType === 3) {
            add(c.nodeValue.replace(/\s+/g, " "), bold);
            return;
          }
          if (c.nodeType !== 1) return;
          var tg = c.tagName.toLowerCase();
          if (tg === "br") nl();
          else if (tg === "ol" || tg === "ul") return;
          else if (tg === "img") imgs++;
          else if (tg === "sup")
            add(
              mapAll(c.textContent, SUPM, function (s) {
                return "^(" + s + ")";
              }),
              bold,
            );
          else if (tg === "sub")
            add(
              mapAll(c.textContent, SUBM, function (s) {
                return "_(" + s + ")";
              }),
              bold,
            );
          else if (tg === "p" || tg === "div") {
            nl();
            rec(c, bold);
            nl();
          } else rec(c, bold || tg === "strong" || tg === "b");
        });
      }
      rec(el, false);
      return L.filter(function (x) {
        return x.t.trim() !== "";
      });
    }
    function item(el, listEl) {
      var ls = lineSet(el),
        nested = [].filter.call(el.children, function (c) {
          return /^(ol|ul)$/i.test(c.tagName);
        });
      ls.forEach(function (x, k) {
        var r = {
          t: x.t.replace(/\s+/g, " ").trim(),
          bold: x.n > 0 && x.b / x.n >= 0.6,
          g: null,
          hl: false,
        };
        if (listEl && k === 0) {
          if (!gm.has(listEl)) gm.set(listEl, ++gid);
          r.g = gm.get(listEl);
          r.hl = nested.length > 0;
        }
        out.push(r);
      });
      nested.forEach(walkList);
    }
    function walkList(l) {
      [].forEach.call(l.children, function (li) {
        if (li.tagName.toLowerCase() === "li")
          item(li, l.tagName.toLowerCase() === "ol" ? l : null);
      });
    }
    function walk(node) {
      [].forEach.call(node.children, function (n) {
        var tg = n.tagName.toLowerCase();
        if (tg === "ol" || tg === "ul") walkList(n);
        else if (/^(p|h[1-6])$/.test(tg)) item(n, null);
        else if (/^(div|table|tbody|thead|tr|td|th|section|blockquote)$/.test(tg)) walk(n);
      });
    }
    walk(doc.body);
    return { lines: out, imgs: imgs };
  }
  function normalize(L) {
    var gs = {},
      qn = 0,
      pos = {};
    L.forEach(function (x) {
      if (x.g != null) {
        var G = (gs[x.g] = gs[x.g] || { n: 0, hl: false });
        G.n++;
        if (x.hl) G.hl = true;
      }
    });
    return L.map(function (x) {
      if (x.g == null) return x;
      var G = gs[x.g],
        isQ = G.hl || G.n === 1 || G.n >= 7;
      if (isQ) {
        qn++;
        if (!/^\s*\d{1,3}\s*[.)](\s|$)/.test(x.t)) x.t = qn + ". " + x.t;
      } else {
        var k = (pos[x.g] = pos[x.g] || 0);
        pos[x.g]++;
        if (k < 5 && !/^\s*\(?[A-Ea-e][.)]\s/.test(x.t)) x.t = "ABCDE".charAt(k) + ". " + x.t;
      }
      return x;
    });
  }
  var RXQ = /^\s*(\d{1,3})\s*[.)](?:\s+|$)(.*)$/;
  var RXO = /^\s*\(?([A-Ea-e])[.)]\s+(.*)$/;
  var RXANS =
    /^\s*(?:kunci\s+jawaban|jawaban|kunci|jwb|answer|ans)(?:\s+(?:yang\s+)?(?:benar|tepat))?\s*[:=\-–]?\s*\(?([A-Ea-e])\)?(?=[\s.)]|$)/i;
  var RXKEY = /^\s*(?:kunci\s+jawaban|kunci|daftar\s+jawaban|lembar\s+jawaban)\b/i;
  var RXEXPL = /^\s*(?:pembahasan|penjelasan|alasan|solusi|explanation)\s*[:：]\s*(.*)$/i;
  var RXLVL = /^\s*(?:level|tingkat|kesulitan)\s*[:：]\s*(mudah|sedang|sulit)/i;
  function expand(L) {
    var o = [];
    L.forEach(function (x) {
      if (RXO.test(x.t)) {
        var p = x.t.split(/\s+(?=\(?[A-Ea-e][.)]\s)/);
        if (
          p.length > 1 &&
          p.every(function (s) {
            return RXO.test(s);
          })
        ) {
          p.forEach(function (s) {
            o.push({ t: s, bold: x.bold, g: null });
          });
          return;
        }
      }
      o.push(x);
    });
    return o;
  }
  // Membaca baris teks menjadi daftar soal
  function parseLines(L) {
    L = expand(L);
    var key = {},
      ki = -1,
      i,
      m;
    for (i = 0; i < L.length; i++) {
      if (RXKEY.test(L[i].t) && !RXANS.test(L[i].t)) {
        ki = i;
        break;
      }
    }
    if (ki >= 0) {
      var kt = L.slice(ki)
          .map(function (x) {
            return x.t;
          })
          .join(" ")
          .replace(RXKEY, ""),
        rg = /(\d{1,3})\s*[.\-–:)=]*\s*([A-Ea-e])(?![A-Za-z])/g,
        any = false;
      while ((m = rg.exec(kt))) {
        key[+m[1]] = "ABCDE".indexOf(m[2].toUpperCase());
        any = true;
      }
      if (!any) {
        L.slice(ki + 1)
          .map(function (x) {
            return x.t.trim();
          })
          .filter(function (t) {
            return /^[A-Ea-e]$/.test(t);
          })
          .forEach(function (c, j) {
            key[j + 1] = "ABCDE".indexOf(c.toUpperCase());
          });
      }
      L = L.slice(0, ki);
    }
    var qs = [],
      cur = null,
      md = "";
    function push() {
      if (cur) qs.push(cur);
      cur = null;
    }
    L.forEach(function (x) {
      var t = x.t,
        m;
      if (!t) return;
      if (cur && (m = t.match(RXANS))) {
        cur.ans = "ABCDE".indexOf(m[1].toUpperCase());
        md = "a";
        return;
      }
      if (cur && (m = t.match(RXEXPL))) {
        cur.e = m[1];
        md = "e";
        return;
      }
      if (cur && (m = t.match(RXLVL))) {
        cur.lv = m[1].charAt(0).toUpperCase() + m[1].slice(1).toLowerCase();
        return;
      }
      if (cur && (md === "q" || md === "o") && (m = t.match(RXO))) {
        cur.o.push({ t: m[2], b: x.bold });
        md = "o";
        return;
      }
      if ((m = t.match(RXQ))) {
        push();
        cur = { n: +m[1], q: m[2], o: [], ans: -1, e: "", lv: "" };
        md = "q";
        return;
      }
      if (md === "e" && cur) {
        cur.e += (cur.e ? " " : "") + t;
        return;
      }
      if (cur && md === "q") {
        cur.q += (cur.q ? " " : "") + t;
        return;
      }
      if (cur && md === "o" && cur.o.length < 2) {
        cur.o[cur.o.length - 1].t += " " + t;
        return;
      }
      push();
      cur = { n: 0, q: t, o: [], ans: -1, e: "", lv: "" };
      md = "q";
    });
    push();
    var out = [],
      skipped = 0;
    qs.forEach(function (c) {
      var o = c.o.slice(0, 5);
      if (!c.q.trim() || o.length < 2) {
        if (c.n > 0 || c.o.length > 0) skipped++;
        return;
      }
      var a = c.ans;
      if (a < 0) {
        var k = key[c.n || out.length + 1];
        if (k != null && k >= 0) a = k;
      }
      if (a < 0) {
        var bi = [];
        o.forEach(function (z, j) {
          if (z.b) bi.push(j);
        });
        if (bi.length === 1 && o.length >= 3) a = bi[0];
      }
      if (a >= o.length) a = -1;
      out.push({
        q: c.q.trim(),
        o: o.map(function (z) {
          return z.t.trim();
        }),
        a: a,
        e: c.e.trim(),
        lv: c.lv,
      });
    });
    return { qs: out, skipped: skipped };
  }
  // Membaca soal dari format HTML
  function parseHtml(html) {
    var r = htmlToLines(html),
      p = parseLines(normalize(r.lines));
    p.imgs = r.imgs;
    return p;
  }
  // Membaca soal dari teks biasa
  function parseText(str) {
    var L = String(str || "")
      .split(/\r?\n/)
      .map(function (t) {
        return { t: t.replace(/\s+/g, " ").trim(), g: null, bold: false };
      })
      .filter(function (x) {
        return x.t;
      });
    var p = parseLines(L);
    p.imgs = 0;
    return p;
  }
  window.bbParser = { text: parseText };
  function b64u(b) {
    var s = "";
    for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function unb64u(s) {
    s = s.replace(/-/g, "+").replace(/_/g, "/");
    while (s.length % 4) s += "=";
    var b = atob(s),
      a = new Uint8Array(b.length);
    for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i);
    return a;
  }
  async function pack(set) {
    var json = JSON.stringify({
      v: 1,
      n: set.name,
      t: set.timed ? set.secs : 0,
      x: set.shufO ? 1 : 0,
      q: set.qs.map(function (q) {
        return [q[0], q[1], q[2], q[5] || "", q[4] || ""];
      }),
    });
    var bytes = new TextEncoder().encode(json);
    if (window.CompressionStream) {
      var buf = await new Response(
        new Blob([bytes]).stream().pipeThrough(new CompressionStream("deflate-raw")),
      ).arrayBuffer();
      return "1" + b64u(new Uint8Array(buf));
    }
    return "0" + b64u(bytes);
  }
  async function unpack(code) {
    code = String(code || "").trim();
    var m = code.match(/paket=([A-Za-z0-9_\-]+)/);
    if (m) code = m[1];
    if (code.length > 200000 || !/^[01][A-Za-z0-9_\-]+$/.test(code)) throw new Error("kode");
    var bytes = unb64u(code.slice(1));
    if (code.charAt(0) === "1")
      bytes = new Uint8Array(
        await new Response(
          new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw")),
        ).arrayBuffer(),
      );
    if (bytes.length > 3000000) throw new Error("besar");
    return JSON.parse(new TextDecoder().decode(bytes));
  }
  function cleanQs(arr, name) {
    var out = [];
    (Array.isArray(arr) ? arr : []).slice(0, 300).forEach(function (x) {
      if (!Array.isArray(x) || !Array.isArray(x[1])) return;
      var t = String(x[0] == null ? "" : x[0])
          .trim()
          .slice(0, 1500),
        o = [],
        a = -1;
      x[1].slice(0, 5).forEach(function (s, j) {
        s = String(s == null ? "" : s)
          .trim()
          .slice(0, 500);
        if (s) {
          if (+x[2] === j) a = o.length;
          o.push(s);
        }
      });
      if (!t || o.length < 2 || a < 0) return;
      out.push([
        t,
        o,
        a,
        name,
        String(x[4] || "Latihan").slice(0, 20),
        String(x[3] || "")
          .trim()
          .slice(0, 800),
      ]);
    });
    return out;
  }
  // Menambahkan set dari kode yang dibagikan
  function addShared(p) {
    if (!p || p.v !== 1) throw new Error("format");
    var name = String(p.n || "Paket tanpa nama").slice(0, 60),
      qs = cleanQs(p.q, name);
    if (!qs.length) throw new Error("kosong");
    var t = +p.t || 0,
      set = {
        id: uid(),
        name: name,
        timed: t > 0,
        secs: t > 0 ? Math.max(5, Math.min(300, t)) : 20,
        shufO: !!p.x,
        qs: qs,
      };
    var sig = JSON.stringify(
        qs.map(function (q) {
          return [q[0], q[1], q[2]];
        }),
      ),
      dup = null;
    sets.forEach(function (s) {
      if (
        !dup &&
        s.name === name &&
        JSON.stringify(
          s.qs.map(function (q) {
            return [q[0], q[1], q[2]];
          }),
        ) === sig
      )
        dup = s;
    });
    if (dup) {
      dup.timed = set.timed;
      dup.secs = set.secs;
      dup.shufO = set.shufO;
      save();
      return { set: dup, dup: true };
    }
    sets.push(set);
    save();
    return { set: set, dup: false };
  }
  // Memakai kode bagikan yang dimasukkan
  function useCode(raw) {
    return unpack(raw)
      .then(function (p) {
        var r = addShared(p);
        openLat();
        toast(
          r.dup
            ? 'Paket "' + r.set.name + '" sudah ada.'
            : 'Paket "' + r.set.name + '" ditambahkan (' + r.set.qs.length + " soal).",
        );
      })
      .catch(function () {
        toast("Tautan atau kode paket tidak valid.");
      });
  }
  function checkHash() {
    var h = location.hash || "";
    if (h.indexOf("#paket=") !== 0) return;
    var code = h.slice(1);
    try {
      history.replaceState(null, "", location.href.split("#")[0]);
    } catch (e) {}
    useCode(code);
  }
  // Membuat kartu untuk satu set soal
  function card(s) {
    return (
      '<div class="bs-card" data-id="' +
      esc(s.id) +
      '"><h3>' +
      esc(s.name) +
      '</h3><div class="bs-meta">' +
      s.qs.length +
      " soal · " +
      (s.timed ? s.secs + " dtk per soal" : "Tanpa waktu") +
      "</div>" +
      '<div class="bs-act"><button class="life" data-a="play"><i class="bi bi-play-fill"></i> Latihan</button><button class="life" data-a="edit"><i class="bi bi-pencil"></i> Edit</button><button class="life" data-a="share"><i class="bi bi-box-arrow-up-right"></i> Bagikan</button><button class="life" data-a="del" aria-label="Hapus paket"><i class="bi bi-trash"></i></button></div>' +
      '<div class="bs-set" style="display:none"></div></div>'
    );
  }
  function renderLat() {
    $("latList").innerHTML = sets.length
      ? sets.map(card).join("")
      : '<p style="color:var(--mu);margin:0 0 14px">Belum ada paket. Tempel soal dari Word atau buat sendiri.</p>';
  }
  function openLat() {
    renderLat();
    view("lat");
  }
  window.bbOpenLat = function () {
    fromGuru = false;
    openLat();
  };
  // Mencari set berdasarkan ID
  function findSet(id) {
    for (var i = 0; i < sets.length; i++) if (sets[i].id === id) return sets[i];
    return null;
  }
  function setupHtml(s) {
    var n = s.qs.length,
      ch = ["Semua (" + n + ")"];
    [5, 10, 20].forEach(function (k) {
      if (k < n) ch.push(String(k));
    });
    return (
      '<div class="lb" style="margin-top:0">Jumlah soal</div><div class="chips bbc" data-g="n">' +
      ch
        .map(function (c, i) {
          return '<button class="chip' + (i ? "" : " on") + '">' + c + "</button>";
        })
        .join("") +
      "</div>" +
      '<div class="lb">Urutan soal</div><div class="chips bbc" data-g="o"><button class="chip on">Diacak</button><button class="chip">Sesuai urutan</button></div>' +
      '<button class="go" data-a="go"><i class="bi bi-play-fill"></i> Mulai latihan</button>'
    );
  }
  // Menyalin teks ke clipboard
  function copyText(txt, inp) {
    var ok = function () {
        toast("Tautan disalin.");
      },
      bad = function () {
        try {
          inp.focus();
          inp.select();
          document.execCommand("copy") ? ok() : toast("Tekan lama pada tautan lalu pilih Salin.");
        } catch (e) {
          toast("Tekan lama pada tautan lalu pilih Salin.");
        }
      };
    if (navigator.clipboard && navigator.clipboard.writeText)
      navigator.clipboard.writeText(txt).then(ok, bad);
    else bad();
  }
  document.addEventListener("click", function (e) {
    var c = e.target.closest(".bbc .chip");
    if (!c) return;
    [].forEach.call(c.parentNode.children, function (x) {
      x.classList.remove("on");
    });
    c.classList.add("on");
  });
  $("latList").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-a]");
    if (!b) return;
    var cd = b.closest(".bs-card"),
      s = findSet(cd.dataset.id),
      a = b.dataset.a,
      box = cd.querySelector(".bs-set");
    if (!s) return;
    if (a === "play") {
      if (box.style.display === "" && box.dataset.k === "play") {
        box.style.display = "none";
        return;
      }
      box.dataset.k = "play";
      box.innerHTML = setupHtml(s);
      box.style.display = "";
    } else if (a === "go") {
      var cn = box.querySelector('[data-g="n"] .chip.on').textContent.trim(),
        ord = box.querySelector('[data-g="o"] .chip.on').textContent.trim() === "Sesuai urutan";
      window.bbRun = {
        name: s.name,
        timed: !!s.timed,
        secs: s.secs || 20,
        keepOpts: !s.shufO,
        ordered: ord,
        n: /^Semua/.test(cn) ? s.qs.length : parseInt(cn),
        qs: s.qs,
      };
      window.bbStart();
    } else if (a === "edit") openEd(s);
    else if (a === "del") {
      if (confirm('Hapus paket "' + s.name + '"?')) {
        sets = sets.filter(function (x) {
          return x !== s;
        });
        save();
        renderLat();
      }
    } else if (a === "share") {
      if (box.style.display === "" && box.dataset.k === "share") {
        box.style.display = "none";
        return;
      }
      pack(s)
        .then(function (code) {
          var url = location.href.split("#")[0] + "#paket=" + code,
            note = "Siswa cukup membuka tautan ini, paket otomatis tersimpan di perangkat mereka.";
          if (location.protocol === "file:")
            note =
              "Tautan ini memakai alamat file di komputermu. Pasang web ini online dulu supaya siswa bisa membukanya.";
          else if (url.length > 8000)
            note +=
              " Paket ini cukup besar sehingga tautannya panjang. Jika sulit dibuka, pecah menjadi beberapa paket.";
          box.dataset.k = "share";
          box.dataset.url = url;
          box.innerHTML =
            '<div class="lb" style="margin-top:0">Tautan paket</div><input class="inp bs-url" readonly value="' +
            esc(url) +
            '"><div class="bs-act"><button class="life" data-a="copy"><i class="bi bi-clipboard"></i> Salin tautan</button><button class="life" data-a="wa"><i class="bi bi-send"></i> Kirim via WhatsApp</button></div><p class="bs-meta" style="margin:8px 0 0">' +
            esc(note) +
            "</p>";
          box.style.display = "";
        })
        .catch(function () {
          toast("Gagal membuat tautan.");
        });
    } else if (a === "copy") copyText(box.dataset.url, box.querySelector(".bs-url"));
    else if (a === "wa")
      window.open(
        "https://wa.me/?text=" +
          encodeURIComponent(
            'Latihan soal "' +
              s.name +
              '" (' +
              s.qs.length +
              " soal). Buka tautan ini lalu tekan Latihan:\n" +
              box.dataset.url,
          ),
        "_blank",
      );
  });
  $("latNew").onclick = function () {
    openEd(null);
  };
  $("latBack").onclick = function () {
    view("home");
  };
  $("latUse").onclick = function () {
    var v = $("latCode").value.trim();
    if (!v) return toast("Tempel tautan atau kode dulu.");
    useCode(v).then(function () {
      $("latCode").value = "";
    });
  };
  $("bbLatBtn").onclick = function () {
    fromGuru = false;
    openLat();
  };
  $("gk").onclick = function () {
    fromGuru = true;
    openEd(null);
  };
  var ed = null,
    fromGuru = false;
  // Kembali ke layar sebelumnya
  function goBack(name) {
    if (fromGuru) {
      fromGuru = false;
      view("guru");
      if (window.bbOnGuru) window.bbOnGuru(name);
    } else openLat();
  }
  // Menambah soal baru di editor
  function newQ() {
    return { q: "", o: ["", "", "", ""], a: -1, e: "", lv: "" };
  }
  function setChip(id, txt) {
    [].forEach.call($(id).children, function (c) {
      c.classList.toggle("on", c.textContent.trim() === txt);
    });
  }
  function onChip(id) {
    var c = $(id).querySelector(".chip.on");
    return c ? c.textContent.trim() : "";
  }
  // Membuka editor set soal
  function openEd(set) {
    ed = set
      ? {
          id: set.id,
          name: set.name,
          timed: !!set.timed,
          secs: set.secs || 20,
          shufO: !!set.shufO,
          qs: set.qs.map(function (r) {
            return {
              q: r[0],
              o: r[1].slice(),
              a: r[2],
              e: r[5] || "",
              lv: r[4] && r[4] !== "Latihan" ? r[4] : "",
            };
          }),
        }
      : { id: null, name: "", timed: false, secs: 20, shufO: false, qs: [newQ()] };
    $("edName").value = ed.name;
    setChip("edTime", ed.timed ? "Pakai waktu" : "Tanpa waktu");
    setChip("edSecs", ed.secs + " dtk");
    setChip("edShuf", ed.shufO ? "Diacak" : "Tetap seperti di soal");
    $("edSecsW").style.display = ed.timed ? "" : "none";
    $("edTitle").textContent = set ? "Edit paket soal" : "Paket soal baru";
    $("edPaste").value = "";
    renderEd();
    view("edit");
  }
  function qcard(q, i) {
    var o = q.o
      .map(function (t, k) {
        return (
          '<div class="bs-o"><label title="Tandai sebagai jawaban benar"><input type="radio" name="a' +
          i +
          '" data-f="a" data-k="' +
          k +
          '"' +
          (q.a === k ? " checked" : "") +
          '></label><span class="bs-k">' +
          "ABCDE".charAt(k) +
          '</span><input class="inp" data-f="o" data-k="' +
          k +
          '" maxlength="500" value="' +
          esc(t) +
          '" placeholder="Pilihan ' +
          "ABCDE".charAt(k) +
          '">' +
          (q.o.length > 2
            ? '<button class="life" data-a="delo" data-k="' +
              k +
              '" aria-label="Hapus pilihan"><i class="bi bi-x-lg"></i></button>'
            : "") +
          "</div>"
        );
      })
      .join("");
    return (
      '<div class="bs-q' +
      (q.bad ? " bad" : "") +
      '" data-i="' +
      i +
      '"><div class="bs-qh"><span>Soal ' +
      (i + 1) +
      (q.a < 0 ? ' <span class="bs-warn">· pilih jawaban yang benar</span>' : "") +
      '</span><button class="life" data-a="delq" aria-label="Hapus soal"><i class="bi bi-trash"></i></button></div>' +
      '<textarea class="inp" rows="2" data-f="q" maxlength="1500" placeholder="Tulis soal di sini">' +
      esc(q.q) +
      "</textarea>" +
      o +
      (q.o.length < 5
        ? '<button class="life" data-a="addo"><i class="bi bi-plus-circle"></i> Pilihan</button>'
        : "") +
      '<input class="inp" data-f="e" maxlength="800" style="margin-top:8px" placeholder="Pembahasan (boleh dikosongi)" value="' +
      esc(q.e) +
      '"></div>'
    );
  }
  // Menampilkan isi editor
  function renderEd() {
    $("edCount").textContent = ed.qs.length;
    $("edList").innerHTML = ed.qs.map(qcard).join("");
  }
  $("edList").addEventListener("input", function (e) {
    var t = e.target,
      f = t.dataset.f;
    if (!f) return;
    var q = ed.qs[+t.closest(".bs-q").dataset.i];
    if (f === "q") q.q = t.value;
    else if (f === "e") q.e = t.value;
    else if (f === "o") q.o[+t.dataset.k] = t.value;
  });
  $("edList").addEventListener("change", function (e) {
    var t = e.target;
    if (t.dataset.f !== "a") return;
    var card = t.closest(".bs-q"),
      q = ed.qs[+card.dataset.i];
    q.a = +t.dataset.k;
    q.bad = false;
    card.classList.remove("bad");
    var w = card.querySelector(".bs-warn");
    if (w) w.remove();
  });
  $("edList").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-a]");
    if (!b) return;
    var card = b.closest(".bs-q"),
      i = +card.dataset.i,
      q = ed.qs[i],
      a = b.dataset.a;
    if (a === "delq") {
      ed.qs.splice(i, 1);
      if (!ed.qs.length) ed.qs.push(newQ());
    } else if (a === "addo") {
      q.o.push("");
    } else if (a === "delo") {
      var k = +b.dataset.k;
      q.o.splice(k, 1);
      if (q.a === k) q.a = -1;
      else if (q.a > k) q.a--;
    }
    renderEd();
  });
  $("edTime").addEventListener("click", function () {
    $("edSecsW").style.display = onChip("edTime") === "Pakai waktu" ? "" : "none";
  });
  $("edAdd").onclick = function () {
    ed.qs.push(newQ());
    renderEd();
    var l = $("edList").lastElementChild;
    if (l) {
      l.scrollIntoView({ behavior: "smooth", block: "center" });
      var t = l.querySelector("textarea");
      if (t) t.focus({ preventScroll: true });
    }
  };
  $("edCancel").onclick = function () {
    goBack();
  };
  $("edSave").onclick = function () {
    var name = $("edName").value.trim();
    if (!name) {
      toast("Beri nama paket dulu.");
      $("edName").focus();
      return;
    }
    var qs = [],
      badAt = -1,
      why = "",
      keep = [];
    ed.qs.forEach(function (q) {
      q.bad = false;
    });
    ed.qs.forEach(function (q, i) {
      var empty =
        !q.q.trim() &&
        q.o.every(function (s) {
          return !s.trim();
        });
      if (empty) return;
      var o = [],
        a = -1;
      q.o.forEach(function (s, j) {
        if (s.trim()) {
          if (q.a === j) a = o.length;
          o.push(s.trim());
        }
      });
      var p = "";
      if (!q.q.trim()) p = "soalnya masih kosong";
      else if (o.length < 2) p = "isi minimal dua pilihan";
      else if (a < 0) p = "pilih jawaban yang benar";
      if (p) {
        q.bad = true;
        if (badAt < 0) {
          badAt = i;
          why = p;
        }
      } else qs.push([q.q.trim(), o, a, name, q.lv || "Latihan", q.e.trim()]);
    });
    if (badAt >= 0) {
      renderEd();
      var c = $("edList").children[badAt];
      if (c) c.scrollIntoView({ behavior: "smooth", block: "center" });
      toast("Soal " + (badAt + 1) + ": " + why + ".");
      return;
    }
    if (!qs.length) {
      toast("Tambahkan minimal satu soal.");
      return;
    }
    var timed = onChip("edTime") === "Pakai waktu",
      secs = parseInt(onChip("edSecs")) || 20,
      shufO = onChip("edShuf") === "Diacak";
    if (ed.id) {
      var s = findSet(ed.id);
      if (s) {
        s.name = name;
        s.timed = timed;
        s.secs = secs;
        s.shufO = shufO;
        s.qs = qs;
      }
    } else sets.push({ id: uid(), name: name, timed: timed, secs: secs, shufO: shufO, qs: qs });
    save();
    toast(
      'Paket "' +
        name +
        '" disimpan (' +
        qs.length +
        " soal)." +
        (fromGuru ? " Sudah dipilih untuk mabar." : ""),
    );
    goBack(name);
  };
  $("edPasteGo").onclick = function () {
    var r = parseText($("edPaste").value);
    if (!r.qs.length)
      return toast("Belum ada soal yang terbaca. Cek formatnya: nomor soal, pilihan A sampai E.");
    addParsed(r, "");
    $("edPaste").value = "";
  };
  function addParsed(r, fname) {
    var nk = r.qs.filter(function (q) {
      return q.a < 0;
    }).length;
    if (!ed) openEd(null);
    if (fname && !$("edName").value.trim()) {
      $("edName").value = fname;
      ed.name = fname;
    }
    ed.qs = ed.qs
      .filter(function (q) {
        return (
          q.q.trim() ||
          q.o.some(function (s) {
            return s.trim();
          })
        );
      })
      .concat(
        r.qs.map(function (q) {
          return { q: q.q, o: q.o, a: q.a, e: q.e, lv: q.lv };
        }),
      );
    renderEd();
    var m = r.qs.length + " soal terbaca.";
    if (nk) m += " " + nk + " soal belum punya kunci, pilih jawabannya.";
    else m += " Periksa jawabannya sebelum menyimpan.";
    if (r.skipped) m += " " + r.skipped + " bagian dilewati karena pilihannya tidak terbaca.";
    if (r.imgs) m += " " + r.imgs + " gambar tidak ikut terbawa.";
    toast(m);
  }
  window.addEventListener("hashchange", checkHash);
  checkHash();
})();