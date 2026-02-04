const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Vui lòng nhập tên xe'],
        trim: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: [true, 'Vui lòng nhập giá thuê'],
        min: 0
    },
    seats: {
        type: Number,
        default: 4
    },
    transmission: {
        type: String,
        enum: ['AUTOMATIC', 'MANUAL'],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['AVAILABLE', 'RENTED', 'MAINTENANCE', 'STOPPED'],
        default: 'AVAILABLE'
    },
    image: {
        type: String,
        default: 'no-image.jpg'
    },
    description: {
        type: String,
        maxlength: 500
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Car', carSchema);