import type { ChallengeTemplate } from "@/lib/types";

export const KESEHATAN_CHALLENGES: ChallengeTemplate[] = [
  {
    id: "bangun-pagi-7",
    title: "7 Hari Bangun Lebih Pagi",
    tagline: "Pelan-pelan geser jam bangun lo.",
    description:
      "Coba bangun lebih pagi dari biasanya, walau cuma 30 menit lebih awal. Nggak usah ekstrem, konsisten aja dulu.",
    durationDays: 7,
    category: "kesehatan",
    basis:
      "Dasarnya dari sains ritme sirkadian & sleep hygiene umum: peran cahaya pagi buat reset jam biologis, pergeseran bertahap, dan konsistensi jam bangun — bukan protokol medis atau target jam tidur yang kaku.",
    days: [
      {
        day: 1,
        title: "Cek kondisi awal lo",
        lesson:
          "Sebelum geser jadwal, penting tau dulu titik awal lo. Tubuh manusia punya ritme sirkadian — jam biologis internal sekitar 24 jam yang ngatur kapan lo ngantuk dan kapan melek. Ritme ini beda-beda tiap orang, jadi nggak ada satu jam bangun 'ideal' yang cocok buat semua orang. Hari ini bukan hari buat mulai bangun lebih pagi, tapi buat sadar dulu: jam berapa lo biasanya beneran bangun (bukan alarm pertama), dan gimana rasanya energi lo di pagi hari.",
        action:
          "Bangun kayak biasa, nggak usah dipaksa lebih pagi. Catat jam berapa lo beneran bangun dan kasih skor 1-5 buat rasa segar lo pagi ini.",
      },
      {
        day: 2,
        title: "Cahaya pagi itu kunci",
        lesson:
          "Salah satu temuan paling solid soal ritme sirkadian: cahaya, terutama cahaya matahari pagi, adalah sinyal utama yang ngasih tau otak lo 'ini udah siang, waktunya melek'. Paparan cahaya terang di pagi hari bantu reset jam biologis lo supaya besoknya lebih gampang ngantuk di jam yang lebih awal juga. Makanya orang yang kerja di ruangan gelap terus atau bangun tapi langsung mager di kasur gelap-gelapan, siklusnya lebih susah geser. Nggak perlu alat khusus, buka tirai atau keluar sebentar aja udah kebantu.",
        action:
          "Begitu bangun (jam berapa pun), langsung buka tirai/jendela atau keluar kamar sebentar buat kena cahaya alami minimal 5-10 menit.",
      },
      {
        day: 3,
        title: "Geser pelan, bukan loncat",
        lesson:
          "Godaan paling umum pas mau bangun lebih pagi adalah pasang alarm 2 jam lebih awal dari besok. Masalahnya, tubuh butuh waktu buat nyesuain ritme sirkadian, jadi loncat jauh biasanya cuma bikin lo begadang paksa dan kurang tidur, bukan beneran geser jadwal. Pendekatan yang lebih sustainable: geser bertahap, sekitar 15-30 menit tiap beberapa hari, sampai nyampe ke jam yang lo mau. Ini sesuai sama tagline challenge ini — pelan-pelan, bukan ekstrem.",
        action:
          "Set alarm besok pagi cuma 15-30 menit lebih awal dari jam bangun biasa lo (bukan target akhir). Siapin alarm itu sekarang juga.",
      },
      {
        day: 4,
        title: "Jam bangun konsisten itu lebih penting",
        lesson:
          "Banyak yang fokus ke 'jam berapa harus tidur', padahal riset soal ritme sirkadian nunjukkin jam bangun yang konsisten (termasuk di weekend) punya dampak yang sama besar atau malah lebih ke stabilnya jam biologis lo. Bangun di jam yang beda-beda tiap hari (misal weekday jam 6, weekend jam 11) itu kayak bikin 'jet lag' kecil tiap minggu, karena tubuh lo harus reset ulang terus. Nggak berarti weekend nggak boleh santai, tapi coba jaga jam bangun nggak geser lebih dari 1 jam dari hari biasa.",
        action:
          "Tentuin satu jam bangun target yang mau lo pertahanin, termasuk rencana buat besok weekend. Set alarm hari ini di jam yang sama kayak kemarin (atau makin deket ke target).",
      },
      {
        day: 5,
        title: "Ngatasin overslept alarm",
        lesson:
          "Nge-snooze alarm berkali-kali itu wajar banget kejadian, apalagi pas awal-awal geser jadwal. Masalahnya, tidur yang terputus-putus abis alarm pertama biasanya kualitasnya jelek — bukan istirahat beneran, cuma tidur ringan yang bikin makin pusing pas akhirnya bangun. Salah satu trik yang sering dipraktikin: taruh alarm/HP nggak di deket kasur, jadi lo kepaksa berdiri buat matiin. Begitu berdiri dan gerak dikit, rasa ngantuk buat balik tidur biasanya berkurang.",
        action:
          "Malam ini, taruh alarm/HP lo di seberang kamar atau di luar jangkauan tangan dari kasur, biar besok pagi lo kepaksa bangun buat matiinnya.",
      },
      {
        day: 6,
        title: "Wind-down & kurangin layar",
        lesson:
          "Bangun pagi itu sebenernya juga soal apa yang lo lakuin malam sebelumnya. Cahaya biru dari layar HP/laptop bisa nunda rasa ngantuk karena mirip sinyal 'siang hari' buat otak, dan kafein yang diminum terlalu sore efeknya bisa masih kerasa berjam-jam kemudian. Rutinitas wind-down yang konsisten — kayak redupin lampu, taruh HP lebih awal, atau ngelakuin hal santai yang sama tiap malam — ngasih sinyal ke tubuh kalau ini waktunya melambat. Kalau tidur lo lebih nyenyak, bangun pagi jadi jauh lebih ringan.",
        action:
          "Malam ini, stop kafein setelah sore dan coba nggak pegang HP minimal 20 menit sebelum tidur. Ganti dengan hal santai kayak baca atau stretching ringan.",
      },
      {
        day: 7,
        title: "Refleksi & jaga yang realistis",
        lesson:
          "Setelah 7 hari, ini saatnya jujur sama diri sendiri: lever mana yang beneran kerasa membantu — cahaya pagi, jam bangun konsisten, wind-down, atau jauhin HP dari kasur? Nggak semua orang cocok sama semua trik, dan itu oke. Yang penting bukan lo jadi 'morning person' sempurna dalam seminggu, tapi lo punya beberapa kebiasaan kecil yang realistis buat dilanjutin. Kalau progress belum kelihatan atau susah tidur terus-terusan padahal udah dicoba, nggak apa-apa ngobrolin ini ke dokter — tapi itu di luar cakupan challenge santai ini.",
        action:
          "Bandingin jam bangun & rasa segar lo hari ini vs hari 1. Pilih 1-2 kebiasaan dari minggu ini (cahaya pagi, jam konsisten, wind-down) yang paling kerasa dan niatin buat lo terusin.",
      },
    ],
  },
];
