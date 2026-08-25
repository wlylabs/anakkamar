import type { ChallengeTemplate } from "@/lib/types";

export const KREATIVITAS_CHALLENGES: ChallengeTemplate[] = [
  {
    id: "bikin-sesuatu-30",
    title: "30 Hari Bikin Sesuatu",
    tagline: "Karya kecil tiap hari lebih baik dari rencana besar yang nggak jalan.",
    description:
      "Hasilkan sesuatu tiap hari — tulisan, sketsa, kode, apa aja. Nggak perlu bagus, yang penting jadi.",
    durationDays: 30,
    category: "kreativitas",
    basis:
      "Gabungan beberapa pendekatan kreativitas yang udah teruji: Morning Pages dari Julia Cameron (The Artist's Way), konsep 'the gap' dari Ira Glass, teknik SCAMPER, 'shitty first draft' dari Anne Lamott, divergent-convergent thinking, constraint-driven creativity, dan kebiasaan dokumentasi/sharing karya buat akuntabilitas.",
    days: [
      {
        day: 1,
        title: "Jadi, Bukan Bagus",
        lesson:
          "Anne Lamott, penulis buku Bird by Bird, punya istilah terkenal: 'shitty first drafts' — draft pertama emang wajib jelek. Nggak ada karya bagus yang lahir langsung sempurna. Masalahnya, banyak orang berhenti sebelum mulai karena kepala mereka nuntut hasil akhir yang keren duluan. Padahal urutan yang bener itu: bikin dulu, versi jelek juga nggak apa-apa, baru nanti dirapiin belakangan. Tantangan 30 hari ini bukan soal bikin karya bagus tiap hari — ini soal bikin sesuatu, titik. Kualitas nyusul belakangan, yang penting sekarang jadi dulu.",
        action:
          "Set timer 10 menit. Bikin apa aja — kalimat, sketsa, baris kode — tanpa mikirin bagus atau nggak. Berhenti begitu timer bunyi, apapun hasilnya.",
      },
      {
        day: 2,
        title: "Ide Nggak Harus Orisinil",
        lesson:
          "Banyak orang mandek karena mikir ide mereka harus 100% baru, belum pernah ada sama sekali. Padahal hampir semua karya itu remix — gabungan hal-hal yang udah ada, dipadu dengan cara baru. Musisi kesentuh lagu lain sebelum bikin lagu sendiri, penulis kepengaruh buku yang mereka baca. Yang bikin karya lo beda bukan ide yang belum pernah ada, tapi kombinasi unik dari referensi yang cuma ada di kepala lo. Jadi berhenti nyari 'ide orisinil' yang nggak pernah dateng, dan mulai perhatiin apa yang lagi lo suka, lalu coba gabungin dua hal yang kelihatannya nggak nyambung.",
        action:
          "Tulis 2 hal yang lo suka belakangan ini (lagu, film, akun sosmed, apa aja). Gabungin keduanya jadi satu ide kecil, tulis dalam 2-3 kalimat.",
      },
      {
        day: 3,
        title: "Kenalan Sama SCAMPER",
        lesson:
          "SCAMPER itu teknik lawas tapi masih ampuh buat mancing ide dari sesuatu yang udah ada. Singkatannya: Substitute (ganti bagian), Combine (gabung dua hal), Adapt (sesuaikan dari konteks lain), Modify (perbesar/perkecil/ubah), Put to another use (fungsi baru), Eliminate (buang sesuatu), Reverse (balik urutan/perspektif). Daripada mulai dari kertas kosong yang bikin buntu, SCAMPER ngasih lo tujuh pintu buat mulai mikir. Ambil satu karya atau ide yang udah ada — punya orang lain atau punya lo sendiri — terus tanyain satu-satu pertanyaan di atas. Biasanya dari situ nongol ide yang nggak kepikiran kalau mulai dari nol.",
        action:
          "Pilih satu benda atau karya yang lo tau (produk, lagu, akun konten). Terapin 3 huruf SCAMPER ke situ, tulis hasil pikiran lo tiap satu.",
      },
      {
        day: 4,
        title: "Kuantitas Dulu, Kualitas Nyusul",
        lesson:
          "Ini prinsip divergent thinking: sebelum mikir mana ide yang bagus (convergent thinking), lo harus punya banyak pilihan dulu. Otak yang langsung nyaring 'bagus atau enggak' di tiap ide bakal macet cepet, soalnya mode mikir kritis dan mode mikir bebas itu beda. Makanya sesi brainstorming yang efektif punya aturan: jangan nilai ide dulu, keluarin aja sebanyak-banyaknya, sejelek apapun kedengerannya. Ide ke-15 biasanya lebih segar dari ide ke-2, soalnya ide-ide obvious udah abis duluan. Hari ini latihan matiin dulu suara kritis di kepala dan biarin ide ngalir bebas.",
        action:
          "Tulis 15 ide random buat 'sesuatu yang bisa lo bikin' — nggak usah mikir bagus. Larang diri nyoret atau nge-judge sampai listnya penuh 15.",
      },
      {
        day: 5,
        title: "Kosongin Kepala Dulu",
        lesson:
          "Julia Cameron, lewat bukunya The Artist's Way, punya latihan namanya Morning Pages — nulis tiga halaman bebas tiap pagi, tanpa mikir, tanpa diedit, tanpa dibaca ulang. Tujuannya bukan hasilin tulisan bagus, tapi ngosongin 'sampah mental' yang numpuk di kepala sebelum otak bisa kreatif beneran. Kalau kepala lo penuh checklist, drama, atau overthinking, susah nangkep ide baru — semua kesumpel duluan. Lo nggak harus tulis tiga halaman penuh kayak versi aslinya, tapi coba rasain efeknya: nulis apa aja yang muncul di kepala tanpa filter, sampai kepala berasa lebih lapang.",
        action:
          "Tulis bebas selama 5-8 menit, apa aja yang muncul di kepala, tanpa berhenti buat mikir atau edit. Nggak perlu dibaca ulang setelahnya.",
      },
      {
        day: 6,
        title: "Selera Lo Duluan Nyampe",
        lesson:
          "Ira Glass, host This American Life, punya penjelasan terkenal soal kenapa awal-awal bikin karya rasanya nyesekin: selera lo (taste) berkembang lebih cepet dari skill lo. Lo tau kayak apa karya bagus itu, tapi tangan/skill lo belum bisa nyampe ke situ — makanya hasil sendiri kerasa mengecewakan. Ira Glass bilang itu normal, dan satu-satunya cara nutup jarak (gap) itu adalah dengan terus bikin banyak karya, bukan berhenti karena kecewa. Jarak itu bukan tanda lo nggak berbakat — itu tanda selera lo udah bagus, dan skill lagi ngejar di belakang.",
        action:
          "Tulis satu paragraf pendek: apa yang bikin lo kecewa dari karya lo sendiri belakangan ini, dan sadari itu tanda selera lo udah jalan duluan.",
      },
      {
        day: 7,
        title: "Cek Ulang Minggu Pertama",
        lesson:
          "Minggu pertama ini fokusnya bukan hasil, tapi ngelonggarin standar dan belajar mancing ide tanpa macet. Hari ini bukan hari buat bikin sesuatu yang baru — ini hari buat liat ke belakang. Coba baca ulang apa aja yang udah lo bikin 6 hari terakhir, meskipun kecil atau berantakan. Sadar bahwa lo udah lebih sering 'mulai' minggu ini dibanding biasanya, itu udah kemenangan tersendiri. Refleksi kayak gini penting soalnya otak gampang lupa progress kecil dan cuma inget yang belum selesai. Konsolidasi sebelum lanjut minggu berikutnya bikin langkah selanjutnya kerasa lebih mantap, bukan sekadar numpuk tugas.",
        action:
          "Buka lagi semua yang lo bikin 6 hari terakhir. Tulis satu hal yang lo pelajari soal cara lo mulai sesuatu.",
      },
      {
        day: 8,
        title: "Nempel di Kebiasaan yang Udah Ada",
        lesson:
          "Habit stacking itu teknik sederhana: nempelin kebiasaan baru ke kebiasaan yang udah otomatis lo lakuin, biar nggak butuh motivasi ekstra tiap hari. Daripada mikir 'kapan gue sempet bikin sesuatu', lo tinggal pasang: 'abis [kebiasaan lama], gue bikin sesuatu selama 10 menit.' Otak lebih gampang nempel ke pola yang udah ada daripada bikin jadwal baru dari nol. Ini juga kenapa 30 hari ini efeknya lebih kerasa kalau waktunya konsisten, bukan random — soalnya rutinitas kecil yang konsisten ngalahin niat besar yang nggak pernah jalan.",
        action:
          "Pilih satu kebiasaan harian yang udah pasti lo lakuin (misal: abis mandi, abis makan malam). Tempelin sesi bikin-sesuatu 10 menit langsung setelahnya, mulai hari ini.",
      },
      {
        day: 9,
        title: "Pindah Medium, Lihat Beda Sudut",
        lesson:
          "Kalau biasanya lo nulis, coba gambar. Kalau biasanya ngoding, coba bikin sesuatu pake tangan. Pindah medium ngebantu otak keluar dari pola pikir yang udah kebiasa, dan sering malah ngasih perspektif baru buat medium utama lo. Ini bukan buang-buang waktu — banyak orang kreatif justru dapet ide terbaik pas lagi main-main di medium yang bukan spesialisasi mereka, soalnya nggak ada tekanan 'harus bagus' di situ. Hari ini khusus buat eksperimen di luar zona nyaman biasa lo, dengan standar yang sengaja rendah karena emang bukan bidang lo.",
        action:
          "Bikin sesuatu di medium yang beda dari biasanya (kalau biasa nulis, coba gambar/foto/audio). Nggak usah bagus, cukup selesai dalam 15 menit.",
      },
      {
        day: 10,
        title: "Batasan Bikin Lo Lebih Kreatif",
        lesson:
          "Kedengarannya aneh, tapi kebebasan tanpa batas justru sering bikin orang macet — terlalu banyak pilihan bikin susah mulai. Ini yang disebut constraint-driven creativity: kasih diri lo batasan ketat (waktu, alat, tema, jumlah kata/warna), dan otak jadi kepaksa nyari solusi kreatif di dalam kotak kecil itu. Batasan bukan musuh kreativitas, batasan itu bahan bakarnya. Desainer, musisi, penulis sering sengaja bikin aturan aneh buat diri sendiri justru biar nggak kewalahan sama kebebasan tanpa arah. Hari ini coba kasih diri lo batasan yang ketat banget, dan liat gimana otak lo nyari jalan keluar.",
        action:
          "Bikin sesuatu dengan batasan ekstrem: cuma 5 menit, cuma 1 warna, atau cuma 10 kata. Pilih satu batasan, lalu selesaikan.",
      },
      {
        day: 11,
        title: "Pinjem Trik dari Bidang Lain",
        lesson:
          "Creative cross-training itu ide nyolong teknik dari bidang yang sama sekali beda dari yang biasa lo geluti. Arsitek belajar dari alam, musisi belajar dari matematika, penulis belajar dari film. Otak yang cuma konsumsi satu jenis referensi lama-lama ngeluarin ide yang mirip-mirip terus. Begitu lo masukin input dari bidang asing, kombinasi baru muncul karena otak lo maksa nyambungin dua hal yang biasanya nggak ketemu. Nggak perlu jadi ahli di bidang lain itu — cukup intip caranya orang di sana mikir, terus coba tarik satu prinsipnya ke karya lo sendiri.",
        action:
          "Cari satu video/artikel pendek soal bidang yang sama sekali beda dari minat lo. Ambil satu prinsip dari situ, terapin ke karya hari ini.",
      },
      {
        day: 12,
        title: "Lawan Deadline Palsu",
        lesson:
          "Time-boxing itu ngasih diri lo deadline buatan buat kerjaan yang sebenernya nggak ada deadline-nya. Kedengarannya sepele, tapi otak manusia emang lebih fokus dan lebih cepet ambil keputusan pas ada batas waktu jelas, dibanding kerja 'sampai selesai' tanpa batas — yang biasanya malah nggak pernah beneran selesai. Ini juga cara lawan kecenderungan overthinking: pas waktu abis, lo kepaksa milih dan lanjut, bukan muter-muter mikirin pilihan sempurna. Hari ini coba kerja dengan timer nyala, dan pas timer bunyi, lo berhenti — nggak peduli udah 'pas' apa belum.",
        action:
          "Set timer 15 menit buat bikin sesuatu. Begitu timer bunyi, berhenti total — walau rasanya belum kelar.",
      },
      {
        day: 13,
        title: "Coba Medium Lain Lagi",
        lesson:
          "Minggu ini sengaja ngajak lo gonta-ganti medium biar nemu mana yang paling nyambung sama cara mikir lo, bukan cuma mana yang lo udah biasa. Hari ini coba satu medium lagi yang beda dari hari 9 kemarin — kalau kemarin gambar, sekarang coba audio atau kerajinan tangan. Semakin banyak medium yang lo cicip, semakin jelas juga pola yang muncul: mungkin lo lebih suka kerja visual, mungkin lebih suka kerja sama kata-kata, atau justru paling nyaman kerja sama sesuatu yang bisa dipegang tangan. Nggak ada jawaban benar, ini cuma proses ngenalin diri sendiri lewat proses bikin.",
        action:
          "Pilih medium ketiga yang belum lo coba minggu ini. Bikin satu hal kecil di situ, minimal 10 menit.",
      },
      {
        day: 14,
        title: "Cek Ulang Minggu Kedua",
        lesson:
          "Minggu kedua ini soal nemu ritme dan nyobain macem-macem medium serta batasan. Sebelum masuk minggu ketiga yang bakal lebih fokus, ambil waktu buat liat pola dari 13 hari terakhir. Medium mana yang paling asik dijalanin? Batasan kayak apa yang justru bikin lo makin semangat, bukan makin stres? Jawaban dari pertanyaan ini bakal nentuin ke arah mana lo mau lebih dalemin di dua minggu ke depan. Nggak ada jawaban salah di sini — tujuannya cuma biar lo sadar pola diri sendiri, bukan buat mutusin karier atau apapun yang berat.",
        action:
          "Tulis medium/format yang paling lo nikmatin dari minggu ini, dan kenapa. Ini bakal jadi bahan buat minggu depan.",
      },
      {
        day: 15,
        title: "Pilih Satu Benang Merah",
        lesson:
          "Mulai hari ini, lo bakal fokus ke satu ide atau medium yang paling lo suka dari dua minggu kemarin, dan dalemin selama seminggu ke depan. Ini bukan berarti dua minggu kemarin sia-sia — justru itu proses eksplorasi (divergent thinking) yang sekarang waktunya dipersempit (convergent thinking). Nyoba banyak hal itu penting buat nemu arah, tapi kalau nyoba doang tanpa pernah nyelemin satu hal, karya lo nggak akan pernah dalem. Hari ini tugasnya cuma satu: milih, dan berhenti mikirin pilihan lain.",
        action:
          "Lihat lagi semua yang lo bikin 14 hari terakhir. Pilih satu ide/medium yang paling pengen lo lanjutin, tulis alasannya dalam 1-2 kalimat.",
      },
      {
        day: 16,
        title: "Bikin Draft Kasar Dulu",
        lesson:
          "Sekarang waktunya bikin versi pertama dari ide yang lo pilih kemarin — dan versi pertama itu emang wajib kasar. Balik lagi ke prinsip 'shitty first draft': jangan mulai dengan nyoba bikin versi final, soalnya itu bakal bikin lo lambat dan takut salah dari awal. Anggap hari ini kayak bikin sketsa kasar sebelum lukisan beneran — tujuannya cuma biar ide yang tadinya abstrak di kepala jadi punya bentuk konkret yang bisa lo liat dan revisi. Draft jelek yang ada jauh lebih berguna dari ide bagus yang cuma ada di kepala.",
        action:
          "Bikin versi kasar pertama dari ide yang lo pilih kemarin. Jangan mikirin rapi, cukup buat sampai ada bentuknya.",
      },
      {
        day: 17,
        title: "Nyaring, Bukan Nambah",
        lesson:
          "Setelah dua minggu penuh eksplorasi dan sekarang punya draft kasar, saatnya mode otak lo geser dari divergent (nyari sebanyak-banyaknya) ke convergent (milih dan mempertajam). Ini fase yang sering dilewatin orang — udah punya banyak elemen tapi nggak pernah beneran mutusin mana yang penting dan mana yang dibuang. Convergent thinking itu soal keberanian milih: bagian mana dari draft lo yang paling kuat, dan bagian mana yang justru bikin rame doang tapi nggak nambah nilai. Hari ini bukan hari nambah, tapi hari nyaring.",
        action:
          "Lihat draft kemarin. Coret atau tandai bagian yang paling lemah, dan tandai satu bagian yang paling lo suka dari situ.",
      },
      {
        day: 18,
        title: "Dua Otak yang Beda",
        lesson:
          "Nulis/bikin dan ngedit itu dua mode otak yang beda banget, dan nyampur keduanya bareng biasanya malah bikin lo macet duluan. Mode bikin itu bebas, cepet, nggak nge-judge. Mode edit itu kritis, teliti, nyariin celah. Kalau dua mode ini jalan bareng dari awal, otak lo bakal capek sendiri karena terus-terusan nge-rem ide yang baru keluar. Makanya penting misahin waktunya: hari-hari kemarin itu mode bikin, hari ini khusus mode edit — baca ulang draft dengan mata yang lebih jeli, bukan buat nambah ide baru.",
        action:
          "Baca ulang draft lo dari awal sampai akhir tanpa nambah apapun. Perbaiki 2-3 hal kecil yang kerasa janggal.",
      },
      {
        day: 19,
        title: "Tunjukin ke Satu Orang",
        lesson:
          "Karya yang cuma pernah dilihat sama pembuatnya itu rawan buta arah — lo terlalu deket sama karyanya sendiri buat liat apa yang beneran kerasa jelas atau membingungkan buat orang lain. Nggak perlu nunjukin ke banyak orang atau ke publik, cukup satu orang yang lo percaya buat dikasih liat versi belum final ini. Feedback di tahap ini bukan buat nyari pujian, tapi buat nangkep hal yang lo sendiri udah nggak sadar lagi karena kelamaan mantengin. Ini juga latihan kecil buat ngebiasain diri kalau nanti karya ini beneran mau dibagiin.",
        action:
          "Tunjukin draft lo ke satu orang yang lo percaya. Tanya satu pertanyaan spesifik: 'bagian mana yang paling nggak jelas buat lo?'",
      },
      {
        day: 20,
        title: "Revisi, Bukan Bongkar Ulang",
        lesson:
          "Setelah dapet feedback kemarin, godaannya sering ada dua ekstrem: ngabaikan semua feedback, atau bongkar ulang semuanya dari nol. Keduanya nggak produktif. Revisi yang sehat itu milih 1-2 masukan yang paling kerasa penting, dan perbaiki itu doang tanpa ngubah keseluruhan arah karya. Nggak semua feedback harus dituruti — lo yang paling ngerti maksud karya ini, orang lain cuma ngasih sudut pandang. Tugas lo bukan nyenengin semua orang, tapi nyaring mana masukan yang beneran bikin karya lebih jelas.",
        action:
          "Pilih 1-2 masukan dari feedback kemarin yang paling masuk akal. Revisi draft lo berdasarkan itu aja, jangan lebih.",
      },
      {
        day: 21,
        title: "Cek Ulang Minggu Ketiga",
        lesson:
          "Minggu ini lo ngelewatin proses yang jarang orang lakuin sampai tuntas: milih satu ide, bikin draft kasar, nyaring, edit, dapet feedback, dan revisi. Ini siklus penuh dari sebuah karya, bukan cuma 'kepikiran ide' doang. Hari ini waktunya liat sejauh mana progressnya dari draft kasar hari 16 sampai sekarang. Biasanya bedanya lebih kerasa dari yang lo kira, soalnya progress harian itu kecil dan gampang keliatan biasa aja pas dijalanin satu-satu. Minggu depan tinggal satu tahap lagi: nyelesein dan berani nunjukin ke lebih banyak orang.",
        action:
          "Bandingkan draft hari 16 sama versi sekarang. Tulis satu hal yang berubah jadi lebih baik.",
      },
      {
        day: 22,
        title: "Rencanain Garis Finish",
        lesson:
          "Karya yang nggak pernah 'selesai' biasanya bukan karena kurang bagus, tapi karena nggak pernah ada definisi jelas soal kapan itu dianggap kelar. Sebelum masuk minggu terakhir, penting nentuin dulu: versi kayak apa yang bakal lo anggap 'cukup' buat hari 30 nanti? Nggak usah sempurna, cukup jelas kriterianya biar lo nggak keterusan revisi tanpa ujung. Perfeksionisme sering nyamar jadi 'belum puas', padahal aslinya cuma takut nunjukin hasil ke dunia. Tentuin garis finish dari sekarang biar minggu ini lo kerja dengan target, bukan muter-muter.",
        action:
          "Tulis 3 hal konkret yang bikin karya ini 'cukup selesai' buat lo. Itu jadi checklist buat 8 hari ke depan.",
      },
      {
        day: 23,
        title: "Poles yang Kelihatan",
        lesson:
          "Nggak semua bagian karya butuh perhatian yang sama pas fase polishing. Prinsip 80/20 sederhana berlaku di sini: sebagian kecil detail biasanya punya dampak paling gede ke kesan orang yang lihat/baca/denger — judul, kalimat pembuka, bagian awal yang pertama dilihat. Daripada nyebar energi rata ke semua bagian, fokusin waktu terbatas lo ke titik-titik yang paling kelihatan itu. Ini bukan soal males benerin bagian lain, tapi soal sadar waktu dan energi lo terbatas, dan hasil paling kerasa kalau dipakein ke tempat yang tepat.",
        action:
          "Perbaiki bagian paling depan/awal dari karya lo (judul, kalimat pembuka, atau elemen pertama yang dilihat orang).",
      },
      {
        day: 24,
        title: "Takut Jelek Itu Normal",
        lesson:
          "Makin deket ke selesai, rasa takut biasanya makin gede — takut ternyata jelek, takut dibandingin, takut nggak sebagus yang di kepala. Ini balik lagi ke 'gap' ala Ira Glass: selera lo udah tinggi, jadi wajar kalau hasil sendiri kerasa kurang. Bedanya orang yang nyelesein karya sama yang nggak, bukan soal siapa yang nggak takut — semua orang kreatif ngerasain ini — tapi soal siapa yang tetep lanjut walau takut. Ketakutan ini nggak bakal ilang sebelum karya jadi, jadi daripada nunggu ilang, jalan aja bareng rasa takutnya.",
        action:
          "Tulis satu ketakutan spesifik soal karya ini. Di bawahnya, tulis satu kalimat: 'tetap saya lanjutkan karena...'",
      },
      {
        day: 25,
        title: "Proses Sama Pentingnya",
        lesson:
          "Orang sering cuma nunjukin hasil akhir dan nyembunyiin proses berantakannya, padahal proses itu yang paling relate buat orang lain — bukan hasil akhirnya yang kelihatan mulus. Cerita di balik karya (draft awal yang jelek, momen mentok, keputusan kenapa akhirnya begini) justru bikin karya lo lebih berasa manusiawi dan gampang disambungin sama orang lain. Ini juga cara ngerayain proses 30 hari ini, bukan cuma hasil di akhir. Hari ini coba dokumentasiin cerita di balik karya lo, bukan cuma karyanya doang.",
        action:
          "Tulis 3-5 kalimat cerita di balik karya ini — bagian yang mentok, atau keputusan penting yang lo ambil di tengah jalan.",
      },
      {
        day: 26,
        title: "Berani Ditunjukin",
        lesson:
          "Nunjukin karya ke lebih banyak orang itu latihan otot vulnerability — dan kayak otot lainnya, awalnya emang canggung dan berat. Tapi karya yang didokumentasiin dan dibagiin publik cenderung lebih ngedorong orang buat nyelesein sama konsisten, soalnya ada rasa akuntabilitas kecil di situ. Nggak harus langsung ke platform gede atau ke banyak orang — bagiin ke grup kecil, ke circle temen, atau ke satu komunitas yang related aja udah cukup buat mulai. Yang penting bukan seberapa rame yang liat, tapi keberanian buat keluarin dari draft folder ke dunia luar.",
        action:
          "Bagiin karya lo (versi sekarang, nggak harus final) ke minimal satu orang di luar orang yang udah liat draft awal.",
      },
      {
        day: 27,
        title: "Sebelum-Sesudah",
        lesson:
          "Progress kecil harian itu gampang banget kelupaan, soalnya tiap hari cuma keliatan beda dikit dari hari sebelumnya. Bandingin versi hari 1 dengan versi sekarang biasanya baru kerasa gimana jauhnya jarak yang udah ditempuh — ini kenapa dokumentasi before/after penting, bukan cuma buat pamer, tapi buat ngeliat bukti konkret bahwa progress kecil yang konsisten beneran nambah. Ini juga bahan refleksi yang lebih jujur dibanding cuma ngandelin ingetan, soalnya ingetan gampang bias dan sering ngerasa 'kayaknya nggak banyak berubah' padahal aslinya berubah banyak.",
        action:
          "Cari lagi karya/draft dari hari-hari awal (kalau ada). Taruh berdampingan sama versi sekarang, dan lihat bedanya.",
      },
      {
        day: 28,
        title: "Liat Karya Orang Lain",
        lesson:
          "Konsumsi karya orang lain itu bukan lawan dari bikin karya, tapi bahan bakarnya. Ngeliat gimana orang lain ngerjain hal yang mirip atau beda dari lo bisa ngasih perspektif baru, sekaligus ngingetin bahwa semua orang kreatif juga ngelewatin proses berantakan yang sama kayak lo. Komunitas kreatif — baik online atau di sekitar lo — juga jadi tempat buat saling ngasih semangat kecil yang kadang lebih berarti dari feedback teknis. Hari ini khusus buat nyari dan ngapresiasi karya orang lain, bukan buat bikin sesuatu yang baru.",
        action:
          "Cari dan liat 2-3 karya orang lain (di medium yang sama kayak lo). Kasih komentar atau apresiasi jujur ke minimal satu.",
      },
      {
        day: 29,
        title: "Apa Lanjutannya?",
        lesson:
          "Satu hari sebelum selesai, ini saatnya mikirin: karya ini mau lo lanjutin, atau cukup sampai di sini? Nggak semua karya harus dilanjutin jadi proyek gede — kadang tujuannya emang cuma buat latihan dan belajar, dan itu udah cukup. Tapi kalau ada bagian dari proses ini yang beneran bikin lo semangat, sayang kalau nggak dicatet sekarang selagi masih fresh. Nggak perlu bikin rencana ambisius, cukup catetan kecil soal arah yang mungkin pengen lo eksplor lagi nanti, biar nggak keburu lupa begitu tantangan ini berakhir.",
        action:
          "Tulis satu kalimat soal: mau lo lanjutin, jadikan proyek baru, atau cukup selesai di sini — dan kenapa.",
      },
      {
        day: 30,
        title: "30 Hari yang Udah Lo Jalanin",
        lesson:
          "Hari ini bukan hari buat bikin sesuatu yang baru — ini hari buat berhenti sejenak dan liat balik semua yang udah lo lewatin. Lo udah nyoba banyak medium, lawan rasa takut jelek, belajar misahin bikin dari ngedit, dan berani nunjukin karya ke orang lain. Yang paling penting dari 30 hari ini bukan karya akhirnya doang, tapi kebiasaan yang udah kebentuk: bahwa bikin sesuatu itu nggak butuh mood sempurna atau ide yang udah matang, cukup mulai aja dari yang ada. Itu kebiasaan yang bisa lo bawa terus, jauh setelah hari ke-30 ini.",
        action:
          "Tulis refleksi singkat: hal apa yang paling lo pelajari dari 30 hari ini, dan satu kebiasaan yang mau lo terusin.",
      },
    ],
  },
];
