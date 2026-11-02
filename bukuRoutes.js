const express = require('express');
const router = express.Router();
const controller = require('../controllers/bukuController');

router.get('/', controller.index);
router.get('/buku/tambah', controller.formTambah);
router.post('/buku/tambah', controller.simpan);
router.get('/buku/:id/ubah', controller.formUbah);
router.post('/buku/:id/ubah', controller.perbarui);
router.post('/buku/:id/hapus', controller.hapus);

module.exports = router;
