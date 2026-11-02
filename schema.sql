CREATE DATABASE IF NOT EXISTS perpustakaan_db;
USE perpustakaan_db;

CREATE TABLE IF NOT EXISTS buku (
  id_buku INT AUTO_INCREMENT PRIMARY KEY,
  judul VARCHAR(200) NOT NULL,
  penulis VARCHAR(150) NOT NULL,
  penerbit VARCHAR(150) NOT NULL,
  tahun_terbit YEAR NOT NULL,
  isbn VARCHAR(30) NULL,
  kategori ENUM('Fiksi', 'Nonfiksi', 'Pendidikan', 'Teknologi', 'Sejarah', 'Lainnya') NOT NULL,
  stok INT NOT NULL DEFAULT 0,
  harga DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO buku (judul, penulis, penerbit, tahun_terbit, isbn, kategori, stok, harga)
VALUES
('Laskar Pelangi', 'Andrea Hirata', 'Bentang Pustaka', 2005, '9789793062792', 'Fiksi', 8, 85000.00),
('Bumi Manusia', 'Pramoedya Ananta Toer', 'Hasta Mitra', 1980, '9789799731234', 'Sejarah', 5, 95000.00);
