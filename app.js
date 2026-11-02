const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const bukuRoutes = require('./routes/bukuRoutes');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', bukuRoutes);

app.use((req, res) => {
  res.status(404).render('pages/error', {
    title: 'Halaman Tidak Ditemukan',
    message: 'Halaman yang kamu cari tidak tersedia.'
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('pages/error', {
    title: 'Terjadi Kesalahan',
    message: 'Terjadi kesalahan pada server. Periksa konfigurasi dan terminal.'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
