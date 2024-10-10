require('dotenv').config(); 

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const User = require('../modelsdb/userEntity');

class AuthService {
    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) throw new Error('Invalid email or password');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid email or password');

        if (!user.emailVerified) throw new Error('Please verify your email before logging in');

        
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
        
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token, userId: user._id };
    }
}

module.exports = new AuthService();

