const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const BahanBaku = sequelize.define('BahanBaku', {
    id_bahan: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    nama_bahan: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    stok_saat_ini: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    stok_minimum: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    satuan: {
      type: DataTypes.STRING(20),
      allowNull: false,
    }
  }, {
    tableName: 'bahan_baku',
    timestamps: false,
  });

  BahanBaku.associate = (models) => {
    BahanBaku.hasMany(models.BillOfMaterials, { foreignKey: 'id_bahan', as: 'bom' });
    BahanBaku.hasMany(models.RiwayatStok, { foreignKey: 'id_bahan', as: 'riwayat' });
  };

  return BahanBaku;
};
