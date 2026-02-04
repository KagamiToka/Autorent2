const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    terms: {
        type: String,
        required: true,
        default: "Điều khoản thuê xe: Khách hàng chịu trách nhiệm nếu làm hỏng xe, trả xe đúng giờ..."
    },
    signedDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'TERMINATED', 'EXPIRED'],
        default: 'ACTIVE'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Contract', contractSchema);