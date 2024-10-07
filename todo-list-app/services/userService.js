const User = require('../modelsdb/userEntity');

class UserService {

    async findUserByEmail(email) {
        return await User.findOne({ email });
    }

    async findUserById(id) {
        return await User.findById(id);
    }

    async createUser(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async getUserProfile(userId) {
        const user = await User.findById(userId).select('-password');
        if (!user) throw new Error('User not found');
        return user;
    }

    async deleteUser(userId) {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');
        return await user.deleteOne();
    }
}

module.exports = new UserService();
