const Car = require('../models/Car');

exports.getAllCars = async (req, res) => {
    try {
        const { status } = req.query;
        const query = status ? { status: status } : {};
        
        const cars = await Car.find(query).populate('ownerId', 'fullName phone');
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id).populate('ownerId', 'fullName email');
        if (!car) return res.status(404).json({ error: 'Xe không tồn tại' });
        res.status(200).json(car);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createCar = async (req, res) => {
    try {
        const newCar = await Car.create(req.body);
        res.status(201).json({ message: "Đăng xe thành công", car: newCar });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};