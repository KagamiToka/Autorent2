const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { fullName, email, password, phone, role } = req.body;

        // Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email này đã được sử dụng!" });
        }

        // Mã hóa mật khẩu (Hashing)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName,
            email,
            phone,
            password: hashedPassword,
            role: role || 'CUSTOMER'
        });

        res.status(201).json({ message: "Đăng ký thành công!", user: newUser });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Email hoặc mật khẩu không đúng!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Email hoặc mật khẩu không đúng!" });
        }

        // Tạo Token (Chìa khóa)
        const token = jwt.sign(
            { id: user._id, role: user.role }, // Thông tin gói trong token
            process.env.JWT_SECRET || '123456', // Khóa bí mật (nên để trong .env)
            { expiresIn: '1d' } // Hết hạn sau 1 ngày
        );

        // Trả về Token và thông tin User
        res.json({
            message: "Đăng nhập thành công",
            token,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                phone: user.phone
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};