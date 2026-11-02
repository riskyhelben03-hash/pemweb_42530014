const Buku = require('../models/bukuModel');

const kategoriValid = ['Fiksi', 'Nonfiksi', 'Pendidikan', 'Teknologi', 'Sejarah', 'Lainnya'];

function validasi(data) {
  const tahun = Number(data.tahun_terbit);
  const stok = Number(data.stok);
  const harga = Number(data.harga);

  if (!data.judul?.trim() || !data.penulis?.trim() || !data.penerbit?.trim()) {
    return 'Judul, penulis, dan penerbit wajib diisi.';
  }
  if (!Number.isInteger(tahun) || tahun < 1000 || tahun > new Date().getFullYear()) {
    return 'Tahun terbit tidak valid.';
  }
  if (!kategoriValid.includes(data.kategori)) {
    return 'Kategori buku tidak valid.';
  }
  if (!Number.isInteger(stok) || stok < 0) {
    return 'Stok harus berupa bilangan bulat minimal 0.';
  }
  if (!Number.isFinite(harga) || harga < 0) {
    return 'Harga harus berupa angka minimal 0.';
  }
  return null;
}

exports.index = async (req, res, next) => {
  try {
    const daftarBuku = await Buku.semua();
    res.render('pages/buku/index', {
      title: 'Data Buku',
      buku: daftarBuku,
      pesan: req.query.pesan || ''
    });
  } catch (error) { next(error); }
};

exports.formTambah = (req, res) => {
  res.render('pages/buku/form', {
    title: 'Tambah Buku',
    mode: 'tambah',
    buku: {},
    error: ''
  });
};

exports.simpan = async (req, res, next) => {
  try {
    const error = validasi(req.body);
    if (error) {
      return res.status(400).render('pages/buku/form', {
        title: 'Tambah Buku', mode: 'tambah', buku: req.body, error
      });
    }
    await Buku.tambah(req.body);
    res.redirect('/?pesan=Buku berhasil ditambahkan');
  } catch (err) { next(err); }
};

exports.formUbah = async (req, res, next) => {
  try {
    const buku = await Buku.cari(req.params.id);
    if (!buku) {
      return res.status(404).render('pages/error', {
        title: 'Buku Tidak Ditemukan', message: 'Data buku tidak ditemukan.'
      });
    }
    res.render('pages/buku/form', {
      title: 'Ubah Buku', mode: 'ubah', buku, error: ''
    });
  } catch (err) { next(err); }
};

exports.perbarui = async (req, res, next) => {
  try {
    const error = validasi(req.body);
    if (error) {
      return res.status(400).render('pages/buku/form', {
        title: 'Ubah Buku', mode: 'ubah',
        buku: { ...req.body, id_buku: req.params.id }, error
      });
    }
    const jumlah = await Buku.ubah(req.params.id, req.body);
    if (!jumlah) {
      return res.status(404).render('pages/error', {
        title: 'Buku Tidak Ditemukan', message: 'Data buku tidak ditemukan.'
      });
    }
    res.redirect('/?pesan=Buku berhasil diperbarui');
  } catch (err) { next(err); }
};

exports.hapus = async (req, res, next) => {
  try {
    const jumlah = await Buku.hapus(req.params.id);
    if (!jumlah) {
      return res.status(404).render('pages/error', {
        title: 'Buku Tidak Ditemukan', message: 'Data buku tidak ditemukan.'
      });
    }
    res.redirect('/?pesan=Buku berhasil dihapus');
  } catch (err) { next(err); }
};
