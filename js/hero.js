// ===== Memasang roket ke elemen #hero, klik untuk menggambar ulang =====

var hv = document.getElementById("hero");
hv.innerHTML = bbRocket();
hv.style.cursor = "pointer";
hv.onclick = function () {
  hv.innerHTML = bbRocket();
};