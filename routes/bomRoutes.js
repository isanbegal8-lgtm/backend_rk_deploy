const express = require('express');
const router = express.Router();
const bomController = require('../controllers/bomController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

// --- GET ALL BOM (Semua Role Bisa Melihat) ---
router.get('/bom', verifyToken, verifyRole(['OWNER', 'KASIR', 'BARISTA']), bomController.getAllBOM);

// --- GET BOM BY MENU ---
router.get('/bom/menu/:id_menu', verifyToken, verifyRole(['OWNER', 'KASIR', 'BARISTA']), bomController.getBOMByMenu);

// --- CREATE BOM (OWNER SAJA) ---
router.post('/bom', verifyToken, verifyRole(['OWNER']), bomController.createBOM);

// --- UPDATE BOM (OWNER SAJA) ---
router.put('/bom/:id_bom', verifyToken, verifyRole(['OWNER']), bomController.updateBOM);

// --- DELETE BOM (OWNER SAJA) ---
router.delete('/bom/:id_bom', verifyToken, verifyRole(['OWNER']), bomController.deleteBOM);

module.exports = router;
