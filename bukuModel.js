const db = require('../config/database');

const Buku = {
  async semua() {
    const [rows] = await db.execute(
      'SELECT * FROM buku ORDER BY id_buku DESC'
    );
    return rows;
  },

  async cari(id) {
    const [rows] = await db.execute(
      'SELECT * FROM buku WHERE id_buku = ?',
      [id]
    );
    return rows[0];
  },

  async tambah(data) {
    const sql = `INSERT INTO buku
      (judul, penulis, penerbit, tahun_terbit, isbn, kategori, stok, harga)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await db.execute(sql, [
      data.judul,
      data.penulis,
      data.penerbit,
      data.tahun_terbit,
      data.isbn || null,
      data.kategori,
      data.stok,
      data.harga
    ]);
    return result.insertId;
  },

  async ubah(id, data) {
    const sql = `UPDATE buku SET
      judul = ?, penulis = ?, penerbit = ?, tahun_terbit = ?,
      isbn = ?, kategori = ?, stok = ?, harga = ?
      WHERE id_buku = ?`;
    const [result] = await db.execute(sql, [
      data.judul,
      data.penulis,
      data.penerbit,
      data.tahun_terbit,
      data.isbn || null,
      data.kategori,
      data.stok,
      data.harga,
      id
    ]);
    return result.affectedRows;
  },

  async hapus(id) {
    const [result] = await db.execute(
      'DELETE FROM buku WHERE id_buku = ?',
      [id]
    );
    return result.affectedRows;
  }
};

module.exports = Buku;
