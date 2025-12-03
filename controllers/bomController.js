const { BillOfMaterials, Menu, BahanBaku } = require('../models');

// --- A. GET ALL BOM ---
exports.getAllBOM = async (req, res) => {
  try {
    const bom = await BillOfMaterials.findAll({
      include: [
        { model: Menu, attributes: ['nama_menu'] },
        { model: BahanBaku, attributes: ['nama_bahan', 'satuan'] }
      ]
    });

    res.json({ success: true, data: bom });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --- B. GET BOM BY MENU ---
exports.getBOMByMenu = async (req, res) => {
  try {
    const { id_menu } = req.params;

    const bom = await BillOfMaterials.findAll({
      where: { id_menu },
      include: [
        { model: BahanBaku, attributes: ['nama_bahan', 'satuan'] }
      ]
    });

    res.json({ success: true, data: bom });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --- C. CREATE BOM ---
exports.createBOM = async (req, res) => {
  try {
    const { id_bom, id_menu, id_bahan, jumlah_dibutuhkan } = req.body;

    const newBOM = await BillOfMaterials.create({
      id_bom,
      id_menu,
      id_bahan,
      jumlah_dibutuhkan
    });

    res.status(201).json({
      success: true,
      message: 'BOM berhasil dibuat',
      data: newBOM
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --- D. UPDATE BOM ---
exports.updateBOM = async (req, res) => {
  try {
    const { id_bom } = req.params;
    const { id_menu, id_bahan, jumlah_dibutuhkan } = req.body;

    const [updated] = await BillOfMaterials.update(
      { id_menu, id_bahan, jumlah_dibutuhkan },
      { where: { id_bom } }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'BOM tidak ditemukan' });
    }

    res.json({ success: true, message: 'BOM berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --- E. DELETE BOM ---
exports.deleteBOM = async (req, res) => {
  try {
    const { id_bom } = req.params;

    const deleted = await BillOfMaterials.destroy({
      where: { id_bom }
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'BOM tidak ditemukan' });
    }

    res.json({ success: true, message: 'BOM berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
