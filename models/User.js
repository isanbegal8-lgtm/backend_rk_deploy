const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id_user: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('OWNER', 'KASIR', 'BARISTA'),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    tableName: 'users',
    timestamps: false,
  });

  User.associate = (models) => {
    User.hasMany(models.Order, { foreignKey: 'id_user', as: 'orders' });
    User.hasMany(models.RiwayatStok, { foreignKey: 'id_user', as: 'stok_logs' });
  };

  return User;
};
