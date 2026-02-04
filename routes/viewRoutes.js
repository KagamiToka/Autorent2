const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

router.get('/', async (req, res) => {
    try {
        const cars = await Car.find({ status: 'AVAILABLE' });
        
        res.render('cars/index', { cars: cars }); 
    } catch (err) {
        console.error(err);
        res.render('cars/index', { cars: [] });
    }
});

router.get('/cars/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id).populate('ownerId');

        if (!car) {
            return res.redirect('/'); 
        }

        res.render('cars/detail', { car });
        
    } catch (err) {
        console.error("Lỗi tìm xe:", err.message);
        return res.redirect('/');
    }
});

// Các trang Auth
router.get('/login', (req, res) => res.render('auth/login'));
router.get('/register', (req, res) => res.render('auth/register'));

// Các trang User/Owner
router.get('/my-bookings', (req, res) => res.render('bookings/my-bookings'));
router.get('/owner/create-car', (req, res) => {
    res.render('owner/create-car');
});
router.get('/owner/dashboard', (req, res) => res.render('owner/dashboard'));
router.get('/admin/dashboard', (req, res) => {
    res.render('admin/dashboard');
});
module.exports = router;