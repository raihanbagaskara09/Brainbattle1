// ===== Menggambar maskot otak (brain) dalam bentuk SVG dengan beberapa ekspresi =====

function brain(mood, size, crop) {
  mood = ["happy", "sad", "think", "cool"].includes(mood) ? mood : "happy";
  var P = "#ff9ec0",
    S = "#c94b78",
    D = "#0b1026";
  var eyes = {
    cool:
      '<rect x="68" y="82" width="28" height="20" rx="9" fill="' +
      D +
      '"/><rect x="104" y="82" width="28" height="20" rx="9" fill="' +
      D +
      '"/><rect x="94" y="87" width="12" height="5" rx="2" fill="' +
      D +
      '"/>',
    happy:
      '<path d="M72 96q10-13 20 0M108 96q10-13 20 0" stroke="' +
      D +
      '" stroke-width="5" fill="none" stroke-linecap="round"/>',
    sad:
      '<circle cx="82" cy="94" r="9" fill="#fff"/><circle cx="118" cy="94" r="9" fill="#fff"/><circle cx="82" cy="98" r="4.5" fill="' +
      D +
      '"/><circle cx="118" cy="98" r="4.5" fill="' +
      D +
      '"/><path d="M70 80l22-6M130 80l-22-6" stroke="' +
      D +
      '" stroke-width="4.5" stroke-linecap="round"/><path d="M126 104q-5 8 0 11q5-3 0-11z" fill="#7dd3fc"/>',
    think:
      '<circle cx="82" cy="94" r="9" fill="#fff"/><circle cx="118" cy="94" r="9" fill="#fff"/><circle cx="86" cy="90" r="4.5" fill="' +
      D +
      '"/><circle cx="122" cy="90" r="4.5" fill="' +
      D +
      '"/><path d="M70 80q11-8 22-1M108 82h22" stroke="' +
      D +
      '" stroke-width="4.5" fill="none" stroke-linecap="round"/><circle cx="168" cy="40" r="14" fill="#ffd166"/><text x="168" y="47" text-anchor="middle" font-size="20" font-weight="800" font-family="Fredoka,sans-serif" fill="' +
      D +
      '">?</text>',
  }[mood];
  var mouth = {
    cool: "M84 114q16 14 32 0",
    happy: "M84 112q16 16 32 0",
    sad: "M88 122q12-11 24 0",
    think: "M90 116h20",
  }[mood];
  var C = [
    [64, 78, 28],
    [100, 60, 31],
    [136, 78, 28],
    [68, 110, 27],
    [132, 110, 27],
    [100, 102, 32],
  ];
  var ring = C.map(function (c) {
    return (
      '<circle cx="' +
      c[0] +
      '" cy="' +
      c[1] +
      '" r="' +
      c[2] +
      '" fill="' +
      S +
      '" stroke="' +
      S +
      '" stroke-width="5"/>'
    );
  }).join("");
  var fill = C.map(function (c) {
    return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '" fill="' + P + '"/>';
  }).join("");
  function arm(m) {
    var x = function (v) {
      return m ? 200 - v : v;
    };
    return (
      '<path d="M' +
      x(70) +
      " 120Q" +
      x(26) +
      " 134 " +
      x(28) +
      ' 90" stroke="' +
      S +
      '" stroke-width="25" fill="none" stroke-linecap="round"/><path d="M' +
      x(70) +
      " 120Q" +
      x(26) +
      " 134 " +
      x(28) +
      ' 90" stroke="' +
      P +
      '" stroke-width="19" fill="none" stroke-linecap="round"/><circle cx="' +
      x(36) +
      '" cy="118" r="16" fill="' +
      P +
      '" stroke="' +
      S +
      '" stroke-width="4"/><path d="M' +
      x(30) +
      ' 112q6 6 12 0" stroke="' +
      S +
      '" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="' +
      x(28) +
      '" cy="80" r="14" fill="' +
      P +
      '" stroke="' +
      S +
      '" stroke-width="4"/><path d="M' +
      x(22) +
      ' 78h12" stroke="' +
      S +
      '" stroke-width="3" stroke-linecap="round"/>'
    );
  }
  var body =
    '<ellipse cx="100" cy="190" rx="44" ry="6" fill="#000" opacity=".22"/><rect x="82" y="138" width="15" height="38" rx="7" fill="' +
    P +
    '" stroke="' +
    S +
    '" stroke-width="4"/><rect x="103" y="138" width="15" height="38" rx="7" fill="' +
    P +
    '" stroke="' +
    S +
    '" stroke-width="4"/><ellipse cx="86" cy="178" rx="14" ry="7" fill="#f59e0b"/><ellipse cx="114" cy="178" rx="14" ry="7" fill="#f59e0b"/>' +
    arm(0) +
    arm(1) +
    ring +
    fill +
    '<path d="M100 32v34M72 62q14 8 6 22M128 62q-14 8-6 22M58 100q14-4 20 8M142 100q-14-4-20 8M100 120v10" stroke="' +
    S +
    '" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
    eyes +
    '<path d="' +
    mouth +
    '" stroke="' +
    D +
    '" stroke-width="4.5" fill="none" stroke-linecap="round"/>';
  return (
    '<svg class="bm bm-' +
    mood +
    '" viewBox="' +
    (crop ? "6 22 188 168" : "0 10 200 190") +
    '" width="' +
    size +
    '" height="' +
    size +
    '" aria-hidden="true">' +
    body +
    "</svg>"
  );
}
document.getElementById("logo").innerHTML = brain("cool", 40, true);