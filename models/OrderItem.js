const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const OrderItem = sequelize.define('OrderItem', {
    id_order_item: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_order: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    id_menu: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    jumlah: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    catatan: {
      type: DataTypes.TEXT,
    },
    subtotal: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    }
  }, {
    tableName: 'order_items',
    timestamps: false,
  });

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, { foreignKey: 'id_order' });
    OrderItem.belongsTo(models.Menu, { foreignKey: 'id_menu', as: 'menu_detail' });
    OrderItem.belongsTo(models.Menu, { foreignKey: 'id_menu', as: 'menu' });

  };

  return OrderItem;
};
