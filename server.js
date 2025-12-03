require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Routes
const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const bahanRoutes = require('./routes/bahanRoutes');
const bomRoutes = require('./routes/bomRoutes');
const riwayatStokRoutes = require('./routes/riwayatStokRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Daftarkan semua routes
app.use('/api', authRoutes);
app.use('/api', menuRoutes);
app.use('/api', orderRoutes);
app.use('/api', bahanRoutes);
app.use('/api', bomRoutes);
app.use('/api', riwayatStokRoutes);

// Default Route
app.get('/', (req, res) => {
    res.json({ message: "RKCafee Backend running on localhost" });
});

const PORT = process.env.PORT || 3000;
const HOST = '127.0.0.1'; // Localhost only

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});
