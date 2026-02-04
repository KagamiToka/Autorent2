const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Vui lòng nhập họ tên'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Vui lòng nhập email'],
        unique: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Email không hợp lệ'
        ]
    },
    password: {
        type: String,
        required: [true, 'Vui lòng nhập mật khẩu'],
        minlength: 6
    },
    phone: {
        type: String,
        required: [true, 'Vui lòng nhập số điện thoại']
    },
    role: {
        type: String,
        enum: ['CUSTOMER', 'ADMIN', 'OWNER'],
        default: 'CUSTOMER'
    },
    avatar: {
        type: String,
        default: 'no-photo.jpg'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);