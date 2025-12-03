const express = require('express');
const router = express.Router();
const bahanBakuController = require('../controllers/bahanBakuController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

// --- PUBLIC / SEMUA ROLE TEROTENTIKASI BISA LIHAT ---
router.get('/bahan', verifyToken, verifyRole(['OWNER', 'KASIR', 'BARISTA']), bahanBakuController.getAllBahan);

// --- CREATE BAHAN --- (Owner Saja)
router.post('/bahan', verifyToken, verifyRole(['OWNER']), bahanBakuController.createBahan);

// --- UPDATE BAHAN --- (Owner + Kasir jika diizinkan)
router.put('/bahan/:id', verifyToken, verifyRole(['OWNER', 'KASIR']), bahanBakuController.updateBahan);

// --- HAPUS BAHAN --- (Owner Saja)
router.delete('/bahan/:id', verifyToken, verifyRole(['OWNER']), bahanBakuController.deleteBahan);

module.exports = router;
