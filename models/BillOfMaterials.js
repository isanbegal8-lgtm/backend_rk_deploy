const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const BillOfMaterials = sequelize.define('BillOfMaterials', {
    id_bom: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    id_menu: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    id_bahan: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    jumlah_dibutuhkan: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    }
  }, {
    tableName: 'bill_of_materials',
    timestamps: false,
  });

  BillOfMaterials.associate = (models) => {
    BillOfMaterials.belongsTo(models.Menu, { foreignKey: 'id_menu' });
    BillOfMaterials.belongsTo(models.BahanBaku, { foreignKey: 'id_bahan' });
  };

  return BillOfMaterials;
};
