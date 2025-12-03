const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    id_order: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    tanggal: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    total_bayar: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status_pesanan: {
      type: DataTypes.STRING(20),
      defaultValue: 'BARU',
    },
    id_user: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }
  }, {
    tableName: 'orders',
    timestamps: false,
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: 'id_user', as: 'kasir' });
    Order.hasMany(models.OrderItem, { foreignKey: 'id_order', as: 'items' });
  };

  return Order;
};
