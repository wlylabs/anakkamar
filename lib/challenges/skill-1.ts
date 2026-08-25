import type { ChallengeTemplate } from "@/lib/types";

export const SKILL_CHALLENGES_1: ChallengeTemplate[] = [
  {
    id: "skill-dasar-coding-7",
    title: "7 Hari Dasar Coding",
    tagline: "Ngoding itu skill, bukan bakat — bisa dilatih.",
    description:
      "Kenalan sama dasar-dasar programming pakai JavaScript, langsung praktik tiap hari di browser. Abis 7 hari lo bakal bisa bikin program kecil sendiri dari nol.",
    durationDays: 7,
    category: "skill",
    basis:
      "Digabung dari deliberate practice ala Anders Ericsson (latihan fokus & terarah), spaced practice (dikit-dikit tiap hari lebih nempel daripada belajar borongan), dan prinsip learn-by-building — belajar sambil bikin, bukan cuma nonton tutorial.",
    days: [
      {
        day: 1,
        title: "Kenalan Sama Coding",
        lesson:
          "Coding itu intinya ngasih instruksi ke komputer pakai bahasa yang bisa dia ngerti, step by step, biar dia ngelakuin sesuatu. Komputer itu bego banget — dia cuma ngikutin persis apa yang lo tulis, nggak lebih nggak kurang. Buat mulai, lo butuh satu 'bahasa' aja dulu, dan JavaScript pilihan bagus buat pemula karena bisa langsung jalan di browser, gratis, tanpa install apa-apa. Tiap browser modern (Chrome, Firefox, dll) punya 'console' bawaan yang bisa langsung nge-run kode JavaScript. Ini tempat main-main pertama lo sebelum masuk ke tools yang lebih niat kayak replit.com.",
        action:
          "Buka Chrome, tekan F12 (atau klik kanan > Inspect), pilih tab 'Console'. Ketik 1 + 1 terus Enter, lihat hasilnya. Terus ketik console.log(\"Halo dunia\") dan Enter juga.",
      },
      {
        day: 2,
        title: "Variable & Tipe Data",
        lesson:
          "Variable itu kayak wadah buat nyimpen data yang bisa lo pakai lagi nanti. Di JavaScript, lo bikin variable pakai kata let atau const, contoh: let nama = \"Budi\". let dipakai kalau isinya bisa berubah-ubah, const kalau isinya tetap selamanya. Ada beberapa tipe data dasar: string (teks, ditulis pakai tanda kutip \"...\"), number (angka, tanpa kutip), sama boolean (cuma true atau false). Contoh: let umur = 20 (number), let namaLengkap = \"Ani Putri\" (string), let sudahDewasa = true (boolean). Penting: nama variable nggak boleh pakai spasi atau mulai dari angka.",
        action:
          "Di console browser, bikin 3 variable: nama lo (string), umur lo (number), dan satu boolean isSuka pilihan makanan favorit. Ketik nama variable-nya doang buat lihat isinya.",
      },
      {
        day: 3,
        title: "Operator & Output",
        lesson:
          "Operator itu simbol buat ngolah data. Ada operator matematika: + (tambah), - (kurang), * (kali), / (bagi). Khusus buat string, + dipakai buat nyambungin teks, ini disebut concatenation, contoh: \"Halo \" + \"dunia\" hasilnya \"Halo dunia\". Ada juga operator perbandingan kayak === (sama dengan persis) dan !== (tidak sama dengan), yang hasilnya selalu boolean (true/false). Buat nampilin hasil ke layar, kita pakai console.log(...) — ini fungsi bawaan buat 'ngeprint' apa aja ke console, entah itu teks, angka, atau isi variable. Contoh: console.log(\"Umur gue: \" + umur).",
        action:
          "Bikin variable angka1 dan angka2 isinya angka bebas. Pakai console.log buat nampilin hasil tambah, kurang, kali, dan baginya satu-satu.",
      },
      {
        day: 4,
        title: "Kondisi: if / else",
        lesson:
          "Kadang program perlu 'mikir' — ngelakuin sesuatu cuma kalau kondisi tertentu kejadian. Ini namanya conditional, pakai if dan else. Bentuknya: if (kondisi) { ...kode kalau kondisi benar... } else { ...kode kalau kondisi salah... }. Kondisi di dalam kurung harus hasilnya true atau false, biasanya dari operator perbandingan kayak > (lebih besar), < (lebih kecil), atau === (sama dengan). Contoh: if (umur >= 17) { console.log(\"Boleh bikin SIM\") } else { console.log(\"Belum boleh\") }. Lo juga bisa nambah else if buat cek kondisi lain kalau kondisi pertama salah.",
        action:
          "Bikin variable nilai (angka 0-100). Tulis if/else yang nge-print \"Lulus\" kalau nilai >= 60, dan \"Belum lulus\" kalau kurang dari itu. Coba ganti-ganti angkanya buat tes dua kondisi.",
      },
      {
        day: 5,
        title: "Loop: for & while",
        lesson:
          "Loop dipakai buat ngulang kode tanpa nulis ulang manual. Ada dua jenis utama. for loop dipakai kalau lo tau persis mau ngulang berapa kali, bentuknya: for (let i = 0; i < 5; i++) { console.log(i) } — ini artinya mulai dari i = 0, ulang selama i < 5, dan i nambah 1 tiap putaran (i++). while loop dipakai kalau jumlah pengulangannya nggak pasti, tergantung kondisi, bentuknya: while (kondisi) { ...kode... }, dan dia bakal terus ngulang selama kondisinya masih true. Hati-hati, kalau kondisi while nggak pernah jadi false, program bakal stuck selamanya (infinite loop).",
        action:
          "Bikin for loop yang nge-print angka 1 sampai 10 satu-satu ke console. Kalau udah, coba ubah jadi cuma nge-print angka genap aja.",
      },
      {
        day: 6,
        title: "Function",
        lesson:
          "Function itu 'paket kode' yang bisa lo panggil berkali-kali tanpa nulis ulang. Cara bikinnya: function namaFungsi(parameter) { ...kode...; return hasil; }. Parameter itu input yang bisa beda-beda tiap kali dipanggil, dan return itu nilai yang dikirim balik keluar dari function. Contoh: function tambah(a, b) { return a + b; } — buat makainya tinggal panggil tambah(3, 5), hasilnya 8. Function bikin kode lo lebih rapi dan nggak berulang-ulang (prinsip DRY: Don't Repeat Yourself), plus lebih gampang di-debug karena logikanya kekumpul di satu tempat.",
        action:
          "Bikin function bernama sapa(nama) yang return \"Halo, \" + nama + \"!\". Panggil function itu 3 kali pakai nama yang beda-beda, print tiap hasilnya.",
      },
      {
        day: 7,
        title: "Gabungin Semuanya",
        lesson:
          "Sekarang saatnya gabungin variable, operator, if/else, loop, dan function jadi satu program kecil yang utuh — ini yang bikin belajar coding beneran nempel, bukan cuma tau teori doang. Contoh proyek gampang: konversi suhu Celsius ke Fahrenheit pakai function, atau program tebak angka sederhana pakai if/else buat ngecek tebakan. Yang penting bukan hasilnya sempurna, tapi lo ngerasain proses mikir gimana masalah dipecah jadi langkah-langkah kecil (ini disebut computational thinking). Setelah ini, langkah lanjut yang wajar: belajar array (kumpulan data), lanjut ke HTML/CSS kalau mau bikin web, atau eksplor project-project kecil lain di freeCodeCamp.",
        action:
          "Bikin function konversiSuhu(celsius) yang return celsius * 9/5 + 32. Panggil function-nya buat 3 suhu berbeda dan console.log hasilnya. Kalau sempat, tambahin if/else buat kasih label \"Panas\" kalau hasilnya di atas 30°C Fahrenheit... eh, di atas 86°F.",
      },
    ],
  },
  {
    id: "skill-excel-7",
    title: "7 Hari Dasar Excel & Spreadsheet",
    tagline: "Spreadsheet itu superpower yang jarang diajarin di sekolah.",
    description:
      "Belajar Excel atau Google Sheets dari nol — dari input data sampai bikin chart. Abis 7 hari lo bisa bikin spreadsheet sendiri buat ngatur apa aja, mulai dari duit sampai jadwal.",
    durationDays: 7,
    category: "skill",
    basis:
      "Pakai pendekatan deliberate practice — tiap hari fokus satu skill spesifik dan langsung dipraktikin di sheet nyata — digabung sama learning-by-doing biar lo nggak cuma ngerti teori tapi juga kebiasa mainnya.",
    days: [
      {
        day: 1,
        title: "Kenalan Sama Interface",
        lesson:
          "Spreadsheet itu tabel raksasa isinya kotak-kotak kecil disebut cell. Tiap cell punya alamat unik, gabungan huruf kolom dan angka baris, contoh A1 artinya kolom A baris 1. Kolom itu yang vertikal (A, B, C...), baris itu yang horizontal (1, 2, 3...). Satu file bisa punya beberapa sheet (tab) sekaligus, kelihatan di bagian bawah — berguna buat misahin data yang beda topik dalam satu file. Buat mulai, Google Sheets paling gampang karena gratis dan cuma butuh akun Google — tinggal buka sheets.google.com. Untuk masukin data, klik cell-nya terus ketik, tekan Enter atau Tab buat pindah ke cell berikutnya.",
        action:
          "Buka sheets.google.com, bikin spreadsheet baru. Di kolom A, isi 5 baris nama barang belanjaan. Di kolom B sebelahnya, isi harga masing-masing.",
      },
      {
        day: 2,
        title: "Formula & Cell Reference",
        lesson:
          "Kekuatan utama spreadsheet ada di formula — rumus yang mulai dengan tanda =. Contoh paling simpel: =A1+B1 artinya jumlahin isi cell A1 dan B1. Ini disebut relative reference, dan kalau formula-nya di-copy ke cell lain, alamatnya otomatis geser ngikutin posisi baru. Kadang lo pengen satu cell tertentu TETAP nggak ikut geser pas di-copy — ini pakai absolute reference, ditandain tanda $ di depan huruf dan/atau angkanya, contoh $A$1 artinya baris dan kolomnya kekunci, nggak berubah walau formula di-copy ke mana-mana. Absolute reference berguna banget kalau lo punya satu angka acuan (misal harga per unit) yang dipakai berulang di banyak baris.",
        action:
          "Di kolom C, bikin formula =A1&\" - Rp\"&B1 buat gabungin nama dan harga jadi satu teks. Lihat hasilnya, terus copy formula itu ke baris di bawahnya dan cek apa alamatnya ikut geser.",
      },
      {
        day: 3,
        title: "SUM, AVERAGE, COUNT",
        lesson:
          "Ada function bawaan yang mempercepat kerjaan itung-itungan. =SUM(range) njumlahin semua angka dalam range tertentu, contoh =SUM(B1:B5) njumlahin isi B1 sampai B5. =AVERAGE(range) ngitung rata-rata dari range yang sama, contoh =AVERAGE(B1:B5). =COUNT(range) ngitung berapa banyak cell yang isinya angka (bukan teks kosong) dalam range itu, berguna buat ngecek berapa data yang udah keisi. Tanda titik dua (:) di antara dua alamat cell artinya 'range', yaitu semua cell dari titik awal sampai titik akhir itu, termasuk keduanya.",
        action:
          "Di cell B7, ketik =SUM(B1:B5) buat total harga belanjaan lo. Di B8, ketik =AVERAGE(B1:B5) buat harga rata-rata. Di B9, ketik =COUNT(B1:B5).",
      },
      {
        day: 4,
        title: "Function Logis: IF",
        lesson:
          "Function IF bikin cell 'mikir' berdasarkan kondisi, formatnya: =IF(kondisi, hasil_kalau_benar, hasil_kalau_salah). Contoh: =IF(B1>50000, \"Mahal\", \"Murah\") artinya kalau isi B1 lebih dari 50000, cell itu nampilin \"Mahal\", kalau nggak, nampilin \"Murah\". Kondisinya bisa pakai operator perbandingan kayak > (lebih besar), < (lebih kecil), = (sama dengan), >= (lebih besar sama dengan). IF ini sering dipakai buat kategoriin data otomatis tanpa harus ngecek satu-satu manual, misalnya nandain pengeluaran mana yang 'boros' atau nilai mana yang 'lulus'.",
        action:
          "Di kolom D, buat formula IF yang nge-cek tiap harga di kolom B: kalau di atas 30000 tulis \"Mahal\", kalau nggak tulis \"Terjangkau\". Copy formula itu ke semua baris.",
      },
      {
        day: 5,
        title: "Sort & Filter",
        lesson:
          "Kalau data lo makin banyak, sort dan filter bikin gampang nyari dan ngebaca. Sort ngurutin data — bisa dari kecil ke besar (ascending) atau besar ke kecil (descending), buat angka atau abjad. Caranya: blok data lo, klik Data > Sort range, pilih kolom mana yang jadi acuan urutan. Filter beda lagi — dia nyembunyiin baris yang nggak sesuai kriteria tertentu, tanpa ngehapus datanya. Caranya: blok data, klik Data > Create a filter, nanti muncul ikon segitiga kecil di header kolom yang bisa diklik buat milih kriteria mana yang mau ditampilin.",
        action:
          "Blok data belanjaan lo (kolom A dan B). Aktifin filter (Data > Create a filter), terus urutkan harga dari yang paling mahal ke paling murah pakai filter itu.",
      },
      {
        day: 6,
        title: "Bikin Chart Sederhana",
        lesson:
          "Chart (grafik) bikin data lebih gampang dipahami sekali lihat, dibanding baca angka mentah satu-satu. Buat bikin chart di Google Sheets: blok data yang mau divisualisasi (termasuk header kolomnya kalau ada), terus klik Insert > Chart. Google Sheets otomatis nyaranin tipe chart yang cocok, tapi lo bisa ganti sendiri di panel Chart editor yang muncul di kanan. Beberapa tipe umum: bar chart / column chart cocok buat bandingin beberapa kategori (misal pengeluaran per hari), pie chart cocok buat nunjukin proporsi dari keseluruhan (misal persentase pengeluaran per kategori), dan line chart cocok buat nunjukin tren dari waktu ke waktu.",
        action:
          "Blok kolom nama barang dan harga dari data belanjaan lo. Klik Insert > Chart, pilih tipe Column chart di Chart editor, lihat hasilnya.",
      },
      {
        day: 7,
        title: "Mini Proyek: Budget Sheet",
        lesson:
          "Sekarang gabungin semua yang udah dipelajari jadi satu proyek nyata: budget bulanan sederhana. Struktur dasarnya: kolom Tanggal, Kategori (misal makan, transport, hiburan), Deskripsi, dan Jumlah. Di bagian bawah atau sheet terpisah, pakai SUM buat total pengeluaran, AVERAGE buat rata-rata per transaksi, dan IF buat nandain kategori mana yang udah 'Over budget' kalau totalnya ngelewatin angka tertentu (misal =IF(SUM(range_kategori)>500000, \"Over budget\", \"Aman\")). Tambahin chart pie buat lihat proporsi pengeluaran per kategori sekilas. Proyek kecil kayak gini ngelatih lo mikir spreadsheet bukan cuma sebagai tabel, tapi sebagai tool buat ngambil keputusan berdasarkan data.",
        action:
          "Bikin sheet baru bernama \"Budget\". Isi minimal 8 baris transaksi dummy dengan kolom Tanggal, Kategori, Jumlah. Tambahin SUM total di bawah, dan satu chart pie buat proporsi per kategori.",
      },
    ],
  },
  {
    id: "skill-public-speaking-7",
    title: "7 Hari Public Speaking",
    tagline: "Deg-degan boleh, asal tetap bisa ngomong.",
    description:
      "Latih rasa percaya diri ngomong di depan orang, step by step — dari ngatasin nervous sampai bawain talk pendek beneran. Abis 7 hari lo bakal punya satu talk singkat yang siap dibawain kapan aja.",
    durationDays: 7,
    category: "skill",
    basis:
      "Nggabungin teknik reframing kecemasan performa dari psikologi performa (ubah 'gugup' jadi 'excited'), struktur bicara klasik ala 'tell-say-tell' dan rule of three, plus deliberate practice — latihan bertahap tiap hari, satu skill dulu baru nambah yang lain.",
    days: [
      {
        day: 1,
        title: "Kenalan Sama Rasa Gugup",
        lesson:
          "Hampir semua orang deg-degan sebelum ngomong di depan umum — ini normal banget dan bahkan speaker berpengalaman masih ngerasainnya. Yang bikin beda itu gimana lo maknain rasa deg-degan itu. Secara fisik, gugup dan excited itu mirip banget di badan: jantung deg-degan, napas lebih cepat, tangan mungkin dingin. Bedanya cuma di label yang lo kasih ke perasaan itu di kepala lo. Ini disebut reframing — teknik dari psikologi performa yang udah lama dipelajari, di mana lo secara sadar ganti label 'gue gugup' jadi 'gue excited'. Badan lo nggak tau bedanya, tapi otak lo jadi lebih siap tampil kalau dikasih label yang lebih positif.",
        action:
          "Rekam video diri lo ngomong 1 menit tentang topik random (misal: makanan favorit lo) pakai HP. Sebelum mulai rekam, ucapin keras-keras \"Gue excited\" 3 kali, bukan \"gue gugup\".",
      },
      {
        day: 2,
        title: "Latihan Ngomong Low-Stakes",
        lesson:
          "Skill ngomong di depan umum itu kayak otot — makin sering dipakai di situasi kecil dan aman, makin kuat pas dibutuhin di situasi yang lebih besar. Ini prinsip deliberate practice: latihan terarah, sedikit-sedikit, dan konsisten, jauh lebih efektif daripada langsung terjun ke panggung besar tanpa persiapan. Low-stakes practice artinya latihan di situasi yang risikonya kecil — ngomong sendirian di kamar, di depan cermin, atau ke satu-dua orang yang lo percaya. Fokusnya bukan buat tampil sempurna, tapi buat bikin badan dan otak lo terbiasa sama sensasi ngomong keras-keras di depan 'penonton', walau penontonnya cuma cermin.",
        action:
          "Pilih satu topik yang lo suka. Ngomong tentang itu selama 2 menit di depan cermin, tanpa baca teks. Kalau nge-blank, cukup diem sebentar terus lanjut lagi — jangan berhenti total.",
      },
      {
        day: 3,
        title: "Struktur: Tell-Say-Tell",
        lesson:
          "Talk yang enak didengar biasanya punya struktur jelas, bukan ngomong random. Salah satu struktur paling klasik dan gampang dipakai: tell them what you'll say (kasih tau di awal apa yang bakal lo bahas), say it (bahas isinya), tell them what you said (rangkum lagi di akhir). Ini bikin pendengar gampang ngikutin alur pikiran lo. Tambahan yang berguna: rule of three — orang lebih gampang inget poin kalau jumlahnya tiga, nggak kebanyakan nggak kekurangan. Jadi kalau lo mau ngomongin sesuatu, coba pecah jadi maksimal tiga poin utama, bukan sepuluh poin yang bakal lupa semua sama pendengar.",
        action:
          "Tulis outline talk 2 menit pakai struktur tell-say-tell: 1 kalimat pembuka (apa yang mau dibahas), 3 poin utama, 1 kalimat penutup (rangkuman). Topik bebas.",
      },
      {
        day: 4,
        title: "Delivery: Pace, Jeda, Volume",
        lesson:
          "Isi omongan penting, tapi cara nyampeinnya (delivery) juga ngaruh besar ke seberapa gampang orang nangkep dan tertarik. Tiga elemen dasar: pace (kecepatan ngomong) — orang gugup biasanya ngomong kecepetan, padahal ngomong lebih pelan bikin lebih jelas dan keliatan lebih percaya diri. Jeda (pause) — diem sebentar setelah poin penting itu bukan tanda gagal, malah ngasih waktu buat pendengar mencerna, dan bikin lo keliatan tenang. Volume — ngomong cukup keras biar kedengeran sampai orang paling belakang, tapi nggak perlu teriak; sesuaikan sama ukuran ruangan.",
        action:
          "Ambil outline talk dari hari 3. Latihan ngomong pelan-pelan, kasih jeda 2 detik setelah tiap poin utama. Rekam pakai HP, dengerin ulang, cek apa pace-nya kerasa buru-buru atau enggak.",
      },
      {
        day: 5,
        title: "Bahasa Tubuh & Eye Contact",
        lesson:
          "Bahasa tubuh ngasih sinyal kepercayaan diri walau dalam hati lo masih deg-degan. Beberapa dasar yang gampang dipraktikin: berdiri tegak dengan kaki agak lebar buat stabil, jangan nyilangin tangan karena keliatan tertutup. Pakai gesture tangan yang natural buat nekanin poin penting, tapi jangan berlebihan sampai ganggu. Eye contact itu penting banget — coba lihat ke beberapa titik/orang berbeda secara bergantian selama talk, jangan cuma natap satu titik atau malah nunduk baca catatan terus. Kalau grup-nya besar, bisa bagi ruangan jadi beberapa zona dan gantian lihat tiap zona itu.",
        action:
          "Latihan talk hari 3 lagi di depan cermin, kali ini fokus badan: berdiri tegak, tangan nggak nyilang, dan coba jaga eye contact ke cermin (anggap itu 'mata' penonton) minimal separuh waktu bicara.",
      },
      {
        day: 6,
        title: "Storytelling & Q&A",
        lesson:
          "Cerita bikin talk lebih nempel di ingatan dibanding cuma fakta atau data mentah. Struktur cerita simpel yang bisa dipakai: situasi (kondisi awal/konteks), konflik atau tantangan (masalah yang muncul), resolusi (gimana itu kelar atau apa yang dipelajari). Selipin satu cerita pendek kayak gini di tengah talk bisa bikin poin lo lebih hidup. Soal Q&A (tanya jawab), yang penting: dengerin pertanyaan sampai selesai sebelum jawab, boleh jeda sebentar buat mikir — nggak perlu jawab instan. Kalau nggak tau jawabannya, jujur aja bilang nggak tau daripada ngarang, dan tawarkan buat cari tau lebih lanjut.",
        action:
          "Tambahin satu cerita pendek (situasi-konflik-resolusi) ke salah satu poin di outline talk lo. Minta satu temen kasih 1 pertanyaan random soal topik itu, latihan jawab pakai jeda dulu sebelum ngomong.",
      },
      {
        day: 7,
        title: "Talk Beneran + Refleksi",
        lesson:
          "Sekarang saatnya gabungin semua yang udah dilatih — reframing nervous jadi excited, struktur tell-say-tell, pace dan jeda yang pas, bahasa tubuh yang terbuka, plus satu cerita pendek — jadi satu talk utuh sekitar 2-3 menit. Refleksi setelah talk sama pentingnya sama latihan itu sendiri: ini bagian dari deliberate practice, di mana lo secara sadar ngevaluasi apa yang udah bagus dan apa yang masih bisa dibenerin, bukan cuma latihan asal jalan tanpa mikir ulang. Nggak ada talk pertama yang sempurna, dan itu memang wajar — progressnya kelihatan dari lo mau coba dan evaluasi lagi, bukan dari sempurna di percobaan pertama.",
        action:
          "Rekam video talk lengkap 2-3 menit (pakai outline dari hari-hari sebelumnya) ke kamera HP dari awal sampai akhir tanpa berhenti. Tonton ulang, tulis 2 hal yang udah bagus dan 1 hal yang mau diperbaiki minggu depan.",
      },
    ],
  },
];
