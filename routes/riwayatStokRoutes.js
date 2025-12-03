const express = require('express');
const router = express.Router();
const riwayatStokController = require('../controllers/riwayatStokController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

// --- GET ALL RIWAYAT (OWNER, KASIR) ---
router.get('/riwayat-stok', verifyToken, verifyRole(['OWNER', 'KASIR']), riwayatStokController.getAllRiwayatStok);

// --- GET RIWAYAT BY BAHAN ---
router.get('/riwayat-stok/bahan/:id_bahan', verifyToken, verifyRole(['OWNER', 'KASIR']), riwayatStokController.getRiwayatByBahan);

// --- CREATE RIWAYAT (Tambah/Kurang stok) ---
router.post('/riwayat-stok', verifyToken, verifyRole(['OWNER', 'KASIR']), riwayatStokController.createRiwayat);

// --- DELETE (OWNER Only) ---
router.delete('/riwayat-stok/:id_riwayat', verifyToken, verifyRole(['OWNER']), riwayatStokController.deleteRiwayat);

module.exports = router;
