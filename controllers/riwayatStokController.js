const { RiwayatStok, BahanBaku } = require('../models');

// --- A. GET ALL RIWAYAT STOK ---
exports.getAllRiwayatStok = async (req, res) => {
  try {
    const data = await RiwayatStok.findAll({
      include: [
        {
          model: BahanBaku,
          attributes: ['nama_bahan', 'satuan']
        }
      ],
      order: [['tanggal', 'DESC']]
    });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --- B. GET RIWAYAT BY BAHAN ---
exports.getRiwayatByBahan = async (req, res) => {
  try {
    const { id_bahan } = req.params;

    const data = await RiwayatStok.findAll({
      where: { id_bahan },
      include: [{ model: BahanBaku, attributes: ['nama_bahan', 'satuan'] }],
      order: [['tanggal', 'DESC']]
    });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --- C. CREATE RIWAYAT (Tambah atau Kurang stok) ---
exports.createRiwayat = async (req, res) => {
  try {
    const { id_riwayat, id_bahan, perubahan, keterangan } = req.body;

    const newData = await RiwayatStok.create({
      id_riwayat,
      id_bahan,
      perubahan,
      keterangan,
      tanggal: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Riwayat stok berhasil dicatat',
      data: newData
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --- D. DELETE RIWAYAT (Owner Only) ---
exports.deleteRiwayat = async (req, res) => {
  try {
    const { id_riwayat } = req.params;

    const deleted = await RiwayatStok.destroy({
      where: { id_riwayat }
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Riwayat tidak ditemukan' });
    }

    res.json({ success: true, message: 'Riwayat stok berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
