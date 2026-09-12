# Lapak Alun-Alun — Web Admin

Panel khusus pemilik/pengelola alun-alun untuk memantau semua toko dan
pesanan lintas penjual. Tanpa proses build (HTML/CSS/JS polos) + Firebase
(Firestore untuk data, Storage untuk foto).

## Struktur folder

Setiap layar panel adalah **halaman HTML sungguhan** di folder sendiri:

```
admin-web/
├── index.html              halaman utama: masuk / setup akun admin
├── login.js                  skrip untuk index.html
├── ringkasan/
│   ├── index.html            statistik ringkas lintas semua toko
│   └── ringkasan.js
├── toko/
│   ├── index.html            daftar semua toko terdaftar, bisa dihapus
│   └── toko.js
├── pesanan/
│   ├── index.html            daftar pesanan lintas semua toko
│   └── pesanan.js
├── pengaturan/
│   ├── index.html            jumlah meja & ganti password admin
│   └── pengaturan.js
└── shared/                    file yang dipakai bersama semua halaman di atas
    ├── firebase-config.js
    ├── storage.js
    ├── utils.js               fungsi bantu umum, ikon, rating, dst.
    ├── auth-guard.js          cek sesi login admin di tiap halaman
    ├── nav.js                  kerangka topbar + tab bar bawah panel
    ├── paths.js                BASE_PATH & fungsi pindah halaman (goTo/pageUrl)
    ├── site-config.js          alamat web PEMBELI & PENJUAL
    └── style.css
```

Karena tiap halaman panel berdiri sendiri (bukan SPA), setiap halaman
memanggil `requireAdminAuth()` (dari `shared/auth-guard.js`) di awal
skripnya sendiri — kalau sesi tidak ditemukan, otomatis dilempar balik ke
halaman masuk.

## PENTING: `BASE_PATH` di `shared/paths.js`

Karena semua tombol/link di sini memakai path seperti `/ringkasan/`,
`/toko/`, dst., situs ini perlu tahu di subfolder mana dia berjalan kalau
di-deploy lewat **GitHub Pages project site**
(`https://username.github.io/nama-repo/`).

Buka `shared/paths.js`:

```js
const BASE_PATH = '/admin-web';
```

Nilai ini **ditebak** dari nama file asal repo ini — belum tentu sama
dengan nama repo GitHub kamu yang sebenarnya. **Wajib dicek ulang**:

- Kalau nama repo GitHub kamu **persis** `admin-web`, biarkan seperti itu.
- Kalau beda, ganti jadi `/nama-repo-kamu`.
- Kalau pakai domain sendiri / hosting yang filenya di root, ganti jadi
  string kosong: `const BASE_PATH = '';`

## Setup sebelum dipakai

1. **Firebase**: isi `shared/firebase-config.js` dengan konfigurasi project
   Firebase yang **sama** dengan yang dipakai di web pembeli & penjual
   (supaya data toko/pesanannya nyambung).
2. **Alamat web pembeli & penjual**: isi `shared/site-config.js` dengan
   alamat kedua situs itu setelah di-deploy.
3. **Deploy**: push folder ini ke repo GitHub, aktifkan GitHub Pages, lalu
   cek `BASE_PATH` di atas sudah cocok dengan nama repo-nya.
4. Saat pertama kali dibuka, situs ini akan minta kamu membuat password
   admin (akun tunggal, bukan multi-user).

## Catatan keamanan

Ini level prototipe: akun admin cuma satu, dan password-nya disimpan polos
di satu dokumen Firestore. Kalau mau dipakai sungguhan (bukan sekadar demo),
pertimbangkan menambahkan Firestore Security Rules yang membatasi siapa
saja yang boleh membaca/menulis koleksi `kv`, dan idealnya pindah ke sistem
autentikasi Firebase yang sesungguhnya (Firebase Authentication) daripada
password polos di database.
