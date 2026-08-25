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
- **Journal** — refleksi harian, private, dengan prompt yang berganti tiap hari, mood check-in
  opsional (5 tingkat, dari affect labeling — nyatain perasaan pakai kata terbukti bantu redain
  intensitasnya), dan (opsional) respons refleksi singkat dari AI setelah nulis, pakai API key
  Groq/Gemini punya lo sendiri. Lihat [Journal AI](#journal-ai-opsional-byok) di bawah buat setup-nya.
- **Ngobrol** — companion chat AI (opsional, key BYOK yang sama) buat mikirin langkah kecil bareng,
  gaya motivational interviewing (lebih banyak nanya balik daripada ceramah). Riwayat kesimpen di
  device doang. Bukan pengganti psikolog/psikiater — ada guardrail bawaan buat ngarahin ke bantuan
  profesional kalau kedeteksi tanda krisis. Lihat [Journal AI](#journal-ai-opsional-byok) di bawah.
- **Progress** — statistik dan visualisasi progress mingguan/bulanan, tren mood 14 hari terakhir
  (dari journal), plus (opsional) refleksi mingguan dari AI yang baca pola dari angka aktivitas lo
  (bukan isi journal). Pakai key BYOK yang sama kayak Journal AI — lihat
  [Journal AI](#journal-ai-opsional-byok) di bawah.
- **Explore** — ide project, challenge populer, habit ideas, skill, dan prompt journal.
- **Profile** — bio, statistik, daftar project, dan achievement.
- **Anak Kamar Plus** — upgrade sekali bayar (bukan langganan) yang buka batas project/habit
  gratis. Lihat [Monetisasi](#monetisasi-anak-kamar-plus) di bawah buat setup-nya.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Geist font + lucide-react. Data goal/habit/
journal tersimpan di `localStorage` (nggak butuh akun) lewat context di `lib/store.tsx`. Akun +
status Plus pakai Supabase (auth email magic-link + Postgres), pembayaran pakai Midtrans Core API
dengan UI QRIS/GoPay custom (bukan popup Snap) biar senada sama desain app.

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
2. **Midtrans** — dari dashboard, ambil **Server Key** (Sandbox dulu buat testing) di
   **Pengaturan → Akses Integrasi** — nggak butuh Client Key, kita nggak pakai Snap. Set
   **Payment Notification URL** ke `https://domain-lo.com/api/midtrans/webhook` di
   **Pengaturan → Konfigurasi**. Kalau pakai Production, pastiin minimal satu metode pembayaran
   (QRIS/GoPay) udah aktif di menu **Metode Pembayaran** — akun baru kadang perlu verifikasi dulu.
3. **Admin** — set `ADMIN_EMAIL` ke email akun yang boleh approve transfer manual (harus persis
   sama kayak email yang dipakai sign-in). Akun ini juga otomatis dianggap Plus tanpa perlu
   bayar (`app/api/premium/status`) — nggak masuk akal nyuruh pemilik app bayar ke appnya
   sendiri buat testing.
4. Copy `.env.example` ke `.env.local` dan isi semua key-nya.

Alur teknis (QRIS/GoPay): `/plus` (pricing + sign-in) → user masuk pakai email magic-link
(Supabase Auth, nggak perlu password) → pilih QRIS/GoPay → `POST /api/checkout` bikin Core API
charge, simpan baris `purchases` berstatus `pending`, balikin URL gambar QR →
`CustomCheckout` (`components/plus/custom-checkout.tsx`) nampilin QR itu dalam kartu bergaya
Anak Kamar sendiri (bukan iframe Midtrans) sambil poll `GET /api/checkout/status` tiap beberapa
detik → begitu Midtrans call `POST /api/midtrans/webhook`, webhook verifikasi signature, update
`purchases.status`, dan set `profiles.is_plus = true` — status itu yang dibaca balik sama
polling di client.

**Fallback transfer manual** (dipakai selagi akun Midtrans belum ada channel pembayaran
aktif): pilih "Transfer DANA" di `/plus` → nomor DANA (`lib/premium.ts`) ditampilin, user isi
catatan opsional dan klik "Saya sudah transfer" → bikin baris `purchases` (`method:
"dana_manual"`, status `pending`) tanpa nyentuh Midtrans sama sekali → halaman poll status yang
sama kayak QRIS. Admin buka **`/admin/plus`** (nggak ada di nav, akses langsung lewat URL),
lihat daftar transfer yang nunggu, klik **Approve** setelah ngecek mutasi DANA masuk beneran —
itu langsung nge-set `purchases.status = 'settlement'` dan `profiles.is_plus = true` lewat
service role (RLS block user biasa dari ngubah status pembayaran sendiri).

Batas gratis (`FREE_PROJECT_LIMIT`, `FREE_HABIT_LIMIT` di `lib/premium.ts`) dicek di
`usePremium()` (`lib/premium-context.tsx`).

## Journal AI (opsional, BYOK)

Setelah nulis journal entry, `/api/journal/insight` (`lib/ai.ts`) bisa balikin respons refleksi
singkat 2-3 kalimat. Ini **bring-your-own-key**: tiap user masukin API key Groq/Gemini-nya
sendiri (gratis) di **Profil → Refleksi AI di Journal** (`components/ai-settings.tsx`), lengkap
sama tutorial cara bikin key-nya. Key kesimpen di `localStorage` device itu doang
(`lib/ai-keys.ts`) — dikirim ke server cuma pas request buat diteruskan ke Groq/Gemini, nggak
pernah kami simpan, dan sengaja dipisah dari `AppState` biar nggak ikut kebawa pas ekspor backup
data. Groq dicoba duluan (free tier gede, latency rendah), Gemini jadi fallback kalau Groq
errornya (limit, down) atau user cuma isi Gemini. Nggak masukin key = fitur ini nggak muncul,
sisa app tetap jalan normal.

Key yang sama juga dipakai buat **refleksi mingguan** di halaman Progress
(`/api/insights/weekly`, `components/progress/weekly-reflection.tsx`) — bedanya, yang dikirim ke
server cuma angka ringkasan aktivitas minggu ini (`lib/stats.ts#weeklySnapshot`: jumlah hari
aktif, streak, checklist habit/challenge, journal entry), bukan isi journal-nya. User klik
manual buat generate (nggak auto-fetch tiap buka halaman), hasilnya di-cache di `localStorage`
per minggu kalender biar nggak boros API call pas dibuka ulang.

Key yang sama juga dipakai buat **Ngobrol** (`/api/chat`, `app/chat/page.tsx`) — companion chat
multi-turn, riwayatnya kesimpen di `localStorage` device itu doang (`lib/chat-store.ts`, key
terpisah dari `AppState` biar nggak ikut backup export), nggak pernah dikirim/disimpan di server
selain buat diteruskan ke Groq/Gemini tiap request.

Buat deployer: `GROQ_API_KEY` / `GEMINI_API_KEY` di env bersifat opsional juga — cuma jadi
default bersama buat user yang belum masukin key sendiri, dipakai kalau request nggak bawa key.

## Struktur

```
app/            routes (App Router), termasuk /plus, /admin/plus, /auth/callback, /api/checkout, /api/midtrans/webhook
components/     UI primitives, nav, PWA, checkout button
lib/            types, mock data, store (localStorage), stats, premium/Supabase/Midtrans helpers
supabase/       schema.sql — jalanin sekali di SQL Editor
scripts/        generate-icons.mjs — rasterize PWA icons dari SVG mark
```
