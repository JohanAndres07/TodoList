const jwt = require('jsonwebtoken');
const UserService = require('../services/userService');

module.exports = async function (req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserService.findUserById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.emailVerified) {
            return res.status(401).json({ message: 'Email not verified' });
        }

        req.user = { id: user._id, role: user.role };
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
