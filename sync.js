const sequelize = require('./config/database');
require('./models/User');
require('./models/RiwayatStok');
require('./models/OrderItem');
require('./models/Order');
require('./models/Menu');
require('./models/BillOfMaterials');
require('./models/BahanBaku');
// Tambahkan model lain di sini

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("All tables created/updated!");
  } catch (error) {
    console.error(error);
  }
})();
