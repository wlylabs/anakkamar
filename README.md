# Project Anak Kamar

**Mulainya dari kamar.**

Ruang kecil untuk mulai melakukan sesuatu yang lebih besar. Project Anak Kamar adalah web app
self-development untuk anak muda Indonesia (16–30 tahun) yang bantu lo bergerak lewat langkah
kecil yang realistis: bikin goal, jalanin challenge, bangun habit, catat progress, dan
refleksi lewat journal.

Ini bukan aplikasi produktivitas korporat. Nggak ada yang maksa lo produktif tiap hari — cukup
maju sedikit.

## Fitur

- **Onboarding** — dua pertanyaan singkat buat bikin ruang personal lo.
- **Dashboard** — sapaan personal, current goal, progress hari ini, challenge aktif, habit hari
  ini, streak, recent journal, dan progress mingguan.
- **Project** — goal pribadi dengan milestones, target, deadline, dan status.
- **Challenge** — tantangan singkat (7/14/30 hari) yang bisa diikuti dan ditandai tiap hari.
- **Habit tracker** — kebiasaan kecil dengan visualisasi streak 14 hari.
- **Journal** — refleksi harian, private, dengan prompt yang berganti tiap hari.
- **Progress** — statistik dan visualisasi progress mingguan/bulanan.
- **Explore** — ide project, challenge populer, habit ideas, skill, dan prompt journal.
- **Profile** — bio, statistik, daftar project, dan achievement.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Geist font + lucide-react. Data
tersimpan di `localStorage` (MVP, belum ada backend) lewat context di `lib/store.tsx`.

PWA: `app/manifest.ts`, `public/sw.js` (offline shell fallback), dan install prompt
(`components/pwa/`) — bisa di-install ke home screen dan tetap kebuka pas offline.

## Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Struktur

```
app/            routes (App Router)
components/     UI primitives, nav, PWA
lib/            types, mock data, store (localStorage), stats helpers
scripts/        generate-icons.mjs — rasterize PWA icons dari SVG mark
```
