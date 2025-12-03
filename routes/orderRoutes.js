const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

// --- TRANSAKSI (Kasir & Owner) ---
router.post('/orders', verifyToken, verifyRole(['KASIR', 'OWNER']), orderController.createOrder);

// --- RIWAYAT (Kasir & Owner) ---
router.get('/orders', verifyToken, verifyRole(['OWNER', 'KASIR']), orderController.getAllOrders);

// --- LAYAR DAPUR (Semua Karyawan) ---
router.get('/kitchen/orders', verifyToken, verifyRole(['BARISTA', 'KASIR', 'OWNER']), orderController.getKitchenOrders);

// --- UPDATE STATUS (Barista, Kasir, Owner) ---
router.put('/orders/:id', verifyToken, verifyRole(['BARISTA', 'KASIR', 'OWNER']), orderController.updateOrderStatus);

// --- VOID / BATAL (Hanya Owner) ---
router.delete('/orders/:id', verifyToken, verifyRole(['OWNER']), orderController.deleteOrder);

module.exports = router;