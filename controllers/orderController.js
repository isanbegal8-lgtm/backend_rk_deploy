const { Menu, BahanBaku, BillOfMaterials, RiwayatStok, Order, OrderItem } = require('../models');

const generateOrderId = async () => {
  // Ambil order terakhir berdasarkan nomor terbesar
  const lastOrder = await Order.findOne({
    order: [['id_order', 'DESC']]
  });

  let nextNumber = 1;

  if (lastOrder && lastOrder.id_order) {
    const lastNumber = parseInt(lastOrder.id_order.replace('ORD-', ''));
    nextNumber = lastNumber + 1;
  }

  // Format menjadi ORD-0001, ORD-0002, dst.
  const padded = String(nextNumber).padStart(4, '0');
  return `ORD-${padded}`;
};


module.exports = {

  // =============================
  //  CREATE ORDER
  // =============================
  createOrder: async (req, res) => {
    try {
      const { nama_menu, jumlah_order, id_user } = req.body;

      const menu = await Menu.findOne({ where: { nama_menu } });
      if (!menu) {
        return res.status(404).json({ message: `Menu ${nama_menu} tidak ditemukan` });
      }

      const id_menu = menu.id_menu;
      const total_harga = menu.harga * jumlah_order;

      const bomList = await BillOfMaterials.findAll({ where: { id_menu } });
      if (!bomList.length) {
        return res.status(400).json({ message: `Menu ${nama_menu} tidak memiliki BOM` });
      }

      for (const bom of bomList) {
        const bahan = await BahanBaku.findOne({ where: { id_bahan: bom.id_bahan } });

        const total_pengurangan = bom.jumlah_dibutuhkan * jumlah_order;

        if (bahan.stok_saat_ini < total_pengurangan) {
          return res.status(400).json({
            message: `Stok bahan ${bahan.nama_bahan} tidak mencukupi`
          });
        }

        bahan.stok_saat_ini -= total_pengurangan;
        await bahan.save();

        await RiwayatStok.create({
          id_bahan: bahan.id_bahan,
          id_user,
          jumlah_berubah: -total_pengurangan,
          jenis_transaksi: 'KURANG',
          keterangan: `Order ${menu.nama_menu}`,
          tanggal: new Date()
        });
      }

      const newOrder = await Order.create({
        id_order: await generateOrderId(),
        id_menu,
        jumlah_order,
        total_harga,
        total_bayar: total_harga,
        id_user,
        status: "PENDING",
        tanggal: new Date()
      });

      return res.status(201).json({
        message: "Order berhasil dibuat",
        order: newOrder
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
    }
  },

  // =============================
  //  UPDATE STATUS ORDER
  // =============================
updateOrderStatus: async (req, res) => {
  try {
    const { id } = req.params;
    const { status_pesanan } = req.body;

    // Cari order berdasarkan ID
    const order = await Order.findOne({ where: { id_order: id } });
    if (!order) {
      return res.status(404).json({ message: "Order tidak ditemukan" });
    }

    // Validasi status
    const allowed = ["BARU", "SEDANG DIBUAT", "SELESAI"];
    if (!allowed.includes(status_pesanan)) {
      return res.status(400).json({ 
        message: "Status tidak valid. Gunakan: BARU, SEDANG DIBUAT, SELESAI" 
      });
    }

    // Update status
    order.status_pesanan = status_pesanan;
    await order.save();

    return res.json({
      message: "Status order berhasil diperbarui",
      order
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Terjadi kesalahan",
      error: error.message
    });
  }
},


  // =============================
  //  LAYAR DAPUR
  // =============================
  getKitchenOrders: async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: {
        status_pesanan: ['BARU', 'SEDANG DIBUAT', 'SELESAI']
      },
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: Menu,
              as: 'menu_detail', // sesuai model kamu
              attributes: ['nama_menu', 'harga']
            }
          ]
        }
      ],
      order: [['tanggal', 'ASC']]
    });

    return res.json({
      message: "Daftar order untuk dapur",
      total: orders.length,
      orders
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
}


};
