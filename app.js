const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const bookingRoutes = require('./routes/bookingRoutes');
const viewRoutes = require('./routes/viewRoutes');
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');

dotenv.config();
connectDB();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cors());

app.use('/', viewRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/cars', carRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});