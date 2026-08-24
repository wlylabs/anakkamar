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

export const PROJECT_IDEAS: { title: string; durationDays: number; category: FocusArea }[] = [
  { title: "Belajar Photoshop", durationDays: 30, category: "skill" },
  { title: "Balik olahraga", durationDays: 14, category: "kesehatan" },
  { title: "Bikin portfolio", durationDays: 30, category: "kreativitas" },
  { title: "Belajar dasar coding", durationDays: 30, category: "skill" },
  { title: "Nabung dana darurat", durationDays: 30, category: "keuangan" },
  { title: "Rutin meditasi", durationDays: 14, category: "mental" },
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

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: "first-step", title: "First Step", description: "Menyelesaikan project pertama lo." },
  { id: "seven-days", title: "7 Days", description: "Konsisten aktif selama 7 hari." },
  { id: "maker", title: "Maker", description: "Menyelesaikan karya pertama dari sebuah challenge." },
  { id: "comeback", title: "Comeback", description: "Balik lagi setelah sempat berhenti." },
  { id: "room-to-grow", title: "Room to Grow", description: "Menyelesaikan 5 project." },
];
