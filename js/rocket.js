// ===== Menggambar ilustrasi roket (bbRocket) dalam bentuk SVG =====

(function () {
  window.bbRocket = function () {
    var star = function (x, y, s, d) {
      return (
        '<path class="ha-s" style="animation-delay:' +
        d +
        's" d="M' +
        x +
        " " +
        (y - s) +
        "l" +
        s * 0.3 +
        " " +
        s * 0.7 +
        " " +
        s * 0.7 +
        " " +
        s * 0.3 +
        " -" +
        s * 0.7 +
        " " +
        s * 0.3 +
        " -" +
        s * 0.3 +
        " " +
        s * 0.7 +
        " -" +
        s * 0.3 +
        " -" +
        s * 0.7 +
        " -" +
        s * 0.7 +
        " -" +
        s * 0.3 +
        " " +
        s * 0.7 +
        " -" +
        s * 0.3 +
        'z" fill="#ffd166"/>'
      );
    };
    return (
      '<svg class="ha" viewBox="0 0 200 200" width="100%" aria-hidden="true">' +
      star(32, 44, 9, 0) +
      star(168, 62, 7, 0.8) +
      star(24, 128, 6, 1.6) +
      star(176, 140, 10, 0.4) +
      '<g opacity=".18" fill="#fff"><ellipse cx="100" cy="186" rx="34" ry="7"/><ellipse cx="72" cy="178" rx="16" ry="6"/><ellipse cx="130" cy="180" rx="18" ry="6"/></g>' +
      '<g class="ha-r"><g transform="rotate(22 100 100)">' +
      '<g class="ha-f"><path d="M84 124Q100 192 116 124z" fill="#ff7a45"/><path d="M92 124Q100 168 108 124z" fill="#ffd166"/></g>' +
      '<path d="M72 92 50 128l6 12 20-14z" fill="#6366f1"/><path d="M128 92l22 36-6 12-20-14z" fill="#6366f1"/>' +
      '<path d="M100 20C126 42 134 78 129 118H71C66 78 74 42 100 20z" fill="#e4e8ff"/>' +
      '<path d="M100 20C112 31 120 45 124 60H76C80 45 88 31 100 20z" fill="#ff7a45"/>' +
      '<path d="M71 100h58l1 12H70z" fill="#c9cffa"/>' +
      '<rect x="78" y="116" width="44" height="9" rx="4" fill="#ffd166"/>' +
      '<circle cx="100" cy="82" r="16" fill="#2b2870"/><circle cx="100" cy="82" r="11" fill="#6366f1"/><circle cx="96" cy="78" r="3.500" fill="#fff" opacity=".75"/>' +
      "</g></g></svg>"
    );
  };
  var hp = document.getElementById("hsPeng");
  if (hp) {
    var busy = false;
    function swap() {
      if (busy || hp.querySelector("svg.ha")) return;
      busy = true;
      hp.innerHTML = window.bbRocket();
      hp.setAttribute("aria-label", "Luncurkan roket BrainBattle");
      busy = false;
    }
    swap();
    new MutationObserver(swap).observe(hp, { childList: true });
  }
})();