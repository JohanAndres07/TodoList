// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const User = require('../modelsdb/userEntity');
//
// class AuthService {
//     async login(email, password) {
//         const user = await User.findOne({ email });
//         if (!user) throw new Error('Invalid email or password');
//
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) throw new Error('Invalid email or password');
//
//         if (!user.emailVerified) throw new Error('Please verify your email before logging in');
//
//         const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         return { token };
//     }
// }
//
// module.exports = new AuthService();
