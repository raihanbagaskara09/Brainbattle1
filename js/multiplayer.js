// ===== Mode adu / ruangan: kode ruangan, papan peringkat, bot, dan sinkronisasi antar tab =====

(function () {
  var $ = function (i) {
    return document.getElementById(i);
  };
  var FIREBASE_CONFIG = null;
  var Q = window.bbQ,
    view = window.bbView,
    toast = window.bbToast;
  var me = null,
    code = "",
    unsub = null,
    last = null,
    hostT = null,
    tickT = null,
    botQ = "";
  // Mengisi nilai pada objek bersarang berdasarkan path
  function setDeep(o, p, v) {
    if (!p) return v;
    var k = p.split("/"),
      c = o;
    for (var i = 0; i < k.length - 1; i++) {
      c = c[k[i]] = c[k[i]] || {};
    }
    c[k[k.length - 1]] = v;
    return o;
  }
  var A = {
    subs: {},
    init: function () {
      var s = this;
      try {
        this.ch = new BroadcastChannel("bbmabar");
        this.ch.onmessage = function (e) {
          s.fire(e.data);
        };
      } catch (e) {}
    },
    rd: function (c) {
      try {
        return JSON.parse(localStorage.getItem("bbr_" + c));
      } catch (e) {
        return null;
      }
    },
    set: function (c, p, v) {
      var r = setDeep(this.rd(c) || {}, p, v);
      try {
        localStorage.setItem("bbr_" + c, JSON.stringify(r));
      } catch (e) {}
      this.fire(c);
      if (this.ch) this.ch.postMessage(c);
      return Promise.resolve();
    },
    fire: function (c) {
      var r = this.rd(c);
      (this.subs[c] || []).forEach(function (f) {
        f(r);
      });
    },
    sub: function (c, f) {
      var s = this,
        k = "bbr_" + c,
        raw = null,
        w = function (r) {
          try {
            raw = localStorage.getItem(k);
          } catch (e) {}
          f(r);
        };
      (s.subs[c] = s.subs[c] || []).push(w);
      w(s.rd(c));
      var iv = setInterval(function () {
        var n = null;
        try {
          n = localStorage.getItem(k);
        } catch (e) {}
        if (n !== raw) w(s.rd(c));
      }, 500);
      return function () {
        clearInterval(iv);
        s.subs[c] = s.subs[c].filter(function (x) {
          return x !== w;
        });
      };
    },
    once: function (c, f) {
      f(this.rd(c));
    },
  };
  A.init();
  // Beralih memakai Firebase bila konfigurasi tersedia
  function useFirebase(cfg) {
    var ld = function (src) {
      return new Promise(function (ok, no) {
        var s = document.createElement("script");
        s.src = src;
        s.onload = ok;
        s.onerror = no;
        document.head.appendChild(s);
      });
    };
    var base = "https://www.gstatic.com/firebasejs/10.12.2/firebase-";
    return ld(base + "app-compat.js")
      .then(function () {
        return ld(base + "database-compat.js");
      })
      .then(function () {
        firebase.initializeApp(cfg);
        var db = firebase.database();
        A = {
          set: function (c, p, v) {
            return db.ref("rooms/" + c + (p ? "/" + p : "")).set(v);
          },
          sub: function (c, f) {
            var r = db.ref("rooms/" + c),
              h = r.on("value", function (s) {
                f(s.val());
              });
            return function () {
              r.off("value", h);
            };
          },
          once: function (c, f) {
            db.ref("rooms/" + c)
              .once("value")
              .then(function (s) {
                f(s.val());
              });
          },
        };
        $("gmode").textContent = "Mode: Firebase aktif (online).";
      });
  }
  $("gmode").textContent = FIREBASE_CONFIG
    ? "Menghubungkan ke Firebase..."
    : "Mode: lokal (demo). Buka 2 tab di perangkat yang sama, atau pakai pemain demo. Isi FIREBASE_CONFIG di kode untuk mabar online.";
  if (FIREBASE_CONFIG)
    useFirebase(FIREBASE_CONFIG).catch(function () {
      toast("Firebase gagal dimuat, memakai mode lokal.");
      $("gmode").textContent = "Mode: lokal (Firebase gagal dimuat).";
    });
  // Membuat kode ruangan acak
  function rid(n) {
    var s = "",
      c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    for (var i = 0; i < n; i++) s += c[(Math.random() * c.length) | 0];
    return s;
  }
  // Mengamankan karakter khusus HTML
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  // Mengacak urutan array
  function shuf(a) {
    for (var k = a.length - 1; k > 0; k--) {
      var j = (Math.random() * (k + 1)) | 0,
        t = a[k];
      a[k] = a[j];
      a[j] = t;
    }
    return a;
  }
  // Menghitung skor pemain
  function score(p, cfg) {
    var s = 0,
      a = p.a || {};
    for (var k in a) {
      var x = a[k];
      if (!x) continue;
      var q = QQ(cfg, +k);
      if (q && x.k === q[2])
        s += 100 + (cfg.t ? Math.round(100 * Math.max(0, 1 - x.ms / (cfg.t * 1000))) : 0);
    }
    return s;
  }
  // Menyusun papan peringkat
  function board(r) {
    var P = r.players || {};
    return Object.keys(P)
      .map(function (id) {
        return { id: id, n: P[id].n, s: score(P[id], r.cfg), p: P[id] };
      })
      .sort(function (a, b) {
        return b.s - a.s;
      });
  }
  function chip(id) {
    return document.querySelector("#" + id + " .chip.on").textContent.trim();
  }
  var sj = [];
  Q.forEach(function (q) {
    if (sj.indexOf(q[3]) < 0) sj.push(q[3]);
  });
  function QQ(cfg, i) {
    return cfg.cq ? cfg.cq[i] : Q[cfg.qs[i]];
  }
  function fillGm(sel) {
    var keep = null;
    try {
      keep = chip("gm");
    } catch (e) {}
    var names = ["Semua"].concat(sj);
    (window.bbSets ? window.bbSets() : []).forEach(function (x) {
      names.push("Paket · " + x.name);
    });
    if (sel && names.indexOf("Paket · " + sel) >= 0) keep = "Paket · " + sel;
    if (names.indexOf(keep) < 0) keep = "Semua";
    $("gm").innerHTML = names
      .map(function (m) {
        return '<button class="chip' + (m === keep ? " on" : "") + '">' + esc(m) + "</button>";
      })
      .join("");
  }
  window.bbOnGuru = fillGm;
  fillGm();
  $("mk").onclick = function () {
    var s = chip("gm"),
      cn = chip("gn"),
      tc = chip("gt"),
      t = /^Tanpa/.test(tc) ? 0 : parseInt(tc),
      all = /^Semua/.test(cn),
      cfg,
      set = null;
    if (window.bbSets)
      window.bbSets().forEach(function (x) {
        if (!set && s === "Paket · " + x.name) set = x;
      });
    if (set) {
      var ix = shuf(
          set.qs.map(function (_, i) {
            return i;
          }),
        ),
        n = all ? ix.length : Math.min(parseInt(cn), ix.length);
      cfg = {
        m: set.name,
        n: n,
        t: t,
        cq: ix.slice(0, n).map(function (i) {
          return set.qs[i];
        }),
      };
    } else {
      var pool = [];
      Q.forEach(function (q, i) {
        if (s === "Semua" || q[3] === s) pool.push(i);
      });
      var n2 = all ? pool.length : Math.min(parseInt(cn), pool.length);
      cfg = { m: s, n: n2, t: t, qs: shuf(pool).slice(0, n2) };
    }
    code = rid(5);
    me = { id: "host", host: true, name: "Guru" };
    botQ = "";
    A.set(code, "", { cfg: cfg, st: "lobby", qi: 0, t0: 0, players: null }).then(enter);
  };
  $("gb").onclick = function () {
    view("home");
  };
  $("jb").onclick = function () {
    view("home");
  };
  $("jn").onclick = function () {
    view("join");
  };
  $("jg").onclick = function () {
    var c = $("jc").value.trim().toUpperCase(),
      nm = $("jname").value.trim();
    if (!c || !nm) return toast("Isi kode ruang dan namamu.");
    A.once(c, function (r) {
      if (!r) return toast("Kode ruang tidak ditemukan.");
      if (r.st !== "lobby") return toast("Permainan sudah dimulai.");
      code = c;
      me = { id: "p" + rid(6), host: false, name: nm.slice(0, 16) };
      A.set(c, "players/" + me.id, { n: me.name }).then(enter);
    });
  };
  // Masuk ke ruangan
  function enter() {
    view("room");
    if (unsub) unsub();
    unsub = A.sub(code, render);
    stopT();
    tickT = setInterval(tick, 250);
    if (me.host) hostT = setInterval(hostLoop, 600);
  }
  // Menghentikan timer
  function stopT() {
    clearInterval(tickT);
    clearInterval(hostT);
  }
  $("rxr").onclick = function () {
    stopT();
    if (unsub) unsub();
    unsub = null;
    view(me && me.host ? "guru" : "home");
    me = null;
    last = null;
  };
  // Memperbarui hitung mundur
  function tick() {
    var r = last;
    if (!r || r.st !== "q" || !r.cfg) return;
    if (!r.cfg.t) {
      $("rt").textContent = "Tanpa waktu";
      return;
    }
    var left = Math.max(0, (r.cfg.t * 1000 - (Date.now() - r.t0)) / 1000);
    $("rt").textContent = Math.ceil(left) + " dtk";
    var b = $("rbar");
    b.style.width = (left / r.cfg.t) * 100 + "%";
    b.style.background = left <= 5 ? "#ff5d73" : "";
  }
  // Siklus permainan yang dijalankan host
  function hostLoop() {
    var r = last;
    if (!r || r.st !== "q") return;
    var P = r.players || {},
      ids = Object.keys(P),
      done = ids.filter(function (id) {
        return P[id].a && P[id].a[r.qi];
      }).length;
    if (
      (r.cfg.t && Date.now() >= r.t0 + r.cfg.t * 1000 + 300) ||
      (ids.length && done === ids.length)
    )
      A.set(code, "st", "rev");
  }
  // Aksi pemain bot
  function botAct(r) {
    var key = r.qi + "_" + r.t0;
    if (botQ === key) return;
    botQ = key;
    var T = r.cfg.t || 20;
    Object.keys(r.players || {}).forEach(function (id) {
      var p = r.players[id];
      if (!p.bot) return;
      setTimeout(
        function () {
          var q = QQ(r.cfg, r.qi),
            ok = Math.random() < 0.7,
            k = ok ? q[2] : ((q[2] + 1 + Math.random() * (q[1].length - 1)) | 0) % q[1].length;
          A.set(code, "players/" + id + "/a/" + r.qi, {
            k: k,
            ms: Math.round(2000 + Math.random() * (T * 1000 - 5000)),
          });
        },
        800 + Math.random() * T * 600,
      );
    });
  }
  // Menampilkan kondisi ruangan terbaru
  function render(r) {
    last = r;
    var b = $("rbody");
    if (!r) {
      b.innerHTML = "<p>Ruang tidak ditemukan atau sudah ditutup.</p>";
      return;
    }
    var cfg = r.cfg,
      st = r.st,
      qi = r.qi | 0,
      q = QQ(cfg, qi),
      pl = board(r),
      host = me.host,
      P = r.players || {};
    var mine = P[me.id] && P[me.id].a ? P[me.id].a[qi] : null;
    $("rcode").textContent = code;
    $("rbarw").style.display = st === "q" && cfg.t ? "" : "none";
    if (st !== "q") $("rt").textContent = "";
    var lst = function (n) {
      return pl
        .slice(0, n)
        .map(function (p, i) {
          return (
            '<div class="pl' +
            (p.id === me.id ? " me" : "") +
            '"><span>' +
            (i + 1) +
            ". " +
            esc(p.n) +
            "</span><b>" +
            p.s +
            "</b></div>"
          );
        })
        .join("");
    };
    var h = "";
    if (st === "lobby") {
      h =
        '<p style="text-align:center;margin:6px 0">' +
        esc(cfg.m) +
        " · " +
        cfg.n +
        " soal · " +
        (cfg.t ? cfg.t + " dtk per soal" : "tanpa batas waktu") +
        '</p><div class="lb">Pemain (' +
        pl.length +
        ")</div>" +
        (pl.length
          ? pl
              .map(function (p) {
                return '<div class="pl"><span>' + esc(p.n) + "</span></div>";
              })
              .join("")
          : '<p style="color:var(--mu)">Belum ada yang bergabung. Bagikan kode di atas.</p>');
      h += host
        ? '<button class="go" data-act="start"' +
          (pl.length ? "" : " disabled") +
          '><i class="bi bi-play-fill"></i> Mulai</button><button class="life" data-act="bot" style="margin-top:10px"><i class="bi bi-plus-circle"></i> 3 pemain demo</button>'
        : '<p style="text-align:center;color:var(--gl);font-weight:800">Menunggu guru memulai...</p>';
    } else if (st === "q" || st === "rev") {
      var rev = st === "rev";
      h =
        '<div class="lb" style="margin-top:0">Soal ' +
        (qi + 1) +
        " dari " +
        cfg.n +
        '</div><p class="q">' +
        esc(q[0]) +
        "</p>";
      h += q[1]
        .map(function (o, k) {
          var c = "opt";
          if (rev) {
            if (k === q[2]) c += " ok";
            else if (mine && mine.k === k) c += " no";
          } else if (mine && mine.k === k) c += " sel";
          return (
            '<button class="' +
            c +
            '"' +
            (host || mine || rev ? " disabled" : ' data-act="ans" data-k="' + k + '"') +
            '><span class="k">' +
            "ABCDE"[k] +
            "</span>" +
            esc(o) +
            "</button>"
          );
        })
        .join("");
      if (!rev) {
        var done = pl.filter(function (p) {
          return p.p.a && p.p.a[qi];
        }).length;
        h +=
          '<p style="text-align:center;color:var(--mu);margin:8px 0">' +
          (host
            ? done + " dari " + pl.length + " pemain sudah menjawab"
            : mine
              ? "Jawabanmu terkirim. Menunggu pemain lain..."
              : "Pilih jawabanmu secepat mungkin.") +
          "</p>";
        if (host && !cfg.t) h += '<button class="go" data-act="reveal">Tampilkan jawaban</button>';
      } else {
        var got = mine && mine.k === q[2];
        if (q[5])
          h +=
            '<div style="background:rgba(255,209,102,.1);border-left:4px solid #ffd166;border-radius:10px;padding:10px 14px;margin:10px 0;font-size:.92rem">Pembahasan: ' +
            esc(q[5]) +
            "</div>";
        if (!host)
          h +=
            '<p style="font-weight:800;color:' +
            (got ? "#3ddc97" : "#ff5d73") +
            '">' +
            (got ? "Benar!" : mine ? "Belum tepat." : "Tidak menjawab.") +
            "</p>";
        h += '<div class="lb">Peringkat sementara</div>' + lst(5);
        if (host)
          h +=
            '<button class="go" data-act="next">' +
            (qi + 1 >= cfg.n ? "Lihat hasil akhir" : "Soal berikutnya") +
            "</button>";
      }
    } else {
      h =
        '<div style="text-align:center;font-size:3rem;color:#ffd166"><i class="bi bi-trophy-fill"></i></div><h2 style="text-align:center">Hasil akhir</h2>' +
        lst(60);
    }
    b.innerHTML = h;
    if (st === "q" && host) botAct(r);
    tick();
  }
  $("rbody").addEventListener("click", function (e) {
    var t = e.target.closest("[data-act]");
    if (!t || !last) return;
    var a = t.dataset.act,
      r = last,
      qi = r.qi | 0;
    if (a === "ans") {
      if (r.st === "q")
        A.set(code, "players/" + me.id + "/a/" + qi, {
          k: +t.dataset.k,
          ms: Math.max(0, Date.now() - r.t0),
        });
    } else if (a === "start") {
      A.set(code, "qi", 0);
      A.set(code, "t0", Date.now());
      A.set(code, "st", "q");
    } else if (a === "next") {
      if (qi + 1 >= r.cfg.n) A.set(code, "st", "end");
      else {
        A.set(code, "qi", qi + 1);
        A.set(code, "t0", Date.now());
        A.set(code, "st", "q");
      }
    } else if (a === "reveal") {
      A.set(code, "st", "rev");
    } else if (a === "bot") {
      ["Budi", "Sari", "Dimas"].forEach(function (n, i) {
        A.set(code, "players/bot" + i, { n: n + " (demo)", bot: 1 });
      });
    }
  });
})();