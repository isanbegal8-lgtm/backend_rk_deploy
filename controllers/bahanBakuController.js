const { BahanBaku } = require('../models');

// --- GET ALL BAHAN BAKU ---
exports.getAllBahan = async (req, res) => {
  try {
    const bahan = await BahanBaku.findAll({
      order: [['nama_bahan', 'ASC']]
    });
    res.json({ success: true, data: bahan });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --- CREATE BAHAN BAKU ---
exports.createBahan = async (req, res) => {
  try {
    const { id_bahan, nama_bahan, stok, satuan, minimal_stok } = req.body;

    const newBahan = await BahanBaku.create({
      id_bahan,
      nama_bahan,
      stok,
      satuan,
      minimal_stok
    });

    res.status(201).json({
      success: true,
      message: 'Bahan baku berhasil ditambahkan',
      data: newBahan
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --- UPDATE BAHAN BAKU ---
exports.updateBahan = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_bahan, stok, satuan, minimal_stok } = req.body;

    const [updated] = await BahanBaku.update(
      { nama_bahan, stok, satuan, minimal_stok },
      { where: { id_bahan: id } }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Bahan baku tidak ditemukan' });
    }

    res.json({ success: true, message: 'Bahan baku berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --- DELETE BAHAN BAKU ---
exports.deleteBahan = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await BahanBaku.destroy({ where: { id_bahan: id } });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Bahan baku tidak ditemukan' });
    }

    res.json({ success: true, message: 'Bahan baku berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
