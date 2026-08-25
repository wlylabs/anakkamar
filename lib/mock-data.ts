import type { AchievementDef, ChallengeTemplate, FocusArea } from "./types";

export const CHALLENGES: ChallengeTemplate[] = [
  {
    id: "beresin-kamar-7",
    title: "7 Hari Beresin Kamar",
    tagline: "Ruang berantakan, kepala berantakan.",
    description:
      "Setiap hari, rapikan satu sudut kamar selama minimal 10 menit. Nggak perlu langsung sempurna, yang penting kelihatan progress.",
    durationDays: 7,
    category: "produktivitas",
  },
  {
    id: "no-doomscroll-14",
    title: "14 Hari No Doomscrolling",
    tagline: "Scroll seperlunya, bukan sampai lupa waktu.",
    description:
      "Batasi scrolling media sosial tanpa tujuan. Sadar-sadar aja tiap kali mau buka, dan catat kalau berhasil nahan.",
    durationDays: 14,
    category: "mental",
  },
  {
    id: "belajar-skill-30",
    title: "30 Hari Belajar Skill Baru",
    tagline: "Dikit-dikit, lama-lama jadi bisa.",
    description:
      "Pilih satu skill yang lo penasaran, dan sisihkan waktu tiap hari buat belajar atau latihan — walau cuma 20 menit.",
    durationDays: 30,
    category: "skill",
  },
  {
    id: "bangun-pagi-7",
    title: "7 Hari Bangun Lebih Pagi",
    tagline: "Pelan-pelan geser jam bangun lo.",
    description:
      "Coba bangun lebih pagi dari biasanya, walau cuma 30 menit lebih awal. Nggak usah ekstrem, konsisten aja dulu.",
    durationDays: 7,
    category: "kesehatan",
  },
  {
    id: "bikin-sesuatu-30",
    title: "30 Hari Bikin Sesuatu",
    tagline: "Karya kecil tiap hari lebih baik dari rencana besar yang nggak jalan.",
    description:
      "Hasilkan sesuatu tiap hari — tulisan, sketsa, kode, apa aja. Nggak perlu bagus, yang penting jadi.",
    durationDays: 30,
    category: "kreativitas",
  },
  {
    id: "hemat-14",
    title: "14 Hari Sadar Pengeluaran",
    tagline: "Tau uang lo pergi ke mana dulu.",
    description: "Catat setiap pengeluaran, sekecil apa pun. Cuma dicatat dulu, belum harus dihemat.",
    durationDays: 14,
    category: "keuangan",
  },
  {
    id: "sapa-1-orang-7",
    title: "7 Hari Nyapa Satu Orang",
    tagline: "Relasi juga butuh dirawat kecil-kecil.",
    description:
      "Setiap hari, hubungi atau ngobrol beneran sama satu orang yang udah lama nggak lo sapa.",
    durationDays: 7,
    category: "relasi",
  },
];

export const HABIT_IDEAS = [
  "Baca 10 menit",
  "Olahraga 15 menit",
  "Belajar 30 menit",
  "Journaling",
  "Minum air 8 gelas",
  "Tidur sebelum jam 11",
  "Rapikan kasur",
  "Jalan kaki 20 menit",
  "Nggak buka HP 1 jam sebelum tidur",
];

export interface ProjectIdea {
  title: string;
  durationDays: number;
  category: FocusArea;
  target: string;
  milestones: string[];
}

export const PROJECT_IDEAS: ProjectIdea[] = [
  {
    title: "Belajar Photoshop",
    durationDays: 30,
    category: "skill",
    target: "Bisa edit foto & bikin 1 poster sendiri",
    milestones: [
      "Install & kenalan sama tools dasar",
      "Coba edit 1 foto (crop, warna, retouch)",
      "Belajar layer & masking",
      "Bikin 1 poster/desain utuh dari nol",
    ],
  },
  {
    title: "Balik olahraga",
    durationDays: 14,
    category: "kesehatan",
    target: "Olahraga minimal 15 menit, 3x seminggu",
    milestones: [
      "Jalan kaki atau stretching 15 menit",
      "Coba 1 video workout buat pemula",
      "Konsisten 3x dalam seminggu",
      "Naikin durasi jadi 20-30 menit",
    ],
  },
  {
    title: "Bikin portfolio",
    durationDays: 30,
    category: "kreativitas",
    target: "Punya 1 halaman portfolio online",
    milestones: [
      "Kumpulin 3-5 karya terbaik",
      "Tulis deskripsi singkat tiap karya",
      "Susun jadi satu halaman sederhana",
      "Publish & share ke orang lain",
    ],
  },
  {
    title: "Belajar dasar coding",
    durationDays: 30,
    category: "skill",
    target: "Bisa bikin program kecil sendiri",
    milestones: [
      "Pilih satu bahasa & install tools-nya",
      "Selesein dasar (variable, loop, function)",
      "Bikin 1 project kecil (kalkulator/to-do list)",
      "Coba baca & modif kode orang lain",
    ],
  },
  {
    title: "Nabung dana darurat",
    durationDays: 30,
    category: "keuangan",
    target: "Rutin nyisihin dana darurat",
    milestones: [
      "Hitung total pengeluaran bulanan",
      "Tentuin target nominal dana darurat",
      "Nyisihin sebagian tiap ada uang masuk",
      "Cek progress tabungan tiap minggu",
    ],
  },
  {
    title: "Rutin meditasi",
    durationDays: 14,
    category: "mental",
    target: "Meditasi 5-10 menit tiap hari",
    milestones: [
      "Coba meditasi 5 menit pakai panduan (app/YouTube)",
      "Cari waktu yang sama tiap hari",
      "Konsisten 7 hari berturut-turut",
      "Naikin durasi jadi 10 menit",
    ],
  },
];

export const JOURNAL_PROMPTS = [
  "Hari ini gue melakukan apa yang sebelumnya cuma gue pikirin?",
  "Apa yang bikin gue stuck hari ini?",
  "Apa satu hal kecil yang bisa gue lakukan besok?",
  "Momen paling nggak nyaman hari ini, gue hadapin gimana?",
  "Hal kecil apa yang bikin gue bersyukur hari ini?",
  "Kalau boleh ulang hari ini, apa yang mau gue ubah?",
  "Apa yang bikin gue proud sama diri sendiri minggu ini?",
];

export const EXPLORE_ACTIVITIES = [
  {
    title: "Bikin sesuatu dalam 60 menit tanpa keluar kamar.",
    hint: "Nggak harus bagus. Yang penting jadi sesuatu.",
  },
  {
    title: "Beresin satu folder berantakan di HP atau laptop.",
    hint: "Digital clutter juga bikin penat.",
  },
  {
    title: "Tulis 3 hal yang pengen lo coba tahun ini.",
    hint: "Nggak perlu langsung mulai. Ditulis dulu aja.",
  },
  {
    title: "Kirim pesan ke orang yang udah lama nggak lo hubungi.",
    hint: "Cukup satu kalimat aja, 'lagi mikirin lo'.",
  },
  {
    title: "Belajar satu skill kecil lewat video 10 menit.",
    hint: "Potong sayur dengan benar juga skill.",
  },
  {
    title: "Duduk diam 5 menit tanpa HP.",
    hint: "Boring itu oke. Nggak semua waktu harus produktif.",
  },
];

export const SKILL_IDEAS = [
  "Desain grafis dasar",
  "Public speaking",
  "Fotografi HP",
  "Excel / spreadsheet",
  "Menulis kreatif",
  "Dasar coding",
  "Videografi & editing",
  "Bahasa asing dasar",
  "Memasak menu simpel",
];

export const CATEGORY_TIPS: Record<FocusArea, string[]> = {
  skill: [
    "Tonton atau baca 1 tutorial pendek dulu sebelum langsung praktik.",
    "Latihan 20 menit tiap hari lebih ngefek daripada belajar 3 jam sekali seminggu.",
    "Nggak apa-apa hasil pertama jelek — itu tandanya lo udah mulai.",
  ],
  kesehatan: [
    "Mulai dari durasi kecil yang beneran bisa lo jalanin, bukan target ideal.",
    "Konsistensi lebih penting daripada intensitas di awal.",
    "Siapin baju/alat dari malam sebelumnya biar besok nggak banyak alasan.",
  ],
  keuangan: [
    "Catat dulu ke mana uang lo pergi sebelum mutusin mau hemat di mana.",
    "Sisihkan di awal (pas uang masuk), bukan nunggu sisa di akhir bulan.",
    "Target kecil yang konsisten lebih realistis daripada target besar yang bikin capek.",
  ],
  mental: [
    "Nggak semua hari harus produktif — istirahat juga bagian dari progress.",
    "Coba mulai dari 5 menit. Durasi kecil tetep ngaruh kalau konsisten.",
    "Kalau capek, boleh skip satu hari asal besok lanjut lagi.",
  ],
  produktivitas: [
    "Pecah kerjaan besar jadi langkah yang bisa kelar dalam 20-30 menit.",
    "Fokus ke satu hal dulu — multitasking sering bikin nggak ada yang kelar.",
    "Selesai 'cukup baik' lebih baik daripada sempurna tapi nggak pernah kelar.",
  ],
  kreativitas: [
    "Jangan nunggu ide sempurna — mulai dari versi kasar dulu.",
    "Kumpulin referensi dulu sebelum mulai, biar nggak buntu di tengah jalan.",
    "Karya kecil yang jadi lebih berharga daripada karya besar yang nggak pernah selesai.",
  ],
  relasi: [
    "Mulai dari langkah kecil — satu pesan atau satu ajakan ngobrol udah cukup.",
    "Nggak perlu nunggu momen sempurna buat reconnect sama seseorang.",
    "Dengerin lebih banyak daripada nunggu giliran ngomong.",
  ],
  lainnya: [
    "Pecah goal besar jadi langkah kecil yang bisa lo mulai hari ini juga.",
    "Progress kecil yang konsisten ngalahin progress besar yang cuma sekali.",
    "Belum selesai bukan berarti gagal — coba lagi besok.",
  ],
};

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: "first-step", title: "First Step", description: "Menyelesaikan project pertama lo." },
  { id: "seven-days", title: "7 Days", description: "Konsisten aktif selama 7 hari." },
  { id: "maker", title: "Maker", description: "Menyelesaikan karya pertama dari sebuah challenge." },
  { id: "comeback", title: "Comeback", description: "Balik lagi setelah sempat berhenti." },
  { id: "room-to-grow", title: "Room to Grow", description: "Menyelesaikan 5 project." },
];
