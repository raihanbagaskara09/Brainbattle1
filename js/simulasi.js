// ===== Fitur Simulasi Interaktif: pilih kategori, jalankan simulasi, dan tampilkan hasilnya =====

(function () {
  "use strict";
  var $ = function (i) {
    return document.getElementById(i);
  };
  var main = document.querySelector("main"),
    root = $("bbSim");
  if (!main || !root) return;
  var P = {
    atom: '<circle class="a" cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
    flask:
      '<path class="a" d="M9.5 3h5M10 3v6.5L4.5 19a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 9.5V3"/><path d="M7.5 15h9"/>',
    dna: '<path d="M7 3c0 7 10 7 10 18M17 3c0 7-10 7-10 18"/><path class="sa" d="M8.5 7.5h7M8.5 16.5h7M10 12h4"/>',
    proj: '<path d="M3 20Q12-4 21 20" stroke-dasharray="1 3.5"/><circle class="a" cx="12" cy="8" r="3"/>',
    skate:
      '<path d="M3 4c0 10 4 15 9 15s9-5 9-15"/><circle class="a" cx="7" cy="12" r="2.5"/><path d="M5 21.5h14"/>',
    wave: '<path d="M2 12c2.2-7 4.3-7 6.5 0s4.3 7 6.5 0 4.3-7 6.5 0"/><circle class="a" cx="12" cy="12" r="1.8"/>',
    orbit:
      '<circle class="a" cx="12" cy="12" r="3.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-25 12 12)"/><circle class="f" cx="20" cy="7" r="1.3"/>',
    mshape:
      '<circle class="a" cx="12" cy="8" r="3.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="M10 11 6.5 16M14 11l3.5 5"/>',
    polar:
      '<circle class="a" cx="8.5" cy="14" r="4.5"/><circle cx="17.5" cy="14" r="3"/><path d="M4 5h16m-3-2.5L20 5l-3 2.5"/>',
    ph: '<path class="a" d="M12 2.5C8 8 5.5 11 5.5 14.5a6.5 6.5 0 0 0 13 0C18.5 11 16 8 12 2.5z"/><path d="M9.5 15a2.5 2.5 0 0 0 2.5 2.5"/>',
    cell: '<circle class="a" cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><circle class="f" cx="6.8" cy="9" r=".9"/><circle class="f" cx="17" cy="15.5" r=".9"/>',
    neuron:
      '<circle class="a" cx="12" cy="12" r="3.5"/><path d="M12 8.5V3M9.2 14 4.5 18M14.8 14l4.7 4M9.5 10 5 6.5M14.5 10 19 6.5"/><circle class="f" cx="12" cy="3" r="1.1"/>',
    leaf: '<path class="a" d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15z"/><path d="M5 19 14 10"/>',
    mitosis:
      '<circle cx="7.5" cy="12" r="5"/><circle class="a" cx="16.5" cy="12" r="5"/><path d="M12 9v6"/>',
    full: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/>',
    back: '<path d="M20 12H4m6-6-6 6 6 6"/>',
    star: '<path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z"/>',
    starF:
      '<path class="a" d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z"/>',
    play: '<path class="a" d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5z"/>',
    x: '<path d="m6 6 12 12M18 6 6 18"/>',
  };
  function ic(k) {
    return (
      '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (P[k] || P.atom) +
      "</svg>"
    );
  }
  var COL = { Fisika: "#3b8de0", Kimia: "#7a5cf0", Biologi: "#2fb87a" };
  var SUBI = { Fisika: "atom", Kimia: "flask", Biologi: "dna" };
  var SUBJ = ["Fisika", "Kimia", "Biologi"];
  var LVI = { Mudah: "flower1", Sedang: "fire", Sulit: "gem" };
  var S = [
    {
      id: "pm",
      s: "Fisika",
      t: "Projectile Motion",
      n: "Gerak Parabola",
      lv: "Sedang",
      tp: "Gaya dan Gerak",
      ic: "proj",
      tags: ["Gerak parabola", "Kecepatan awal", "Sudut tembak", "Hambatan udara"],
      kw: "projectile parabola peluru meriam",
      d: "Tembakkan berbagai benda dan ubah sudut, kecepatan, serta hambatan udara untuk mempelajari lintasan parabola.",
      src: { k: "own", slug: "projectile-motion" },
      sum: "Gerak parabola adalah gabungan gerak lurus beraturan pada arah horizontal dan gerak lurus berubah beraturan (percepatan gravitasi g) pada arah vertikal. Tanpa hambatan udara dan pada ketinggian awal yang sama, jangkauan terjauh diperoleh pada sudut 45°.",
      goals: [
        "Menguraikan kecepatan awal menjadi komponen horizontal dan vertikal.",
        "Menentukan pengaruh sudut dan kecepatan awal terhadap jangkauan dan tinggi maksimum.",
        "Membandingkan lintasan dengan dan tanpa hambatan udara.",
      ],
      steps: [
        "Buka layar Intro, pilih benda (mis. bola meriam), lalu atur sudut dan kecepatan awal.",
        "Tembakkan benda, lalu gunakan alat ukur untuk membaca jarak, tinggi, dan waktu terbang.",
        "Coba sudut 15°, 30°, 45°, 60°, dan 75° dengan kecepatan sama, lalu catat jangkauannya. Aktifkan hambatan udara dan bandingkan.",
      ],
    },
    {
      id: "esp",
      s: "Fisika",
      t: "Energy Skate Park",
      n: "Energi pada Taman Seluncur",
      lv: "Sedang",
      tp: "Energi",
      ic: "skate",
      tags: ["Energi kinetik", "Energi potensial", "Kekekalan energi", "Gesekan"],
      kw: "energy skate park kinetik potensial mekanik",
      d: "Atur lintasan skater dan amati perubahan energi kinetik, energi potensial, dan energi termal.",
      src: { k: "own", slug: "energy-skate-park" },
      sum: "Energi mekanik = energi kinetik + energi potensial. Tanpa gesekan, energi mekanik kekal: saat ketinggian turun, energi potensial berkurang dan energi kinetik bertambah. Dengan gesekan, sebagian energi berubah menjadi energi termal, tetapi energi total tetap kekal.",
      goals: [
        "Menjelaskan perubahan energi kinetik dan potensial sepanjang lintasan.",
        "Menerapkan kekekalan energi mekanik tanpa gesekan.",
        "Menjelaskan ke mana energi mekanik 'pergi' ketika ada gesekan.",
      ],
      steps: [
        "Buka layar Intro, aktifkan diagram batang energi, lalu pilih salah satu lintasan.",
        "Lepaskan skater dari ketinggian berbeda dan amati diagram batang di tiap titik lintasan.",
        "Buka layar Friction untuk menambahkan gesekan, amati energi termal, lalu ubah massa skater.",
      ],
    },
    {
      id: "wi",
      s: "Fisika",
      t: "Waves Intro",
      n: "Pengantar Gelombang",
      lv: "Mudah",
      tp: "Gelombang",
      ic: "wave",
      tags: ["Gelombang air", "Gelombang suara", "Gelombang cahaya", "Frekuensi", "Amplitudo"],
      kw: "wave frekuensi amplitudo panjang gelombang",
      d: "Amati gelombang air, suara, dan cahaya, lalu ubah frekuensi dan amplitudo untuk melihat pengaruhnya.",
      src: { k: "own", slug: "waves-intro" },
      sum: "Gelombang memindahkan energi tanpa memindahkan materi. Frekuensi f (Hz) adalah jumlah getaran tiap detik, panjang gelombang λ adalah jarak antar puncak, dan cepat rambat v = f·λ. Amplitudo berkaitan dengan energi gelombang, misalnya kekerasan suara.",
      goals: [
        "Membedakan gelombang air, suara, dan cahaya.",
        "Menghubungkan frekuensi, panjang gelombang, dan cepat rambat.",
        "Menjelaskan pengaruh amplitudo.",
      ],
      steps: [
        "Buka layar Water, ubah frekuensi dan amplitudo, lalu ukur panjang gelombang dengan penggaris.",
        "Buka layar Sound, nyalakan pengeras suara, dan amati pengaruh frekuensi terhadap panjang gelombang dan nada.",
        "Buka layar Light dan amati bagaimana gelombang cahaya merambat saat frekuensi diubah.",
      ],
    },
    {
      id: "gao",
      s: "Fisika",
      t: "Gravity and Orbits",
      n: "Gravitasi dan Orbit",
      lv: "Sedang",
      tp: "Gravitasi",
      ic: "orbit",
      tags: ["Gaya gravitasi", "Orbit planet", "Tata surya", "Massa dan jarak"],
      kw: "gravity orbit planet matahari bulan bumi",
      d: "Ubah massa dan jarak benda langit untuk melihat gaya gravitasi dan bentuk orbit Matahari, Bumi, dan Bulan.",
      src: { k: "own", slug: "gravity-and-orbits" },
      sum: "Gaya gravitasi antara dua benda: F = G·m₁·m₂/r². Gaya ini makin besar jika massa bertambah dan makin kecil jika jarak bertambah (berbanding terbalik dengan kuadrat jarak). Gaya gravitasi menjaga planet tetap mengorbit Matahari.",
      goals: [
        "Menjelaskan faktor yang memengaruhi gaya gravitasi.",
        "Menghubungkan gaya gravitasi dengan gerak orbit.",
        "Memprediksi perubahan orbit saat massa atau jarak diubah.",
      ],
      steps: [
        "Pilih model Matahari, Bumi, dan Bulan, lalu nyalakan tampilan vektor gaya gravitasi dan jejak lintasan.",
        "Seret Bumi lebih jauh dari Matahari, lalu amati panjang vektor gaya dan bentuk orbit.",
        "Ubah massa benda dengan penggeser massa, lalu amati apakah orbit tetap stabil.",
      ],
    },
    {
      id: "ms",
      s: "Kimia",
      t: "Molecule Shapes",
      n: "Bentuk Molekul",
      lv: "Sedang",
      tp: "Ikatan Kimia",
      ic: "mshape",
      tags: ["Teori VSEPR", "Pasangan elektron", "Geometri molekul", "Sudut ikatan"],
      kw: "vsepr molekul geometri tetrahedral linear bengkok",
      d: "Tambahkan ikatan dan pasangan elektron bebas pada atom pusat, lalu lihat bentuk molekul 3D yang terbentuk.",
      src: { k: "own", slug: "molecule-shapes" },
      sum: "Teori VSEPR: pasangan elektron di sekitar atom pusat saling tolak-menolak dan menempati posisi sejauh mungkin. Bentuk molekul ditentukan oleh jumlah pasangan elektron ikatan dan pasangan elektron bebas, misalnya linear, trigonal planar, tetrahedral, atau bengkok.",
      goals: [
        "Menjelaskan tolakan antar pasangan elektron pada teori VSEPR.",
        "Menentukan bentuk molekul dari pasangan elektron ikatan dan bebas.",
        "Membedakan geometri elektron dengan bentuk molekul.",
      ],
      steps: [
        "Pada layar Model, tambahkan ikatan dan pasangan elektron bebas ke atom pusat, lalu putar model 3D.",
        "Aktifkan tampilan sudut ikatan dan nama bentuk, lalu catat hasilnya.",
        "Pada layar Real Molecules, bandingkan molekul nyata seperti H₂O, NH₃, dan CH₄ dengan modelmu.",
      ],
    },
    {
      id: "mp",
      s: "Kimia",
      t: "Molecule Polarity",
      n: "Kepolaran Molekul",
      lv: "Sedang",
      tp: "Ikatan Kimia",
      ic: "polar",
      tags: ["Keelektronegatifan", "Ikatan polar", "Momen dipol", "Molekul polar"],
      kw: "polaritas polar nonpolar dipol elektronegativitas",
      d: "Ubah keelektronegatifan atom dan lihat dipol ikatan, muatan parsial, serta kepolaran molekul.",
      src: { k: "own", slug: "molecule-polarity" },
      sum: "Ikatan bersifat polar jika dua atom memiliki keelektronegatifan berbeda; elektron lebih tertarik ke atom yang lebih elektronegatif. Molekul bersifat polar jika dipol ikatannya tidak saling meniadakan, misalnya karena bentuk molekul tidak simetris.",
      goals: [
        "Menjelaskan hubungan selisih keelektronegatifan dengan kepolaran ikatan.",
        "Menentukan kepolaran molekul dari bentuk dan dipol ikatan.",
        "Menafsirkan muatan parsial dan arah dipol.",
      ],
      steps: [
        "Pada layar Two Atoms, ubah keelektronegatifan atom A dan B, lalu amati arah dipol dan muatan parsial.",
        "Pada layar Three Atoms, ubah sudut ikatan dan keelektronegatifan, lalu amati kepolaran molekul.",
        "Pada layar Real Molecules, bandingkan molekul nyata seperti H₂O dan CO₂.",
      ],
    },
    {
      id: "phs",
      s: "Kimia",
      t: "pH Scale: Basics",
      n: "Skala pH: Dasar",
      lv: "Mudah",
      tp: "Asam dan Basa",
      ic: "ph",
      tags: ["pH", "Asam", "Basa", "Konsentrasi ion", "Pengenceran"],
      kw: "ph asam basa larutan keasaman",
      d: "Ukur pH berbagai larutan sehari-hari dan lihat bagaimana pengenceran memengaruhi pH.",
      src: { k: "own", slug: "ph-scale-basics" },
      sum: "Skala pH menunjukkan tingkat keasaman larutan: pH kurang dari 7 bersifat asam, pH 7 netral, dan pH lebih dari 7 bersifat basa (pada 25 °C). Setiap penurunan 1 satuan pH berarti konsentrasi ion H₃O⁺ naik 10 kali. Pengenceran dengan air mendekatkan pH ke 7.",
      goals: [
        "Mengelompokkan larutan sebagai asam, netral, atau basa berdasarkan pH.",
        "Menjelaskan hubungan pH dengan konsentrasi ion H₃O⁺.",
        "Memprediksi pengaruh pengenceran terhadap pH.",
      ],
      steps: [
        "Pilih larutan seperti jus lemon, kopi, air murni, atau pembersih, lalu celupkan probe pH.",
        "Amati nilai pH dan konsentrasi ion yang ditampilkan.",
        "Gunakan fitur penambahan air (jika tersedia) untuk mengencerkan larutan, lalu bandingkan pH sebelum dan sesudah.",
      ],
    },
    {
      id: "mt",
      s: "Biologi",
      t: "Membrane Transport",
      n: "Transpor melalui Membran Sel",
      lv: "Sedang",
      tp: "Sel dan Jaringan",
      ic: "cell",
      tags: ["Membran sel", "Difusi", "Transpor aktif", "Saluran ion"],
      kw: "membran sel difusi osmosis transpor saluran pompa",
      d: "Amati bagaimana zat bergerak melintasi membran sel melalui difusi, saluran, dan pompa.",
      src: { k: "own", slug: "membrane-transport" },
      sum: "Membran sel bersifat selektif permeabel. Zat dapat berpindah dengan difusi, yaitu dari konsentrasi tinggi ke rendah tanpa energi, atau melalui saluran dan protein pengangkut. Transpor aktif memindahkan zat melawan gradien konsentrasi dan memerlukan energi (ATP).",
      goals: [
        "Menjelaskan difusi dan gradien konsentrasi.",
        "Membedakan transpor pasif dan transpor aktif.",
        "Menjelaskan peran protein membran.",
      ],
      steps: [
        "Tambahkan zat ke salah satu sisi membran dan amati arah pergerakannya.",
        "Tambahkan saluran atau protein pengangkut pada membran, lalu bandingkan laju perpindahan zat.",
        "Amati kapan sistem mencapai keseimbangan dan apakah partikel masih bergerak.",
      ],
    },
    {
      id: "neu",
      s: "Biologi",
      t: "Neuron",
      n: "Neuron dan Sistem Saraf",
      lv: "Sedang",
      tp: "Sistem Saraf",
      ic: "neuron",
      tags: ["Neuron", "Potensial aksi", "Impuls saraf", "Ion natrium dan kalium"],
      kw: "neuron saraf impuls potensial aksi akson natrium kalium",
      d: "Stimulasi neuron dan amati potensial aksi serta pergerakan ion natrium dan kalium.",
      src: { k: "own", slug: "neuron" },
      sum: "Neuron menghantarkan impuls berupa potensial aksi. Saat istirahat, bagian dalam neuron bermuatan negatif (sekitar −70 mV). Stimulus yang cukup kuat membuka saluran Na⁺ sehingga terjadi depolarisasi, lalu saluran K⁺ membuka sehingga terjadi repolarisasi.",
      goals: [
        "Menjelaskan potensial istirahat dan potensial aksi.",
        "Menunjukkan peran ion Na⁺ dan K⁺.",
        "Menjelaskan perambatan impuls sepanjang akson.",
      ],
      steps: [
        "Stimulasi neuron dan amati grafik tegangan membran.",
        "Perbesar tampilan membran untuk melihat saluran ion Na⁺ dan K⁺ membuka dan menutup.",
        "Ubah pengaturan saluran atau konsentrasi ion (jika tersedia) dan amati pengaruhnya pada impuls.",
      ],
    },
    {
      id: "pho",
      s: "Biologi",
      t: "Photosynthesis (BioInteractive)",
      n: "Fotosintesis",
      lv: "Sedang",
      tp: "Fotosintesis",
      ic: "leaf",
      tags: ["Reaksi terang", "Siklus Calvin", "Kloroplas", "ATP dan NADPH"],
      kw: "fotosintesis kloroplas calvin reaksi terang klorofil",
      d: "Animasi bertahap yang membawamu ke dalam daun dan kloroplas untuk melihat reaksi terang dan siklus Calvin.",
      src: { k: "own" },
      sum: "Fotosintesis mengubah energi cahaya menjadi energi kimia berupa gula. Reaksi terang di membran tilakoid menghasilkan ATP, NADPH, dan O₂ dari pemecahan air. Siklus Calvin di stroma memakai ATP dan NADPH untuk mengikat CO₂ menjadi gula.",
      goals: [
        "Menyebutkan reaktan dan produk fotosintesis.",
        "Menjelaskan reaksi terang dan siklus Calvin beserta lokasinya.",
        "Menghubungkan aliran energi dan siklus materi pada fotosintesis.",
      ],
      steps: [
        "Buka situs dengan tombol di atas, lalu mulai dari bagian pertama animasi (gambaran umum).",
        "Lanjutkan ke bagian yang menunjukkan reaksi terang dan siklus Calvin. Bagian lanjutan lebih sulit, jadi kerjakan sesuai kemampuanmu.",
        "Catat reaktan, produk, dan lokasi setiap tahap di dalam kloroplas.",
      ],
    },
    {
      id: "mit",
      s: "Biologi",
      t: "Mitosis and Meiosis (Cells Alive!)",
      n: "Mitosis dan Meiosis",
      lv: "Sedang",
      tp: "Sel dan Jaringan",
      ic: "mitosis",
      tags: ["Mitosis", "Meiosis", "Siklus sel", "Pembelahan sel"],
      kw: "mitosis meiosis pembelahan sel kromosom profase metafase anafase telofase",
      d: "Ikuti tahap-tahap pembelahan sel pada animasi interaktif mitosis dan meiosis.",
      src: { k: "own" },
      sum: "Mitosis menghasilkan dua sel anak diploid yang identik dengan sel induk, untuk pertumbuhan dan perbaikan jaringan. Meiosis menghasilkan empat sel anak haploid yang berbeda secara genetik melalui dua kali pembelahan, untuk pembentukan gamet.",
      goals: [
        "Menyebutkan tahap-tahap mitosis dan meiosis.",
        "Membandingkan hasil akhir mitosis dan meiosis.",
        "Menjelaskan peran meiosis dalam keragaman genetik.",
      ],
      steps: [
        "Buka situs dengan tombol di atas, lalu pilih bagian biologi sel (Cell Biology) dan menu Mitosis.",
        "Ikuti tiap tahap (profase, metafase, anafase, telofase) dan catat peristiwa utamanya.",
        "Ulangi untuk menu Meiosis, lalu bandingkan hasil akhir keduanya.",
      ],
    },
  ];
  var mem = {};
  function sget(k, d) {
    try {
      var v = localStorage.getItem(k);
      if (v != null) return JSON.parse(v);
    } catch (e) {}
    return k in mem ? mem[k] : d;
  }
  function sset(k, v) {
    mem[k] = v;
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {}
  }
  var KF = "bb_sim_fav_v1",
    KL = "bb_sim_lang_v1";
  var favs = sget(KF, []);
  if (!Array.isArray(favs)) favs = [];
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function norm(s) {
    var t = String(s || "").toLowerCase();
    try {
      t = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } catch (e) {}
    return t;
  }
  function toast(t) {
    if (window.bbToast) window.bbToast(t);
  }
  function byId(id) {
    for (var i = 0; i < S.length; i++) if (S[i].id === id) return S[i];
    return null;
  }
  function isFav(id) {
    return favs.indexOf(id) >= 0;
  }
  function toggleFav(id) {
    var i = favs.indexOf(id);
    if (i >= 0) {
      favs.splice(i, 1);
      toast("Dihapus dari Favorit Saya.");
    } else {
      favs.push(id);
      toast("Ditambahkan ke Favorit Saya.");
    }
    sset(KF, favs);
  }
  var raf = 0,
    SIM = null,
    SUP = {
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
      "-": "⁻",
    };
  function isOwn(s) {
    return s.src.k === "own";
  }
  function f2(x, d) {
    return (+x).toFixed(d == null ? 2 : d).replace(".", ",");
  }
  function sci(x) {
    var e = Math.floor(Math.log10(x) + 1e-9),
      m = x / Math.pow(10, e);
    return (
      f2(m, 1) +
      "×10" +
      String(e).replace(/[-\d]/g, function (c) {
        return SUP[c];
      })
    );
  }
  function tx(g, t, x, y, col, sz, al) {
    g.fillStyle = col || "#f2f4ff";
    g.font = "800 " + ((sz || 13) + 1.5) + "px Nunito,sans-serif";
    g.textAlign = al || "left";
    g.textBaseline = "middle";
    g.fillText(t, x, y);
  }
  function ln(g, x1, y1, x2, y2, col, wd, dash) {
    g.strokeStyle = col;
    g.lineWidth = wd || 2;
    g.setLineDash(dash || []);
    g.beginPath();
    g.moveTo(x1, y1);
    g.lineTo(x2, y2);
    g.stroke();
    g.setLineDash([]);
  }
  function arrow(g, x1, y, x2, col) {
    if (Math.abs(x2 - x1) < 3) return;
    ln(g, x1, y, x2, y, col, 4);
    var d = x2 > x1 ? 1 : -1;
    g.fillStyle = col;
    g.beginPath();
    g.moveTo(x2 + d * 9, y);
    g.lineTo(x2 - d * 3, y - 7);
    g.lineTo(x2 - d * 3, y + 7);
    g.fill();
  }
  function dots(g, p, off, col) {
    var tot = 0,
      L = [],
      i;
    for (i = 1; i < p.length; i++) {
      L.push(Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]));
      tot += L[i - 1];
    }
    g.fillStyle = col;
    for (var d = off % 24; d < tot; d += 24) {
      var a = d,
        j = 0;
      while (j < L.length - 1 && a > L[j]) {
        a -= L[j];
        j++;
      }
      var r = a / L[j];
      g.beginPath();
      g.arc(
        p[j][0] + (p[j + 1][0] - p[j][0]) * r,
        p[j][1] + (p[j + 1][1] - p[j][1]) * r,
        3.5,
        0,
        7,
      );
      g.fill();
    }
  }
  var ZAT = [
    ["(atur sendiri)", -1],
    ["Asam baterai", 0.5],
    ["Asam lambung", 1.5],
    ["Jus lemon", 2.3],
    ["Cuka", 2.9],
    ["Kopi", 5],
    ["Air hujan", 5.6],
    ["Air murni", 7],
    ["Darah", 7.4],
    ["Air laut", 8],
    ["Soda kue", 8.3],
    ["Amonia rumah tangga", 11.5],
    ["Pemutih", 12.5],
    ["Pembersih saluran", 13.5],
  ];
  var OWN = {
    pm: {
      c: [
        ["v0", "Kecepatan awal", 5, 40, 1, 20, "m/s"],
        ["ang", "Sudut tembak", 0, 90, 1, 45, "°"],
        ["g", "Percepatan gravitasi", 1.6, 25, 0.1, 9.8, "m/s²"],
        { k: "go", b: "Tembak" },
      ],
      on: function (k, v, st) {
        if (k === "go") {
          st.t = 0;
          st.f = 1;
        } else st.f = 0;
      },
      draw: function (g, w, h, dt, v, st) {
        var a = (v.ang * Math.PI) / 180,
          vx = v.v0 * Math.cos(a),
          vy = v.v0 * Math.sin(a),
          T = (2 * vy) / v.g,
          R = vx * T,
          H = (vy * vy) / (2 * v.g),
          X = Math.max(R, 1) * 1.1,
          Y = Math.max(H, 1) * 1.25,
          m = 44,
          s = Math.min((w - m - 16) / X, (h - m - 16) / Y),
          gy = h - m,
          i,
          p;
        function P(t) {
          return [m + vx * t * s, gy - (vy * t - (v.g * t * t) / 2) * s];
        }
        ln(g, m, gy, w - 8, gy, "#c5ccff", 2);
        ln(g, m, gy, m, 10, "#c5ccff", 2);
        for (i = 0; i <= 4; i++) {
          var xv = (X / 4) * i;
          tx(g, Math.round(xv) + " m", m + xv * s, gy + 16, "#c5ccff", 11, "center");
        }
        g.strokeStyle = "rgba(255,209,102,.55)";
        g.setLineDash([5, 5]);
        g.lineWidth = 2;
        g.beginPath();
        for (i = 0; i <= 60; i++) {
          p = P((T * i) / 60);
          i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]);
        }
        g.stroke();
        g.setLineDash([]);
        if (st.f) st.t = Math.min(T, st.t + dt);
        if (st.f) {
          g.strokeStyle = "#ff8040";
          g.lineWidth = 3;
          g.beginPath();
          for (i = 0; i <= 40; i++) {
            p = P((st.t * i) / 40);
            i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]);
          }
          g.stroke();
        }
        var q = P(st.f ? st.t : 0);
        g.fillStyle = "#ff8040";
        g.beginPath();
        g.arc(q[0], q[1], 9, 0, 7);
        g.fill();
        tx(g, "titik tertinggi", P(vy / v.g)[0], P(vy / v.g)[1] - 14, "#c5ccff", 11, "center");
        st.ro = [
          ["Jangkauan", f2(R, 1) + " m"],
          ["Tinggi maksimum", f2(H, 1) + " m"],
          ["Waktu terbang", f2(T) + " s"],
          ["Waktu berjalan", f2(st.f ? st.t : 0) + " s"],
        ];
      },
    },
    wi: {
      c: [
        ["A", "Amplitudo", 0.2, 1, 0.05, 0.6, "m"],
        ["f", "Frekuensi", 0.5, 3, 0.1, 1, "Hz"],
        ["L", "Panjang gelombang", 1, 5, 0.1, 3, "m"],
        { k: "ps", b: "Jeda / lanjut" },
      ],
      on: function (k, v, st) {
        if (k === "ps") st.p = !st.p;
      },
      draw: function (g, w, h, dt, v, st) {
        if (!st.p) st.t = (st.t || 0) + dt;
        var t = st.t || 0,
          W = 10,
          s = (w - 30) / W,
          y0 = h * 0.45,
          ay = h * 0.28,
          k = (2 * Math.PI) / v.L,
          om = 2 * Math.PI * v.f,
          i,
          x;
        function Y(x) {
          return y0 - v.A * Math.sin(k * x - om * t) * ay;
        }
        ln(g, 15, y0, w - 15, y0, "rgba(255,255,255,.25)", 1);
        g.strokeStyle = "#3fa2ff";
        g.lineWidth = 3;
        g.beginPath();
        for (i = 0; i <= 240; i++) {
          x = (W * i) / 240;
          i ? g.lineTo(15 + x * s, Y(x)) : g.moveTo(15 + x * s, Y(x));
        }
        g.stroke();
        var px = 2.5;
        ln(
          g,
          15 + px * s,
          y0 - ay - 6,
          15 + px * s,
          y0 + ay + 6,
          "rgba(255,255,255,.25)",
          1,
          [3, 4],
        );
        g.fillStyle = "#ff8040";
        g.beginPath();
        g.arc(15 + px * s, Y(px), 7, 0, 7);
        g.fill();
        var x1 = ((((Math.PI / 2 + om * t) / k) % v.L) + v.L) % v.L,
          yb = y0 + ay + 24,
          a = 15 + x1 * s,
          b = 15 + (x1 + v.L) * s;
        ln(g, a, yb, b, yb, "#ffd23f", 2);
        ln(g, a, yb - 6, a, yb + 6, "#ffd23f", 2);
        ln(g, b, yb - 6, b, yb + 6, "#ffd23f", 2);
        tx(g, "λ = " + f2(v.L, 1) + " m", (a + b) / 2, yb + 16, "#ffd23f", 13, "center");
        tx(g, "titik merah: satu partikel yang hanya naik-turun", 15, 16, "#c5ccff", 12);
        st.ro = [
          ["Kecepatan rambat v = f × λ", f2(v.f * v.L) + " m/s"],
          ["Periode T = 1/f", f2(1 / v.f) + " s"],
          ["Amplitudo", f2(v.A) + " m"],
        ];
      },
    },
    phs: {
      c: [["ph", "pH larutan", 0, 14, 0.1, 7, ""], { k: "z", l: "Contoh zat", o: ZAT }],
      on: function (k, v, st, set) {
        if (k === "z" && v.z >= 0) set("ph", v.z);
        else if (k === "ph") set("z", -1);
      },
      draw: function (g, w, h, dt, v, st) {
        var ph = v.ph,
          i,
          p,
          hue = ph <= 7 ? (ph / 7) * 120 : 120 + ((ph - 7) / 7) * 160,
          nH = Math.round((40 * (14 - ph)) / 14),
          nO = Math.round((40 * ph) / 14),
          bx = w * 0.08,
          bw = Math.min(w * 0.4, 260),
          top = h * 0.1,
          bot = h * 0.66,
          key = nH + "/" + nO;
        if (st.k !== key || !st.p) {
          st.k = key;
          st.p = [];
          for (i = 0; i < nH + nO; i++)
            st.p.push({
              x: bx + 10 + Math.random() * (bw - 20),
              y: top + 40 + Math.random() * (bot - top - 50),
              vx: (Math.random() - 0.5) * 50,
              vy: (Math.random() - 0.5) * 50,
              h: i < nH,
            });
        }
        g.fillStyle = "hsla(" + hue + ",80%,52%,.85)";
        g.fillRect(bx, top + 30, bw, bot - top - 30);
        g.strokeStyle = "#f2f4ff";
        g.lineWidth = 3;
        g.beginPath();
        g.moveTo(bx, top);
        g.lineTo(bx, bot);
        g.lineTo(bx + bw, bot);
        g.lineTo(bx + bw, top);
        g.stroke();
        st.p.forEach(function (q) {
          q.x += q.vx * dt;
          q.y += q.vy * dt;
          if (q.x < bx + 8 || q.x > bx + bw - 8) q.vx *= -1;
          if (q.y < top + 38 || q.y > bot - 8) q.vy *= -1;
          g.fillStyle = q.h ? "#ff8040" : "#101a3d";
          g.beginPath();
          g.arc(q.x, q.y, 6, 0, 7);
          g.fill();
          tx(g, q.h ? "+" : "−", q.x, q.y, "#fff", 11, "center");
        });
        var cx = w * 0.08 + bw + 24;
        tx(g, "pH " + f2(ph, 1), cx, h * 0.2, "#fff4e0", Math.min(30, w / 14));
        tx(
          g,
          ph < 6.95 ? "Asam" : ph > 7.05 ? "Basa" : "Netral",
          cx,
          h * 0.34,
          "hsl(" + hue + ",85%,62%)",
          20,
        );
        tx(g, "● H⁺ (oranye)", cx, h * 0.46, "#ff8040", 13);
        tx(g, "● OH⁻ (gelap)", cx, h * 0.53, "#f2f4ff", 13);
        tx(g, "jumlah partikel: gambaran kualitatif", cx, h * 0.6, "#c5ccff", 11);
        var sx = w * 0.06,
          sw = w * 0.88,
          sy = h * 0.82;
        for (i = 0; i <= sw; i += 4) {
          var pp = (i / sw) * 14;
          g.fillStyle =
            "hsl(" + (pp <= 7 ? (pp / 7) * 120 : 120 + ((pp - 7) / 7) * 160) + ",80%,52%)";
          g.fillRect(sx + i, sy, 5, 16);
        }
        var mxp = sx + (ph / 14) * sw;
        g.fillStyle = "#fff";
        g.beginPath();
        g.moveTo(mxp, sy - 2);
        g.lineTo(mxp - 7, sy - 12);
        g.lineTo(mxp + 7, sy - 12);
        g.fill();
        tx(g, "0 Asam", sx, sy + 30, "#c5ccff", 12);
        tx(g, "7 Netral", sx + sw / 2, sy + 30, "#c5ccff", 12, "center");
        tx(g, "Basa 14", sx + sw, sy + 30, "#c5ccff", 12, "right");
        st.ro = [
          ["[H⁺]", sci(Math.pow(10, -ph)) + " mol/L"],
          ["[OH⁻]", sci(Math.pow(10, ph - 14)) + " mol/L"],
          ["pOH", f2(14 - ph, 1)],
        ];
      },
    },
  };
  var OSTEPS = {
    pm: [
      "Atur kecepatan awal, sudut, dan gravitasi. Garis putus-putus adalah lintasan yang diprediksi.",
      "Tekan Tembak dan amati bola bergerak sepanjang lintasan.",
      "Ubah sudut menjadi 15°, 30°, 45°, 60°, dan 75° dengan kecepatan sama, lalu catat jangkauan tiap sudut.",
      "Ubah gravitasi (misalnya 1,6 m/s² seperti di Bulan) dan bandingkan jangkauan serta tinggi maksimumnya.",
    ],
    wi: [
      "Ubah amplitudo dan amati tinggi gelombang. Perhatikan titik merah, ia hanya naik-turun.",
      "Ubah frekuensi dan amati perubahan periode serta kecepatan rambat.",
      "Ubah panjang gelombang dan cocokkan tanda λ dengan jarak dua puncak berurutan.",
      "Tekan Jeda untuk menghentikan gelombang, lalu ukur λ dengan teliti.",
    ],
    phs: [
      "Geser pH dari 0 sampai 14 dan amati warna larutan serta jumlah partikel H⁺ dan OH⁻.",
      "Catat [H⁺] dan [OH⁻] pada pH 3, 7, dan 11.",
      "Pilih contoh zat sehari-hari dan tentukan sifatnya.",
      "Bandingkan [H⁺] pada pH 3 dan pH 4 untuk melihat bahwa tiap satu satuan pH berbeda 10 kali.",
    ],
  };
  function cir(g, x, y, r, c) {
    g.fillStyle = c;
    g.beginPath();
    g.arc(x, y, r, 0, 7);
    g.fill();
  }
  function ell(g, x, y, rx, ry, f, s) {
    g.beginPath();
    g.ellipse(x, y, rx, ry, 0, 0, 7);
    if (f) {
      g.fillStyle = f;
      g.fill();
    }
    if (s) {
      g.strokeStyle = s;
      g.lineWidth = 2;
      g.stroke();
    }
  }
  var BC = { A: "#ff5c7a", T: "#3fa2ff", G: "#2fe6a0", C: "#ffd23f" };
  OWN.esp = {
    c: [
      ["m", "Massa", 0.2, 2, 0.1, 1, "kg"],
      ["mu", "Gesekan", 0, 0.4, 0.02, 0, ""],
      { k: "rl", b: "Lepaskan dari atas" },
    ],
    on: function (k, v, st) {
      st.x = -1.2;
      st.v = 0;
    },
    draw: function (g, w, h, dt, v, st) {
      if (st.x == null) {
        st.x = -1.2;
        st.v = 0;
      }
      var G = 9.8,
        H = function (x) {
          return 1.5 * x * x;
        },
        cx = w * 0.34,
        sx = w * 0.2,
        y0 = h * 0.8,
        sy = h * 0.19,
        i,
        e0 = v.m * G * H(-1.2);
      for (i = 0; i < 8; i++) {
        var d = dt / 8,
          sl = 3 * st.x,
          a = (-G * sl) / (1 + sl * sl) - (v.mu * G * Math.sign(st.v)) / Math.sqrt(1 + sl * sl),
          nv = st.v + a * d;
        if (st.v && Math.sign(nv) !== Math.sign(st.v) && Math.abs(sl) < v.mu) nv = 0;
        st.v = nv;
        st.x += nv * d;
        if (Math.abs(st.x) > 1.45) {
          st.x = Math.sign(st.x) * 1.45;
          st.v = 0;
        }
      }
      var X = function (x) {
          return cx + x * sx;
        },
        Y = function (x) {
          return y0 - H(x) * sy;
        };
      g.strokeStyle = "#c5ccff";
      g.lineWidth = 4;
      g.beginPath();
      for (i = 0; i <= 60; i++) {
        var q = -1.5 + i * 0.05;
        i ? g.lineTo(X(q), Y(q)) : g.moveTo(X(q), Y(q));
      }
      g.stroke();
      cir(g, X(st.x), Y(st.x) - 10, 10, "#ff8040");
      var s2 = 3 * st.x,
        pe = v.m * G * H(st.x),
        ke = 0.5 * v.m * st.v * st.v * (1 + s2 * s2),
        th = Math.max(0, e0 - pe - ke),
        bs = (h * 0.55) / e0,
        bx = w * 0.66;
      [
        ["Kinetik", ke, "#ff8040"],
        ["Potensial", pe, "#3fa2ff"],
        ["Termal", th, "#ff5c7a"],
      ].forEach(function (b, j) {
        var bh = Math.min(h * 0.6, b[1] * bs);
        g.fillStyle = b[2];
        g.fillRect(bx + j * w * 0.11, h * 0.82 - bh, w * 0.08, bh);
        tx(g, b[0], bx + j * w * 0.11 + w * 0.04, h * 0.9, "#f2f4ff", 11, "center");
      });
      st.ro = [
        ["Kecepatan", f2(Math.abs(st.v) * Math.sqrt(1 + s2 * s2)) + " m/s"],
        ["Tinggi", f2(H(st.x)) + " m"],
        ["Energi total", f2(e0) + " J"],
      ];
    },
  };
  OWN.gao = {
    c: [
      ["M", "Massa bintang", 0.5, 3, 0.1, 1, "×"],
      ["u", "Kecepatan awal (1 = orbit lingkaran)", 0.4, 1.4, 0.05, 1, "×"],
      { k: "rs", b: "Ulangi" },
    ],
    on: function (k, v, st) {
      st.init = 0;
    },
    draw: function (g, w, h, dt, v, st) {
      if (!st.init) {
        st.init = 1;
        st.x = 1;
        st.y = 0;
        st.vx = 0;
        st.vy = v.u * Math.sqrt(v.M);
        st.tr = [];
      }
      var i,
        sc = Math.min(w, h) / 6,
        r;
      for (i = 0; i < 40; i++) {
        var d = dt / 40,
          r2 = Math.max(0.01, st.x * st.x + st.y * st.y),
          a = -v.M / (r2 * Math.sqrt(r2));
        st.vx += a * st.x * d;
        st.vy += a * st.y * d;
        st.x += st.vx * d;
        st.y += st.vy * d;
      }
      r = Math.sqrt(st.x * st.x + st.y * st.y);
      st.tr.push([st.x, st.y]);
      if (st.tr.length > 400) st.tr.shift();
      g.strokeStyle = "rgba(255,209,102,.5)";
      g.lineWidth = 2;
      g.beginPath();
      st.tr.forEach(function (p, j) {
        j
          ? g.lineTo(w / 2 + p[0] * sc, h / 2 + p[1] * sc)
          : g.moveTo(w / 2 + p[0] * sc, h / 2 + p[1] * sc);
      });
      g.stroke();
      cir(g, w / 2, h / 2, 10 + 4 * v.M, "#ffd23f");
      cir(g, w / 2 + st.x * sc, h / 2 + st.y * sc, 7, "#3fa2ff");
      st.ro = [
        ["Jarak ke bintang", f2(r) + " satuan"],
        ["Kecepatan", f2(Math.hypot(st.vx, st.vy))],
        ["Gaya gravitasi", f2(v.M / (r * r)) + " (relatif)"],
      ];
    },
  };
  OWN.ms = {
    c: [
      ["b", "Pasangan elektron ikatan", 1, 6, 1, 2, ""],
      ["l", "Pasangan elektron bebas", 0, 3, 1, 0, ""],
    ],
    draw: function (g, w, h, dt, v, st) {
      var N = {
          "2,0": ["Linear", "180°"],
          "3,0": ["Segitiga planar", "120°"],
          "2,1": ["Bentuk V", "< 120°"],
          "4,0": ["Tetrahedral", "109,5°"],
          "3,1": ["Piramida trigonal", "< 109,5°"],
          "2,2": ["Bentuk V", "< 109,5°"],
          "5,0": ["Bipiramida trigonal", "90° dan 120°"],
          "4,1": ["Jungkat-jungkit", "< 90° dan < 120°"],
          "6,0": ["Oktahedral", "90°"],
          "5,1": ["Piramida segiempat", "< 90°"],
          "4,2": ["Segiempat planar", "90°"],
        },
        t = v.b + v.l,
        r = N[v.b + "," + v.l],
        cx = w * 0.4,
        cy = h * 0.5,
        R = Math.min(w, h) * 0.34,
        i;
      st.t = (st.t || 0) + dt * 0.4;
      for (i = 0; i < t; i++) {
        var a = st.t + (i * 2 * Math.PI) / t,
          x = cx + Math.cos(a) * R,
          y = cy + Math.sin(a) * R;
        if (i < v.b) {
          ln(g, cx, cy, x, y, "#f2f4ff", 4);
          cir(g, x, y, 15, "#3fa2ff");
        } else {
          var px = -Math.sin(a) * 8,
            py = Math.cos(a) * 8,
            lx = cx + Math.cos(a) * R * 0.65,
            ly = cy + Math.sin(a) * R * 0.65;
          ell(g, lx, ly, 22, 13, "rgba(255,209,102,.25)");
          cir(g, lx + px, ly + py, 4, "#ffd23f");
          cir(g, lx - px, ly - py, 4, "#ffd23f");
        }
      }
      cir(g, cx, cy, 22, "#ff8040");
      tx(g, "● atom terikat   ◖ pasangan bebas", w * 0.05, 18, "#c5ccff", 12);
      st.ro = [
        ["Bentuk molekul", t > 6 ? "Tidak mungkin" : r ? r[0] : "Kombinasi tidak umum"],
        ["Sudut ikatan", r ? r[1] : "–"],
        ["Domain elektron", t],
      ];
    },
  };
  OWN.mp = {
    c: [
      ["a", "Keelektronegatifan atom A", 0.7, 4, 0.1, 2.1, ""],
      ["b", "Keelektronegatifan atom B", 0.7, 4, 0.1, 3.5, ""],
    ],
    draw: function (g, w, h, dt, v, st) {
      var d = v.b - v.a,
        ad = Math.abs(d),
        ax = w * 0.3,
        bx = w * 0.7,
        y = h * 0.42,
        sh = Math.max(-1, Math.min(1, d / 3)) * 70,
        mx = (ax + bx) / 2 + sh,
        type = ad < 0.4 ? "Kovalen nonpolar" : ad < 1.7 ? "Kovalen polar" : "Ion",
        gr = g.createRadialGradient(mx, y, 5, mx, y, w * 0.3);
      gr.addColorStop(0, "rgba(61,220,151,.65)");
      gr.addColorStop(1, "rgba(61,220,151,0)");
      g.fillStyle = gr;
      g.fillRect(0, 0, w, h * 0.8);
      cir(g, ax, y, 34, "#ff8040");
      cir(g, bx, y, 34, "#3fa2ff");
      tx(g, "A", ax, y, "#fff", 18, "center");
      tx(g, "B", bx, y, "#fff", 18, "center");
      if (ad >= 0.4) {
        var neg = d > 0 ? bx : ax,
          pos = d > 0 ? ax : bx,
          ion = ad >= 1.7;
        tx(g, ion ? "−" : "δ−", neg, y - 52, "#2fe6a0", 18, "center");
        tx(g, ion ? "+" : "δ+", pos, y - 52, "#ffd23f", 18, "center");
        var s = d > 0 ? 1 : -1;
        arrow(g, w / 2 - s * ad * 25, h * 0.78, w / 2 + s * ad * 25, "#ffd23f");
        tx(g, "arah momen dipol", w / 2, h * 0.88, "#c5ccff", 12, "center");
      }
      st.ro = [
        ["Selisih keelektronegatifan", f2(ad, 1)],
        ["Jenis ikatan", type],
        ["Molekul", ad < 0.4 ? "Nonpolar" : "Polar"],
      ];
    },
  };
  OWN.mt = {
    c: [
      {
        k: "mode",
        l: "Jenis transpor",
        o: [
          ["Difusi sederhana", 0],
          ["Membran tidak tembus", 1],
          ["Transpor aktif (pompa, butuh ATP)", 2],
        ],
      },
      ["o", "Partikel di luar sel", 0, 40, 1, 30, ""],
      ["i", "Partikel di dalam sel", 0, 40, 1, 6, ""],
      { k: "rs", b: "Ulangi" },
    ],
    on: function (k, v, st) {
      st.p = null;
    },
    draw: function (g, w, h, dt, v, st) {
      var mid = w / 2,
        pores = [0.25, 0.5, 0.75],
        i,
        L = 0,
        Rr = 0;
      if (!st.p) {
        st.p = [];
        st.pt = 0;
        for (i = 0; i < v.o + v.i; i++) {
          var out = i < v.o;
          st.p.push({
            x: out ? 10 + Math.random() * (mid - 30) : mid + 20 + Math.random() * (mid - 30),
            y: 15 + Math.random() * (h - 30),
            vx: (Math.random() - 0.5) * 60,
            vy: (Math.random() - 0.5) * 60,
          });
        }
      }
      st.p.forEach(function (q) {
        var ox = q.x;
        q.vx += (Math.random() - 0.5) * 300 * dt;
        q.vy += (Math.random() - 0.5) * 300 * dt;
        var s = Math.hypot(q.vx, q.vy);
        if (s > 70) {
          q.vx *= 70 / s;
          q.vy *= 70 / s;
        }
        q.x += q.vx * dt;
        q.y += q.vy * dt;
        if (q.y < 8 || q.y > h - 8) q.vy *= -1;
        if (q.x < 6 || q.x > w - 6) q.vx *= -1;
        if (ox < mid !== q.x < mid) {
          var near = pores.some(function (f) {
            return Math.abs(q.y - h * f) < 14;
          });
          if (!(+v.mode === 0 && near)) {
            q.x = ox;
            q.vx *= -1;
          }
        }
        if (q.x < mid) L++;
        else Rr++;
      });
      if (+v.mode === 2) {
        st.pt += dt;
        if (st.pt > 0.4) {
          st.pt = 0;
          var fromL = L < Rr,
            c = st.p.filter(function (q) {
              return fromL ? q.x < mid : q.x >= mid;
            });
          if (c.length) {
            var q = c[Math.floor(Math.random() * c.length)];
            q.x = fromL ? mid + 14 : mid - 14;
            q.y = h * 0.5;
          }
        }
      }
      g.fillStyle = "#98a2e0";
      g.fillRect(mid - 4, 0, 8, h);
      pores.forEach(function (f) {
        if (+v.mode === 0) g.clearRect(mid - 5, h * f - 14, 10, 28);
        else if (+v.mode === 2 && f === 0.5) {
          g.clearRect(mid - 5, h * f - 14, 10, 28);
          cir(g, mid, h * f, 12, "#2fe6a0");
        }
      });
      if (+v.mode === 2) tx(g, "pompa", mid + 16, h * 0.5 - 20, "#2fe6a0", 11);
      st.p.forEach(function (q) {
        cir(g, q.x, q.y, 5, "#ffd23f");
      });
      tx(g, "Luar sel", 12, 16, "#c5ccff", 12);
      tx(g, "Dalam sel", mid + 14, 16, "#c5ccff", 12);
      st.ro = [
        ["Di luar sel", L],
        ["Di dalam sel", Rr],
        ["Selisih", Math.abs(L - Rr)],
      ];
    },
  };
  OWN.neu = {
    c: [["s", "Kekuatan stimulus", 0, 100, 5, 60, ""], { k: "go", b: "Beri stimulus" }],
    on: function (k, v, st) {
      if (k === "go") {
        st.t = 0;
        st.fire = v.s >= 40;
        st.amp = v.s;
        st.h = [];
      }
    },
    draw: function (g, w, h, dt, v, st) {
      var V = -70,
        u = 0,
        i;
      st.h = st.h || [];
      if (st.t != null) {
        st.t += dt;
        u = st.t * 8;
        if (st.fire)
          V =
            u < 0.5
              ? -70 + (15 * u) / 0.5
              : u < 1.5
                ? -55 + 95 * (u - 0.5)
                : u < 3
                  ? 40 - (125 * (u - 1.5)) / 1.5
                  : u < 5
                    ? -85 + (15 * (u - 3)) / 2
                    : -70;
        else V = -70 + 0.3 * st.amp * Math.max(0, 1 - Math.abs(u - 0.7) / 0.7);
        if (u < 7) st.h.push(V);
      }
      ell(g, w * 0.1, h * 0.22, 26, 26, "#7a5cf0");
      ln(g, w * 0.1 + 26, h * 0.22, w * 0.92, h * 0.22, "#c5ccff", 4);
      for (i = 0; i < 3; i++)
        ln(g, w * 0.92, h * 0.22, w * 0.97, h * 0.22 - 12 + i * 12, "#c5ccff", 3);
      if (st.fire && st.t != null) {
        var p = Math.min(1, st.t / 1.3);
        cir(g, w * 0.1 + 26 + p * (w * 0.82 - 26), h * 0.22, 9, "rgba(255,209,102,.9)");
      }
      var gx = w * 0.1,
        gw = w * 0.82,
        gy = function (V) {
          return h * 0.88 - ((V + 90) / 140) * h * 0.5;
        };
      ln(g, gx, gy(-90), gx + gw, gy(-90), "#c5ccff", 1);
      ln(g, gx, gy(-55), gx + gw, gy(-55), "#ff5c7a", 1, [5, 4]);
      tx(g, "ambang −55 mV", gx + gw, gy(-55) - 8, "#ff5c7a", 11, "right");
      tx(g, "istirahat −70 mV", gx, gy(-70) + 12, "#c5ccff", 11);
      g.strokeStyle = "#2fe6a0";
      g.lineWidth = 3;
      g.beginPath();
      st.h.forEach(function (q, j) {
        j ? g.lineTo(gx + j * 3, gy(q)) : g.moveTo(gx + j * 3, gy(q));
      });
      g.stroke();
      st.ro = [
        ["Potensial membran", f2(V, 0) + " mV"],
        [
          "Status",
          st.t == null
            ? "Istirahat"
            : st.fire
              ? "Potensial aksi (stimulus melewati ambang)"
              : "Di bawah ambang: tidak ada potensial aksi",
        ],
      ];
    },
  };
  OWN.pho = {
    c: [
      ["li", "Intensitas cahaya", 0, 100, 5, 70, "%"],
      ["co", "Konsentrasi CO₂", 0, 100, 5, 60, "%"],
      ["tp", "Suhu", 0, 50, 1, 28, "°C"],
    ],
    draw: function (g, w, h, dt, v, st) {
      var tf = Math.exp(-Math.pow((v.tp - 28) / 12, 2)),
        rate = Math.min(v.li / 100, v.co / 100, tf) * 100,
        i,
        n = Math.round(v.li / 12);
      st.b = st.b || [];
      st.c = st.c || [];
      st.sp = (st.sp || 0) + ((dt * rate) / 100) * 6;
      while (st.sp >= 1) {
        st.sp--;
        st.b.push({ x: w * 0.4 + Math.random() * w * 0.2, y: h * 0.55 });
      }
      st.b.forEach(function (q) {
        q.y -= 45 * dt;
        q.x += Math.sin(q.y / 12) * 0.4;
      });
      st.b = st.b.filter(function (q) {
        return q.y > 0;
      });
      var nc = Math.round(v.co / 8);
      while (st.c.length < nc)
        st.c.push({ x: Math.random() * w * 0.3, y: h * 0.3 + Math.random() * h * 0.4 });
      st.c.length = nc;
      st.c.forEach(function (q) {
        q.x += 30 * dt;
        if (q.x > w * 0.4) {
          q.x = 0;
          q.y = h * 0.3 + Math.random() * h * 0.4;
        }
      });
      cir(g, w * 0.1, h * 0.12, 18, "#ffd23f");
      for (i = 0; i < n; i++) {
        var a = (i * Math.PI) / 2 / Math.max(1, n - 1);
        ln(
          g,
          w * 0.1 + Math.cos(a) * 26,
          h * 0.12 + Math.sin(a) * 26,
          w * 0.1 + Math.cos(a) * 44,
          h * 0.12 + Math.sin(a) * 44,
          "#ffd23f",
          3,
        );
      }
      ell(g, w * 0.5, h * 0.68, w * 0.17, h * 0.1, "#2fb87a");
      ln(g, w * 0.35, h * 0.68, w * 0.65, h * 0.68, "#1c7a52", 2);
      st.c.forEach(function (q) {
        cir(g, q.x, q.y, 4, "#c5ccff");
      });
      st.b.forEach(function (q) {
        ell(g, q.x, q.y, 4, 4, null, "#3fa2ff");
      });
      tx(g, "CO₂ masuk", w * 0.05, h * 0.82, "#c5ccff", 12);
      tx(g, "O₂ keluar", w * 0.5, h * 0.4, "#3fa2ff", 12, "center");
      g.fillStyle = "rgba(255,255,255,.1)";
      g.fillRect(w * 0.85, h * 0.1, w * 0.06, h * 0.7);
      g.fillStyle = "#2fe6a0";
      g.fillRect(w * 0.85, h * 0.8 - (h * 0.7 * rate) / 100, w * 0.06, (h * 0.7 * rate) / 100);
      tx(g, "laju", w * 0.88, h * 0.86, "#f2f4ff", 12, "center");
      var lim = Math.min(v.li / 100, v.co / 100, tf),
        nm =
          lim === tf && tf < Math.min(v.li, v.co) / 100 ? "suhu" : v.li <= v.co ? "cahaya" : "CO₂";
      st.ro = [
        ["Laju fotosintesis", f2(rate, 0) + "%"],
        ["Faktor pembatas", nm],
      ];
    },
  };
  OWN.mit = {
    c: [["s", "Tahap", 0, 4, 1, 0, ""], { k: "pl", b: "Putar otomatis / berhenti" }],
    on: function (k, v, st, set) {
      if (k === "pl") {
        st.a = !st.a;
        st.tt = 0;
      }
      st.set = set;
    },
    draw: function (g, w, h, dt, v, st) {
      var NM = ["Interfase", "Profase", "Metafase", "Anafase", "Telofase dan sitokinesis"],
        DS = [
          "DNA berupa benang kromatin dan sudah digandakan.",
          "Kromatin memadat menjadi kromosom, membran inti mulai hilang.",
          "Kromosom berjajar di bidang tengah sel.",
          "Kromatid saudara ditarik ke kutub yang berlawanan.",
          "Dua inti terbentuk dan sitoplasma membelah.",
        ],
        cx = w / 2,
        cy = h * 0.46,
        s = v.s,
        i,
        ys = [-0.2, -0.07, 0.07, 0.2],
        cl = ["#ff5c7a", "#3fa2ff", "#ff5c7a", "#3fa2ff"];
      if (st.a) {
        st.tt = (st.tt || 0) + dt;
        if (st.tt > 1.6) {
          st.tt = 0;
          v.s = (v.s + 1) % 5;
          if (st.set) st.set("s", v.s);
          s = v.s;
        }
      }
      function X(x, y, c) {
        ln(g, x - 8, y - 8, x + 8, y + 8, c, 4);
        ln(g, x - 8, y + 8, x + 8, y - 8, c, 4);
      }
      if (s < 4) {
        ell(g, cx, cy, w * 0.3, h * 0.36, "rgba(255,255,255,.14)", "#f2f4ff");
        if (s === 0) {
          ell(g, cx, cy, h * 0.22, h * 0.22, null, "#c5ccff");
          for (i = 0; i < 4; i++) {
            g.strokeStyle = cl[i];
            g.lineWidth = 2;
            g.beginPath();
            g.arc(cx + (i - 1.5) * 26, cy, 12, 0, 5);
            g.stroke();
          }
        } else
          for (i = 0; i < 4; i++) {
            var y = cy + ys[i] * h;
            if (s === 1) {
              var x = cx + (i % 2 ? 1 : -1) * (25 + i * 10);
              X(x, cy + (i - 1.5) * 34, cl[i]);
            } else if (s === 2) {
              if (s === 2) ln(g, cx - w * 0.3, y, cx + w * 0.3, y, "rgba(255,255,255,.22)", 1);
              X(cx, y, cl[i]);
            } else {
              ln(g, cx - w * 0.26, cy, cx, y, "rgba(255,255,255,.22)", 1);
              ln(g, cx + w * 0.26, cy, cx, y, "rgba(255,255,255,.22)", 1);
              ln(g, cx - w * 0.16 - 8, y - 8, cx - w * 0.16 + 8, y + 8, cl[i], 4);
              ln(g, cx + w * 0.16 - 8, y - 8, cx + w * 0.16 + 8, y + 8, cl[i], 4);
            }
          }
      } else
        [-1, 1].forEach(function (d) {
          var x = cx + d * w * 0.2;
          ell(g, x, cy, w * 0.17, h * 0.34, "rgba(255,255,255,.14)", "#f2f4ff");
          ell(g, x, cy, h * 0.16, h * 0.16, null, "#c5ccff");
          for (i = 0; i < 4; i++) {
            g.strokeStyle = cl[i];
            g.lineWidth = 2;
            g.beginPath();
            g.arc(x + (i - 1.5) * 18, cy, 8, 0, 5);
            g.stroke();
          }
        });
      st.ro = [
        ["Tahap", NM[s]],
        ["Keterangan", DS[s]],
        ["Hasil akhir", s === 4 ? "2 sel anak identik (diploid)" : "belum terbentuk"],
      ];
    },
  };
  Object.assign(OSTEPS, {
    esp: [
      "Tekan Lepaskan dari atas dan amati diagram batang energi saat bola bergerak.",
      "Naikkan gesekan dan perhatikan energi termal bertambah serta tinggi ayunan berkurang.",
      "Ubah massa dan bandingkan besar energi total.",
    ],
    gao: [
      "Biarkan kecepatan awal 1× dan amati orbit lingkaran.",
      "Ubah kecepatan awal menjadi 0,7× dan 1,2×, lalu amati bentuk orbit (elips).",
      "Naikkan massa bintang dan amati gaya serta kecepatan planet.",
    ],
    ms: [
      "Atur 2 pasangan ikatan dan 0 pasangan bebas, lalu amati bentuk linear.",
      "Tambah pasangan bebas dan catat perubahan bentuk serta sudut ikatan.",
      "Coba 4 ikatan, 3 ikatan 1 bebas, dan 2 ikatan 2 bebas.",
    ],
    mp: [
      "Samakan nilai keelektronegatifan A dan B, lalu amati ikatan nonpolar.",
      "Perbesar selisih dan amati awan elektron bergeser ke atom yang lebih elektronegatif.",
      "Buat selisih lebih dari 1,7 untuk ikatan ion.",
    ],
    mt: [
      "Pilih Difusi sederhana dan amati partikel pindah dari konsentrasi tinggi ke rendah.",
      "Pilih Membran tidak tembus lalu bandingkan.",
      "Pilih Transpor aktif dan amati pompa memindahkan partikel melawan gradien.",
    ],
    neu: [
      "Beri stimulus dengan kekuatan 30 dan amati grafik.",
      "Naikkan kekuatan stimulus melewati ambang dan amati potensial aksi.",
      "Perhatikan pulsa merambat sepanjang akson.",
    ],
    pho: [
      "Turunkan cahaya dan amati laju serta gelembung O₂.",
      "Turunkan CO₂ dan suhu satu per satu.",
      "Cari faktor pembatas pada tiap kombinasi.",
    ],
    mit: [
      "Geser tahap dari interfase sampai telofase.",
      "Tekan Putar otomatis dan amati urutan tahap.",
      "Catat posisi kromosom pada tiap tahap.",
    ],
  });
  S.forEach(function (s) {
    if (isOwn(s) && OSTEPS[s.id]) s.steps = OSTEPS[s.id];
  });
  function ctlHtml(s) {
    var d = OWN[s.id],
      h = '<div class="sm-ctls">';
    d.c.forEach(function (c) {
      if (Array.isArray(c))
        h +=
          '<label class="sm-c"><span>' +
          c[1] +
          '<b id="o_' +
          c[0] +
          '">' +
          String(c[5]).replace(".", ",") +
          (c[6] ? " " + c[6] : "") +
          '</b></span><input type="range" data-k="' +
          c[0] +
          '" data-u="' +
          c[6] +
          '" min="' +
          c[2] +
          '" max="' +
          c[3] +
          '" step="' +
          c[4] +
          '" value="' +
          c[5] +
          '"></label>';
      else if (c.row)
        h +=
          '<div class="sm-brow">' +
          c.row
            .map(function (b) {
              return (
                '<button type="button" class="sm-btn sm-alt" data-ctl="' +
                b.k +
                '">' +
                b.b +
                "</button>"
              );
            })
            .join("") +
          "</div>";
      else if (c.o)
        h +=
          '<label class="sm-c"><span>' +
          c.l +
          '</span><select data-k="' +
          c.k +
          '">' +
          c.o
            .map(function (o) {
              return '<option value="' + o[1] + '">' + o[0] + "</option>";
            })
            .join("") +
          "</select></label>";
      else
        h +=
          '<button type="button" class="sm-btn sm-alt" data-ctl="' + c.k + '">' + c.b + "</button>";
    });
    return h + '</div><div class="sm-ro" id="smRo"></div>';
  }
  function startOwn(s) {
    var d = OWN[s.id],
      v = {};
    d.c.forEach(function (c) {
      if (Array.isArray(c)) v[c[0]] = c[5];
      else if (c.o) v[c.k] = c.o[0][1];
    });
    SIM = { d: d, v: v, st: {}, t0: 0, ro: "" };
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(loop);
  }
  function setv(k, x) {
    if (!SIM) return;
    SIM.v[k] = x;
    var e = document.querySelector('#smPlay [data-k="' + k + '"]');
    if (e) {
      e.value = x;
      var o = $("o_" + k);
      if (o) o.textContent = String(x).replace(".", ",") + (e.dataset.u ? " " + e.dataset.u : "");
    }
  }
  function loop(ts) {
    raf = requestAnimationFrame(loop);
    var cv = $("smCv");
    if (!cv || !SIM) return;
    var r = cv.getBoundingClientRect(),
      dp = window.devicePixelRatio || 1,
      w = Math.round(r.width),
      h = Math.round(r.height);
    if (!w || !h) return;
    if (cv.width !== w * dp || cv.height !== h * dp) {
      cv.width = w * dp;
      cv.height = h * dp;
    }
    var g = cv.getContext("2d");
    g.setTransform(dp, 0, 0, dp, 0, 0);
    g.clearRect(0, 0, w, h);
    var dt = SIM.t0 ? Math.min(0.05, (ts - SIM.t0) / 1000) : 0;
    SIM.t0 = ts;
    SIM.d.draw(g, w, h, dt, SIM.v, SIM.st);
    var html = (SIM.st.ro || [])
        .map(function (x) {
          return "<div>" + x[0] + "<b>" + x[1] + "</b></div>";
        })
        .join(""),
      e = $("smRo");
    if (e && html !== SIM.ro) {
      SIM.ro = html;
      e.innerHTML = html;
    }
  }
  $("smPlay").addEventListener("input", function (e) {
    var k = e.target.dataset && e.target.dataset.k;
    if (!k || !SIM) return;
    SIM.v[k] = +e.target.value;
    var o = $("o_" + k);
    if (o)
      o.textContent =
        e.target.value.replace(".", ",") + (e.target.dataset.u ? " " + e.target.dataset.u : "");
    if (SIM.d.on) SIM.d.on(k, SIM.v, SIM.st, setv);
  });
  $("smPlay").addEventListener("click", function (e) {
    var b = e.target.closest("[data-ctl]");
    if (b && SIM && SIM.d.on) SIM.d.on(b.dataset.ctl, SIM.v, SIM.st, setv);
  });
  function phetRun(s, lang) {
    var z = s.src.slug;
    return "https://phet.colorado.edu/sims/html/" + z + "/latest/" + z + "_all.html?locale=" + lang;
  }
  function isPhet(s) {
    return s.src.k === "phet";
  }
  var cur = null,
    scrollY0 = 0;
  function showCat() {
    $("smCat").hidden = false;
    $("smPlay").hidden = true;
  }
  function openCat() {
    if (window.bbView) window.bbView("home");
    main.style.display = "none";
    root.hidden = false;
    killPlayer();
    showCat();
    renderCat();
    window.scrollTo(0, 0);
  }
  function closeAll() {
    killPlayer();
    root.hidden = true;
    main.style.display = "";
    if (window.bbView) window.bbView("home");
  }
  function openSim(id, keepScroll) {
    var s = byId(id);
    if (!s) return;
    if (!keepScroll) scrollY0 = window.pageYOffset || 0;
    cur = s;
    renderPlay();
    $("smCat").hidden = true;
    $("smPlay").hidden = false;
    window.scrollTo(0, 0);
  }
  function backToCat() {
    killPlayer();
    showCat();
    renderCat();
    window.scrollTo(0, scrollY0);
  }
  var st = { subj: "Semua", topic: "Semua materi", fav: false, q: "" };
  function inSubj(s) {
    return st.subj === "Semua" || s.s === st.subj;
  }
  function match(s) {
    if (!inSubj(s)) return false;
    if (st.topic !== "Semua materi" && s.tp !== st.topic) return false;
    if (st.fav && !isFav(s.id)) return false;
    if (st.q) {
      var hay = norm([s.t, s.n, s.s, s.d, s.tp, s.tags.join(" "), s.kw].join(" "));
      var w = norm(st.q).split(/\s+/).filter(Boolean);
      for (var i = 0; i < w.length; i++) if (hay.indexOf(w[i]) < 0) return false;
    }
    return true;
  }
  function chip(label, pressed, attrs, icon) {
    return (
      '<button type="button" class="sm-chip" aria-pressed="' +
      (pressed ? "true" : "false") +
      '" ' +
      attrs +
      ">" +
      (icon ? ic(icon) : "") +
      esc(label) +
      "</button>"
    );
  }
  function counts() {
    var c = { Semua: S.length, Fisika: 0, Kimia: 0, Biologi: 0 };
    S.forEach(function (s) {
      c[s.s]++;
    });
    return c;
  }
  function cardHtml(s) {
    var fav = isFav(s.id);
    return (
      '<article class="sm-card" data-id="' +
      s.id +
      '">' +
      '<div class="sm-ch"><span class="sm-ico" style="background:' +
      COL[s.s] +
      '">' +
      ic(s.ic) +
      "</span>" +
      '<div class="sm-ct"><h3>' +
      esc(s.t) +
      '</h3><div class="sm-nm">' +
      esc(s.n) +
      "</div></div>" +
      '<button type="button" class="sm-fav" data-a="fav" aria-pressed="' +
      fav +
      '" aria-label="' +
      (fav ? "Hapus dari favorit" : "Tandai sebagai favorit") +
      ": " +
      esc(s.t) +
      '">' +
      ic(fav ? "starF" : "star") +
      "</button></div>" +
      '<div class="sm-badges"><span class="sm-bdg s-' +
      s.s +
      '">' +
      ic(SUBI[s.s]) +
      s.s +
      '</span><span class="sm-bdg"><i class="bi bi-' +
      LVI[s.lv] +
      '"></i>' +
      s.lv +
      '</span><span class="sm-bdg">' +
      (isOwn(s) ? "Buatan BrainBattle" : isPhet(s) ? "Tertanam" : "Situs eksternal") +
      "</span></div>" +
      '<p class="sm-d">' +
      esc(s.d) +
      "</p>" +
      '<div class="lb">Materi yang dipelajari</div><div class="sm-tags">' +
      s.tags
        .map(function (t) {
          return '<span class="sm-tag">' + esc(t) + "</span>";
        })
        .join("") +
      "</div>" +
      '<button type="button" class="sm-btn" data-a="open">' +
      ic("play") +
      "Mulai Simulasi</button></article>"
    );
  }
  function renderCat() {
    var c = counts(),
      h = "";
    h = ["Semua"]
      .concat(SUBJ)
      .map(function (n) {
        return chip(
          n + " (" + c[n] + ")",
          st.subj === n,
          'data-subj="' + n + '"',
          n === "Semua" ? null : SUBI[n],
        );
      })
      .join("");
    h += chip(
      "Favorit Saya (" + favs.filter(byId).length + ")",
      st.fav,
      'data-favf="1"',
      st.fav ? "starF" : "star",
    );
    $("smSubj").innerHTML = h;
    var tp = [];
    S.forEach(function (s) {
      if (inSubj(s) && tp.indexOf(s.tp) < 0) tp.push(s.tp);
    });
    if (st.topic !== "Semua materi" && tp.indexOf(st.topic) < 0) st.topic = "Semua materi";
    $("smTopic").innerHTML = ["Semua materi"]
      .concat(tp)
      .map(function (t) {
        return chip(t, st.topic === t, 'data-topic="' + esc(t) + '"');
      })
      .join("");
    var list = S.filter(match),
      out = "";
    SUBJ.forEach(function (sj) {
      var g = list.filter(function (s) {
        return s.s === sj;
      });
      if (!g.length) return;
      out +=
        '<div class="sm-gh"><span class="sm-gi" style="background:' +
        COL[sj] +
        '">' +
        ic(SUBI[sj]) +
        "</span>" +
        sj +
        " <small>" +
        g.length +
        ' simulasi</small></div><div class="sm-grid">' +
        g.map(cardHtml).join("") +
        "</div>";
    });
    if (!list.length) {
      var msg =
        st.fav && !favs.length && !st.q
          ? "Belum ada simulasi favorit. Tekan ikon bintang pada kartu simulasi untuk menyimpannya."
          : "Simulasi tidak ditemukan. Coba kata kunci atau kategori lainnya.";
      out =
        '<div class="sm-empty">' +
        (window.brain ? window.brain("sad", 90, true) : "") +
        "<div>" +
        msg +
        "</div></div>";
    }
    $("smList").innerHTML = out;
    $("smCount").textContent = list.length ? list.length + " dari " + S.length + " simulasi" : "";
  }
  var loadT = null,
    pseudoFS = false;
  function killPlayer() {
    clearTimeout(loadT);
    loadT = null;
    cancelAnimationFrame(raf);
    SIM = null;
    setPseudoFS(false);
    try {
      if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen();
    } catch (e) {}
    $("smPlay").innerHTML = "";
    cur = null;
  }
  function setPseudoFS(on) {
    var f = $("smFrame");
    pseudoFS = !!on;
    if (f) f.classList.toggle("sm-fs", pseudoFS);
    document.body.style.overflow = pseudoFS ? "hidden" : "";
  }
  function goFS() {
    var f = $("smFrame");
    if (!f) return;
    var rq = f.requestFullscreen || f.webkitRequestFullscreen;
    if (rq) {
      try {
        var p = rq.call(f);
        if (p && p.catch)
          p.catch(function () {
            setPseudoFS(true);
          });
        return;
      } catch (e) {}
    }
    setPseudoFS(true);
  }
  function exitFS() {
    if (pseudoFS) {
      setPseudoFS(false);
      return;
    }
    try {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    } catch (e) {}
  }
  function li(a, tag) {
    return (
      "<" +
      tag +
      ">" +
      a
        .map(function (x) {
          return "<li>" + esc(x) + "</li>";
        })
        .join("") +
      "</" +
      tag +
      ">"
    );
  }
  function renderPlay() {
    var s = cur,
      ph = isPhet(s),
      ow = isOwn(s),
      lang = sget(KL, "in"),
      h = "",
      fav = isFav(s.id),
      link;
    link = ph ? phetRun(s, lang) : ow ? "" : s.src.url;
    h +=
      '<div class="sm-bar"><button type="button" class="life sm-lbtn" data-a="back">' +
      ic("back") +
      " Kembali ke Katalog</button></div>";
    h +=
      '<div class="sm-ph"><span class="sm-ico" style="background:' +
      COL[s.s] +
      '">' +
      ic(s.ic) +
      '</span><div><div class="sm-t2">' +
      esc(s.t) +
      '</div><div class="sm-nm">' +
      esc(s.n) +
      "</div></div></div>";
    h +=
      '<div class="sm-badges"><span class="sm-bdg s-' +
      s.s +
      '">' +
      ic(SUBI[s.s]) +
      s.s +
      '</span><span class="sm-bdg"><i class="bi bi-' +
      LVI[s.lv] +
      '"></i>' +
      s.lv +
      '</span><span class="sm-bdg">' +
      esc(s.tp) +
      "</span>" +
      (s.src.kind ? '<span class="sm-bdg">' + esc(s.src.kind) + "</span>" : "") +
      "</div>";
    h += '<p class="sm-pd">' + esc(s.d) + "</p>";
    h += '<div class="sm-frame" id="smFrame">';
    if (ow) {
      h += '<canvas id="smCv" role="img" aria-label="' + esc("Simulasi " + s.n) + '"></canvas>';
    } else if (ph) {
      h += '<div class="sm-load" id="smLoad"><span class="sm-spin"></span>Memuat simulasi...</div>';
      h +=
        '<iframe id="smIf" title="' +
        esc("Simulasi " + s.t) +
        '" src="' +
        esc(link) +
        '" allow="fullscreen" allowfullscreen></iframe>';
    } else {
      h +=
        '<div class="sm-ext"><span class="sm-ico" style="background:' +
        COL[s.s] +
        '">' +
        ic(s.ic) +
        "</span><h3>Simulasi ini dibuka di situs resminya</h3>" +
        "<p>" +
        esc(s.src.name) +
        " berjalan di situsnya sendiri, jadi simulasi dibuka di tab baru. Setelah selesai, kembali ke sini untuk membaca petunjuk dan mengerjakan kuis.</p>" +
        '<a class="sm-btn" href="' +
        esc(link) +
        '" target="_blank" rel="noopener noreferrer">' +
        ic("ext") +
        "Buka di " +
        esc(s.src.host) +
        "</a>" +
        '<p class="sm-mini">Bahasa situs: ' +
        esc(s.src.lang) +
        ".</p></div>";
    }
    h +=
      '<button type="button" class="sm-fsx" data-a="fsx" aria-label="Keluar dari layar penuh">' +
      ic("x") +
      "</button></div>";
    h += '<div class="sm-fail" id="smFail" hidden role="status"></div>';
    if (ow) h += ctlHtml(s);
    h += '<div class="sm-tools">';
    if (ph || ow)
      h +=
        '<button type="button" class="sm-btn sm-alt" data-a="fs">' +
        ic("full") +
        "Layar Penuh</button>";
    if (!ow)
      h +=
        '<a class="sm-btn' +
        (ph ? "" : " sm-alt") +
        '" id="smNew" href="' +
        esc(link) +
        '" target="_blank" rel="noopener noreferrer">' +
        ic("ext") +
        (ow ? "Versi PhET (cadangan, perlu internet)" : "Buka di Tab Baru") +
        "</a>";
    h +=
      '<button type="button" class="sm-btn sm-ghost" data-a="favp" id="smFavP" aria-pressed="' +
      fav +
      '">' +
      ic(fav ? "starF" : "star") +
      (fav ? "Favorit" : "Tambah favorit") +
      "</button></div>";
    if (ph) {
      h +=
        '<div class="sm-lang"><span class="lb">Bahasa simulasi</span><div class="sm-chips" id="smLang">' +
        chip("Indonesia", lang === "in", 'data-lang="in"') +
        chip("English", lang === "en", 'data-lang="en"') +
        "</div></div>" +
        '<p class="sm-mini">Bahasa Indonesia dipakai jika tersedia untuk simulasi ini. Jika belum tersedia, simulasi tampil dalam bahasa Inggris. Bahasa juga bisa diganti dari menu PhET di dalam simulasi.</p>';
    }
    h +=
      '<div class="sm-tip"><b>Petunjuk penggunaan</b><ul><li>Sentuh dan seret objek di dalam simulasi untuk mencoba.</li><li>Ubah satu variabel setiap kali agar hasilnya mudah dibandingkan.</li><li>Putar HP ke mode lanskap' +
      (ph || ow ? " atau tekan Layar Penuh" : "") +
      " untuk area yang lebih luas.</li><li>Untuk menggulir halaman, geser dari area di luar simulasi.</li></ul></div>";
    h +=
      '<details class="bs-d sm-det" open><summary>Ringkasan konsep</summary><p>' +
      esc(s.sum) +
      "</p></details>";
    h +=
      '<details class="bs-d sm-det"><summary>Tujuan pembelajaran</summary>' +
      li(s.goals, "ul") +
      "</details>";
    h +=
      '<details class="bs-d sm-det"><summary>Petunjuk eksperimen</summary>' +
      li(s.steps, "ol") +
      "</details>";
    h +=
      '<button type="button" class="life sm-lbtn" data-a="back">' +
      ic("back") +
      " Kembali ke Katalog</button>";
    $("smPlay").innerHTML = h;
    if (ph) watchLoad(link);
    if (ow) startOwn(s);
  }
  function failMsg(link, txt) {
    var f = $("smFail");
    if (!f) return;
    f.innerHTML =
      "<b>" +
      txt +
      '</b> Periksa koneksi internet, atau buka simulasi langsung di situs resminya: <a href="' +
      esc(link) +
      '" target="_blank" rel="noopener noreferrer">buka di tab baru</a>.';
    f.hidden = false;
  }
  function watchLoad(link) {
    var fr = $("smIf"),
      ld = $("smLoad");
    if (!fr) return;
    if (navigator.onLine === false)
      failMsg(link, "Kamu sedang offline, simulasi belum bisa dimuat.");
    fr.addEventListener("load", function () {
      clearTimeout(loadT);
      if (ld) ld.hidden = true;
      var f = $("smFail");
      if (f) f.hidden = true;
    });
    loadT = setTimeout(function () {
      var l = $("smLoad");
      if (l && !l.hidden) {
        l.hidden = true;
        failMsg(link, "Simulasi belum tampil.");
      }
    }, 15000);
  }
  function changeLang(lang) {
    sset(KL, lang);
    var s = cur;
    if (!s || !isPhet(s)) return;
    var link = phetRun(s, lang),
      fr = $("smIf"),
      ld = $("smLoad"),
      nw = $("smNew"),
      f = $("smFail");
    if (nw) nw.href = link;
    if (f) f.hidden = true;
    if (ld) ld.hidden = false;
    if (fr) {
      clearTimeout(loadT);
      fr.src = link;
      loadT = setTimeout(function () {
        var l = $("smLoad");
        if (l && !l.hidden) {
          l.hidden = true;
          failMsg(link, "Simulasi belum tampil.");
        }
      }, 15000);
    }
    [].forEach.call($("smLang").children, function (b) {
      b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false");
    });
  }
  (function () {
    var DW = 800,
      DH = 520;
    function X(a, b) {
      var o = {},
        k;
      for (k in a) o[k] = a[k];
      for (k in b) o[k] = b[k];
      return o;
    }
    function I(id, n, sh, col, f, j, a, q, an) {
      return { id: id, n: n, sh: sh, col: col, f: f, j: j, a: a, q: q, an: an };
    }
    function hash(i, j) {
      var h = (Math.imul(i + 101, 73856093) ^ Math.imul(j + 57, 19349663)) >>> 0;
      return (h % 1000) / 1000;
    }
    function rgr(g, x, y, r0, r1, c0, c1) {
      var q = g.createRadialGradient(x, y, r0, x, y, r1);
      q.addColorStop(0, c0);
      q.addColorStop(1, c1);
      return q;
    }
    function dSeg(px, py, ax, ay, bx, by) {
      var dx = bx - ax,
        dy = by - ay,
        l = dx * dx + dy * dy,
        t = l ? ((px - ax) * dx + (py - ay) * dy) / l : 0;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      return Math.hypot(px - ax - t * dx, py - ay - t * dy);
    }
    function dPoly(px, py, P) {
      var m = 1e9,
        i;
      for (i = 1; i < P.length; i++) {
        var d = dSeg(px, py, P[i - 1][0], P[i - 1][1], P[i][0], P[i][1]);
        if (d < m) m = d;
      }
      return m;
    }
    var C = {
      mem: "#ff8fab",
      cyt: "#ffd166",
      nuc: "#8b6cf6",
      mit: "#ff7a45",
      rib: "#3b8de0",
      rer: "#2fb8a8",
      ser: "#7be0b0",
      glg: "#ffc233",
      lis: "#ff5d73",
      wal: "#3ddc97",
      chl: "#2fb87a",
      vac: "#6ec6ff",
    };
    var IT = {
      mem: I(
        "mem",
        "Membran sel",
        "Membran sel",
        C.mem,
        "Membatasi isi sel dan mengatur zat yang masuk dan keluar.",
        "Membran sel tersusun atas lapisan ganda fosfolipid yang disisipi protein. Sifatnya selektif permeabel: air, gas, dan molekul kecil tertentu dapat melewatinya, sedangkan zat lain harus melalui protein pengangkut atau saluran. Dengan cara ini sel menjaga keadaan di dalamnya tetap stabil.",
        "Tebal membran sel hanya sekitar 7 sampai 10 nanometer, lebih dari sepuluh ribu kali lebih tipis daripada selembar kertas.",
        "Mengapa membran sel disebut selektif permeabel?",
        "Karena hanya zat tertentu yang dapat melewatinya, sedangkan zat lain dihambat atau perlu protein pengangkut.",
      ),
      cyt: I(
        "cyt",
        "Sitoplasma",
        "Sitoplasma",
        C.cyt,
        "Tempat banyak reaksi kimia sel berlangsung dan tempat organel berada.",
        "Sitoplasma adalah seluruh isi sel di dalam membran sel di luar nukleus. Sitoplasma terdiri atas sitosol (cairan berisi air, ion, dan molekul organik) dan organel yang melayang di dalamnya. Banyak reaksi metabolisme, misalnya glikolisis, berlangsung di sitosol.",
        "Sitoplasma tidak diam. Pada banyak sel isinya bergerak mengalir, peristiwa ini disebut aliran sitoplasma (siklosis).",
        "Glikolisis berlangsung di bagian sel yang mana?",
        "Di sitosol, yaitu cairan sitoplasma.",
      ),
      nuc: I(
        "nuc",
        "Nukleus (inti sel)",
        "Nukleus",
        C.nuc,
        "Menyimpan DNA dan mengendalikan kegiatan sel.",
        "Nukleus dikelilingi selubung inti berpori yang memungkinkan pertukaran molekul dengan sitoplasma. Di dalamnya ada kromatin (DNA dan protein) serta nukleolus, tempat pembentukan subunit ribosom. DNA ditranskripsi menjadi mRNA yang kemudian keluar ke sitoplasma untuk diterjemahkan menjadi protein.",
        "DNA satu sel manusia, jika diluruskan, panjangnya sekitar 2 meter, tetapi muat di dalam nukleus yang garis tengahnya hanya beberapa mikrometer.",
        "Apa fungsi pori pada selubung inti?",
        "Menjadi jalur keluar masuk molekul seperti mRNA dan protein antara nukleus dan sitoplasma.",
      ),
      mit: I(
        "mit",
        "Mitokondria",
        "Mitokondria",
        C.mit,
        "Menghasilkan ATP melalui respirasi sel.",
        "Mitokondria punya membran luar dan membran dalam yang berlipat membentuk krista. Tahap akhir respirasi aerob berlangsung di sini (siklus Krebs di matriks, transpor elektron di membran dalam) dan menghasilkan sebagian besar ATP sel. Mitokondria memiliki DNA dan ribosom sendiri.",
        "Sel otot jantung memiliki sangat banyak mitokondria karena kebutuhan energinya tinggi.",
        "Mengapa membran dalam mitokondria berlipat membentuk krista?",
        "Agar luas permukaan untuk reaksi penghasil ATP menjadi lebih besar.",
      ),
      rib: I(
        "rib",
        "Ribosom",
        "Ribosom",
        C.rib,
        "Tempat sintesis protein.",
        "Ribosom tersusun atas rRNA dan protein, terdiri atas subunit besar dan subunit kecil. Ribosom membaca urutan kodon pada mRNA dan merangkai asam amino menjadi polipeptida. Ribosom bebas di sitoplasma umumnya membuat protein yang dipakai di dalam sel, sedangkan ribosom pada RE kasar membuat protein untuk disekresikan atau dipasang pada membran. Ribosom tidak dibungkus membran.",
        "Karena tidak dibungkus membran, ribosom juga ada pada bakteri.",
        "Apa perbedaan ribosom bebas dan ribosom pada RE kasar?",
        "Ribosom bebas membuat protein untuk dipakai di dalam sel, ribosom pada RE kasar membuat protein untuk sekresi atau membran.",
      ),
      rer: I(
        "rer",
        "Retikulum endoplasma kasar",
        "RE kasar",
        C.rer,
        "Membuat dan memodifikasi protein, lalu mengirimnya dalam vesikel.",
        "RE kasar berupa kantung pipih bermembran yang permukaannya ditempeli ribosom sehingga tampak kasar. Protein yang baru dibuat masuk ke rongga RE, dilipat, dan dimodifikasi, lalu dikemas dalam vesikel menuju badan Golgi. Membran RE kasar bersambung dengan selubung inti.",
        "Sel kelenjar yang menghasilkan enzim pencernaan atau antibodi biasanya sangat kaya RE kasar.",
        "Mengapa RE kasar tampak kasar?",
        "Karena banyak ribosom menempel pada permukaan luar membrannya.",
      ),
      ser: I(
        "ser",
        "Retikulum endoplasma halus",
        "RE halus",
        C.ser,
        "Membuat lipid, menetralkan racun, dan menyimpan ion kalsium.",
        "RE halus berupa jaringan tabung bermembran tanpa ribosom. Organel ini membuat fosfolipid dan steroid, membantu menetralkan obat dan racun (terutama di sel hati), serta menyimpan ion kalsium pada sel otot.",
        "Pada sel otot, RE halus yang khusus disebut retikulum sarkoplasma dan berperan dalam kontraksi otot.",
        "Apa perbedaan struktur RE halus dan RE kasar?",
        "RE halus tidak ditempeli ribosom.",
      ),
      glg: I(
        "glg",
        "Badan Golgi",
        "Badan Golgi",
        C.glg,
        "Memodifikasi, memilah, dan mengemas protein serta lipid untuk dikirim.",
        "Badan Golgi tersusun atas tumpukan kantung pipih (sisterna). Vesikel dari RE masuk di satu sisi, molekul di dalamnya dimodifikasi (misalnya diberi gugus gula), lalu dikemas dalam vesikel di sisi lain untuk dikirim ke membran sel, ke luar sel, atau ke lisosom.",
        "Badan Golgi sering diibaratkan kantor pos sel yang memilah dan mengirim paket.",
        "Apa yang terjadi pada protein di badan Golgi?",
        "Protein dimodifikasi, dipilah, dan dikemas dalam vesikel untuk dikirim ke tujuannya.",
      ),
      lis: I(
        "lis",
        "Lisosom",
        "Lisosom",
        C.lis,
        "Mencerna zat dan organel yang rusak.",
        "Lisosom adalah vesikel bermembran berisi enzim hidrolitik yang bekerja paling baik pada pH asam. Lisosom mencerna makanan hasil fagositosis, bakteri, dan organel tua. Membrannya mencegah enzim merusak isi sitoplasma.",
        "Pada sel darah putih, lisosom membantu menghancurkan bakteri yang ditelan.",
        "Mengapa enzim lisosom tidak merusak sel itu sendiri?",
        "Karena enzimnya terkurung dalam membran lisosom dan bekerja pada pH asam.",
      ),
      wal: I(
        "wal",
        "Dinding sel",
        "Dinding sel",
        C.wal,
        "Memberi bentuk, kekuatan, dan perlindungan pada sel tumbuhan.",
        "Dinding sel tumbuhan terutama tersusun atas selulosa yang membentuk serat kuat. Dinding terletak di luar membran sel dan dapat dilalui air serta zat terlarut. Dinding menahan tekanan turgor dari vakuola sehingga sel tidak pecah saat menyerap air.",
        "Kayu dan kapas sebagian besar tersusun atas selulosa dari dinding sel tumbuhan.",
        "Apa bahan utama penyusun dinding sel tumbuhan?",
        "Selulosa.",
      ),
      chl: I(
        "chl",
        "Kloroplas",
        "Kloroplas",
        C.chl,
        "Tempat fotosintesis.",
        "Kloroplas dibungkus dua membran dan berisi tumpukan tilakoid yang disebut grana. Klorofil pada tilakoid menyerap cahaya untuk reaksi terang yang menghasilkan ATP dan NADPH. Di stroma, siklus Calvin memakai ATP, NADPH, dan CO\u2082 untuk membentuk glukosa. Kloroplas memiliki DNA sendiri.",
        "Kloroplas dan mitokondria sama-sama punya DNA sendiri. Menurut teori endosimbiosis, keduanya diduga berasal dari bakteri yang hidup di dalam sel inang.",
        "Di bagian kloroplas mana reaksi terang berlangsung?",
        "Pada membran tilakoid (grana).",
      ),
      vac: I(
        "vac",
        "Vakuola sentral",
        "Vakuola",
        C.vac,
        "Menyimpan air, ion, dan zat cadangan serta menjaga tekanan turgor.",
        "Pada sel tumbuhan dewasa, vakuola sentral berukuran besar dan dibatasi membran yang disebut tonoplas. Isinya, yaitu cairan sel, berupa air, gula, garam, pigmen, dan zat sisa. Tekanan air dalam vakuola mendorong sitoplasma ke dinding sel (tekanan turgor) sehingga tumbuhan tegak. Vakuola juga dapat mencerna zat, seperti yang dilakukan lisosom pada sel hewan.",
        "Tumbuhan layu saat kekurangan air karena vakuolanya kehilangan air sehingga tekanan turgor turun.",
        "Mengapa tumbuhan layu jika kekurangan air?",
        "Vakuola kehilangan air sehingga tekanan turgor turun dan sel tidak lagi menekan dinding sel.",
      ),
    };
    IT.er = X(IT.rer, {
      id: "er",
      n: "Retikulum endoplasma (RE)",
      sh: "RE",
      f: "Membuat protein dan lipid, lalu mengangkutnya di dalam sel.",
      j: "RE adalah jaringan kantung dan tabung bermembran yang bersambung dengan selubung inti. RE kasar ditempeli ribosom dan terutama membuat serta memodifikasi protein. RE halus tidak punya ribosom dan membuat lipid serta menetralkan racun. Pada gambar ini bagian kasar (berbintik) tersambung dengan bagian halus (berupa tabung).",
      a: "Satu jaringan RE dapat meliputi lebih dari separuh total membran di dalam sel.",
      q: "Apa perbedaan RE kasar dan RE halus?",
      an: "RE kasar ditempeli ribosom dan terutama membuat protein, RE halus tanpa ribosom dan membuat lipid.",
    });
    var ITP_glg = X(IT.glg, {
      j: IT.glg.j + " Pada sel tumbuhan, badan Golgi juga membuat polisakarida bahan dinding sel.",
    });
    IT.vac = X(IT.vac, {
      a:
        IT.vac.a +
        " Lisosom khas sel hewan; pada sel tumbuhan, fungsi pencernaan banyak dilakukan vakuola.",
    });
    var ANI = ["mem", "cyt", "nuc", "mit", "rib", "rer", "ser", "glg", "lis"].map(function (k) {
      return IT[k];
    });
    var PLA = [IT.wal, IT.mem, IT.cyt, IT.nuc, IT.mit, IT.rib, IT.er, ITP_glg, IT.chl, IT.vac];
    var BC = {
      cap: "#c7a6ff",
      wal: "#3ddc97",
      mem: "#ff8fab",
      cyt: "#ffe29a",
      rib: "#3b8de0",
      nuc: "#8b6cf6",
      pls: "#22d3ee",
      pil: "#ffa94d",
      fla: "#ff5d73",
    };
    var BT = {
      cap: I(
        "cap",
        "Kapsul",
        "Kapsul",
        BC.cap,
        "Melindungi sel, membantu melekat, dan pada beberapa bakteri membantu menghindari sel fagosit.",
        "Kapsul adalah lapisan lendir di luar dinding sel, terutama tersusun atas polisakarida (pada sebagian bakteri berupa polipeptida). Tidak semua bakteri memiliki kapsul. Pada bakteri patogen tertentu, kapsul menyulitkan sel darah putih menelan bakteri sehingga bakteri lebih mudah menimbulkan penyakit.",
        "Streptococcus pneumoniae berkapsul lebih berbahaya daripada galur tanpa kapsul. Perbedaan keduanya dipakai dalam percobaan Griffith (1928).",
        "Apakah semua bakteri memiliki kapsul?",
        "Tidak. Kapsul hanya dimiliki sebagian bakteri.",
      ),
      wal: I(
        "wal",
        "Dinding sel",
        "Dinding sel",
        BC.wal,
        "Memberi bentuk dan melindungi sel agar tidak pecah akibat tekanan osmotik.",
        "Pada sebagian besar bakteri, dinding sel tersusun atas peptidoglikan, yaitu polimer gula dan asam amino yang khas bakteri. Pada bakteri Gram-positif lapisannya tebal, sedangkan pada Gram-negatif lapisannya tipis dan masih dilapisi membran luar. Dinding sel bakteri berbeda dari dinding sel tumbuhan yang tersusun atas selulosa.",
        "Antibiotik penisilin menghambat pembentukan peptidoglikan, sehingga bakteri yang sedang tumbuh mudah pecah.",
        "Apa bahan utama dinding sel bakteri?",
        "Peptidoglikan.",
      ),
      mem: I(
        "mem",
        "Membran plasma",
        "Membran plasma",
        BC.mem,
        "Mengatur keluar masuk zat dan menjadi tempat reaksi pembentukan energi.",
        "Membran plasma bakteri berupa lapisan ganda fosfolipid dengan protein. Karena bakteri tidak punya mitokondria, protein transpor elektron untuk pembentukan ATP pada bakteri aerob terletak di membran plasma. Membran ini juga mengatur zat yang masuk dan keluar sel.",
        "Pada bakteri, membran plasma mengambil peran yang mirip dengan membran dalam mitokondria pada sel eukariotik.",
        "Di mana protein transpor elektron berada pada bakteri yang tidak punya mitokondria?",
        "Pada membran plasma.",
      ),
      cyt: I(
        "cyt",
        "Sitoplasma",
        "Sitoplasma",
        BC.cyt,
        "Tempat reaksi metabolisme dan tempat ribosom, nukleoid, dan plasmid berada.",
        "Sitoplasma bakteri berupa cairan kental berisi enzim, ion, dan molekul organik. Bakteri tidak memiliki organel bermembran seperti mitokondria, retikulum endoplasma, atau badan Golgi, sehingga semua komponen berada bebas di sitoplasma.",
        "Walau tanpa organel bermembran, sel bakteri tetap tertata: protein tertentu berkumpul di tempat khusus di dalam sel.",
        "Sebutkan organel bermembran yang tidak dimiliki bakteri.",
        "Mitokondria, retikulum endoplasma, badan Golgi, lisosom, dan nukleus.",
      ),
      rib: I(
        "rib",
        "Ribosom",
        "Ribosom",
        BC.rib,
        "Tempat sintesis protein.",
        "Ribosom bakteri berukuran 70S (subunit 50S dan 30S), lebih kecil daripada ribosom 80S di sitoplasma sel eukariotik. Karena tidak ada membran inti, sintesis protein pada bakteri dapat dimulai ketika mRNA masih sedang dibentuk dari DNA.",
        "Beberapa antibiotik, seperti tetrasiklin dan eritromisin, menyerang ribosom bakteri karena ribosom bakteri berbeda dari ribosom sel manusia.",
        "Mengapa antibiotik yang menyerang ribosom 70S relatif tidak merusak ribosom sel manusia?",
        "Karena ribosom bakteri (70S) berbeda ukuran dan struktur dari ribosom di sitoplasma sel manusia (80S).",
      ),
      nuc: I(
        "nuc",
        "Nukleoid",
        "Nukleoid",
        BC.nuc,
        "Menyimpan materi genetik utama bakteri.",
        "Nukleoid adalah daerah di sitoplasma tempat kromosom bakteri, umumnya satu molekul DNA sirkuler, terlipat padat. Nukleoid tidak dibungkus membran inti, sehingga bakteri termasuk prokariota. Inilah perbedaan utama dengan nukleus pada sel eukariotik.",
        "DNA kromosom Escherichia coli, jika diluruskan, panjangnya sekitar 1,5 mm, ratusan kali panjang sel itu sendiri.",
        "Mengapa nukleoid bukan nukleus?",
        "Karena nukleoid tidak dikelilingi membran inti.",
      ),
      pls: I(
        "pls",
        "Plasmid",
        "Plasmid",
        BC.pls,
        "Membawa gen tambahan, misalnya gen resistensi antibiotik.",
        "Plasmid adalah molekul DNA kecil berbentuk lingkaran yang terpisah dari kromosom dan dapat menggandakan diri. Tidak semua bakteri memiliki plasmid. Plasmid dapat berpindah antarbakteri melalui konjugasi sehingga sifat seperti resistensi antibiotik dapat menyebar.",
        "Para ilmuwan memakai plasmid bakteri sebagai kendaraan untuk memasukkan gen manusia penghasil insulin ke dalam bakteri.",
        "Bagaimana plasmid dapat menyebarkan resistensi antibiotik?",
        "Plasmid membawa gen resistensi dan dapat dipindahkan ke bakteri lain.",
      ),
      pil: I(
        "pil",
        "Pili (fimbria)",
        "Pili",
        BC.pil,
        "Membantu melekat pada permukaan; pili seks membantu pemindahan DNA saat konjugasi.",
        "Pili (fimbria) adalah rambut halus dari protein di permukaan sel. Pili membantu bakteri melekat pada jaringan atau benda, dan pili khusus (pili seks) menghubungkan dua bakteri saat konjugasi untuk memindahkan DNA. Pili lebih pendek dan lebih halus daripada flagelum dan umumnya bukan alat untuk berenang. Tidak semua bakteri memiliki pili.",
        "Kemampuan melekat melalui pili membantu sebagian bakteri bertahan di saluran kemih tanpa terbawa aliran urine.",
        "Apa fungsi pili pada bakteri?",
        "Melekat pada permukaan dan, pada pili seks, membantu pemindahan DNA saat konjugasi.",
      ),
      fla: I(
        "fla",
        "Flagelum",
        "Flagelum",
        BC.fla,
        "Alat gerak bakteri.",
        "Flagelum bakteri berupa filamen protein (flagelin) yang diputar oleh motor kecil di dasarnya pada dinding sel dan membran. Putaran ini mendorong sel berenang, sehingga bakteri dapat bergerak menuju zat makanan atau menjauhi racun (kemotaksis). Tidak semua bakteri memiliki flagelum, dan letak serta jumlahnya berbeda antarspesies.",
        "Motor flagelum dapat memutar flagelum ratusan kali per detik.",
        "Apa nama gerak bakteri menuju atau menjauhi zat kimia tertentu?",
        "Kemotaksis.",
      ),
    };
    var BMODEL = [
      {
        nm: "Basil berflagelum dan berpili (mirip Escherichia coli)",
        ids: ["wal", "mem", "cyt", "rib", "nuc", "pls", "pil", "fla"],
        no: "kapsul (tidak semua bakteri memilikinya, sehingga tidak ditampilkan pada model ini)",
      },
      {
        nm: "Kokus berkapsul (mirip Streptococcus pneumoniae)",
        ids: ["cap", "wal", "mem", "cyt", "rib", "nuc"],
        no: "flagelum, pili, dan plasmid (tidak ditampilkan pada model ini)",
      },
      {
        nm: "Spiril berflagelum (mirip Spirillum)",
        ids: ["wal", "mem", "cyt", "rib", "nuc", "fla"],
        no: "kapsul, pili, dan plasmid (tidak ditampilkan pada model ini)",
      },
    ];
    function bitems(m) {
      return BMODEL[m].ids.map(function (k) {
        return BT[k];
      });
    }
    var SHP = [
      I(
        "kok",
        "Kokus (bentuk bola)",
        "Kokus",
        "#3ddc97",
        "Sel berbentuk bulat atau bola.",
        "Kokus adalah bentuk dasar bakteri yang bulat. Contohnya Staphylococcus aureus dan Streptococcus pneumoniae. Bentuk dasar ditentukan oleh bentuk satu sel. Susunan sel (tunggal, berpasangan, berantai, atau bergerombol) ditentukan oleh bidang pembelahan dan oleh sel anak yang tetap melekat setelah membelah.",
        "Kata kokus berasal dari kata Yunani yang berarti biji atau butir.",
        "Kokus tersusun bergerombol seperti buah anggur. Apa namanya?",
        "Stafilokokus.",
      ),
      I(
        "bas",
        "Basil (bentuk batang)",
        "Basil",
        "#4cc9f0",
        "Sel berbentuk batang atau silinder.",
        "Basil adalah bakteri berbentuk batang. Contohnya Escherichia coli dan Bacillus anthracis. Basil dapat ditemukan sebagai sel tunggal, berpasangan (diplobasil), atau berantai (streptobasil). Basil jarang membentuk gerombol seperti anggur.",
        "Istilah basil menunjukkan bentuk batang. Nama genus Bacillus hanyalah salah satu bakteri berbentuk basil.",
        "Dua basil yang menempel ujung ke ujung disebut apa?",
        "Diplobasil.",
      ),
      I(
        "spi",
        "Spiril (bentuk spiral kaku)",
        "Spiril",
        "#ffb703",
        "Sel berbentuk spiral kaku, seperti ulir.",
        "Spiril adalah bakteri berbentuk spiral yang kaku, contohnya Spirillum. Bentuk spiral yang lentur dan bergerak meliuk disebut spiroket, contohnya Treponema pallidum. Spiril umumnya ditemukan sebagai sel tunggal.",
        "Spirillum bergerak menggunakan flagelum yang tumbuh dari ujung selnya.",
        "Apa ciri bentuk spiril?",
        "Berbentuk spiral kaku seperti ulir.",
      ),
      I(
        "vib",
        "Vibrio (bentuk koma)",
        "Vibrio",
        "#ff8fab",
        "Sel berbentuk batang melengkung seperti koma.",
        "Vibrio adalah bakteri berbentuk batang yang melengkung seperti tanda koma. Contohnya Vibrio cholerae penyebab kolera. Vibrio umumnya ditemukan sebagai sel tunggal.",
        "Vibrio cholerae hidup di air dan dapat menyebar lewat air minum yang tercemar.",
        "Bakteri apa yang berbentuk koma dan contohnya Vibrio cholerae?",
        "Vibrio.",
      ),
    ];
    var ARRN = ["Tunggal", "Berpasangan (diplo-)", "Berantai (strepto-)", "Bergerombol (stafilo-)"];
    function arrText(id, a) {
      if (id === "kok")
        return [
          "Susunan saat ini: kokus tunggal (satu sel bulat).",
          "Susunan saat ini: diplokokus, dua kokus berpasangan karena sel anak tetap melekat setelah membelah satu kali.",
          "Susunan saat ini: streptokokus, kokus berantai karena pembelahan terjadi pada satu bidang dan sel anak tetap melekat.",
          "Susunan saat ini: stafilokokus, kokus bergerombol seperti buah anggur karena pembelahan terjadi pada beberapa bidang.",
        ][a];
      if (id === "bas")
        return [
          "Susunan saat ini: basil tunggal.",
          "Susunan saat ini: diplobasil, dua basil berpasangan ujung ke ujung.",
          "Susunan saat ini: streptobasil, basil berantai.",
          "Basil jarang membentuk gerombol seperti anggur, jadi gambar tetap menampilkan basil tunggal.",
        ][a];
      return "Bentuk ini umumnya ditemukan sebagai sel tunggal, jadi susunan sel tidak mengubah gambar.";
    }
    function addE(st, id, x, y, rx, ry, a, nr) {
      st.hits.push({ t: "e", id: id, x: x, y: y, rx: rx, ry: ry, a: a || 0, pr: rx * ry, nr: nr });
    }
    function addP(st, id, pts, r) {
      st.hits.push({ t: "p", id: id, pts: pts, r: r, pr: r * r * 2 });
    }
    function addR(st, id, x, y, w, h, pr) {
      st.hits.push({ t: "r", id: id, x: x, y: y, w: w, h: h, pr: pr || 1 });
    }
    function testHit(h, x, y) {
      if (h.t === "e") {
        var c = Math.cos(-h.a),
          s = Math.sin(-h.a),
          dx = x - h.x,
          dy = y - h.y,
          u = dx * c - dy * s,
          w = dx * s + dy * c;
        return (u * u) / (h.rx * h.rx) + (w * w) / (h.ry * h.ry) <= 1;
      }
      if (h.t === "p") return dPoly(x, y, h.pts) <= h.r;
      return x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h;
    }
    function pick(st, x, y) {
      var b = null;
      st.hits.forEach(function (h) {
        if (testHit(h, x, y) && (!b || h.pr < b.pr)) b = h;
      });
      return b ? b.id : st.region ? st.region(x, y) : null;
    }
    function nearPt(st, id, hx, hy) {
      var b = null,
        bd = 1e9;
      st.hits.forEach(function (h) {
        if (h.id !== id || h.t === "r") return;
        var px = h.t === "p" ? h.pts[Math.floor(h.pts.length / 2)][0] : h.x,
          py = h.t === "p" ? h.pts[Math.floor(h.pts.length / 2)][1] : h.y,
          d = Math.hypot(px - hx, py - hy);
        if (d < bd) {
          bd = d;
          b = [px, py];
        }
      });
      return b || [hx, hy];
    }
    function isFree(st, x, y, m) {
      var i, h;
      for (i = 0; i < st.hits.length; i++) {
        h = st.hits[i];
        if (h.t === "e" && h.id !== "rib") {
          var c = Math.cos(-h.a),
            s = Math.sin(-h.a),
            dx = x - h.x,
            dy = y - h.y,
            u = dx * c - dy * s,
            w = dx * s + dy * c;
          if ((u * u) / ((h.rx + m) * (h.rx + m)) + (w * w) / ((h.ry + m) * (h.ry + m)) <= 1)
            return false;
        } else if (h.t === "p" && dPoly(x, y, h.pts) < h.r + m) return false;
      }
      return true;
    }
    function part(g, st, id, col, fn, dm) {
      var sel = st.sel === id,
        hov = st.hov === id,
        dim = st.sel && !sel;
      g.save();
      if (dim) g.globalAlpha = dm == null ? 0.4 : dm;
      if (sel) {
        g.shadowColor = col;
        g.shadowBlur = 14 + 10 * Math.sin(st.tm * 5);
      } else if (hov) {
        g.shadowColor = col;
        g.shadowBlur = 10;
      }
      fn();
      g.restore();
    }
    function numOf(items, id) {
      var i;
      for (i = 0; i < items.length; i++) if (items[i].id === id) return i + 1;
      return 0;
    }
    function drawLabels(g, st, L, nar, sc, items) {
      L.forEach(function (l) {
        var sel = st.sel === l.id,
          hov = st.hov === l.id,
          tg = l.tg,
          n = numOf(items, l.id),
          it = items[n - 1];
        if (!it) return;
        if (nar) {
          var r = 11 / sc;
          g.save();
          g.beginPath();
          g.arc(tg[0], tg[1], r, 0, 7);
          g.fillStyle = sel ? "#ffd166" : "rgba(255,255,255,.92)";
          g.fill();
          g.lineWidth = 1.6 / sc;
          g.strokeStyle = "#101a3d";
          g.stroke();
          g.fillStyle = "#101a3d";
          g.font = "800 " + 12 / sc + "px Nunito,sans-serif";
          g.textAlign = "center";
          g.textBaseline = "middle";
          g.fillText(String(n), tg[0], tg[1] + 0.5 / sc);
          g.restore();
          addE(st, l.id, tg[0], tg[1], r * 1.3, r * 1.3, 0, 1);
          st.hits[st.hits.length - 1].pr = 2;
          return;
        }
        var fs = 13.5 / sc,
          lp = l.lp,
          al = l.al;
        g.save();
        g.lineWidth = 1.4 / sc;
        g.strokeStyle = sel ? "#ffd166" : "rgba(230,233,255,.5)";
        g.beginPath();
        g.moveTo(lp[0] + (al === "r" ? 4 : -4) / sc, lp[1]);
        g.lineTo(tg[0], tg[1]);
        g.stroke();
        g.beginPath();
        g.arc(tg[0], tg[1], 3 / sc, 0, 7);
        g.fillStyle = sel ? "#ffd166" : "#e6e9ff";
        g.fill();
        g.font = (sel || hov ? "800 " : "700 ") + fs + "px Nunito,sans-serif";
        g.textBaseline = "middle";
        g.textAlign = al === "r" ? "right" : "left";
        var tw = g.measureText(it.sh).width;
        g.fillStyle = sel ? "#ffd166" : hov ? "#ffffff" : "#e6e9ff";
        g.fillText(it.sh, lp[0], lp[1]);
        addR(
          st,
          l.id,
          al === "r" ? lp[0] - tw - 4 : lp[0] - 4,
          lp[1] - 11 / sc,
          tw + 8,
          22 / sc,
          1,
        );
        g.restore();
      });
    }
    function rings(g, st) {
      if (!st.sel) return;
      st.hits.forEach(function (h) {
        if (h.id !== st.sel || h.t !== "e" || h.nr) return;
        g.save();
        g.translate(h.x, h.y);
        g.rotate(h.a);
        g.strokeStyle = "#fff";
        g.globalAlpha = 0.55 + 0.3 * Math.sin(st.tm * 5);
        g.lineWidth = 2;
        g.setLineDash([7, 6]);
        g.lineDashOffset = -st.tm * 24;
        var e = 7 + 2 * Math.sin(st.tm * 5);
        g.beginPath();
        g.ellipse(0, 0, h.rx + e, h.ry + e, 0, 0, 7);
        g.stroke();
        g.restore();
      });
    }
    function cut(g, t, mw) {
      while (t.length > 3 && g.measureText(t).width > mw) t = t.slice(0, -2);
      return t;
    }
    function caption(g, w, h, st, items, nar) {
      var it = null;
      items.forEach(function (x) {
        if (x.id === st.sel) it = x;
      });
      g.save();
      g.textBaseline = "middle";
      g.textAlign = "center";
      if (!it) {
        var t = nar
          ? "Ketuk bagian untuk melihat penjelasan"
          : "Klik atau ketuk bagian pada gambar untuk melihat penjelasannya";
        g.font = "700 12px Nunito,sans-serif";
        g.fillStyle = "rgba(214,219,255,.85)";
        g.fillText(cut(g, t, w - 16), w / 2, h - 12);
      } else {
        var two = h >= 300;
        g.font = "800 13px Nunito,sans-serif";
        var n1 = it.n;
        var bw = Math.min(w - 12, 520);
        g.fillStyle = "rgba(7,10,32,.78)";
        g.fillRect(w / 2 - bw / 2, h - (two ? 44 : 26), bw, two ? 38 : 20);
        g.fillStyle = it.col;
        g.fillText(cut(g, n1, bw - 16), w / 2, h - (two ? 33 : 16));
        if (two) {
          g.font = "600 12px Nunito,sans-serif";
          g.fillStyle = "#e6e9ff";
          g.fillText(cut(g, it.f, bw - 16), w / 2, h - 15);
        }
      }
      g.restore();
    }
    function ensurePanel(st, cfg, v, items) {
      var p = document.getElementById("smInfo");
      if (!p) {
        var fr = document.getElementById("smFrame");
        if (!fr) return;
        fr.insertAdjacentHTML(
          "afterend",
          '<section class="sm-info" id="smInfo" aria-label="Informasi simulasi"><div class="sm-ichips" id="smIc"></div><div class="sm-ibody" id="smIb" aria-live="polite"></div></section>',
        );
        st.sig = null;
        st.bsig = null;
      }
      var sig = cfg.key(v),
        ic = document.getElementById("smIc"),
        ib = document.getElementById("smIb");
      if (!ic || !ib) return;
      if (st.sig !== sig) {
        st.sig = sig;
        st.bsig = null;
        ic.style.display = items.length ? "" : "none";
        ic.innerHTML = items
          .map(function (it, i) {
            return (
              '<button type="button" class="sm-chip" data-pick="' +
              it.id +
              '" aria-pressed="false"><i class="sm-dot" style="background:' +
              it.col +
              '"></i><span class="sm-n">' +
              (i + 1) +
              "</span>" +
              esc(it.sh) +
              "</button>"
            );
          })
          .join("");
      }
      var bs =
        (st.sel || "") +
        "|" +
        (st.ans ? 1 : 0) +
        "|" +
        sig +
        "|" +
        (cfg.bodySig ? cfg.bodySig(v, st) : "");
      if (st.bsig !== bs) {
        st.bsig = bs;
        [].forEach.call(ic.children, function (b) {
          b.setAttribute("aria-pressed", b.dataset.pick === st.sel ? "true" : "false");
        });
        var it = null;
        items.forEach(function (x) {
          if (x.id === st.sel) it = x;
        });
        ib.innerHTML = cfg.body(v, st, it);
        if (st.refocus) {
          var b2 = ib.querySelector("[data-ans]");
          if (b2) b2.focus();
          st.refocus = false;
        }
      }
    }
    function detail(it, lbl, extra) {
      return (
        '<h3 class="sm-it"><i class="sm-dot" style="background:' +
        it.col +
        '"></i>' +
        esc(it.n) +
        '</h3><dl class="sm-id">' +
        "<dt>" +
        (lbl || "Fungsi") +
        "</dt><dd>" +
        esc(it.f) +
        "</dd>" +
        "<dt>Penjelasan ilmiah</dt><dd>" +
        esc(it.j) +
        "</dd>" +
        (extra ? '<dd class="sm-xt">' + esc(extra) + "</dd>" : "") +
        "<dt>Fakta menarik</dt><dd>" +
        esc(it.a) +
        "</dd></dl>" +
        '<div class="sm-qz"><b>Uji pemahaman</b><p>' +
        esc(it.q) +
        "</p>" +
        '<button type="button" class="sm-btn sm-alt" data-ans="1" aria-expanded="false">Lihat jawaban</button><p class="sm-an" data-an="1" hidden>' +
        esc(it.an) +
        "</p></div>"
      );
    }
    function mkExp(cfg) {
      return {
        c: cfg.c,
        on: function (k, v, st, set) {
          if (k === "rs") {
            st.sel = null;
            st.ans = false;
            st.hov = null;
            v.lab = 1;
            if (set) {
              set("lab", 1);
              if (cfg.rs) cfg.rs(v, set);
            }
          } else if (k === "sw") {
            if (cfg.sw && byId(cfg.sw)) openSim(cfg.sw, true);
          } else if (cfg.on) cfg.on(k, v, st, set);
        },
        draw: function (g, w, h, dt, v, st) {
          st.tm = (st.tm || 0) + dt;
          st.hits = [];
          st.region = null;
          var nar = w < 560,
            sc = Math.min(w / DW, h / DH),
            ox = (w - DW * sc) / 2,
            oy = (h - DH * sc) / 2,
            items = cfg.items(v);
          st.T = { sc: sc, ox: ox, oy: oy };
          st.items = items;
          g.save();
          g.translate(ox, oy);
          g.scale(sc, sc);
          var L = cfg.scene(g, v, st, nar, sc, items) || [];
          if (v.lab && !(cfg.noLab && cfg.noLab(v))) drawLabels(g, st, L, nar, sc, items);
          rings(g, st);
          g.restore();
          caption(g, w, h, st, items, nar);
          ensurePanel(st, cfg, v, items);
          if (cfg.ro) st.ro = cfg.ro(v, st, items);
        },
      };
    }
    function bgCell(g, st, cx, cy, rx, ry) {
      g.beginPath();
      g.ellipse(cx, cy, rx, ry, 0, 0, 7);
      var a = st.sel === "cyt" ? 0.9 : 0.8;
      g.fillStyle = rgr(
        g,
        cx,
        cy - 20,
        10,
        rx,
        "rgba(255,244,190," + a + ")",
        "rgba(255,205,150," + (a - 0.06) + ")",
      );
      g.fill();
    }
    function nucleus(g, x, y, rx, ry) {
      g.beginPath();
      g.ellipse(x, y, rx, ry, 0, 0, 7);
      g.fillStyle = rgr(g, x - rx * 0.2, y - ry * 0.2, 4, rx, "#7d62ee", "#4a35b8");
      g.fill();
      g.lineWidth = 5;
      g.strokeStyle = "#cdbfff";
      g.stroke();
      g.lineWidth = 1.6;
      g.strokeStyle = "rgba(215,205,255,.55)";
      g.beginPath();
      var i;
      for (i = 0; i < 3; i++) {
        g.moveTo(x - rx * 0.6, y + (i - 1) * ry * 0.35);
        g.bezierCurveTo(
          x - rx * 0.2,
          y + (i - 1) * ry * 0.35 - 14,
          x + rx * 0.2,
          y + (i - 1) * ry * 0.35 + 14,
          x + rx * 0.6,
          y + (i - 1) * ry * 0.35,
        );
      }
      g.stroke();
      for (i = 0; i < 12; i++) {
        var an = (i * Math.PI) / 6 + 0.2;
        cir(g, x + rx * Math.cos(an), y + ry * Math.sin(an), 2.8, "#fff");
      }
      cir(g, x + rx * 0.22, y - ry * 0.12, ry * 0.3, "#2d1f80");
      cir(g, x + rx * 0.18, y - ry * 0.2, ry * 0.1, "rgba(255,255,255,.28)");
    }
    function mito(g, x, y, a, rx, ry) {
      g.save();
      g.translate(x, y);
      g.rotate(a);
      g.beginPath();
      g.ellipse(0, 0, rx, ry, 0, 0, 7);
      g.fillStyle = rgr(g, -rx * 0.2, -ry * 0.3, 3, rx, "#ff9a6b", "#e2582a");
      g.fill();
      g.lineWidth = 3;
      g.strokeStyle = "#ffcfb5";
      g.stroke();
      g.beginPath();
      g.strokeStyle = "#9c3a15";
      g.lineWidth = 2.2;
      g.lineCap = "round";
      var i;
      for (i = 0; i < 5; i++) {
        var px = -rx * 0.56 + i * rx * 0.28,
          d = i % 2 ? 1 : -1;
        g.moveTo(px, d * ry * 0.78);
        g.lineTo(px, -d * ry * 0.28);
      }
      g.stroke();
      g.restore();
    }
    function chloro(g, x, y, a, rx, ry) {
      g.save();
      g.translate(x, y);
      g.rotate(a);
      g.beginPath();
      g.ellipse(0, 0, rx, ry, 0, 0, 7);
      g.fillStyle = rgr(g, -rx * 0.2, -ry * 0.3, 3, rx, "#4fd29a", "#1f9a64");
      g.fill();
      g.lineWidth = 3;
      g.strokeStyle = "#a8f5d0";
      g.stroke();
      var i, k;
      for (i = 0; i < 3; i++)
        for (k = 0; k < 3; k++) {
          g.beginPath();
          g.ellipse(-rx * 0.5 + i * rx * 0.5, (k - 1) * ry * 0.34, rx * 0.17, ry * 0.13, 0, 0, 7);
          g.fillStyle = "#0f6e46";
          g.fill();
        }
      g.restore();
    }
    function golgi(g, x, y, a, s) {
      g.save();
      g.translate(x, y);
      g.rotate(a);
      g.scale(s, s);
      g.lineCap = "round";
      var i,
        w = [78, 86, 90, 84, 72];
      for (i = 0; i < 5; i++) {
        var yy = (i - 2) * 13,
          ww = w[i] / 2;
        g.beginPath();
        g.moveTo(-ww, yy + 6);
        g.quadraticCurveTo(0, yy - 12, ww, yy + 6);
        g.lineWidth = 8;
        g.strokeStyle = i % 2 ? "#ffd978" : "#ffb703";
        g.stroke();
      }
      [
        [-64, -22, 5],
        [-72, 8, 4],
        [66, -16, 5],
        [72, 16, 4],
        [0, -44, 4],
      ].forEach(function (p) {
        cir(g, p[0], p[1], p[2], "#ffe9a8");
      });
      g.restore();
    }
    function rerGeom(x, y, a, len, n) {
      var ca = Math.cos(a),
        sa = Math.sin(a),
        sheets = [],
        dots = [],
        i,
        k;
      for (i = 0; i < n; i++) {
        var yy = (i - (n - 1) / 2) * 17,
          pts = [];
        for (k = 0; k <= 24; k++) {
          var xx = -len / 2 + (k * len) / 24,
            y2 = yy + Math.sin(k * 0.9 + i) * 4;
          pts.push([x + xx * ca - y2 * sa, y + xx * sa + y2 * ca]);
          if (k > 0 && k < 24 && k % 2 === 1)
            [-1, 1].forEach(function (s) {
              var yd = y2 + s * 7;
              dots.push([x + xx * ca - yd * sa, y + xx * sa + yd * ca]);
            });
        }
        sheets.push(pts);
      }
      return { sheets: sheets, dots: dots };
    }
    function rerSheets(g, geo) {
      g.lineJoin = "round";
      g.lineCap = "round";
      geo.sheets.forEach(function (P) {
        g.beginPath();
        P.forEach(function (p, i) {
          i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]);
        });
        g.lineWidth = 9;
        g.strokeStyle = "#2fb8a8";
        g.stroke();
        g.lineWidth = 3;
        g.strokeStyle = "#9ff3e6";
        g.stroke();
      });
    }
    function serTubes(g, x, y, s) {
      g.save();
      g.translate(x, y);
      g.scale(s || 1, s || 1);
      g.lineCap = "round";
      g.lineJoin = "round";
      var P = [
          [-55, 2, -35, -24, -10, -24, 6, -8, 22, 10, 36, 12, 55, -6],
          [-46, 24, -26, 8, -6, 14, 10, 30, 26, 44, 40, 36, 56, 24],
          [-22, -26, -10, -4, -14, 12, -30, 22, -42, 30, -52, 22, -58, 16],
        ],
        i;
      [8, 3].forEach(function (lw, j) {
        g.lineWidth = lw;
        g.strokeStyle = j ? "#c9f9e2" : "#5fd3a0";
        P.forEach(function (p) {
          g.beginPath();
          g.moveTo(p[0], p[1]);
          g.bezierCurveTo(p[2], p[3], p[4], p[5], p[6], p[7]);
          if (p.length > 8) g.bezierCurveTo(p[8], p[9], p[10], p[11], p[12], p[13]);
          g.stroke();
        });
      });
      g.restore();
    }
    function lyso(g, x, y, r) {
      cir(g, x, y, r, "#ff5d73");
      g.lineWidth = 2.5;
      g.strokeStyle = "#ffc2cc";
      g.beginPath();
      g.arc(x, y, r, 0, 7);
      g.stroke();
      [
        [-4, -3],
        [4, 2],
        [-1, 5],
        [3, -5],
      ].forEach(function (p) {
        cir(g, x + (p[0] * r) / 14, y + (p[1] * r) / 14, (2.2 * r) / 14 + 0.8, "#9b1c34");
      });
    }
    function dot(g, x, y, r) {
      cir(g, x, y, r, "#3b8de0");
      cir(g, x - r * 0.3, y - r * 0.3, r * 0.35, "#9cc8ff");
    }
    function scatterRib(g, st, x0, x1, y0, y1, step, prob, inside) {
      var i,
        j,
        out = [];
      for (i = x0; i <= x1; i += step)
        for (j = y0; j <= y1; j += step) {
          var hx = hash(i, j),
            px = i + (hash(i + 3, j) - 0.5) * step * 0.6,
            py = j + (hash(i, j + 7) - 0.5) * step * 0.6;
          if (hx > prob || !inside(px, py) || !isFree(st, px, py, 9)) continue;
          addE(st, "rib", px, py, 9, 9, 0, 1);
          out.push([px, py]);
        }
      return out;
    }
    function sdRR(x, y, cx, cy, hw, hh, r) {
      var qx = Math.abs(x - cx) - (hw - r),
        qy = Math.abs(y - cy) - (hh - r);
      return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r;
    }
    function pathRR(g, cx, cy, hw, hh, r) {
      var x = cx - hw,
        y = cy - hh,
        w = 2 * hw,
        h = 2 * hh;
      g.beginPath();
      g.moveTo(x + r, y);
      g.lineTo(x + w - r, y);
      g.arcTo(x + w, y, x + w, y + r, r);
      g.lineTo(x + w, y + h - r);
      g.arcTo(x + w, y + h, x + w - r, y + h, r);
      g.lineTo(x + r, y + h);
      g.arcTo(x, y + h, x, y + h - r, r);
      g.lineTo(x, y + r);
      g.arcTo(x, y, x + r, y, r);
      g.closePath();
    }
    function sceneAni(g, v, st, nar, sc) {
      var cx = 400,
        cy = 262,
        rx = 270,
        ry = 205;
      st.region = function (x, y) {
        var u = (x - cx) / rx,
          w = (y - cy) / ry,
          r = Math.sqrt(u * u + w * w);
        if (r > 1.05) return null;
        if (r > 0.92) return "mem";
        return "cyt";
      };
      part(
        g,
        st,
        "cyt",
        "#ffd166",
        function () {
          bgCell(g, st, cx, cy, rx, ry);
        },
        0.85,
      );
      part(
        g,
        st,
        "mem",
        "#ff8fab",
        function () {
          g.beginPath();
          g.ellipse(cx, cy, rx, ry, 0, 0, 7);
          g.lineWidth = 8;
          g.strokeStyle = "#ff8fab";
          g.stroke();
          g.lineWidth = 2;
          g.strokeStyle = "#ffd1dc";
          g.setLineDash([2, 6]);
          g.stroke();
          g.setLineDash([]);
        },
        0.6,
      );
      part(g, st, "nuc", C.nuc, function () {
        nucleus(g, 400, 250, 66, 60);
      });
      addE(st, "nuc", 400, 250, 66, 60);
      var G = rerGeom(335, 332, -0.3, 120, 4);
      part(g, st, "rer", C.rer, function () {
        rerSheets(g, G);
      });
      addE(st, "rer", 335, 332, 78, 44, -0.3);
      part(g, st, "ser", C.ser, function () {
        serTubes(g, 482, 338, 1);
      });
      addE(st, "ser", 482, 338, 62, 34);
      part(g, st, "glg", C.glg, function () {
        golgi(g, 532, 214, 0.12, 1);
      });
      addE(st, "glg", 532, 214, 54, 46, 0.12);
      [
        [256, 226, -0.5],
        [548, 302, 0.6],
        [452, 394, 0.15],
      ].forEach(function (m) {
        part(g, st, "mit", C.mit, function () {
          mito(g, m[0], m[1], m[2], 40, 20);
        });
        addE(st, "mit", m[0], m[1], 40, 20, m[2]);
      });
      [
        [306, 166, 14],
        [582, 384, 13],
      ].forEach(function (l) {
        part(g, st, "lis", C.lis, function () {
          lyso(g, l[0], l[1], l[2]);
        });
        addE(st, "lis", l[0], l[1], l[2], l[2]);
      });
      var S2 = scatterRib(g, st, 150, 650, 90, 440, 40, 0.62, function (x, y) {
        var u = (x - cx) / rx,
          w = (y - cy) / ry;
        return u * u + w * w < 0.8;
      });
      G.dots.forEach(function (p) {
        addE(st, "rib", p[0], p[1], 7, 7, 0, 1);
      });
      part(g, st, "rib", C.rib, function () {
        S2.forEach(function (p) {
          dot(g, p[0], p[1], 4.6);
        });
        G.dots.forEach(function (p) {
          dot(g, p[0], p[1], 3.2);
        });
      });
      return [
        { id: "mem", tg: [193, 131], lp: [122, 60], al: "r" },
        { id: "lis", tg: nearPt(st, "lis", 306, 166), lp: [122, 132], al: "r" },
        { id: "mit", tg: nearPt(st, "mit", 256, 226), lp: [122, 205], al: "r" },
        { id: "rib", tg: nearPt(st, "rib", 230, 300), lp: [122, 278], al: "r" },
        { id: "rer", tg: [290, 338], lp: [122, 350], al: "r" },
        { id: "nuc", tg: [445, 214], lp: [678, 86], al: "l" },
        { id: "glg", tg: [566, 212], lp: [678, 150], al: "l" },
        { id: "cyt", tg: [624, 252], lp: [678, 236], al: "l" },
        { id: "ser", tg: [512, 332], lp: [678, 345], al: "l" },
      ];
    }
    function scenePla(g, v, st, nar, sc) {
      var cx = 400,
        cy = 258,
        hw = 268,
        hh = 196,
        rr = 42;
      st.region = function (x, y) {
        var d = sdRR(x, y, cx, cy, hw, hh, rr);
        if (d > 0) return null;
        if (d > -12) return "wal";
        if (d > -18) return "mem";
        var u = (x - 440) / 165,
          w = (y - 268) / 112;
        if (u * u + w * w <= 1) return "vac";
        return "cyt";
      };
      part(
        g,
        st,
        "wal",
        C.wal,
        function () {
          pathRR(g, cx, cy, hw, hh, rr);
          g.fillStyle = "#2f9b66";
          g.fill();
          g.lineWidth = 3;
          g.strokeStyle = "#9ff0c8";
          g.stroke();
        },
        0.7,
      );
      part(
        g,
        st,
        "cyt",
        "#ffd166",
        function () {
          pathRR(g, cx, cy, hw - 12, hh - 12, rr - 10);
          var a = st.sel === "cyt" ? 0.72 + 0.15 * Math.sin(st.tm * 5) : 0.55;
          g.fillStyle = rgr(
            g,
            cx,
            cy - 20,
            10,
            hw,
            "rgba(240,252,190," + a + ")",
            "rgba(170,232,150," + (a - 0.08) + ")",
          );
          g.fill();
        },
        0.85,
      );
      part(
        g,
        st,
        "mem",
        "#ff8fab",
        function () {
          pathRR(g, cx, cy, hw - 15, hh - 15, rr - 13);
          g.lineWidth = 6;
          g.strokeStyle = "#ff8fab";
          g.stroke();
        },
        0.6,
      );
      part(
        g,
        st,
        "vac",
        C.vac,
        function () {
          g.beginPath();
          g.ellipse(440, 268, 165, 112, 0, 0, 7);
          g.fillStyle = rgr(g, 420, 240, 10, 170, "rgba(160,225,255,.62)", "rgba(80,170,240,.5)");
          g.fill();
          g.lineWidth = 4;
          g.strokeStyle = "#a6e0ff";
          g.stroke();
          g.lineWidth = 2;
          g.strokeStyle = "rgba(255,255,255,.35)";
          g.beginPath();
          g.ellipse(440, 268, 150, 98, 0, 0.2, 1.2);
          g.stroke();
        },
        0.55,
      );
      addE(st, "vac", 440, 268, 165, 112);
      part(g, st, "nuc", C.nuc, function () {
        nucleus(g, 215, 170, 54, 48);
      });
      addE(st, "nuc", 215, 170, 54, 48);
      var G = rerGeom(205, 288, 1.42, 104, 4);
      part(g, st, "er", C.rer, function () {
        rerSheets(g, G);
        serTubes(g, 198, 352, 0.55);
      });
      addE(st, "er", 204, 300, 66, 52, 1.42);
      part(g, st, "glg", C.glg, function () {
        golgi(g, 206, 392, 0, 0.9);
      });
      addE(st, "glg", 206, 392, 50, 40);
      [
        [340, 412, 0.05],
        [622, 186, -0.5],
      ].forEach(function (m) {
        part(g, st, "mit", C.mit, function () {
          mito(g, m[0], m[1], m[2], 38, 19);
        });
        addE(st, "mit", m[0], m[1], 38, 19, m[2]);
      });
      [
        [330, 106, 0.1],
        [476, 102, -0.05],
        [586, 112, 0.2],
        [626, 300, 1.35],
        [588, 412, 0.25],
      ].forEach(function (c) {
        part(g, st, "chl", C.chl, function () {
          chloro(g, c[0], c[1], c[2], 38, 21);
        });
        addE(st, "chl", c[0], c[1], 38, 21, c[2]);
      });
      var S2 = scatterRib(g, st, 160, 650, 90, 430, 40, 0.6, function (x, y) {
        return (
          sdRR(x, y, cx, cy, hw, hh, rr) < -34 &&
          !(((x - 440) * (x - 440)) / (176 * 176) + ((y - 268) * (y - 268)) / (122 * 122) <= 1)
        );
      });
      G.dots.forEach(function (p) {
        addE(st, "rib", p[0], p[1], 7, 7, 0, 1);
      });
      part(g, st, "rib", C.rib, function () {
        S2.forEach(function (p) {
          dot(g, p[0], p[1], 4.6);
        });
        G.dots.forEach(function (p) {
          dot(g, p[0], p[1], 3.2);
        });
      });
      return [
        { id: "wal", tg: [136, 128], lp: [116, 58], al: "r" },
        { id: "mem", tg: [147, 200], lp: [116, 103], al: "r" },
        { id: "nuc", tg: [190, 160], lp: [116, 160], al: "r" },
        { id: "er", tg: nearPt(st, "er", 204, 300), lp: [116, 262], al: "r" },
        { id: "cyt", tg: [262, 328], lp: [116, 328], al: "r" },
        { id: "glg", tg: [240, 392], lp: [116, 392], al: "r" },
        { id: "chl", tg: nearPt(st, "chl", 586, 112), lp: [684, 92], al: "l" },
        { id: "mit", tg: nearPt(st, "mit", 622, 186), lp: [684, 172], al: "l" },
        { id: "rib", tg: nearPt(st, "rib", 630, 245), lp: [684, 240], al: "l" },
        { id: "vac", tg: [556, 338], lp: [684, 338], al: "l" },
      ];
    }
    function bodyStroke(g, pts, r, col, alpha) {
      g.save();
      g.lineCap = "round";
      g.lineJoin = "round";
      g.beginPath();
      pts.forEach(function (p, i) {
        i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]);
      });
      g.lineWidth = 2 * r;
      g.strokeStyle = col;
      if (alpha != null) g.globalAlpha = alpha;
      g.stroke();
      g.restore();
    }
    function tangle(g, cx, cy, rx, ry, col, lw) {
      g.save();
      g.lineWidth = lw || 3;
      g.strokeStyle = col;
      g.lineJoin = "round";
      g.beginPath();
      var t, i;
      for (i = 0; i <= 160; i++) {
        t = (i / 160) * Math.PI * 2;
        var x = cx + rx * Math.sin(7 * t) * 0.95,
          y = cy + ry * Math.sin(5 * t + 0.8) * 0.95;
        i ? g.lineTo(x, y) : g.moveTo(x, y);
      }
      g.stroke();
      g.lineWidth = (lw || 3) * 0.7;
      g.beginPath();
      for (i = 0; i <= 120; i++) {
        t = (i / 120) * Math.PI * 2;
        var x2 = cx + rx * 0.8 * Math.sin(5 * t + 1) * 0.9,
          y2 = cy + ry * 0.8 * Math.sin(3 * t + 0.3) * 0.95;
        i ? g.lineTo(x2, y2) : g.moveTo(x2, y2);
      }
      g.stroke();
      g.restore();
    }
    function wavy(x0, y0, ang, len, amp, turns, n) {
      var P = [],
        i,
        ca = Math.cos(ang),
        sa = Math.sin(ang);
      for (i = 0; i <= n; i++) {
        var t = i / n,
          u = t * len,
          w = amp * Math.sin(t * Math.PI * 2 * turns) * (0.25 + t);
        P.push([x0 + u * ca - w * sa, y0 + u * sa + w * ca]);
      }
      return P;
    }
    function bodyScene(g, v, st, nar, sc, m) {
      var items = bitems(m),
        has = function (k) {
          return BMODEL[m].ids.indexOf(k) >= 0;
        };
      var pts,
        rw,
        wt = 7,
        mt = 5,
        capT = 26,
        cx = 390,
        cy = 262,
        L = [];
      if (m === 0) {
        pts = [
          [270, 262],
          [470, 262],
        ];
        rw = 70;
      } else if (m === 1) {
        pts = [
          [388, 262],
          [392, 262],
        ];
        rw = 92;
        wt = 12;
        mt = 5;
      } else {
        pts = [];
        var i;
        for (i = 0; i <= 60; i++) {
          var x = 240 + i * 5;
          pts.push([x, 262 - 24 * Math.cos((2 * Math.PI * (x - 390)) / 100)]);
        }
        rw = 22;
        wt = 5;
        mt = 4;
      }
      var rm = rw - wt,
        rc = rm - mt;
      st.region = function (x, y) {
        var d = dPoly(x, y, pts);
        if (has("cap") && d > rw && d <= rw + capT) return "cap";
        if (d > rm && d <= rw) return "wal";
        if (d > rc && d <= rm) return "mem";
        if (d <= rc) return "cyt";
        return null;
      };
      var flaDefs = [],
        pilDefs = [];
      if (m === 0) {
        flaDefs = [wavy(540, 262, 0, 225, 24, 3.2, 60)];
        [
          [290, -1],
          [330, -1],
          [370, -1],
          [410, -1],
          [450, -1],
          [290, 1],
          [330, 1],
          [370, 1],
          [410, 1],
          [450, 1],
        ].forEach(function (p) {
          pilDefs.push([
            [p[0], 262 + p[1] * 70],
            [p[0] + (p[0] % 80 ? 4 : -4), 262 + p[1] * (70 + 18)],
            [p[0] + (p[0] % 80 ? 9 : -9), 262 + p[1] * (70 + 34)],
          ]);
        });
        [[-0.5], [0.5]].forEach(function (a) {
          var an = Math.PI + a[0] * 1.05;
          pilDefs.push([
            [270 + 70 * Math.cos(an), 262 + 70 * Math.sin(an)],
            [270 + 88 * Math.cos(an), 262 + 88 * Math.sin(an)],
            [270 + 104 * Math.cos(an), 262 + 104 * Math.sin(an)],
          ]);
        });
        pilDefs.push([
          [203, 262],
          [185, 262],
          [168, 258],
        ]);
      }
      if (m === 2) {
        var e = [
          [pts[0][0], pts[0][1], Math.PI],
          [pts[60][0], pts[60][1], 0],
        ];
        e.forEach(function (q) {
          [-0.32, 0, 0.32].forEach(function (d) {
            flaDefs.push(wavy(q[0], q[1], q[2] + d, 130, 13, 2.4, 40));
          });
        });
      }
      part(g, st, "pil", BC.pil, function () {
        pilDefs.forEach(function (P) {
          g.beginPath();
          g.moveTo(P[0][0], P[0][1]);
          g.quadraticCurveTo(P[1][0] + 5, P[1][1], P[2][0], P[2][1]);
          g.lineWidth = 2.6;
          g.lineCap = "round";
          g.strokeStyle = BC.pil;
          g.stroke();
        });
      });
      pilDefs.forEach(function (P) {
        addP(st, "pil", P, 8);
      });
      part(g, st, "fla", BC.fla, function () {
        flaDefs.forEach(function (P) {
          g.beginPath();
          P.forEach(function (p, i) {
            i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]);
          });
          g.lineWidth = m === 2 ? 3.4 : 5;
          g.lineCap = "round";
          g.lineJoin = "round";
          g.strokeStyle = BC.fla;
          g.stroke();
          cir(g, P[0][0], P[0][1], m === 2 ? 5 : 8, "#9b1c34");
          cir(g, P[0][0], P[0][1], m === 2 ? 2.5 : 4, "#ffc2cc");
        });
      });
      flaDefs.forEach(function (P) {
        addP(st, "fla", P, 10);
      });
      if (has("cap"))
        part(
          g,
          st,
          "cap",
          BC.cap,
          function () {
            bodyStroke(g, pts, rw + capT, "rgba(199,166,255,.34)");
            g.save();
            g.setLineDash([3, 6]);
            g.lineWidth = 2;
            g.strokeStyle = "#d8c4ff";
            g.beginPath();
            g.arc(390, 262, rw + capT - 1, 0, 7);
            g.stroke();
            g.restore();
          },
          1,
        );
      part(
        g,
        st,
        "wal",
        BC.wal,
        function () {
          bodyStroke(g, pts, rw, "#2fb97a");
          bodyStroke(g, pts, rw - 2, "#3ddc97");
        },
        1,
      );
      part(
        g,
        st,
        "mem",
        BC.mem,
        function () {
          bodyStroke(g, pts, rm, "#ff8fab");
        },
        1,
      );
      part(
        g,
        st,
        "cyt",
        BC.cyt,
        function () {
          var a = st.sel === "cyt" ? 1 : 0.93;
          bodyStroke(g, pts, rc, "#f5dc92", a);
        },
        1,
      );
      var nx = m === 0 ? 370 : m === 1 ? 390 : 390,
        ny = m === 2 ? 262 - 24 : 262,
        nrx = m === 0 ? 68 : m === 1 ? 36 : 22,
        nry = m === 0 ? 30 : m === 1 ? 30 : 8;
      part(g, st, "nuc", BC.nuc, function () {
        g.beginPath();
        g.ellipse(nx, ny, nrx + 6, nry + 6, 0, 0, 7);
        g.fillStyle = "rgba(139,108,246,.22)";
        g.fill();
        tangle(g, nx, ny, nrx, nry, "#7a5cf0", 3);
      });
      addE(st, "nuc", nx, ny, nrx + 6, nry + 6);
      var plsPts = [];
      if (has("pls")) {
        plsPts = [
          [296, 238, 10],
          [446, 288, 9],
        ];
        part(g, st, "pls", BC.pls, function () {
          plsPts.forEach(function (p) {
            g.beginPath();
            g.arc(p[0], p[1], p[2], 0, 7);
            g.lineWidth = 3.4;
            g.strokeStyle = "#22d3ee";
            g.stroke();
          });
        });
        plsPts.forEach(function (p) {
          addE(st, "pls", p[0], p[1], p[2] + 7, p[2] + 7);
        });
      }
      var rp = [],
        x,
        y;
      for (x = 170; x <= 620; x += 22)
        for (y = 170; y <= 360; y += 22) {
          var px = x + (hash(x, y) - 0.5) * 14,
            py = y + (hash(x + 1, y) - 0.5) * 14;
          if (hash(x, y + 9) > 0.7) continue;
          if (dPoly(px, py, pts) > rc - 9) continue;
          var dn =
            ((px - nx) * (px - nx)) / ((nrx + 14) * (nrx + 14)) +
            ((py - ny) * (py - ny)) / ((nry + 14) * (nry + 14));
          if (dn < 1) continue;
          var bad = false;
          plsPts.forEach(function (p) {
            if (Math.hypot(px - p[0], py - p[1]) < p[2] + 12) bad = true;
          });
          if (bad) continue;
          rp.push([px, py]);
          addE(st, "rib", px, py, 8, 8, 0, 1);
        }
      part(g, st, "rib", BC.rib, function () {
        rp.forEach(function (p) {
          dot(g, p[0], p[1], 3.8);
        });
      });
      if (m === 0)
        L = [
          { id: "pil", tg: [168, 258], lp: [122, 70], al: "r" },
          { id: "wal", tg: [204, 226], lp: [122, 142], al: "r" },
          { id: "mem", tg: [212, 262], lp: [122, 214], al: "r" },
          { id: "cyt", tg: [250, 300], lp: [122, 300], al: "r" },
          { id: "rib", tg: nearPt(st, "rib", 300, 310), lp: [122, 372], al: "r" },
          { id: "nuc", tg: [390, 255], lp: [678, 100], al: "l" },
          { id: "pls", tg: [446, 288], lp: [678, 415], al: "l" },
          { id: "fla", tg: [640, 258], lp: [678, 200], al: "l" },
        ];
      else if (m === 1)
        L = [
          { id: "cap", tg: [300, 168], lp: [122, 90], al: "r" },
          { id: "wal", tg: [304, 222], lp: [122, 172], al: "r" },
          { id: "mem", tg: [316, 262], lp: [122, 255], al: "r" },
          { id: "cyt", tg: [340, 330], lp: [122, 340], al: "r" },
          { id: "nuc", tg: [408, 252], lp: [678, 120], al: "l" },
          { id: "rib", tg: nearPt(st, "rib", 460, 300), lp: [678, 320], al: "l" },
        ];
      else
        L = [
          { id: "wal", tg: [340, 306], lp: [122, 330], al: "r" },
          { id: "mem", tg: [440, 301], lp: [122, 420], al: "r" },
          { id: "fla", tg: nearPt(st, "fla", 200, 240), lp: [122, 200], al: "r" },
          { id: "nuc", tg: [390, 238], lp: [678, 100], al: "l" },
          { id: "cyt", tg: [490, 238], lp: [678, 420], al: "l" },
          { id: "rib", tg: nearPt(st, "rib", 520, 260), lp: [678, 330], al: "l" },
        ];
      return L;
    }
    function shapeScene(g, v, st, nar, sc) {
      var tiles = [
          [20, 20],
          [410, 20],
          [20, 265],
          [410, 265],
        ],
        a = v.arr || 0;
      st.region = null;
      SHP.forEach(function (s, i) {
        var tx0 = tiles[i][0],
          ty0 = tiles[i][1],
          cx = tx0 + 185,
          cy = ty0 + 108,
          sel = st.sel === s.id,
          hov = st.hov === s.id,
          dim = st.sel && !sel;
        g.save();
        if (dim) g.globalAlpha = 0.5;
        pathRR(g, tx0 + 185, ty0 + 117, 185, 117, 18);
        g.fillStyle = sel ? "rgba(255,255,255,.12)" : "rgba(255,255,255,.05)";
        g.fill();
        g.lineWidth = sel ? 3.5 : hov ? 3 : 1.5;
        g.strokeStyle = sel ? s.col : hov ? "rgba(255,255,255,.7)" : "rgba(255,255,255,.2)";
        if (sel) {
          g.shadowColor = s.col;
          g.shadowBlur = 12 + 8 * Math.sin(st.tm * 5);
        }
        g.stroke();
        g.shadowBlur = 0;
        g.save();
        g.translate(cx, cy);
        g.scale(1.6, 1.6);
        drawShape(g, s.id, a, s.col);
        g.restore();
        g.font = "800 " + 17 + "px Fredoka,Nunito,sans-serif";
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillStyle = sel ? s.col : "#fff";
        g.fillText(s.sh, cx, ty0 + 196);
        g.font = "700 12.5px Nunito,sans-serif";
        g.fillStyle = "rgba(230,233,255,.82)";
        g.fillText(shapeArr(s.id, a), cx, ty0 + 216);
        if (nar) {
          g.beginPath();
          g.arc(tx0 + 22, ty0 + 22, 11, 0, 7);
          g.fillStyle = "rgba(255,255,255,.92)";
          g.fill();
          g.fillStyle = "#101a3d";
          g.font = "800 12px Nunito,sans-serif";
          g.fillText(String(i + 1), tx0 + 22, ty0 + 23);
        }
        g.restore();
        addR(st, s.id, tx0, ty0, 370, 235, 10);
      });
      return [];
    }
    function shapeArr(id, a) {
      if (id === "kok")
        return [
          "tunggal",
          "diplokokus (berpasangan)",
          "streptokokus (berantai)",
          "stafilokokus (bergerombol)",
        ][a];
      if (id === "bas")
        return [
          "tunggal",
          "diplobasil (berpasangan)",
          "streptobasil (berantai)",
          "tunggal (jarang bergerombol)",
        ][a];
      return "umumnya tunggal";
    }
    function drawShape(g, id, a, col) {
      function cell(pts, r) {
        bodyStroke(g, pts, r + 2, "#1f9a64");
        bodyStroke(g, pts, r, "#58e0a4");
        bodyStroke(g, pts, r * 0.62, "#b9f5d9");
      }
      function nuc(x, y, rx, ry, rot) {
        g.save();
        g.translate(x, y);
        g.rotate(rot || 0);
        g.beginPath();
        g.ellipse(0, 0, rx, ry, 0, 0, 7);
        g.fillStyle = "rgba(139,108,246,.7)";
        g.fill();
        g.restore();
      }
      if (id === "kok") {
        var P = [[0, 0]];
        if (a === 1)
          P = [
            [-16, 0],
            [16, 0],
          ];
        else if (a === 2)
          P = [
            [-64, 0],
            [-32, 0],
            [0, 0],
            [32, 0],
            [64, 0],
          ];
        else if (a === 3)
          P = [
            [0, 0],
            [30, 0],
            [-30, 0],
            [15, 26],
            [-15, 26],
            [15, -26],
            [-15, -26],
          ];
        P.forEach(function (p) {
          bodyStroke(
            g,
            [
              [p[0], p[1]],
              [p[0] + 0.1, p[1]],
            ],
            16,
            "#1f9a64",
          );
          bodyStroke(
            g,
            [
              [p[0], p[1]],
              [p[0] + 0.1, p[1]],
            ],
            14,
            "#58e0a4",
          );
        });
        P.forEach(function (p) {
          nuc(p[0], p[1], 6, 4);
        });
      } else if (id === "bas") {
        var Q = [0];
        if (a === 1) Q = [-26, 26];
        else if (a === 2) Q = [-75, -25, 25, 75];
        Q.forEach(function (x) {
          cell(
            [
              [x - 13, 0],
              [x + 13, 0],
            ],
            10,
          );
          nuc(x, 0, 10, 3.5);
        });
      } else if (id === "spi") {
        var S = [],
          i;
        for (i = 0; i <= 40; i++) {
          var t = i / 40;
          S.push([-82 + 164 * t, 17 * Math.sin(t * Math.PI * 5)]);
        }
        cell(S, 7.5);
        for (i = 6; i <= 34; i += 14) nuc(S[i][0], S[i][1], 5, 3);
      } else {
        var V = [],
          j;
        for (j = 0; j <= 24; j++) {
          var th = Math.PI * (1.19 + (0.62 * j) / 24);
          V.push([48 * Math.cos(th), 40 + 48 * Math.sin(th)]);
        }
        cell(V, 9.5);
        nuc(V[12][0], V[12][1], 8, 3.5);
      }
    }
    function bacBody(v, st, it) {
      var m = v.model || 0;
      if (m === 3) {
        if (!it)
          return '<p class="sm-hint">Bentuk dasar bakteri ditentukan oleh bentuk satu sel (kokus, basil, spiril, vibrio). Susunan sel menunjukkan bagaimana sel-sel tetap berkelompok setelah membelah. Klik salah satu bentuk, lalu ubah Susunan sel.</p>';
        return detail(it, "Ciri bentuk", arrText(it.id, v.arr || 0));
      }
      var base =
        '<p class="sm-mini"><b>Model:</b> ' +
        esc(BMODEL[m].nm) +
        ". Struktur yang tidak ditampilkan pada model ini: " +
        esc(BMODEL[m].no) +
        ".</p>";
      if (!it)
        return (
          base +
          '<p class="sm-hint">Klik bagian bakteri pada gambar atau pilih namanya dari daftar di atas. Bakteri tidak memiliki nukleus bermembran: materi genetiknya berada di nukleoid.</p>'
        );
      return detail(it) + base;
    }
    var LABSEL = {
      k: "lab",
      l: "Label bagian",
      o: [
        ["Tampilkan label", 1],
        ["Sembunyikan label", 0],
      ],
    };
    OWN.sha = mkExp({
      c: [
        LABSEL,
        {
          row: [
            { k: "sw", b: "Pindah ke Sel Tumbuhan" },
            { k: "rs", b: "Atur ulang tampilan" },
          ],
        },
      ],
      sw: "stu",
      items: function () {
        return ANI;
      },
      key: function () {
        return "A";
      },
      scene: sceneAni,
      body: function (v, st, it) {
        return it
          ? detail(it)
          : '<p class="sm-hint">Klik organel pada gambar atau pilih namanya dari daftar di atas. Organel yang dipilih akan bersinar dan berdenyut, lalu penjelasannya tampil di sini. Pada sel hewan tidak ada dinding sel, kloroplas, maupun vakuola sentral yang besar.</p>';
      },
      ro: function (v, st, items) {
        var it = null;
        items.forEach(function (x) {
          if (x.id === st.sel) it = x;
        });
        return [
          ["Jenis sel", "Sel hewan (eukariotik)"],
          ["Organel dipilih", it ? it.sh : "belum ada"],
          ["Jumlah jenis bagian", String(items.length)],
        ];
      },
    });
    OWN.stu = mkExp({
      c: [
        LABSEL,
        {
          row: [
            { k: "sw", b: "Pindah ke Sel Hewan" },
            { k: "rs", b: "Atur ulang tampilan" },
          ],
        },
      ],
      sw: "sha",
      items: function () {
        return PLA;
      },
      key: function () {
        return "P";
      },
      scene: scenePla,
      body: function (v, st, it) {
        return it
          ? detail(it)
          : '<p class="sm-hint">Klik organel pada gambar atau pilih namanya dari daftar di atas. Ciri khas sel tumbuhan: dinding sel, kloroplas, dan vakuola sentral yang besar. Lisosom khas sel hewan dan tidak ditampilkan pada model ini.</p>';
      },
      ro: function (v, st, items) {
        var it = null;
        items.forEach(function (x) {
          if (x.id === st.sel) it = x;
        });
        return [
          ["Jenis sel", "Sel tumbuhan (eukariotik)"],
          ["Organel dipilih", it ? it.sh : "belum ada"],
          ["Jumlah jenis bagian", String(items.length)],
        ];
      },
    });
    OWN.bst = mkExp({
      c: [
        {
          k: "model",
          l: "Model bakteri",
          o: [
            [BMODEL[0].nm, 0],
            [BMODEL[1].nm, 1],
            [BMODEL[2].nm, 2],
            ["Bentuk dan susunan sel (kokus, basil, spiril, vibrio)", 3],
          ],
        },
        {
          k: "arr",
          l: "Susunan sel (berlaku pada tampilan bentuk dan susunan)",
          o: [
            [ARRN[0], 0],
            [ARRN[1], 1],
            [ARRN[2], 2],
            [ARRN[3], 3],
          ],
        },
        LABSEL,
        { row: [{ k: "rs", b: "Atur ulang tampilan" }] },
      ],
      rs: function (v, set) {
        set("arr", 0);
      },
      on: function (k, v, st) {
        if (k === "model") {
          st.sel = null;
          st.ans = false;
          st.hov = null;
        }
      },
      items: function (v) {
        return (v.model || 0) === 3 ? SHP : bitems(v.model || 0);
      },
      key: function (v) {
        return "B" + (v.model || 0);
      },
      bodySig: function (v) {
        return (v.model || 0) + "/" + (v.arr || 0);
      },
      scene: function (g, v, st, nar, sc) {
        var m = v.model || 0;
        return m === 3 ? shapeScene(g, v, st, nar, sc) : bodyScene(g, v, st, nar, sc, m);
      },
      noLab: function (v) {
        return (v.model || 0) === 3;
      },
      body: bacBody,
      ro: function (v, st, items) {
        var m = v.model || 0,
          it = null;
        items.forEach(function (x) {
          if (x.id === st.sel) it = x;
        });
        if (m === 3)
          return [
            ["Tampilan", "Bentuk dan susunan"],
            ["Dipilih", it ? it.sh : "belum ada"],
            ["Susunan", ARRN[v.arr || 0]],
          ];
        return [
          ["Model", ["Basil", "Kokus", "Spiril"][m]],
          ["Dipilih", it ? it.sh : "belum ada"],
          ["Struktur tampil", String(items.length) + " dari 9 jenis bagian"],
          ["Nukleus bermembran", "Tidak ada (prokariota)"],
        ];
      },
    });
    var CND = [
      {
        nm: "Ideal (nutrisi cukup, suhu sesuai)",
        g: 20,
        mx: 6,
        tx: "Kondisi ideal: setiap sel memanjang lalu membelah tiap 20 menit (waktu generasi model). Jumlah bakteri berlipat dua tiap generasi, yaitu 1, 2, 4, 8, 16, 32, 64. Simulasi berhenti pada 64 bakteri agar gambar tetap jelas.",
      },
      {
        nm: "Suhu terlalu rendah",
        g: 60,
        mx: 6,
        tx: "Suhu terlalu rendah: reaksi enzim melambat sehingga waktu generasi memanjang menjadi 60 menit. Pola pertumbuhan tetap berlipat dua per generasi, tetapi jauh lebih lambat dibandingkan kondisi ideal pada waktu yang sama.",
      },
      {
        nm: "Nutrisi terbatas",
        g: 20,
        mx: 12,
        tx: "Nutrisi terbatas: makin banyak bakteri, makin sedikit makanan per sel. Pada model ini, peluang sel membelah menurun saat jumlah bakteri mendekati daya dukung (sekitar 24 bakteri). Sel yang tidak membelah ditandai kuning, dan grafik mendatar.",
      },
      {
        nm: "Ada antibiotik (model sederhana)",
        g: 20,
        mx: 12,
        tx: "Ada antibiotik: pada model ini zat antibakteri menghambat pembelahan, sehingga hanya sekitar 4 dari 10 sel yang berhasil membelah tiap generasi. Sel yang terhambat ditandai merah. Pada kenyataan, cara kerja antibiotik bermacam-macam dan bakteri dapat menjadi resisten.",
      },
    ];
    var L0 = 40,
      WD = 16,
      CAP = 64;
    function gReset(st, v) {
      var c = CND[v.cond || 0],
        a = Math.random() * 6.28;
      st.init = true;
      st.state = "idle";
      st.run = false;
      st.t = 0;
      st.gen = 0;
      st.g = c.g;
      st.mx = c.mx;
      st.nextT = c.g;
      st.t0c = 0;
      st.done = false;
      st.seq = [1];
      st.hist = [[0, 1]];
      st.cells = [{ x: 0, y: 0, a: a, ta: a, div: true }];
      st.msg = "";
    }
    function gDecide(st, v) {
      var N = st.cells.length,
        cd = v.cond || 0;
      st.cells.forEach(function (c) {
        c.div =
          cd === 2
            ? Math.random() < Math.max(0, 1 - N / 24)
            : cd === 3
              ? Math.random() < 0.4
              : true;
      });
    }
    function gRound(st, v) {
      var nc = [];
      st.cells.forEach(function (c) {
        if (c.div) {
          var ca = Math.cos(c.a),
            sa = Math.sin(c.a),
            off = L0 / 2 + 2.5;
          nc.push({
            x: c.x - ca * off,
            y: c.y - sa * off,
            a: c.a,
            ta: c.a + (Math.random() - 0.5) * 0.7,
            div: false,
          });
          nc.push({
            x: c.x + ca * off,
            y: c.y + sa * off,
            a: c.a,
            ta: c.a + (Math.random() - 0.5) * 0.7,
            div: false,
          });
        } else nc.push(c);
      });
      var tr = st.nextT;
      st.cells = nc;
      st.gen++;
      st.seq.push(nc.length);
      st.hist.push([tr, nc.length]);
      st.t0c = tr;
      st.nextT += st.g;
      if (nc.length >= CAP || st.gen >= st.mx) {
        st.done = true;
        st.run = false;
        st.state = "done";
        st.t = tr;
        return;
      }
      gDecide(st, v);
    }
    function fmtT(t) {
      var m = Math.floor(t),
        h = Math.floor(m / 60);
      return h ? h + " jam " + (m % 60) + " mnt" : m + " mnt";
    }
    function rod(g, x, y, a, len, wid, fc, sc) {
      var ll = Math.max(len - wid, 0.1),
        hx = (Math.cos(a) * ll) / 2,
        hy = (Math.sin(a) * ll) / 2;
      g.lineCap = "round";
      g.beginPath();
      g.moveTo(x - hx, y - hy);
      g.lineTo(x + hx, y + hy);
      g.lineWidth = wid + 3;
      g.strokeStyle = sc;
      g.stroke();
      g.lineWidth = wid;
      g.strokeStyle = fc;
      g.stroke();
      g.save();
      g.translate(x, y);
      g.rotate(a);
      g.beginPath();
      g.ellipse(0, 0, Math.max(len * 0.22, 2), wid * 0.2, 0, 0, 7);
      g.fillStyle = "rgba(122,92,240,.75)";
      g.fill();
      g.restore();
    }
    OWN.bgr = {
      c: [
        {
          k: "cond",
          l: "Kondisi lingkungan",
          o: [
            [CND[0].nm, 0],
            [CND[1].nm, 1],
            [CND[2].nm, 2],
            [CND[3].nm, 3],
          ],
        },
        ["sp", "Kecepatan animasi", 0.5, 4, 0.5, 1, "\u00d7"],
        {
          row: [
            { k: "start", b: "Mulai" },
            { k: "pause", b: "Jeda" },
            { k: "resume", b: "Lanjutkan" },
            { k: "reset", b: "Reset" },
          ],
        },
      ],
      on: function (k, v, st) {
        if (!st.init) gReset(st, v);
        if (k === "start") {
          gReset(st, v);
          st.run = true;
          st.state = "run";
        } else if (k === "pause") {
          if (st.state === "run") {
            st.run = false;
            st.state = "pause";
          }
        } else if (k === "resume") {
          if (st.state === "pause") {
            st.run = true;
            st.state = "run";
          }
        } else if (k === "reset" || k === "cond") gReset(st, v);
      },
      draw: function (g, w, h, dt, v, st) {
        if (!st.init) gReset(st, v);
        st.tm = (st.tm || 0) + dt;
        if (st.run) {
          st.t += dt * 6 * (v.sp || 1);
          while (st.run && st.t >= st.nextT) gRound(st, v);
        }
        var N = st.cells.length,
          wide = w >= 560,
          R = wide ? Math.min(h * 0.4, w * 0.27) : Math.min(w * 0.44, h * 0.4),
          cx = wide ? R + 26 : w / 2,
          cy = wide ? h / 2 - 6 : h / 2 - 8,
          u = R / 200;
        var i, j, c1, c2;
        for (i = 0; i < N; i++) {
          c1 = st.cells[i];
          for (j = i + 1; j < N; j++) {
            c2 = st.cells[j];
            var dx = c2.x - c1.x,
              dy = c2.y - c1.y,
              d = Math.hypot(dx, dy),
              mn = 36;
            if (d < mn && d > 0.01) {
              var p = ((mn - d) / 2) * Math.min(1, dt * 14);
              c1.x -= (dx / d) * p;
              c1.y -= (dy / d) * p;
              c2.x += (dx / d) * p;
              c2.y += (dy / d) * p;
            }
          }
          var rr = Math.hypot(c1.x, c1.y),
            lim = 150;
          if (rr > lim) {
            c1.x *= lim / rr;
            c1.y *= lim / rr;
          }
          var da = c1.ta - c1.a;
          c1.a += da * Math.min(1, dt * 2.5);
        }
        g.save();
        g.translate(cx, cy);
        g.scale(u, u);
        g.beginPath();
        g.arc(0, 0, 200, 0, 7);
        g.fillStyle = "rgba(255,255,255,.1)";
        g.fill();
        g.lineWidth = 5;
        g.strokeStyle = "rgba(255,255,255,.4)";
        g.stroke();
        g.beginPath();
        g.arc(0, 0, 190, 0, 7);
        g.fillStyle = rgr(g, 0, 0, 10, 190, "rgba(255,226,150,.38)", "rgba(255,190,110,.26)");
        g.fill();
        var pr = Math.min(0.9999, (st.t - st.t0c) / st.g);
        if (st.state === "idle") pr = 0;
        st.cells.forEach(function (c) {
          var fc = "#58e0a4",
            sc2 = "#1f9a64";
          if (!c.div && st.state !== "idle") {
            var cd = v.cond || 0;
            if (cd === 2) {
              fc = "#e6c84f";
              sc2 = "#9a7d12";
            } else if (cd === 3) {
              fc = "#ff8a80";
              sc2 = "#b3362b";
            }
          }
          if (c.div) {
            var q = pr > 0.8 ? (pr - 0.8) / 0.2 : 0,
              Lc = L0 * (1 + Math.min(1, pr / 0.8)),
              gap = q * 5;
            if (q > 0) {
              var Lh = L0,
                off = gap / 2 + Lh / 2,
                ca = Math.cos(c.a),
                sa = Math.sin(c.a);
              rod(g, c.x - ca * off, c.y - sa * off, c.a, Lh, WD, fc, sc2);
              rod(g, c.x + ca * off, c.y + sa * off, c.a, Lh, WD, fc, sc2);
            } else rod(g, c.x, c.y, c.a, Lc, WD, fc, sc2);
          } else rod(g, c.x, c.y, c.a, L0, WD, fc, sc2);
        });
        g.restore();
        g.save();
        g.font = "800 12px Nunito,sans-serif";
        g.textAlign = "left";
        g.textBaseline = "middle";
        g.fillStyle = "#ffd166";
        g.fillText(cut(g, "Kondisi: " + CND[v.cond || 0].nm, w - 16), 10, 14);
        var seq = st.seq.join(" \u2192 ");
        g.font = "800 13px Nunito,sans-serif";
        g.textAlign = "center";
        g.fillStyle = "#e6e9ff";
        var sq = seq;
        if (g.measureText(sq).width > w - 24) {
          var s2 = st.seq.slice(-8);
          sq = "\u2026 \u2192 " + s2.join(" \u2192 ");
        }
        g.fillText(cut(g, "Jumlah tiap generasi: " + sq, w - 12), w / 2, h - 12);
        g.restore();
        if (wide) {
          var x1 = cx + R + 54,
            x2 = w - 22,
            y1 = 34,
            y2 = h - 62,
            tmax = st.g * (st.mx + 0.5),
            i2;
          g.save();
          g.strokeStyle = "rgba(255,255,255,.4)";
          g.lineWidth = 1.5;
          g.beginPath();
          g.moveTo(x1, y1);
          g.lineTo(x1, y2);
          g.lineTo(x2, y2);
          g.stroke();
          g.font = "700 11px Nunito,sans-serif";
          g.fillStyle = "#b9bfe6";
          g.textAlign = "right";
          g.textBaseline = "middle";
          [0, 16, 32, 48, 64].forEach(function (n) {
            var yy = y2 - (n / 70) * (y2 - y1);
            g.fillText(String(n), x1 - 6, yy);
            g.strokeStyle = "rgba(255,255,255,.08)";
            g.beginPath();
            g.moveTo(x1, yy);
            g.lineTo(x2, yy);
            g.stroke();
          });
          g.textAlign = "center";
          [0, 0.25, 0.5, 0.75, 1].forEach(function (f) {
            g.fillText(String(Math.round(tmax * f)), x1 + f * (x2 - x1), y2 + 12);
          });
          g.fillStyle = "#e6e9ff";
          g.font = "800 11.5px Nunito,sans-serif";
          g.fillText("Waktu simulasi (menit)", (x1 + x2) / 2, y2 + 30);
          g.textAlign = "left";
          g.fillText("Jumlah bakteri", x1 - 4, y1 - 14);
          g.beginPath();
          var lx = x1,
            ly = y2 - (1 / 70) * (y2 - y1);
          g.moveTo(lx, ly);
          st.hist.forEach(function (p, k2) {
            if (k2 === 0) return;
            var px = x1 + (p[0] / tmax) * (x2 - x1),
              py = y2 - (p[1] / 70) * (y2 - y1);
            g.lineTo(px, ly);
            g.lineTo(px, py);
            ly = py;
          });
          g.lineTo(x1 + (Math.min(st.t, tmax) / tmax) * (x2 - x1), ly);
          g.lineWidth = 3;
          g.strokeStyle = "#58e0a4";
          g.lineJoin = "round";
          g.stroke();
          var ex = x1 + (Math.min(st.t, tmax) / tmax) * (x2 - x1);
          g.beginPath();
          g.arc(ex, ly, 4.5, 0, 7);
          g.fillStyle = "#ffd166";
          g.fill();
          g.restore();
        }
        var bs = st.state;
        if (st.bs !== bs) {
          st.bs = bs;
          var q2 = function (k) {
              return document.querySelector('#smPlay [data-ctl="' + k + '"]');
            },
            b1 = q2("start"),
            b2 = q2("pause"),
            b3 = q2("resume");
          if (b1) b1.disabled = !(bs === "idle" || bs === "done");
          if (b2) b2.disabled = bs !== "run";
          if (b3) b3.disabled = bs !== "pause";
        }
        var stg =
          st.state === "idle"
            ? "Siap dimulai"
            : st.state === "done"
              ? "Selesai"
              : pr < 0.8
                ? "Sel memanjang, DNA digandakan"
                : "Sekat terbentuk, sel membelah";
        var stt =
          st.state === "run"
            ? "Berjalan"
            : st.state === "pause"
              ? "Dijeda"
              : st.state === "done"
                ? "Selesai"
                : "Siap";
        st.ro = [
          ["Jumlah bakteri", String(N)],
          ["Generasi", String(st.gen)],
          ["Waktu simulasi", fmtT(st.t)],
          ["Status", stt],
          ["Tahap sel", stg],
        ];
        ensurePanel(
          st,
          {
            key: function (v2) {
              return "G" + (v2.cond || 0);
            },
            bodySig: function () {
              return "";
            },
            body: function (v2) {
              return (
                '<h3 class="sm-it"><i class="sm-dot" style="background:#58e0a4"></i>Pembelahan biner</h3>' +
                '<ol class="sm-bf"><li><b>Replikasi DNA.</b> Kromosom sirkuler digandakan.</li><li><b>Pemanjangan sel.</b> Sel membesar dan memanjang, dua salinan DNA bergerak ke ujung berlawanan.</li><li><b>Pembentukan sekat (septum).</b> Membran plasma dan dinding sel tumbuh ke dalam di bagian tengah.</li><li><b>Pemisahan.</b> Sel terbagi menjadi dua sel anak yang secara umum identik secara genetik.</li></ol>' +
                '<dl class="sm-id"><dt>Kondisi yang dipilih</dt><dd>' +
                esc(CND[v2.cond || 0].tx) +
                "</dd></dl>" +
                '<p class="sm-mnote"><b>Catatan model:</b> simulasi ini menggunakan model pembelajaran sederhana dan tidak mewakili seluruh kondisi pertumbuhan bakteri di dunia nyata. Pada pertumbuhan nyata ada fase adaptasi (lag), fase eksponensial, fase stasioner, dan fase kematian; waktu generasi tiap spesies juga berbeda. Escherichia coli, misalnya, dapat membelah sekitar tiap 20 menit hanya pada kondisi yang sangat baik.</p>'
              );
            },
          },
          v,
          [],
        );
      },
    };
    var pl = document.getElementById("smPlay");
    function cvXY(e) {
      var cv = document.getElementById("smCv");
      if (!cv || !SIM || !SIM.st || !SIM.st.T) return null;
      var r = cv.getBoundingClientRect(),
        T = SIM.st.T;
      return [(e.clientX - r.left - T.ox) / T.sc, (e.clientY - r.top - T.oy) / T.sc];
    }
    pl.addEventListener("click", function (e) {
      var pk = e.target.closest && e.target.closest("[data-pick]");
      if (pk && SIM && SIM.st && SIM.st.items) {
        SIM.st.sel = SIM.st.sel === pk.dataset.pick ? null : pk.dataset.pick;
        return;
      }
      var an = e.target.closest && e.target.closest("[data-ans]");
      if (an) {
        var p = an.parentNode.querySelector("[data-an]");
        if (p) {
          p.hidden = !p.hidden;
          an.textContent = p.hidden ? "Lihat jawaban" : "Sembunyikan jawaban";
          an.setAttribute("aria-expanded", p.hidden ? "false" : "true");
        }
        return;
      }
      if (e.target.id === "smCv" && SIM && SIM.st && SIM.st.hits && SIM.st.items) {
        var xy = cvXY(e);
        if (!xy) return;
        SIM.st.sel = pick(SIM.st, xy[0], xy[1]);
      }
    });
    pl.addEventListener("mousemove", function (e) {
      if (e.target.id !== "smCv" || !SIM || !SIM.st || !SIM.st.hits) return;
      var xy = cvXY(e);
      if (!xy) return;
      var id = pick(SIM.st, xy[0], xy[1]);
      SIM.st.hov = id;
      e.target.style.cursor = id ? "pointer" : "default";
    });
    pl.addEventListener("mouseout", function (e) {
      if (e.target.id === "smCv" && SIM && SIM.st) SIM.st.hov = null;
    });
    S.push(
      {
        id: "sha",
        s: "Biologi",
        t: "Jelajah Sel Hewan",
        n: "Organel Sel Hewan dan Fungsinya",
        lv: "Mudah",
        tp: "Sel dan Jaringan",
        ic: "cell",
        tags: ["Sel hewan", "Organel sel", "Mitokondria", "Nukleus", "Badan Golgi"],
        kw: "sel hewan animal cell organel nukleus inti mitokondria ribosom retikulum endoplasma golgi lisosom membran sitoplasma eukariotik",
        d: "Klik organel pada sel hewan untuk melihat nama, fungsi, penjelasan ilmiah, fakta menarik, dan pertanyaan singkat. Organel yang dipilih bersinar dan berdenyut.",
        src: {
          k: "own",
          note: "Ilustrasi digambar dengan canvas HTML5 dan disederhanakan: ukuran, jumlah, dan letak organel pada sel nyata berbeda-beda. Isi materi disusun dari konsep standar biologi sel; guru dianjurkan mencocokkannya dengan buku teks yang dipakai di sekolah.",
        },
        sum: "Sel hewan adalah sel eukariotik: materi genetiknya berada di dalam nukleus yang dibungkus selubung inti. Di sitoplasma terdapat organel dengan tugas masing-masing: mitokondria menghasilkan ATP, ribosom dan retikulum endoplasma berperan dalam pembuatan protein dan lipid, badan Golgi memodifikasi serta mengemas molekul, dan lisosom mencerna zat. Sel hewan tidak memiliki dinding sel, kloroplas, maupun vakuola sentral yang besar.",
        goals: [
          "Menyebutkan organel utama sel hewan dan letaknya.",
          "Menjelaskan fungsi tiap organel dengan bahasa sendiri.",
          "Menghubungkan struktur organel dengan fungsinya, misalnya krista mitokondria dan pembentukan ATP.",
          "Membedakan sel hewan dari sel tumbuhan.",
        ],
        steps: [
          "Klik salah satu organel pada gambar (atau pilih namanya dari daftar di bawah gambar) dan amati sorotan yang muncul.",
          "Baca fungsi, penjelasan ilmiah, dan fakta menarik, lalu jawab pertanyaan singkat sebelum menekan tombol jawaban.",
          "Sembunyikan label organel lalu coba menyebutkan nama organel yang kamu klik.",
          "Tekan Pindah ke Sel Tumbuhan dan catat organel yang hanya ada pada salah satu jenis sel.",
        ],
      },
      {
        id: "stu",
        s: "Biologi",
        t: "Jelajah Sel Tumbuhan",
        n: "Organel Sel Tumbuhan dan Fungsinya",
        lv: "Mudah",
        tp: "Sel dan Jaringan",
        ic: "leaf",
        tags: ["Sel tumbuhan", "Dinding sel", "Kloroplas", "Vakuola sentral"],
        kw: "sel tumbuhan plant cell dinding sel selulosa kloroplas fotosintesis vakuola sentral turgor nukleus mitokondria ribosom golgi retikulum eukariotik",
        d: "Jelajahi sel tumbuhan: dinding sel, kloroplas, dan vakuola sentral. Klik organel untuk membaca penjelasan dan menjawab pertanyaan singkat, lalu pindah ke sel hewan untuk membandingkan.",
        src: {
          k: "own",
          note: "Ilustrasi digambar dengan canvas HTML5 dan disederhanakan: ukuran, jumlah, dan letak organel pada sel nyata berbeda-beda. Isi materi disusun dari konsep standar biologi sel; guru dianjurkan mencocokkannya dengan buku teks yang dipakai di sekolah.",
        },
        sum: "Sel tumbuhan juga sel eukariotik, tetapi punya ciri khas: dinding sel dari selulosa di luar membran sel, kloroplas untuk fotosintesis, dan vakuola sentral besar yang menyimpan air serta menjaga tekanan turgor. Mitokondria tetap ada karena sel tumbuhan juga melakukan respirasi sel. Lisosom khas sel hewan dan tidak ditampilkan pada model ini.",
        goals: [
          "Menyebutkan organel sel tumbuhan dan fungsinya.",
          "Menjelaskan peran dinding sel, kloroplas, dan vakuola sentral.",
          "Membandingkan sel tumbuhan dengan sel hewan.",
          "Menjelaskan hubungan vakuola, tekanan turgor, dan tumbuhan yang layu.",
        ],
        steps: [
          "Klik dinding sel, kloroplas, dan vakuola sentral satu per satu, lalu baca fungsinya.",
          "Jawab pertanyaan singkat pada tiap organel sebelum menekan tombol jawaban.",
          "Sembunyikan label dan coba menunjuk organel yang disebut pada daftar di bawah gambar.",
          "Tekan Pindah ke Sel Hewan, lalu tulis tiga perbedaan utama kedua jenis sel.",
        ],
      },
      {
        id: "bst",
        s: "Biologi",
        t: "Struktur Sel Bakteri",
        n: "Sel Prokariotik: Struktur, Bentuk, dan Susunan",
        lv: "Sedang",
        tp: "Bakteri",
        ic: "bact",
        tags: ["Prokariota", "Nukleoid", "Plasmid", "Bentuk bakteri"],
        kw: "bakteri struktur sel prokariotik prokariota dinding sel peptidoglikan membran plasma ribosom nukleoid plasmid kapsul pili flagelum kokus basil spiril vibrio diplokokus streptokokus stafilokokus",
        d: "Jelajahi struktur sel bakteri pada tiga model berbeda, lalu kenali bentuk kokus, basil, spiril, dan vibrio serta bedakan dari susunan selnya.",
        src: {
          k: "own",
          note: "Ilustrasi digambar dengan canvas HTML5 dan disederhanakan. Model bakteri hanyalah contoh: kapsul, pili, flagelum, dan plasmid tidak dimiliki semua bakteri, sehingga tiap model hanya menampilkan struktur yang sesuai. Isi materi disusun dari konsep standar mikrobiologi dasar; guru dianjurkan mencocokkannya dengan buku teks yang dipakai di sekolah.",
        },
        sum: "Bakteri adalah sel prokariotik: tidak memiliki nukleus bermembran dan organel bermembran seperti mitokondria atau badan Golgi. Materi genetik utamanya berupa DNA sirkuler yang terlipat di nukleoid. Struktur dasar yang dimiliki bakteri adalah membran plasma, sitoplasma, ribosom, dan DNA, serta dinding sel pada sebagian besar bakteri. Kapsul, pili, flagelum, dan plasmid hanya dimiliki sebagian bakteri, sehingga simulasi menampilkan beberapa model. Bentuk dasar bakteri adalah kokus, basil, spiril, dan vibrio; susunan sel (tunggal, diplo-, strepto-, stafilo-) menunjukkan bagaimana sel tetap berkelompok setelah membelah.",
        goals: [
          "Menyebutkan struktur dasar sel bakteri dan fungsinya.",
          "Membedakan sel prokariotik dari sel eukariotik, terutama pada materi genetiknya.",
          "Menjelaskan bahwa kapsul, pili, flagelum, dan plasmid tidak dimiliki semua bakteri.",
          "Mengenali bentuk kokus, basil, spiril, dan vibrio serta membedakannya dari susunan sel.",
        ],
        steps: [
          "Pilih model bakteri (basil, kokus berkapsul, atau spiril), lalu klik tiap bagian untuk membaca fungsinya.",
          "Bandingkan struktur yang tampil pada tiga model dan catat struktur yang hanya dimiliki sebagian model.",
          "Pilih tampilan Bentuk dan susunan sel, lalu klik kokus, basil, spiril, dan vibrio.",
          "Ubah Susunan sel menjadi berpasangan, berantai, dan bergerombol. Amati bahwa bentuk sel tetap sama sedangkan susunannya berubah.",
        ],
      },
      {
        id: "bgr",
        s: "Biologi",
        t: "Pertumbuhan Bakteri",
        n: "Pembelahan Biner dan Pengaruh Lingkungan",
        lv: "Sedang",
        tp: "Bakteri",
        ic: "growth",
        tags: ["Pembelahan biner", "Generasi", "Pertumbuhan eksponensial", "Faktor lingkungan"],
        kw: "pertumbuhan bakteri pembelahan biner binary fission generasi eksponensial populasi suhu nutrisi antibiotik cawan petri",
        d: "Amati bakteri memanjang lalu membelah menjadi dua, hitung jumlahnya tiap generasi (1, 2, 4, 8, 16), dan bandingkan pengaruh suhu, nutrisi, dan antibiotik pada model sederhana.",
        src: {
          k: "own",
          note: "Ini model pembelajaran sederhana: tidak mewakili seluruh kondisi pertumbuhan bakteri di dunia nyata dan tidak memerlukan eksperimen bakteri sungguhan. Isi materi disusun dari konsep standar mikrobiologi dasar; guru dianjurkan mencocokkannya dengan buku teks yang dipakai di sekolah.",
        },
        sum: "Bakteri berkembang biak dengan pembelahan biner: DNA digandakan, sel memanjang, terbentuk sekat (septum) di tengah, lalu sel terbagi menjadi dua sel anak. Pada kondisi ideal, jumlah bakteri berlipat dua tiap generasi (1, 2, 4, 8, 16, ...), yaitu pertumbuhan eksponensial, N = N\u2080 \u00d7 2\u207f dengan n jumlah generasi. Waktu generasi bergantung pada spesies dan lingkungan, misalnya suhu dan nutrisi. Simulasi ini memakai model pembelajaran sederhana dan tidak mewakili seluruh kondisi pertumbuhan bakteri di dunia nyata, yang juga mengenal fase adaptasi, fase stasioner, dan fase kematian.",
        goals: [
          "Menjelaskan tahap pembelahan biner pada bakteri.",
          "Menghitung jumlah bakteri setelah beberapa generasi pada kondisi ideal.",
          "Menjelaskan bahwa pertumbuhan ideal bersifat eksponensial.",
          "Menjelaskan pengaruh suhu, nutrisi, dan zat antibakteri terhadap pertumbuhan bakteri pada model sederhana.",
        ],
        steps: [
          "Pilih kondisi Ideal, atur kecepatan, lalu tekan Mulai dan amati sel memanjang lalu membelah.",
          "Catat jumlah bakteri pada tiap generasi dan periksa apakah mengikuti 1, 2, 4, 8, 16.",
          "Tekan Jeda untuk mengamati sel yang sedang membentuk sekat, lalu tekan Lanjutkan.",
          "Tekan Reset, ganti kondisi (suhu rendah, nutrisi terbatas, antibiotik), lalu bandingkan grafik dan jumlah bakteri pada waktu yang sama.",
        ],
      },
    );
    P.bact =
      '<rect class="a" x="3.5" y="8.5" width="13" height="7" rx="3.5"/><path d="M16.5 12c1.5-3 3 3 5 0M7 5.5v3M10 5.5v3M13 5.5v3M7 15.5v3M10 15.5v3"/>';
    P.growth =
      '<circle class="a" cx="5.5" cy="17.5" r="2.4"/><circle cx="11" cy="12" r="2.4"/><circle cx="17" cy="6.5" r="2.4"/><path d="M7.5 15.5 9.2 13.8M13 10l2-1.8"/>';
  })();
  $("smHome").onclick = closeAll;
  $("smSubj").addEventListener("click", function (e) {
    var b = e.target.closest(".sm-chip");
    if (!b) return;
    if (b.dataset.favf) {
      st.fav = !st.fav;
    } else if (b.dataset.subj) {
      st.subj = b.dataset.subj;
    }
    renderCat();
  });
  $("smTopic").addEventListener("click", function (e) {
    var b = e.target.closest(".sm-chip");
    if (!b) return;
    st.topic = b.dataset.topic;
    renderCat();
  });
  $("smQ").addEventListener("input", function () {
    st.q = this.value.trim();
    renderCat();
  });
  $("smList").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-a]");
    if (!b) return;
    var id = b.closest(".sm-card").dataset.id;
    if (b.dataset.a === "fav") {
      toggleFav(id);
      renderCat();
    } else if (b.dataset.a === "open") openSim(id);
  });
  $("smPlay").addEventListener("click", function (e) {
    var l = e.target.closest(".sm-chip[data-lang]");
    if (l) {
      changeLang(l.dataset.lang);
      return;
    }
    var b = e.target.closest("button[data-a]");
    if (!b) return;
    var a = b.dataset.a;
    if (a === "back") backToCat();
    else if (a === "fs") goFS();
    else if (a === "fsx") exitFS();
    else if (a === "favp" && cur) {
      toggleFav(cur.id);
      var f = isFav(cur.id);
      b.setAttribute("aria-pressed", f);
      b.innerHTML = ic(f ? "starF" : "star") + (f ? "Favorit" : "Tambah favorit");
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && pseudoFS) setPseudoFS(false);
  });
  var tile = $("smTile"),
    pb = $("smPromoBtn");
  if (tile)
    tile.addEventListener("click", function (e) {
      e.stopPropagation();
      openCat();
    });
  if (pb) pb.addEventListener("click", openCat);
  var mas = $("smMas");
  if (mas && window.brain) mas.innerHTML = window.brain("think", 84, true);
  window.bbSim = { open: openCat, data: S };
})();
