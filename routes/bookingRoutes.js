const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingController');
const validateBookingInputs = require('../middlewares/validateBooking');
const { protect } = require('../middlewares/authMiddleware');

router.post('/',protect, validateBookingInputs, bookingController.createBooking);
router.get('/', bookingController.getAllBookings);
router.get('/owner/my-bookings',protect, bookingController.getOwnerBookings);
router.get('/admin/summary',protect, bookingController.getAdminStats);
router.get('/user/:id',protect, bookingController.getUserBookings);
router.get('/:id', bookingController.getBookingById);
router.put('/:id/confirm', protect, bookingController.confirmBooking);

module.exports = router;