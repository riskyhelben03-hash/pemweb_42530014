# Sistem Manajemen Data Buku Perpustakaan

Aplikasi CRUD sederhana menggunakan Express, EJS, MySQL2, dotenv, dan arsitektur MVC.

## 1. Persiapan

- Node.js dan npm
- MySQL Server 8.0
- Visual Studio Code

## 2. Instalasi

Buka terminal pada folder proyek, lalu jalankan:

```bash
npm install
```

Salin `.env.example` menjadi `.env`, lalu isi konfigurasi sesuai MySQL lokal:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password_mysql_kamu
DB_NAME=perpustakaan_db
DB_PORT=3306
PORT=3000
```

Jangan membagikan file `.env` karena berisi informasi akses database.

## 3. Membuat database dan tabel

Buka MySQL Workbench, buka tab SQL baru, lalu jalankan isi file `database/schema.sql`.

Jika akun root MySQL belum bisa diakses karena lupa password, pulihkan akses MySQL terlebih dahulu. Aplikasi tidak dapat terhubung ke database sebelum kredensial di `.env` benar.

## 4. Menjalankan aplikasi

```bash
npm run dev
```

Buka browser ke `http://localhost:3000`.

## 5. Fitur

- Menampilkan seluruh data buku
- Menambahkan data buku
- Mengubah data buku
- Menghapus data buku
- Validasi input dasar
- Koneksi MySQL menggunakan connection pool
- Query CRUD menggunakan prepared statements (`?`)

## 6. Struktur MVC

- `models/`: query database
- `controllers/`: logika aplikasi dan validasi
- `routes/`: pemetaan URL ke controller
- `views/`: tampilan EJS
- `config/`: konfigurasi koneksi database

## 7. Catatan keamanan

- Password database hanya disimpan pada `.env`.
- `.env` tidak boleh dimasukkan ke Git.
- Query menggunakan parameter placeholder, bukan menggabungkan input pengguna ke SQL.
- Contoh data pada `database/schema.sql` dapat diubah sesuai kebutuhan tugas.
