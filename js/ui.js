// ===== Interaksi dasar: memilih chip dan tile di halaman depan =====

document.querySelectorAll(".chips").forEach(function (g) {
  g.addEventListener("click", function (e) {
    var c = e.target.closest(".chip");
    if (!c) return;
    g.querySelectorAll(".chip").forEach(function (x) {
      x.classList.remove("on");
    });
    c.classList.add("on");
  });
});
document.getElementById("tiles").addEventListener("click", function (e) {
  var t = e.target.closest("[data-m]");
  if (!t) return;
  document.querySelectorAll("#modes .chip").forEach(function (c) {
    c.classList.toggle("on", c.textContent.trim() === t.dataset.m);
  });
});