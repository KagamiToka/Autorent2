const Booking = require('../models/Booking');
const User = require('../models/User');
const Car = require('../models/Car');

//Hàm tính toán tổng tiền thuê xe
const calculateTotalPrice = (startDate, endDate, dailyRate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end - start;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    if (daysDiff <= 0) daysDiff = 1;
    return daysDiff * dailyRate;
};

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const { userId, carId, startDate, endDate } = req.body;
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }

        const conflictingBooking = await Booking.findOne({
            carId: carId,
            $or: [
                { startDate: { $lt: new Date(endDate), $gte: new Date(startDate) } },
                { endDate: { $gt: new Date(startDate), $lte: new Date(endDate) } }
                // { startDate: { $lte: new Date(startDate) }, endDate: { $gte: new Date(endDate) } }
            ]
        });
        if (conflictingBooking) {
            return res.status(400).json({ error: 'Car is already booked for the selected dates' });
        }
        const totalPrice = calculateTotalPrice(startDate, endDate, car.price);

        const newBooking = new Booking({
            userId,
            carId,
            startDate,
            endDate,
            totalPrice
        });
        await newBooking.save();
        res.status(201).json({
            message: 'Booking created successfully',
            booking: newBooking
        });

    } catch (error) {
        res.status(500).json({ error: 'Failed to create booking' });
    }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
        .populate('userId', 'name email')
        .populate('carId', 'name brand price');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve bookings' });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id)
            .populate('userId', 'fullName email phone')
            .populate('carId');

        if (!booking) {
            return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
        }

        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const { id } = req.params;

        const bookings = await Booking.find({ userId: id })
            .populate('carId', 'name brand image')
            .sort({ createdAt: -1 });

        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOwnerBookings = async (req, res) => {
    try {
        const { ownerId } = req.query; 

        if (!ownerId) {
            return res.status(400).json({ error: 'Vui lòng cung cấp ownerId' });
        }

        const cars = await Car.find({ ownerId: ownerId }).select('_id');

        const carIds = cars.map(car => car._id);

        const bookings = await Booking.find({ carId: { $in: carIds } })
            .populate('userId', 'fullName phone')
            .populate('carId', 'name');

        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAdminStats = async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments();

        const stats = await Booking.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                    totalRevenue: { $sum: "$totalPrice" }
                }
            }
        ]);

        res.status(200).json({
            total: totalBookings,
            breakdown: stats
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.confirmBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id);
        if (!booking) return res.status(404).json({ error: "Không tìm thấy đơn" });

        if (booking.status !== 'PENDING') {
            return res.status(400).json({ error: "Đơn này đã được xử lý rồi" });
        }

        booking.status = 'CONFIRMED';
        await booking.save();

        const newContract = await Contract.create({
            bookingId: booking._id,
            terms: "Hợp đồng được tạo tự động khi chủ xe xác nhận.",
            status: 'ACTIVE'
        });

        res.status(200).json({ 
            message: "Đã duyệt đơn và tạo hợp đồng!", 
            booking, 
            contract: newContract 
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};