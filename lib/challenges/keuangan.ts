import type { ChallengeTemplate } from "@/lib/types";

export const KEUANGAN_CHALLENGES: ChallengeTemplate[] = [
  {
    id: "hemat-14",
    title: "14 Hari Sadar Pengeluaran",
    tagline: "Tau uang lo pergi ke mana dulu.",
    description: "Catat setiap pengeluaran, sekecil apa pun. Cuma dicatat dulu, belum harus dihemat.",
    durationDays: 14,
    category: "keuangan",
    basis:
      "Literasi keuangan dasar: prinsip 'nggak bisa ngatur apa yang nggak dicatat', pembagian needs vs wants, konsep 'latte factor', envelope/category budgeting, dan kerangka 50/30/20 (dipopulerkan lewat buku All Your Worth karya Elizabeth Warren) sebagai referensi, bukan aturan wajib. Ini konten literasi umum, bukan saran investasi.",
    days: [
      {
        day: 1,
        title: "Kenapa nyatet dulu, bukan hemat dulu",
        lesson:
          "Hampir semua metode ngatur uang, dari yang paling simpel sampe yang ribet, mulai dari satu prinsip yang sama: lo nggak bisa ngatur apa yang nggak lo catat. Susah nentuin mau hemat di mana kalau lo sendiri nggak tau ke mana uang lo pergi selama ini. Makanya 14 hari ke depan bukan tentang hemat-hematan dulu, tapi tentang ngeliat kebiasaan pengeluaran lo apa adanya, tanpa nge-judge diri sendiri. Nggak ada pengeluaran yang 'salah' buat dicatat — semua masuk, sekecil apapun.",
        action:
          "Siapin tempat nyatet (notes HP, spreadsheet, atau buku kecil). Catat semua pengeluaran lo hari ini, dari yang gede sampe yang recehan kayak parkir atau jajan kecil.",
      },
      {
        day: 2,
        title: "Sekecil apapun, tetep dicatat",
        lesson:
          "Pengeluaran kecil sering luput dari catatan karena kerasa 'nggak penting buat dicatat' — parkir 2 ribu, es teh 5 ribu, top up dikit-dikit. Padahal justru pengeluaran kecil yang sering berulang ini yang paling gampang kelewat kalau lo cuma inget-inget doang tanpa nyatet. Hari ini coba disiplin nyatet semuanya, bahkan yang kerasa nggak berarti. Tujuannya bukan biar lo ngerasa boros, tapi biar gambaran lo soal pengeluaran beneran akurat, bukan cuma yang gede-gede aja yang keinget.",
        action:
          "Lanjutin nyatet semua pengeluaran hari ini, termasuk yang paling kecil. Kalau ada yang kelewat kemarin, tambahin sekarang selagi masih inget.",
      },
      {
        day: 3,
        title: "Cari cara nyatet yang beneran lo pake",
        lesson:
          "Sistem pencatatan paling bagus itu bukan yang paling canggih, tapi yang beneran lo pake konsisten. Ada yang cocok pake app keuangan, ada yang lebih nyaman nulis di notes HP, ada juga yang seneng pake buku fisik. Nggak ada yang paling benar — yang penting gampang diakses pas lo abis belanja, jadi nggak keburu males atau lupa. Setelah dua hari nyoba, ini saatnya evaluasi: cara nyatet yang lo pake kemarin kerasa ribet atau udah pas?",
        action:
          "Evaluasi cara nyatet lo 2 hari ini. Kalau kerasa ribet, ganti ke cara yang lebih simpel (misal dari buku ke notes HP). Tetep catat semua pengeluaran hari ini.",
      },
      {
        day: 4,
        title: "Kenalan sama needs vs wants",
        lesson:
          "Salah satu pembeda paling dasar di literasi keuangan adalah needs (kebutuhan) vs wants (keinginan). Needs itu hal yang beneran lo perluin buat hidup & fungsi sehari-hari — makan, transportasi ke sekolah/kerja, tempat tinggal. Wants itu hal yang bikin hidup lebih enak tapi sebenernya bisa lo skip tanpa masalah besar — jajan kekinian, langganan streaming ekstra, barang lucu yang kebeli impulsif. Nggak semua kasus jelas hitam-putih, dan itu wajar. Yang penting sekarang cuma mulai ngenalin bedanya, belum mutusin mana yang harus dipotong.",
        action:
          "Baca ulang catatan pengeluaran lo dari hari 1-3. Kasih tanda 'N' (needs) atau 'W' (wants) di sebelah tiap item — nggak apa-apa kalau ada yang ragu-ragu.",
      },
      {
        day: 5,
        title: "Kategorikan pengeluaran hari ini",
        lesson:
          "Sekarang lo udah kenalan sama konsep needs vs wants, coba praktikin langsung pas nyatet pengeluaran baru, bukan cuma pas ngoreksi yang lama. Kebiasaan ini namanya category budgeting — ngelompokin pengeluaran ke beberapa kategori (misal: makan, transport, jajan, hiburan, lain-lain) biar lo bisa liat pola lebih jelas daripada sekadar daftar angka panjang. Nggak perlu kategori yang rumit, 4-5 kategori simpel udah cukup buat mulai.",
        action:
          "Catat pengeluaran hari ini seperti biasa, tapi kasih label kategori di tiap item (makan, transport, jajan, hiburan, lain-lain — bebas lo sesuain).",
      },
      {
        day: 6,
        title: "Waspadai pengeluaran kecil berulang",
        lesson:
          "Ada istilah populer soal 'latte factor' — ide bahwa pengeluaran kecil yang keliatan sepele tapi rutin (kopi tiap hari, jajan online, langganan yang jarang dipake) kalau ditotal dalam sebulan bisa jadi jumlah yang lumayan gede tanpa lo sadar. Bukan berarti kopi atau jajan itu 'dosa' — tapi seringnya kita nggak sadar seberapa sering itu terjadi sampai beneran dihitung. Hari ini coba scan catatan lo, ada nggak satu jenis pengeluaran kecil yang ternyata muncul hampir tiap hari?",
        action:
          "Scan catatan pengeluaran lo dari hari 1-5. Cari satu jenis pengeluaran kecil yang paling sering muncul, terus tulis kira-kira berapa kali itu kejadian minggu ini.",
      },
      {
        day: 7,
        title: "Coba envelope/kategori sederhana",
        lesson:
          "Envelope budgeting itu metode lama yang masih relevan: uang dibagi ke beberapa 'amplop' (fisik atau cuma di catatan) sesuai kategori, biar lo punya gambaran seberapa banyak yang udah kepake di tiap kategori. Nggak harus pake amplop beneran — bisa cuma nulis total tiap kategori di catatan lo. Minggu pertama ini fokusnya masih observasi, jadi coba liat kalau pengeluaran lo dikelompokin ke 'amplop' kategori, mana yang paling penuh?",
        action:
          "Totalin pengeluaran seminggu ini per kategori (makan, transport, jajan, dll). Tulis angka totalnya di samping tiap kategori — nggak usah dievaluasi dulu, sekadar diliat.",
      },
      {
        day: 8,
        title: "Cari pola, bukan cari salah",
        lesson:
          "Setelah seminggu nyatet, biasanya mulai kelihatan pola — hari apa lo paling banyak keluar uang, jam berapa biasanya jajan impulsif, atau situasi apa yang bikin lo lebih gampang belanja. Penting diinget: nyari pola ini bukan buat nyalah-nyalahin diri sendiri, tapi buat ngerti diri lo lebih baik. Semua orang punya pola pengeluaran yang beda, dan cuma dengan liat data sendiri lo bisa tau pola versi lo, bukan versi orang lain.",
        action:
          "Liat catatan seminggu ini, cari 1 pola yang kelihatan (misal: 'gue paling boros pas weekend' atau 'jajan online pas malem'). Tulis pola itu dalam satu kalimat.",
      },
      {
        day: 9,
        title: "Apakah wants lo emang prioritas lo?",
        lesson:
          "Nggak semua wants itu sama nilainya buat tiap orang. Ada wants yang beneran bikin lo seneng dan sejalan sama apa yang lo pentingin (misal nabung buat hobi yang lo cintain), ada juga yang cuma kebiasaan atau ikut-ikutan tanpa mikir panjang. Hari ini coba refleksi: dari daftar 'wants' di catatan lo, mana yang beneran berasa worth it, dan mana yang sebenernya kalau nggak dibeli juga nggak kerasa kehilangan apa-apa?",
        action:
          "Pilih 3 item 'wants' dari catatan lo minggu ini. Buat masing-masing, tulis satu kata: 'worth it' atau 'nggak kerasa bedanya' kalau nggak dibeli.",
      },
      {
        day: 10,
        title: "Pengeluaran yang bikin kaget",
        lesson:
          "Kadang pas ngeliat total catatan, ada angka yang bikin lo kaget sendiri — 'kok gede banget ya jajan gue minggu ini'. Momen kaget ini justru berharga banget, karena itu tandanya lo baru nyadar sesuatu yang selama ini nggak keliatan pas cuma ngerasa-ngerasa doang tanpa dicatat. Nggak usah panik atau langsung mutusin potong semua, cukup dicatat dulu momen 'aha'-nya. Kesadaran itu langkah awal, bukan tujuan akhir yang harus langsung diselesaikan hari ini.",
        action:
          "Cari satu angka di catatan lo yang bikin lo mikir 'lho, segini banyak?'. Tulis angka itu dan satu kalimat soal apa yang bikin lo kaget.",
      },
      {
        day: 11,
        title: "Wilayah abu-abu needs vs wants",
        lesson:
          "Beberapa pengeluaran susah dikategorikan tegas jadi needs atau wants — kuota internet misalnya bisa jadi needs (buat sekolah/kerja) atau wants (buat scroll medsos doang), tergantung konteks lo. Ini normal dan nggak perlu dipaksa hitam-putih. Yang penting lo jujur sama diri sendiri soal alasan sebenernya di balik pengeluaran itu, bukan sekadar nyari alasan biar kelihatan 'needs' semua. Kejujuran ke diri sendiri ini yang bikin catatan lo beneran berguna nantinya.",
        action:
          "Cari 1-2 pengeluaran di catatan lo yang susah dikategorikan needs/wants. Tulis alasan jujur kenapa lo ngeluarin itu.",
      },
      {
        day: 12,
        title: "Lihat gambaran dua minggu",
        lesson:
          "Sekarang catatan lo udah cukup panjang buat diliat sebagai satu gambaran utuh, bukan cuma potongan hari per hari. Coba totalin semua pengeluaran dari hari 1 sampai sekarang, terus kelompokin per kategori. Dari sini biasanya lebih jelas kelihatan: kategori mana yang makan porsi paling besar, dan apakah itu sesuai sama yang lo bayangin sebelumnya atau ternyata beda jauh dari perkiraan lo.",
        action:
          "Totalin semua pengeluaran dari hari 1-11 per kategori. Bandingin: kategori mana yang paling besar, dan apa itu sesuai dugaan lo atau bikin kaget?",
      },
      {
        day: 13,
        title: "Kenalan sama kerangka 50/30/20",
        lesson:
          "Salah satu kerangka budgeting yang cukup dikenal luas adalah 50/30/20 — ide dasarnya bagi pemasukan jadi kira-kira 50% buat needs, 30% buat wants, dan 20% buat tabungan/dana darurat. Ini bukan aturan kaku yang harus dipatuhin persis, apalagi tiap orang punya kondisi keuangan yang beda jauh — ada yang needs-nya emang lebih dari 50% karena situasi hidupnya. Anggap ini sebagai satu referensi buat mikirin proporsi, bukan target yang harus dipaksain pas.",
        action:
          "Bandingin proporsi kategori dari catatan 2 minggu lo (kira-kira aja) sama ide 50/30/20. Nggak usah dihitung presisi, cukup tulis kesan kasar: needs/wants lo lebih besar dari mana?",
      },
      {
        day: 14,
        title: "Refleksi & langkah selanjutnya",
        lesson:
          "Challenge ini dari awal memang cuma soal nyatet, bukan soal hemat — dan itu udah cukup buat langkah pertama. Sekarang lo punya data 2 minggu tentang kebiasaan pengeluaran lo sendiri, sesuatu yang kebanyakan orang nggak pernah beneran liat. Langkah berikutnya (kalau lo mau) adalah mutusin sendiri mau diapain data ini — mau lanjut nyatet, mau mulai coba nabung dana darurat kecil-kecilan, atau sekadar lebih sadar tiap kali mau belanja. Nggak ada jawaban yang wajib, ini keputusan lo berdasarkan data lo sendiri.",
        action:
          "Baca ulang semua catatan 14 hari lo. Tulis satu kesimpulan pribadi dan satu niat kecil yang mau lo bawa setelah challenge ini (nggak harus soal hemat).",
      },
    ],
  },
];
