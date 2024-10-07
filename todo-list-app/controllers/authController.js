const AuthService = require('../services/authService');
const UserService = require('../services/userService');
const EmailService = require('../services/emailService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class AuthController {
    async register(req, res) {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const existingUser = await UserService.findUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'Email already registered' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await UserService.createUser({ username, email, password: hashedPassword });

            const verificationToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            await EmailService.sendVerificationEmail(newUser.email, verificationToken);

            res.status(201).json({ message: 'User registered. Please verify your email.' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async registerWithoutVerification(req, res) {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const existingUser = await UserService.findUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'Email already registered' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await UserService.createUser({ username, email, password: hashedPassword, emailVerified: true });

            res.status(201).json({ message: 'User registered successfully without email verification.' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }
            const { token } = await AuthService.login(email, password);
            res.json({ token });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async verifyEmail(req, res) {
        try {
            const { token } = req.query;

            if (!token) {
                return res.status(400).json({ message: 'Invalid or missing token' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await UserService.findUserById(decoded.userId);

            if (!user) {
                return res.status(400).json({ message: 'Invalid token' });
            }

            if (user.emailVerified) {
                return res.status(400).json({ message: 'Email already verified' });
            }

            user.emailVerified = true;
            await user.save();

            res.status(200).json({ message: 'Email verified successfully' });
        } catch (err) {
            res.status(400).json({ message: 'Invalid or expired token' });
        }
    }
}

module.exports = new AuthController();
