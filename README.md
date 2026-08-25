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
- **Anak Kamar Plus** — upgrade sekali bayar (bukan langganan) yang buka batas project/habit
  gratis. Lihat [Monetisasi](#monetisasi-anak-kamar-plus) di bawah buat setup-nya.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Geist font + lucide-react. Data goal/habit/
journal tersimpan di `localStorage` (nggak butuh akun) lewat context di `lib/store.tsx`. Akun +
status Plus pakai Supabase (auth email magic-link + Postgres), pembayaran pakai Midtrans Snap.

PWA: `app/manifest.ts`, `public/sw.js` (offline shell fallback), dan install prompt
(`components/pwa/`) — bisa di-install ke home screen dan tetap kebuka pas offline.

## Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000). Tanpa env var, semua fitur inti (project,
habit, challenge, journal) tetap jalan penuh — cuma bagian Plus yang nonaktif dan bilang
"belum dikonfigurasi".

## Monetisasi (Anak Kamar Plus)

Model: **sekali bayar (lifetime), bukan subscription** — Midtrans nggak punya recurring
otomatis buat QRIS/GoPay/VA (cuma kartu kredit), dan target usernya emang lebih cocok bayar
sekali lunas daripada komitmen bulanan. Harga & limit ada di `lib/premium.ts`.

Setup:

1. **Supabase** — bikin project baru, terus jalanin `supabase/schema.sql` di SQL Editor (bikin
   tabel `profiles` + `purchases`, trigger auto-create profile, dan RLS policy).
2. **Midtrans** — dari dashboard, ambil Server Key & Client Key (Sandbox dulu buat testing) di
   **Pengaturan → Akses Integrasi**. Set **Payment Notification URL** ke
   `https://domain-lo.com/api/midtrans/webhook` di **Pengaturan → Konfigurasi**.
3. Copy `.env.example` ke `.env.local` dan isi semua key-nya.

Alur teknis: `/plus` (pricing + sign-in) → user masuk pakai email magic-link (Supabase Auth,
nggak perlu password) → `POST /api/checkout` bikin transaksi Midtrans Snap & simpan baris
`purchases` berstatus `pending` → popup Snap muncul di client → Midtrans call
`POST /api/midtrans/webhook` pas status berubah → webhook verifikasi signature, update
`purchases.status`, dan set `profiles.is_plus = true`. Batas gratis (`FREE_PROJECT_LIMIT`,
`FREE_HABIT_LIMIT` di `lib/premium.ts`) dicek di `usePremium()` (`lib/premium-context.tsx`).

## Struktur

```
app/            routes (App Router), termasuk /plus, /auth/callback, /api/checkout, /api/midtrans/webhook
components/     UI primitives, nav, PWA, checkout button
lib/            types, mock data, store (localStorage), stats, premium/Supabase/Midtrans helpers
supabase/       schema.sql — jalanin sekali di SQL Editor
scripts/        generate-icons.mjs — rasterize PWA icons dari SVG mark
```
