// ===== Bank soal dan logika permainan kuis (mulai, jawab, nyawa, waktu, hasil) =====

(function () {
  var $ = function (i) {
      return document.getElementById(i);
    },
    M = document.querySelector("main");
  var Q = [
    [
      "Tujuan utama teks argumentasi adalah ...",
      [
        "Menghibur pembaca melalui cerita",
        "Meyakinkan pembaca dengan alasan dan bukti",
        "Menggambarkan suatu tempat",
        "Menceritakan pengalaman pribadi",
        "Menjelaskan langkah-langkah membuat sesuatu",
      ],
      1,
      "Bahasa Indonesia",
      "Mudah",
      "Teks argumentasi bertujuan meyakinkan pembaca dengan alasan, data, dan bukti.",
    ],
    [
      "Perhatikan paragraf berikut. “Singkong merupakan salah satu bahan pangan lokal yang berpotensi menggantikan sebagian konsumsi beras. Selain mudah dibudidayakan, singkong dapat diolah menjadi berbagai makanan, seperti tiwul dan tepung mocaf.” Ide pokok paragraf tersebut adalah ...",
      [
        "Singkong sulit dibudidayakan",
        "Beras merupakan makanan pokok masyarakat",
        "Singkong hanya dapat diolah menjadi tiwul",
        "Singkong memiliki potensi sebagai bahan pangan alternatif",
        "Tepung mocaf tidak dapat digunakan untuk makanan",
      ],
      3,
      "Bahasa Indonesia",
      "Sedang",
      "Kalimat pertama memuat gagasan utama: singkong berpotensi menjadi pangan alternatif.",
    ],
    [
      "Kalimat yang termasuk opini adalah ...",
      [
        "Indonesia memiliki wilayah laut yang luas.",
        "Beras merupakan salah satu bahan pangan pokok masyarakat Indonesia.",
        "Singkong dapat diolah menjadi tepung.",
        "Menurut saya, makanan tradisional Indonesia sangat lezat.",
        "Jagung dapat digunakan sebagai bahan pangan.",
      ],
      3,
      "Bahasa Indonesia",
      "Mudah",
      "Frasa “menurut saya” dan penilaian “sangat lezat” bersifat subjektif sehingga termasuk opini.",
    ],
    [
      "Fungsi utama poster persuasi adalah ...",
      [
        "Menyampaikan cerita fiksi",
        "Menjelaskan seluruh teori secara terperinci",
        "Mengajak pembaca melakukan sesuatu",
        "Menyampaikan dialog tokoh",
        "Menguraikan riwayat hidup seseorang",
      ],
      2,
      "Bahasa Indonesia",
      "Mudah",
      "Poster persuasi dibuat untuk mengajak atau memengaruhi pembaca agar bertindak.",
    ],
    [
      "Informasi dalam berita dikatakan aktual apabila ...",
      [
        "Berdasarkan cerita turun-temurun",
        "Berasal dari khayalan penulis",
        "Sesuai dengan peristiwa yang sedang atau baru terjadi",
        "Tidak memiliki waktu kejadian",
        "Hanya berdasarkan pendapat pribadi",
      ],
      2,
      "Bahasa Indonesia",
      "Mudah",
      "Aktual berarti terkini dan masih relevan bagi pembaca.",
    ],
    [
      "Unsur berita yang menjawab pertanyaan “mengapa” adalah ...",
      ["How", "Why", "Who", "Where", "When"],
      1,
      "Bahasa Indonesia",
      "Mudah",
      "Why menanyakan sebab atau alasan terjadinya peristiwa.",
    ],
    [
      "Dalam membuat vlog berita, hal yang paling penting adalah ...",
      [
        "Menggunakan informasi yang belum diperiksa",
        "Mengutamakan efek visual daripada isi",
        "Menyampaikan informasi secara akurat dan menarik",
        "Menghilangkan sumber informasi",
        "Menambahkan cerita fiksi agar lebih menarik",
      ],
      2,
      "Bahasa Indonesia",
      "Sedang",
      "Vlog berita harus akurat agar dapat dipercaya dan dikemas menarik agar mudah dipahami.",
    ],
    [
      "Tokoh yang menjadi pusat cerita disebut ...",
      ["Tokoh tambahan", "Tokoh figuran", "Tokoh utama", "Tokoh pembantu", "Tokoh pengganti"],
      2,
      "Bahasa Indonesia",
      "Mudah",
      "Tokoh utama paling banyak berperan dan menjadi pusat jalannya cerita.",
    ],
    [
      "Keterangan mengenai waktu, tempat, dan suasana dalam cerpen disebut ...",
      ["Tema", "Amanat", "Alur", "Latar", "Sudut pandang"],
      3,
      "Bahasa Indonesia",
      "Mudah",
      "Latar meliputi latar waktu, tempat, dan suasana.",
    ],
    [
      "Tujuan utama penulisan resensi adalah ...",
      [
        "Menceritakan kehidupan peresensi",
        "Memberikan penilaian dan informasi mengenai suatu karya",
        "Mengubah seluruh isi buku",
        "Menggantikan karya asli",
        "Membuat cerita baru",
      ],
      1,
      "Bahasa Indonesia",
      "Sedang",
      "Resensi memberi informasi sekaligus penilaian terhadap suatu karya.",
    ],
    [
      "Diketahui f(x) = 2x + 4. Fungsi inversnya adalah f⁻¹(x) = ...",
      ["(x + 4)/2", "(x − 4)/2", "2x − 4", "2x + 4", "(4 − x)/2"],
      1,
      "Matematika",
      "Sedang",
      "y = 2x + 4 → x = (y − 4)/2, sehingga f⁻¹(x) = (x − 4)/2.",
    ],
    [
      "Diketahui f(x) = 3x − 2 dan g(x) = x + 4. Bentuk (f∘g)(x) adalah ...",
      ["3x + 2", "3x + 6", "3x + 10", "3x − 6", "3x − 10"],
      2,
      "Matematika",
      "Sedang",
      "(f∘g)(x) = 3(x + 4) − 2 = 3x + 10.",
    ],
    [
      "Sebuah lingkaran berjari-jari 21 cm memiliki sudut pusat 60°. Dengan π = 22/7, panjang busurnya adalah ...",
      ["11 cm", "22 cm", "33 cm", "44 cm", "66 cm"],
      1,
      "Matematika",
      "Sedang",
      "Panjang busur = 60/360 × 2 × 22/7 × 21 = 1/6 × 132 = 22 cm.",
    ],
    [
      "Sebuah sudut pusat berukuran 80° menghadap busur yang sama dengan sebuah sudut keliling. Besar sudut keliling tersebut adalah ...",
      ["20°", "30°", "40°", "80°", "160°"],
      2,
      "Matematika",
      "Mudah",
      "Sudut keliling = ½ × sudut pusat = ½ × 80° = 40°.",
    ],
    [
      "Garis singgung lingkaran selalu ...",
      [
        "Sejajar dengan jari-jari",
        "Tegak lurus terhadap jari-jari di titik singgung",
        "Berimpit dengan diameter",
        "Memotong lingkaran di dua titik",
        "Berada di dalam lingkaran",
      ],
      1,
      "Matematika",
      "Mudah",
      "Garis singgung menyentuh lingkaran di satu titik dan tegak lurus jari-jari di titik itu.",
    ],
    [
      "Median dari data 3, 5, 7, 9, dan 11 adalah ...",
      ["3", "5", "7", "9", "11"],
      2,
      "Matematika",
      "Mudah",
      "Data sudah terurut dan banyaknya ganjil, sehingga median adalah nilai tengah, yaitu 7.",
    ],
    [
      "Diketahui vektor a = (2, 3) dan b = (4, 1). Hasil a + b adalah ...",
      ["(2, 2)", "(4, 3)", "(6, 4)", "(8, 3)", "(6, 2)"],
      2,
      "Matematika",
      "Mudah",
      "Penjumlahan vektor per komponen: (2 + 4, 3 + 1) = (6, 4).",
    ],
    [
      "Jika v = (3, 4), panjang vektor tersebut adalah ...",
      ["3", "4", "5", "7", "25"],
      2,
      "Matematika",
      "Mudah",
      "Panjang v = √(3² + 4²) = √25 = 5.",
    ],
    [
      "Derajat polinomial 5x⁴ + x³ − 2x + 7 adalah ...",
      ["1", "2", "3", "4", "5"],
      3,
      "Matematika",
      "Mudah",
      "Derajat adalah pangkat tertinggi variabel, yaitu 4.",
    ],
    [
      "Faktorisasi yang benar dari polinomial x³ − 6x² + 11x − 6 adalah ...",
      [
        "(x + 1)(x + 2)(x + 3)",
        "(x − 1)(x + 2)(x − 3)",
        "(x − 1)(x − 2)(x − 3)",
        "(x − 1)(x − 2)(x + 3)",
        "(x + 1)(x − 2)(x − 3)",
      ],
      2,
      "Matematika",
      "Sulit",
      "P(1) = 1 − 6 + 11 − 6 = 0, sehingga (x − 1) faktor. Hasil baginya x² − 5x + 6 = (x − 2)(x − 3).",
    ],
    [
      "Pendapatan nasional dapat digunakan untuk mengetahui ...",
      [
        "Jumlah penduduk setiap kota saja",
        "Kondisi perekonomian suatu negara",
        "Jumlah sekolah di suatu negara",
        "Luas wilayah negara",
        "Jumlah perusahaan asing saja",
      ],
      1,
      "Ekonomi",
      "Mudah",
      "Pendapatan nasional menggambarkan kondisi dan kinerja perekonomian suatu negara.",
    ],
    [
      "Produk Nasional Bruto (PNB) memperhitungkan ...",
      [
        "Produksi perusahaan domestik saja",
        "Produksi warga asing di dalam negeri saja",
        "Produksi berdasarkan kewarganegaraan atau kepemilikan faktor produksi nasional",
        "Barang impor saja",
        "Pajak perusahaan saja",
      ],
      2,
      "Ekonomi",
      "Sedang",
      "PNB dihitung berdasarkan kepemilikan faktor produksi nasional, di mana pun produksi dilakukan.",
    ],
    [
      "Jika pendapatan nasional Rp600 triliun dan jumlah penduduk 200 juta jiwa, pendapatan per kapita adalah ...",
      ["Rp300.000", "Rp1.000.000", "Rp2.000.000", "Rp3.000.000", "Rp6.000.000"],
      3,
      "Ekonomi",
      "Sedang",
      "600 triliun ÷ 200 juta = Rp3.000.000 per orang.",
    ],
    [
      "Pembangunan ekonomi berbeda dengan pertumbuhan ekonomi karena pembangunan ekonomi juga memperhatikan ...",
      [
        "Kenaikan harga barang saja",
        "Perubahan nilai mata uang saja",
        "Peningkatan kesejahteraan dan perubahan struktur ekonomi",
        "Jumlah ekspor saja",
        "Jumlah uang beredar saja",
      ],
      2,
      "Ekonomi",
      "Sedang",
      "Pembangunan ekonomi mencakup perubahan struktur, pemerataan, dan kualitas hidup.",
    ],
    [
      "Penduduk yang termasuk angkatan kerja adalah ...",
      [
        "Seluruh anak berusia di bawah lima tahun",
        "Penduduk usia kerja yang bekerja atau menganggur dan mencari pekerjaan",
        "Seluruh pelajar tanpa pengecualian",
        "Seluruh penduduk yang tidak bekerja dan tidak mencari pekerjaan",
        "Semua penduduk tanpa melihat usia",
      ],
      1,
      "Ekonomi",
      "Mudah",
      "Angkatan kerja adalah penduduk usia kerja yang bekerja, atau menganggur tetapi sedang mencari kerja.",
    ],
    [
      "Pengangguran yang terjadi karena seseorang sedang berpindah pekerjaan disebut pengangguran ...",
      ["Friksional", "Struktural", "Siklis", "Musiman", "Teknologi"],
      0,
      "Ekonomi",
      "Mudah",
      "Pengangguran friksional bersifat sementara selama masa mencari atau berpindah kerja.",
    ],
    [
      "Inflasi adalah ...",
      [
        "Penurunan harga satu barang saja",
        "Kenaikan harga barang secara umum dan terus-menerus",
        "Peningkatan jumlah produksi saja",
        "Penurunan pendapatan nasional",
        "Penurunan jumlah penduduk",
      ],
      1,
      "Ekonomi",
      "Mudah",
      "Inflasi adalah kenaikan harga umum yang berlangsung terus-menerus.",
    ],
    [
      "Salah satu dampak inflasi yang tinggi adalah ...",
      [
        "Daya beli uang selalu meningkat",
        "Nilai riil uang menurun",
        "Harga seluruh barang menurun",
        "Tidak ada perubahan daya beli",
        "Pendapatan semua orang pasti meningkat",
      ],
      1,
      "Ekonomi",
      "Mudah",
      "Saat harga naik, jumlah barang yang dapat dibeli dengan uang yang sama berkurang.",
    ],
    [
      "Kebijakan moneter dilaksanakan oleh bank sentral untuk memengaruhi ...",
      [
        "Jumlah penduduk",
        "Jumlah uang beredar dan kondisi moneter",
        "Jumlah sekolah",
        "Luas lahan pertanian",
        "Sistem pemerintahan daerah",
      ],
      1,
      "Ekonomi",
      "Mudah",
      "Bank sentral mengatur jumlah uang beredar dan suku bunga melalui kebijakan moneter.",
    ],
    [
      "Ketika inflasi tinggi, bank sentral dapat melakukan kebijakan moneter kontraktif dengan cara ...",
      [
        "Menurunkan suku bunga secara tajam",
        "Meningkatkan jumlah uang beredar",
        "Menaikkan suku bunga kebijakan",
        "Menghapus seluruh pajak",
        "Meningkatkan subsidi tanpa batas",
      ],
      2,
      "Ekonomi",
      "Sulit",
      "Menaikkan suku bunga mengurangi uang beredar dan permintaan sehingga inflasi mereda.",
    ],
    [
      "Kelompok sosial terbentuk apabila terdapat ...",
      [
        "Individu yang tidak pernah berinteraksi",
        "Sejumlah individu yang berinteraksi dan memiliki kesadaran sebagai kelompok",
        "Orang-orang yang berada di tempat sama tanpa hubungan sosial",
        "Individu yang selalu memiliki pendapat berbeda",
        "Orang-orang yang tidak mempunyai tujuan bersama",
      ],
      1,
      "Sosiologi",
      "Mudah",
      "Kelompok sosial memerlukan interaksi dan kesadaran sebagai bagian dari kelompok.",
    ],
    [
      "Kelompok sosial sekunder biasanya memiliki hubungan yang ...",
      [
        "Sangat intim dan pribadi",
        "Berdasarkan hubungan darah saja",
        "Formal dan berorientasi pada tujuan tertentu",
        "Tidak memiliki tujuan",
        "Selalu berlangsung seumur hidup",
      ],
      2,
      "Sosiologi",
      "Sedang",
      "Kelompok sekunder bersifat formal, impersonal, dan berorientasi tujuan.",
    ],
    [
      "Kelompok yang dianggap sebagai kelompok luar disebut ...",
      ["In-group", "Primary group", "Out-group", "Gemeinschaft", "Paguyuban"],
      2,
      "Sosiologi",
      "Mudah",
      "Out-group adalah kelompok di luar kelompok seseorang.",
    ],
    [
      "Gemeinschaft ditandai oleh ...",
      [
        "Hubungan akrab dan ikatan emosional yang kuat",
        "Hubungan formal yang hanya berorientasi pada keuntungan",
        "Tidak adanya interaksi",
        "Persaingan ekonomi semata",
        "Hubungan sementara tanpa kedekatan",
      ],
      0,
      "Sosiologi",
      "Mudah",
      "Gemeinschaft memiliki ikatan batin yang alamiah dan kekeluargaan.",
    ],
    [
      "Contoh Gesellschaft adalah ...",
      [
        "Keluarga inti",
        "Kelompok sahabat dekat",
        "Organisasi perusahaan modern",
        "Kelompok kerabat",
        "Komunitas keluarga besar",
      ],
      2,
      "Sosiologi",
      "Sedang",
      "Perusahaan modern berhubungan secara formal dan berorientasi kepentingan.",
    ],
    [
      "Sikap menganggap kelompok sendiri lebih baik daripada kelompok lain disebut ...",
      ["Toleransi", "Etnosentrisme", "Integrasi", "Akulturasi", "Asimilasi"],
      1,
      "Sosiologi",
      "Mudah",
      "Etnosentrisme menilai kelompok lain dengan standar kelompok sendiri.",
    ],
    [
      "Kemiskinan relatif adalah kemiskinan yang ...",
      [
        "Diukur hanya berdasarkan kebutuhan makan",
        "Berkaitan dengan kondisi ekonomi seseorang dibandingkan standar hidup masyarakat sekitarnya",
        "Tidak dipengaruhi keadaan masyarakat",
        "Selalu disebabkan bencana alam",
        "Hanya terjadi di wilayah pedesaan",
      ],
      1,
      "Sosiologi",
      "Sulit",
      "Kemiskinan relatif diukur dengan membandingkan kondisi seseorang terhadap standar hidup di sekitarnya.",
    ],
    [
      "Kriminalitas merupakan masalah sosial karena ...",
      [
        "Selalu meningkatkan kesejahteraan masyarakat",
        "Dapat mengganggu keamanan dan ketertiban masyarakat",
        "Tidak memengaruhi kehidupan sosial",
        "Selalu menjadi kebiasaan positif",
        "Hanya terjadi di lingkungan sekolah",
      ],
      1,
      "Sosiologi",
      "Mudah",
      "Kriminalitas mengganggu rasa aman dan ketertiban sehingga menjadi masalah sosial.",
    ],
    [
      "Upaya yang tepat untuk mengurangi diskriminasi adalah ...",
      [
        "Membatasi pergaulan antarkelompok",
        "Memperkuat prasangka sosial",
        "Menumbuhkan toleransi dan kesetaraan",
        "Mengutamakan satu kelompok saja",
        "Menghindari semua bentuk kerja sama",
      ],
      2,
      "Sosiologi",
      "Sedang",
      "Toleransi dan kesetaraan menurunkan prasangka dan diskriminasi.",
    ],
    [
      "Salah satu cara mencegah kenakalan remaja adalah ...",
      [
        "Membiarkan remaja tanpa pendampingan",
        "Mengucilkan seluruh remaja",
        "Memberikan pendidikan karakter dan kegiatan positif",
        "Membatasi seluruh aktivitas sosial",
        "Menghindari komunikasi dengan keluarga",
      ],
      2,
      "Sosiologi",
      "Sedang",
      "Pendidikan karakter dan kegiatan positif mengarahkan energi remaja ke hal yang baik.",
    ],
    [
      "Letak geografis Indonesia berada di antara ...",
      [
        "Benua Asia dan Eropa serta Samudra Arktik",
        "Benua Asia dan Australia serta Samudra Hindia dan Pasifik",
        "Benua Afrika dan Amerika",
        "Samudra Atlantik dan Arktik",
        "Benua Eropa dan Australia",
      ],
      1,
      "Geografi",
      "Mudah",
      "Indonesia berada di antara dua benua (Asia dan Australia) dan dua samudra (Hindia dan Pasifik).",
    ],
    [
      "Upaya yang tepat untuk menjaga sumber daya laut adalah ...",
      [
        "Menggunakan bahan peledak untuk menangkap ikan",
        "Membuang limbah industri ke laut",
        "Melakukan penangkapan ikan secara berlebihan",
        "Menerapkan penangkapan ikan berkelanjutan",
        "Menghilangkan seluruh kawasan konservasi",
      ],
      3,
      "Geografi",
      "Sedang",
      "Penangkapan berkelanjutan menjaga stok ikan dan ekosistem laut.",
    ],
    [
      "Faktor klimatik yang memengaruhi persebaran flora dan fauna adalah ...",
      [
        "Suhu dan curah hujan",
        "Jenis batuan saja",
        "Bentuk administrasi wilayah",
        "Jumlah penduduk saja",
        "Kepadatan bangunan",
      ],
      0,
      "Geografi",
      "Mudah",
      "Faktor klimatik berkaitan dengan iklim, seperti suhu, curah hujan, dan kelembapan.",
    ],
    [
      "Komodo merupakan fauna khas yang berasal dari wilayah ...",
      ["Sumatra", "Kalimantan", "Nusa Tenggara", "Papua bagian timur", "Jawa bagian barat"],
      2,
      "Geografi",
      "Sedang",
      "Komodo berhabitat di Nusa Tenggara, seperti Pulau Komodo dan Rinca.",
    ],
    [
      "Garis Wallace dikenal sebagai salah satu batas persebaran fauna antara ...",
      [
        "Asiatis dan Australis",
        "Asiatis dan peralihan",
        "Australis dan Antarktika",
        "Eropa dan Asia",
        "Afrika dan Asia",
      ],
      1,
      "Geografi",
      "Sulit",
      "Garis Wallace memisahkan fauna Asiatis dari fauna peralihan (Wallacea).",
    ],
    [
      "Kegiatan pertambangan yang tidak memperhatikan lingkungan dapat menyebabkan ...",
      [
        "Pemulihan ekosistem secara otomatis",
        "Kerusakan lahan dan pencemaran air",
        "Peningkatan keanekaragaman hayati",
        "Berkurangnya seluruh risiko bencana",
        "Kesuburan tanah selalu meningkat",
      ],
      1,
      "Geografi",
      "Sedang",
      "Tambang tanpa pengelolaan merusak lahan dan mencemari air.",
    ],
    [
      "AMDAL merupakan singkatan dari ...",
      [
        "Analisis Manajemen Daerah dan Lingkungan",
        "Analisis Mengenai Dampak Lingkungan",
        "Anggaran Masyarakat dalam Analisis Lingkungan",
        "Administrasi Manajemen Alam dan Laut",
        "Analisis Mutu dan Daya Lingkungan",
      ],
      1,
      "Geografi",
      "Mudah",
      "AMDAL = Analisis Mengenai Dampak Lingkungan.",
    ],
    [
      "Ketahanan pangan berarti ...",
      [
        "Negara hanya memproduksi satu jenis makanan",
        "Masyarakat memiliki akses terhadap pangan yang cukup, aman, dan bergizi",
        "Seluruh pangan harus diimpor",
        "Harga pangan harus selalu tinggi",
        "Produksi pangan tidak perlu diperhatikan",
      ],
      1,
      "Geografi",
      "Mudah",
      "Ketahanan pangan mencakup ketersediaan, keterjangkauan, dan keamanan pangan.",
    ],
    [
      "Energi terbarukan adalah energi yang ...",
      [
        "Selalu berasal dari batu bara",
        "Bersumber dari proses alam yang dapat diperbarui",
        "Hanya berasal dari minyak bumi",
        "Tidak dapat dimanfaatkan manusia",
        "Selalu menghasilkan limbah radioaktif",
      ],
      1,
      "Geografi",
      "Mudah",
      "Energi terbarukan berasal dari sumber alam yang dapat pulih, seperti surya, angin, dan air.",
    ],
    [
      "Industri yang menggunakan bahan baku dari hasil pertanian termasuk industri yang berorientasi pada ...",
      [
        "Bahan baku",
        "Konsumen semata",
        "Tenaga kerja asing saja",
        "Pusat pemerintahan",
        "Pelabuhan internasional saja",
      ],
      0,
      "Geografi",
      "Sulit",
      "Industri pengolahan hasil pertanian umumnya didirikan dekat sumber bahan baku.",
    ],
    [
      "Organel sel yang berfungsi sebagai tempat respirasi sel untuk menghasilkan sebagian besar ATP adalah ...",
      ["Ribosom", "Mitokondria", "Lisosom", "Badan Golgi", "Sentriol"],
      1,
      "Biologi",
      "Mudah",
      "Mitokondria disebut pusat energi sel karena menghasilkan ATP.",
    ],
    [
      "Organel yang mengandung klorofil dan berperan dalam fotosintesis adalah ...",
      ["Mitokondria", "Nukleus", "Kloroplas", "Ribosom", "Lisosom"],
      2,
      "Biologi",
      "Mudah",
      "Klorofil terdapat di kloroplas, tempat berlangsungnya fotosintesis.",
    ],
    [
      "Jaringan tumbuhan yang berfungsi mengangkut air dan mineral dari akar ke daun adalah ...",
      ["Floem", "Epidermis", "Xilem", "Kolenkim", "Sklerenkim"],
      2,
      "Biologi",
      "Mudah",
      "Xilem mengangkut air dan mineral, sedangkan floem mengangkut hasil fotosintesis.",
    ],
    [
      "Jaringan meristem berfungsi untuk ...",
      [
        "Mengangkut hasil fotosintesis",
        "Menyimpan udara",
        "Menghasilkan sel baru melalui pembelahan",
        "Melindungi organ hewan",
        "Membentuk sel darah merah",
      ],
      2,
      "Biologi",
      "Sedang",
      "Meristem terdiri atas sel-sel yang aktif membelah, misalnya di ujung akar dan batang.",
    ],
    [
      "Tulang yang berfungsi melindungi otak adalah ...",
      ["Tulang rusuk", "Tulang belikat", "Tulang tengkorak", "Tulang paha", "Tulang kering"],
      2,
      "Biologi",
      "Mudah",
      "Tulang tengkorak membentuk kotak pelindung bagi otak.",
    ],
    [
      "Jaringan yang menghubungkan otot dengan tulang adalah ...",
      ["Ligamen", "Tendon", "Epitel", "Saraf", "Tulang rawan"],
      1,
      "Biologi",
      "Sedang",
      "Tendon menghubungkan otot dengan tulang, sedangkan ligamen menghubungkan tulang dengan tulang.",
    ],
    [
      "Komponen darah yang berfungsi mengangkut oksigen terutama adalah ...",
      ["Leukosit", "Trombosit", "Eritrosit", "Plasma darah", "Limfosit"],
      2,
      "Biologi",
      "Mudah",
      "Eritrosit (sel darah merah) mengandung hemoglobin yang mengikat oksigen.",
    ],
    [
      "Pembuluh darah yang membawa darah keluar dari jantung disebut ...",
      ["Vena", "Arteri", "Kapiler", "Venula", "Limfa"],
      1,
      "Biologi",
      "Mudah",
      "Arteri membawa darah keluar dari jantung, sedangkan vena membawa darah kembali ke jantung.",
    ],
    [
      "Organ yang menghasilkan empedu adalah ...",
      ["Lambung", "Pankreas", "Hati", "Usus besar", "Kerongkongan"],
      2,
      "Biologi",
      "Mudah",
      "Hati menghasilkan empedu yang membantu pencernaan lemak.",
    ],
    [
      "Pertukaran gas oksigen dan karbon dioksida di paru-paru berlangsung pada ...",
      ["Trakea", "Bronkus", "Alveolus", "Laring", "Epiglotis"],
      2,
      "Biologi",
      "Sedang",
      "Dinding alveolus tipis dan dikelilingi kapiler darah sehingga memudahkan difusi gas.",
    ],
    [
      "Senyawa hidrokarbon tersusun atas unsur ...",
      [
        "Karbon dan oksigen",
        "Hidrogen dan oksigen",
        "Karbon dan hidrogen",
        "Nitrogen dan hidrogen",
        "Karbon dan nitrogen",
      ],
      2,
      "Kimia",
      "Mudah",
      "Hidrokarbon hanya terdiri atas atom karbon (C) dan hidrogen (H).",
    ],
    [
      "Rumus molekul propana adalah ...",
      ["CH₄", "C₂H₆", "C₃H₈", "C₄H₁₀", "C₅H₁₂"],
      2,
      "Kimia",
      "Mudah",
      "Propana memiliki 3 atom karbon; dengan n = 3 diperoleh C₃H₈.",
    ],
    [
      "Nama senyawa CH₃–CH₂–CH₃ adalah ...",
      ["Metana", "Etana", "Propana", "Butana", "Pentana"],
      2,
      "Kimia",
      "Mudah",
      "Tiga atom karbon dengan ikatan tunggal disebut propana.",
    ],
    [
      "Reaksi yang melepaskan kalor ke lingkungan disebut reaksi ...",
      ["Endoterm", "Eksoterm", "Isoterm", "Adiabatik", "Elektrolisis"],
      1,
      "Kimia",
      "Mudah",
      "Pada reaksi eksoterm, kalor berpindah dari sistem ke lingkungan dan ΔH negatif.",
    ],
    [
      "Jika suatu reaksi memiliki ΔH = −150 kJ, reaksi tersebut ...",
      [
        "Menyerap kalor 150 kJ",
        "Melepaskan kalor 150 kJ",
        "Tidak mengalami pertukaran kalor",
        "Selalu berlangsung lambat",
        "Tidak dapat berlangsung",
      ],
      1,
      "Kimia",
      "Sedang",
      "ΔH negatif menandakan reaksi eksoterm, yaitu melepaskan kalor.",
    ],
    [
      "Laju reaksi menyatakan ...",
      [
        "Perubahan konsentrasi zat per satuan waktu",
        "Jumlah zat tanpa memperhatikan waktu",
        "Massa zat dalam suatu wadah",
        "Volume zat tanpa perubahan",
        "Suhu lingkungan saja",
      ],
      0,
      "Kimia",
      "Mudah",
      "Laju reaksi adalah perubahan konsentrasi pereaksi atau produk per satuan waktu.",
    ],
    [
      "Kenaikan suhu umumnya mempercepat laju reaksi karena ...",
      [
        "Energi kinetik partikel menurun",
        "Tumbukan efektif menjadi lebih sering",
        "Konsentrasi selalu menjadi nol",
        "Semua reaksi berhenti",
        "Energi aktivasi selalu bertambah",
      ],
      1,
      "Kimia",
      "Sedang",
      "Suhu tinggi menambah energi kinetik partikel sehingga tumbukan efektif lebih banyak.",
    ],
    [
      "Kesetimbangan kimia bersifat dinamis karena ...",
      [
        "Reaksi maju berhenti total",
        "Reaksi balik berhenti total",
        "Reaksi maju dan balik tetap berlangsung dengan laju yang sama",
        "Konsentrasi semua zat harus sama",
        "Semua pereaksi berubah menjadi produk",
      ],
      2,
      "Kimia",
      "Sedang",
      "Pada kesetimbangan, reaksi ke kanan dan ke kiri tetap berjalan dengan laju sama.",
    ],
    [
      "Menurut asas Le Chatelier, jika konsentrasi pereaksi ditambah, kesetimbangan cenderung bergeser ...",
      [
        "Ke arah pereaksi",
        "Ke arah produk",
        "Tidak mungkin berubah",
        "Selalu ke kiri",
        "Ke arah dengan jumlah mol gas terbesar",
      ],
      1,
      "Kimia",
      "Sedang",
      "Sistem melawan perubahan dengan menggeser kesetimbangan ke arah produk untuk mengurangi kelebihan pereaksi.",
    ],
    [
      "Katalis pada sistem yang sudah mencapai kesetimbangan akan ...",
      [
        "Menggeser kesetimbangan ke kanan",
        "Menggeser kesetimbangan ke kiri",
        "Mengubah nilai Kc",
        "Mempercepat tercapainya kesetimbangan tanpa menggeser posisinya",
        "Menghentikan reaksi balik",
      ],
      3,
      "Kimia",
      "Sulit",
      "Katalis mempercepat reaksi maju dan balik sama besar sehingga posisi kesetimbangan dan nilai Kc tidak berubah.",
    ],
    [
      "Besaran yang menyatakan kecenderungan suatu gaya untuk memutar benda terhadap poros disebut ...",
      ["Momentum", "Impuls", "Torsi", "Tekanan", "Usaha"],
      2,
      "Fisika",
      "Mudah",
      "Torsi (momen gaya) adalah ukuran kecenderungan gaya memutar benda.",
    ],
    [
      "Sebuah gaya 10 N bekerja tegak lurus pada lengan sepanjang 2 m. Besar torsinya adalah ...",
      ["5 N·m", "10 N·m", "12 N·m", "20 N·m", "40 N·m"],
      3,
      "Fisika",
      "Mudah",
      "τ = F × d = 10 × 2 = 20 N·m.",
    ],
    [
      "Momen inersia suatu benda menunjukkan ...",
      [
        "Kemampuan benda mempertahankan keadaan gerak rotasinya",
        "Kecepatan translasi benda",
        "Besar tekanan benda",
        "Perubahan suhu benda",
        "Massa jenis benda saja",
      ],
      0,
      "Fisika",
      "Sedang",
      "Momen inersia adalah ukuran kelembaman benda terhadap perubahan gerak rotasi.",
    ],
    [
      "Sebuah pegas memiliki konstanta 200 N/m dan bertambah panjang 0,05 m. Gaya yang bekerja pada pegas adalah ...",
      ["2 N", "5 N", "10 N", "20 N", "40 N"],
      2,
      "Fisika",
      "Mudah",
      "F = k·Δx = 200 × 0,05 = 10 N.",
    ],
    [
      "Tegangan dalam konsep elastisitas didefinisikan sebagai ...",
      [
        "Gaya dikalikan panjang",
        "Gaya dibagi luas penampang",
        "Massa dibagi volume",
        "Energi dibagi waktu",
        "Panjang dibagi gaya",
      ],
      1,
      "Fisika",
      "Sedang",
      "Tegangan σ = F/A, yaitu gaya per satuan luas penampang.",
    ],
    [
      "Rumus tekanan hidrostatis adalah ...",
      ["P = ρ g h", "P = ρ / (g h)", "P = m g h", "P = F · h", "P = ρ g / h"],
      0,
      "Fisika",
      "Mudah",
      "Tekanan hidrostatis P = ρ·g·h.",
    ],
    [
      "Hukum Archimedes menjelaskan bahwa benda yang dicelupkan ke dalam fluida mengalami ...",
      [
        "Gaya gesek yang selalu nol",
        "Gaya apung sebesar berat fluida yang dipindahkan",
        "Gaya gravitasi yang hilang",
        "Tekanan yang selalu nol",
        "Gaya apung yang selalu sama dengan berat benda",
      ],
      1,
      "Fisika",
      "Sedang",
      "Gaya apung sama dengan berat fluida yang dipindahkan benda.",
    ],
    [
      "Persamaan kontinuitas untuk aliran fluida ideal yang tidak termampatkan adalah ...",
      ["A₁v₁ = A₂v₂", "A₁/v₁ = A₂/v₂", "A₁ + v₁ = A₂ + v₂", "A₁A₂ = v₁v₂", "v₁/A₁ = v₂/A₂"],
      0,
      "Fisika",
      "Sedang",
      "Debit fluida konstan: A₁v₁ = A₂v₂.",
    ],
    [
      "Kalor yang diperlukan untuk menaikkan suhu suatu benda dapat dihitung menggunakan rumus ...",
      ["Q = m c ΔT", "Q = m ΔT / c", "Q = c ΔT / m", "Q = m c / ΔT", "Q = m + c + ΔT"],
      0,
      "Fisika",
      "Mudah",
      "Kalor Q = massa × kalor jenis × perubahan suhu.",
    ],
    [
      "Perpindahan kalor melalui zat tanpa disertai perpindahan partikel zat secara keseluruhan disebut ...",
      ["Konveksi", "Radiasi", "Konduksi", "Evaporasi", "Sublimasi"],
      2,
      "Fisika",
      "Mudah",
      "Pada konduksi, kalor merambat melalui zat tanpa partikelnya berpindah tempat.",
    ],
    [
      "If I ___ enough money, I would travel around the world.",
      ["have", "had", "will have", "has", "having"],
      1,
      "Bahasa Inggris",
      "Mudah",
      "Conditional sentence tipe 2 (pengandaian yang tidak nyata di masa kini) memakai if + past form, lalu would + verb. Jadi yang tepat adalah had.",
    ],
    [
      "If it rains tomorrow, the football match ___.",
      ["is postponed", "will be postponed", "would be postponed", "has postponed", "postponing"],
      1,
      "Bahasa Inggris",
      "Sedang",
      "Conditional tipe 1 memakai if + present, lalu will + verb. Karena pertandingan 'ditunda' (pasif), bentuknya will be postponed.",
    ],
    [
      "The old bridge ___ by the local government last year.",
      ["built", "was built", "is built", "has built", "was building"],
      1,
      "Bahasa Inggris",
      "Mudah",
      "Kalimat pasif simple past: was/were + past participle. Karena subjek the old bridge tunggal dan waktunya last year, jawabannya was built.",
    ],
    [
      'Rina said, "I am reading a novel now." The reported speech is: Rina said that she ___ a novel then.',
      ["is reading", "was reading", "has read", "reads", "will read"],
      1,
      "Bahasa Inggris",
      "Sedang",
      "Pada reported speech, present continuous (am reading) berubah menjadi past continuous (was reading), dan now berubah menjadi then.",
    ],
    [
      "Which is the correct order of the generic structure of a narrative text?",
      [
        "Orientation – Complication – Resolution",
        "Complication – Orientation – Resolution",
        "Resolution – Complication – Orientation",
        "Orientation – Resolution – Complication",
        "Complication – Resolution – Orientation",
      ],
      0,
      "Bahasa Inggris",
      "Mudah",
      "Narrative text dimulai dari orientation (pengenalan tokoh dan latar), lalu complication (masalah), dan diakhiri resolution (penyelesaian).",
    ],
    [
      "What is the main purpose of a news item text?",
      [
        "To entertain readers with an imaginary story",
        "To inform readers about events that are newsworthy or important",
        "To persuade readers to buy a product",
        "To describe a particular person in detail",
        "To explain how something works",
      ],
      1,
      "Bahasa Inggris",
      "Mudah",
      "News item bertujuan memberi tahu pembaca tentang peristiwa sehari-hari yang layak diberitakan atau penting.",
    ],
    [
      'Anita: "I passed the scholarship test!" Dani: "___"',
      [
        "I'm sorry to hear that.",
        "Congratulations! You deserve it.",
        "What a pity!",
        "Never mind.",
        "That's too bad.",
      ],
      1,
      "Bahasa Inggris",
      "Mudah",
      "Untuk menanggapi kabar baik, kita mengucapkan selamat: Congratulations! You deserve it.",
    ],
    [
      "If she had studied harder, she ___ the exam.",
      ["would pass", "would have passed", "will pass", "had passed", "would be passing"],
      1,
      "Bahasa Inggris",
      "Sulit",
      "Conditional tipe 3 (pengandaian tidak nyata di masa lalu) memakai if + past perfect, lalu would have + past participle.",
    ],
    [
      "The woman ___ lives next door is a doctor.",
      ["which", "whom", "whose", "who", "where"],
      3,
      "Bahasa Inggris",
      "Sedang",
      "Who dipakai sebagai relative pronoun untuk orang yang berperan sebagai subjek klausa (who lives next door).",
    ],
    [
      '"Rain is formed through the water cycle. First, the sun heats the water in seas and rivers, and it evaporates. Then the vapor rises and condenses into clouds. Finally, the water falls as rain." What is the text mainly about?',
      [
        "How rain is formed",
        "How to make water vapor",
        "The danger of heavy rain",
        "A description of the sun",
        "A story about a rainy day",
      ],
      0,
      "Bahasa Inggris",
      "Sedang",
      "Teks menjelaskan proses terjadinya hujan secara berurutan (first, then, finally). Ini ciri explanation text.",
    ],
  ];
  var homeEls = [].filter.call(M.children, function (e) {
    return !/^(quiz|res|guru|join|room|lat|edit)$/.test(e.id);
  });
  window.bbView = view;
  window.bbToast = toast;
  window.bbQ = Q;
  window.bbStart = function () {
    start();
  };
  var xp = 0,
    mode,
    pool,
    i,
    sc,
    ok,
    st,
    best,
    lives,
    over,
    sisa,
    tm,
    ans,
    nt,
    TT = 20,
    wrong = [];
  function hx(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  // Mengacak urutan array
  function sh(a) {
    for (var k = a.length - 1; k > 0; k--) {
      var j = (Math.random() * (k + 1)) | 0,
        t = a[k];
      a[k] = a[j];
      a[j] = t;
    }
    return a;
  }
  // Berpindah antar tampilan/layar
  function view(v) {
    homeEls.forEach(function (e) {
      e.style.display = v === "home" ? "" : "none";
    });
    $("quiz").style.display = v === "quiz" ? "" : "none";
    $("res").style.display = v === "res" ? "" : "none";
    ["guru", "join", "room", "lat", "edit"].forEach(function (id) {
      $(id).style.display = v === id ? "" : "none";
    });
    window.scrollTo(0, 0);
  }
  // Menampilkan pesan singkat (notifikasi)
  function toast(t) {
    var d = document.createElement("div");
    d.className = "toast";
    d.textContent = t;
    document.body.appendChild(d);
    setTimeout(function () {
      d.remove();
    }, 2600);
  }
  // Memperbarui tampilan nyawa
  function hearts() {
    $("hr").innerHTML =
      mode === "Bertahan"
        ? [0, 1, 2]
            .map(function (k) {
              return (
                '<i class="bi bi-heart-fill" style="color:' +
                (k < lives ? "#ff5d73" : "#4a4f7d") +
                '"></i>'
              );
            })
            .join(" ")
        : "";
  }
  // Hitung mundur waktu per soal
  function tick() {
    $("tt").innerHTML = '<i class="bi bi-hourglass-split"></i> ' + Math.max(sisa, 0) + " dtk";
    $("bf").style.width = (Math.max(sisa, 0) / TT) * 100 + "%";
    $("bf").style.background = sisa <= 5 ? "#ff5d73" : "";
  }
  // Memulai permainan
  function start() {
    var R = window.bbRun;
    wrong = [];
    TT = 20;
    nt = "";
    mode = document.querySelector("#modes .chip.on").textContent.trim();
    var p;
    if (R) {
      mode = R.timed ? "Tantangan" : "Santai";
      TT = R.secs || 20;
      p = R.qs.slice();
    } else {
      var c = document.querySelector("#mapels .chip.on"),
        s = c ? c.textContent.trim().replace(/\s*\(\d+\)$/, "") : "";
      p = Q.filter(function (q) {
        return q[3] === s;
      });
      if (p.length < 2) {
        p = Q.slice();
        if (s && s.indexOf("Semua") !== 0)
          nt = "Contoh soal " + s + " belum ada di pratinjau, jadi dimainkan campuran.";
      }
    }
    var ct = document.querySelector("#cnts .chip.on").textContent.trim(),
      nq = R ? R.n || p.length : ct === "Semua" ? p.length : +ct;
    pool = (R && R.ordered ? p : sh(p.slice())).slice(0, nq).map(function (q) {
      var ix = q[1].map(function (_, i) {
        return i;
      });
      if (!(R && R.keepOpts)) ix = sh(ix);
      return {
        q: q[0],
        o: ix.map(function (k) {
          return q[1][k];
        }),
        a: ix.indexOf(q[2]),
        s: q[3],
        l: q[4],
        e: q[5],
        src: q,
      };
    });
    i = 0;
    sc = 0;
    ok = 0;
    st = 0;
    best = 0;
    lives = 3;
    over = false;
    ["l5", "lt", "ls"].forEach(function (id) {
      $(id).disabled = false;
    });
    $("lt").style.display = mode === "Santai" ? "none" : "";
    view("quiz");
    show();
  }
  // Menampilkan soal dan pilihan jawaban
  function show() {
    var q = pool[i];
    ans = false;
    clearInterval(tm);
    $("qn").textContent = "Soal " + (i + 1) + " dari " + pool.length;
    hearts();
    $("sc").textContent = sc;
    $("qm").innerHTML =
      '<i class="bi bi-fire"></i> ' +
      hx(q.s) +
      " · " +
      hx(q.l) +
      (st > 1 ? ' · <i class="bi bi-fire"></i> Streak ' + st : "") +
      (nt
        ? '<br><span style="text-transform:none;letter-spacing:0;font-weight:700">' + nt + "</span>"
        : "");
    $("qt").textContent = q.q;
    $("opts").innerHTML = q.o
      .map(function (o, k) {
        return (
          '<button class="opt" data-k="' +
          k +
          '"><span class="k">' +
          "ABCDE"[k] +
          "</span>" +
          o.replace(/</g, "&lt;") +
          "</button>"
        );
      })
      .join("");
    $("ex").style.display = "none";
    $("nx").style.display = "none";
    $("fb").textContent = "";
    $("bf").style.width = "100%";
    $("bf").style.background = "";
    if (mode === "Santai")
      $("tt").innerHTML =
        '<i class="bi bi-cup-hot-fill"></i> ' + (window.bbRun ? "Tanpa waktu" : "Santai");
    else {
      sisa = TT;
      tick();
      tm = setInterval(function () {
        sisa--;
        tick();
        if (sisa <= 0) pick(-1);
      }, 1000);
    }
  }
  // Lanjut ke soal berikutnya setelah menjawab
  function after() {
    var q = pool[i];
    $("ex").textContent = "Pembahasan: " + q.e;
    $("ex").style.display = "block";
    $("nx").textContent = over || i >= pool.length - 1 ? "Lihat hasil" : "Lanjut";
    $("nx").style.display = "block";
  }
  // Memproses jawaban yang dipilih pemain
  function pick(k) {
    if (ans) return;
    ans = true;
    clearInterval(tm);
    var q = pool[i],
      f = $("fb");
    [].forEach.call($("opts").children, function (b, n) {
      b.disabled = true;
      if (n === q.a) b.classList.add("ok");
      else if (n === k) b.classList.add("no");
    });
    if (k === q.a) {
      st++;
      best = Math.max(best, st);
      ok++;
      var p = 10 + (mode === "Santai" ? 0 : Math.floor(sisa / 3)) + Math.min(st - 1, 5);
      sc += p;
      $("sc").textContent = sc;
      f.style.color = "#3ddc97";
      f.textContent = "Benar! +" + p + " poin" + (st > 1 ? " · streak " + st : "");
    } else {
      st = 0;
      wrong.push(q.src);
      f.style.color = "#ff5d73";
      f.textContent = k === -1 ? "Waktu habis." : "Belum tepat. Jawaban benar ditandai hijau.";
      if (mode === "Bertahan") {
        lives--;
        hearts();
        if (lives <= 0) {
          over = true;
          f.textContent += " Nyawa habis!";
        }
      }
    }
    after();
  }
  // Mengakhiri permainan dan menampilkan hasil
  function finish() {
    var total = i + 1,
      acc = Math.round((ok / total) * 100);
    xp += sc;
    document.querySelector(".pill").textContent =
      "Lv " + (Math.floor(xp / 100) + 1) + " · " + xp + " XP";
    var b = function (n, l) {
      return '<div class="sb"><b>' + n + "</b><small>" + l + "</small></div>";
    };
    $("rs").innerHTML =
      b(sc, "Skor") +
      b(ok + "/" + total, "Benar") +
      b(acc + "%", "Akurasi") +
      b(best, "Streak terbaik");
    $("rm").textContent = over
      ? "Nyawa habis. Coba lagi dan bertahan lebih lama!"
      : acc >= 85
        ? "Luar biasa! Kamu jagoan BrainBattle."
        : acc >= 60
          ? "Bagus! Sedikit lagi menuju sempurna."
          : "Terus berlatih, kamu pasti bisa lebih baik.";
    $("rx").textContent = "+" + sc + " XP";
    var rb = $("retry"),
      W = window.bbRun && wrong.length;
    rb.style.display = W ? "" : "none";
    if (W) rb.textContent = "Ulangi " + wrong.length + " soal yang salah";
    view("res");
  }
  $("opts").addEventListener("click", function (e) {
    var b = e.target.closest(".opt");
    if (b) pick(+b.dataset.k);
  });
  $("nx").onclick = function () {
    if (over || i >= pool.length - 1) finish();
    else {
      i++;
      show();
    }
  };
  $("l5").onclick = function () {
    if (ans) return;
    var q = pool[i],
      w = [].filter.call($("opts").children, function (b, n) {
        return n !== q.a;
      });
    sh(w)
      .slice(0, 2)
      .forEach(function (b) {
        b.classList.add("cr");
      });
    $("l5").disabled = true;
  };
  $("lt").onclick = function () {
    if (ans || mode === "Santai") return;
    sisa += 10;
    tick();
    $("lt").disabled = true;
  };
  $("ls").onclick = function () {
    if (ans) return;
    ans = true;
    clearInterval(tm);
    st = 0;
    wrong.push(pool[i].src);
    [].forEach.call($("opts").children, function (b) {
      b.disabled = true;
    });
    $("fb").style.color = "#d6dbff";
    $("fb").textContent = "Soal dilewati.";
    $("ls").disabled = true;
    after();
  };
  $("qx").onclick = function () {
    clearInterval(tm);
    view("home");
  };
  $("again").onclick = start;
  $("retry").onclick = function () {
    var R = window.bbRun;
    if (!R || !wrong.length) return;
    window.bbRun = {
      name: R.name,
      timed: R.timed,
      secs: R.secs,
      keepOpts: R.keepOpts,
      ordered: false,
      qs: wrong.slice(),
    };
    start();
  };
  $("back").onclick = function () {
    view("home");
  };
  document.querySelector(".c1").onclick = function () {
    window.bbRun = null;
    start();
  };
  document.querySelector(".c2").onclick = function () {
    view("guru");
    if (window.bbOnGuru) window.bbOnGuru();
  };
  document.querySelector(".go").onclick = function () {
    window.bbRun = null;
    start();
  };
  $("tiles").addEventListener("click", function (e) {
    var t = e.target.closest(".tile");
    if (!t) return;
    if (t.dataset.m) {
      window.bbRun = null;
      start();
    } else if (t.dataset.lat && window.bbOpenLat) window.bbOpenLat();
    else toast("Halaman ini ada di aplikasi lengkap.");
  });
})();