const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const RiwayatStok = sequelize.define('RiwayatStok', {
    id_riwayat: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_bahan: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    id_user: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    jumlah_berubah: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    jenis_transaksi: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    keterangan: {
      type: DataTypes.TEXT,
    },
    tanggal: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    tableName: 'riwayat_stok',
    timestamps: false,
  });

  RiwayatStok.associate = (models) => {
    RiwayatStok.belongsTo(models.BahanBaku, { foreignKey: 'id_bahan' });
    RiwayatStok.belongsTo(models.User, { foreignKey: 'id_user' });
  };

  return RiwayatStok;
};
