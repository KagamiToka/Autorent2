const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET || '123456');

            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            return res.status(401).json({ error: "Token không hợp lệ hoặc đã hết hạn!" });
        }
    }

    if (!token) {
        return res.status(401).json({ error: "Bạn chưa đăng nhập! Vui lòng gửi Token." });
    }
};

module.exports = { protect };